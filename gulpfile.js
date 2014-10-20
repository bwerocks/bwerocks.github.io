var gulp = require('gulp'),
    sass = require('gulp-sass');

var paths = {
    scss: './scss',
    css: './css',
    js: './js'
};

var files = {
    scss: paths.scss + '/**/*.scss',
    css: paths.css + '/**/*.css',
    js: paths.js + '/**/*.js'
};

gulp.task('sass', function() {

    gulp.src(files.scss).
         pipe(sass({
            includePaths: [paths.scss],
            errLogToConsole: true
         })).
         pipe(gulp.dest(paths.css));

});

gulp.task('default', ['sass']);

gulp.watch(files.scss, ['sass']);
