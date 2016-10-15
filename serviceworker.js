/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


'use strict';


// Set a name for the current cache
const version = '002';
const cacheName = `nyer_${version}`;

// Default files to always cache
const cacheFiles = [
    '/',
    '/nyer.css',
    '/nyer.js',
    '/horn.mp3'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(cacheFiles);
            })
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(keys
                    .filter(key => {
                        return key.indexOf(cacheName) !== 0;
                    })
                    .map(key => {
                        return caches.delete(key);
                    })
                );
            })
    );
});


self.addEventListener('fetch', event => {
    let request = event.request;
    let url = new URL(request.url);

    // Only deal with requests to my own server
    if (url.origin !== location.origin) {
        return;
    }

    // For HTML requests, try the network first, fall back to the cache
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        request = new Request(request.url, {
            method: 'GET',
            headers: request.headers,
            mode: request.mode == 'navigate' ? 'cors' : request.mode,
            credentials: request.credentials,
            redirect: request.redirect
        });
        event.respondWith(
            fetch(request)
                .then(response => {
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => {
                            return response;
                        })
                })
        );
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
            .then(response => {
                return response || fetch(request)
            })
    );
});
