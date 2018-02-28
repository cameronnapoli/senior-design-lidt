/// <binding AfterBuild='all' />
var gulp = require('gulp'),
    config = require('./lidt.config'),
    templateCache = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

/* template cache */
gulp.task('template', function () {
    return gulp.src(config.files.templates)
        .pipe(templateCache({
            standalone: true,
            module: 'lidt.templates'
        }))
        .pipe(gulp.dest(config.paths.templatesDist));
});
/* /template cache */

/* compile css */
gulp.task('css-assets', function () {
    return gulp.src(config.files.cssImport)
        .pipe(concat('assets.css'))
        .pipe(gulp.dest(config.paths.cssDist));
});
gulp.task('sass', function () {
    return gulp.src(config.files.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(concat('lidt.css'))
        .pipe(gulp.dest(config.paths.cssDist));
});
/* /compile css */

/* concat js */
gulp.task('js-assets', function () {
    return gulp.src(config.files.jsImport)
        .pipe(concat('assets.js'))
        .pipe(gulp.dest(config.paths.dist));
});
gulp.task('js', function () {
    return gulp.src([config.files.jsModules]
        .concat(config.files.js))
        .pipe(concat('lidt.js'))
        .pipe(gulp.dest(config.paths.dist));
});
/* /concat js */

/* compile assets */
gulp.task('assets', ['js-assets', 'css-assets'], function () {

});
/* /compile assets */

/* watch */
gulp.task('watch', function () {
    gulp.watch(config.files.js, ['js']);
    gulp.watch(config.files.templates, ['template']);
    gulp.watch(config.files.sass, ['sass']);
});
/* /watch */

/* all */
gulp.task('all', ['assets', 'js', 'template', 'sass']);
/* /all */