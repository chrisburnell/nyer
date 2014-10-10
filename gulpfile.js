/**
 * Nyer gulp Configuration
 */

// Define gulp objects
var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    watch           = require('gulp-watch');

// Define the locations of our assets
var cssPath = 'css/';

// -----------------------------------------------------------------------------

// Compile SASS, autoprefix properties and values, and minify
gulp.task('css', function() {
    return gulp.src(cssPath + 'nyer.scss')
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [cssPath],
            style: 'expanded'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest(cssPath))
        .pipe(rename('nyer.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssPath))
        .pipe(notify({ title: 'gulp', message: 'CSS compiled.', onLast: true }));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', function() {
    watch({glob: cssPath + '**/*.scss', emitOnGlob: false}, ['css']);
});
