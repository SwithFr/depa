var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    coffee      = require('gulp-coffee');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/sass/*.sass", ['sass']);
    gulp.watch("./src/js/*.coffee", ['coffee']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./src/sass/*")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("./dist/css/*.sass"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
  gulp.src('./src/js/*.coffee')
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/*.js'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);