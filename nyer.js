(function () {
    'use strict';


    var button = document.querySelector('button');
    var audio = document.querySelector('audio');

    button.addEventListener('mousedown', function() {
      audio.currentTime = 0;
      audio.play();

      document.title = "N-N-N-N-N-NYERRRRR!";
      setTimeout( function() {
        document.title = "NYERRR"
      }, 600);

      if ("vibrate" in navigator) {
        navigator.vibrate(600);
      }
    });
    
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-10353655-2', 'auto');
    ga('send', 'pageview');

})();