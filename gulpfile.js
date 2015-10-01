var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    coffee      = require('gulp-coffee');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("./sass/*.sass", ['sass']);
    gulp.watch("./js/*.js", ['js']);
    gulp.watch("./js/*.coffee", ['coffee']);
    gulp.watch("./*").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./sass/*")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
  gulp.src('./js/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./js/'))
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js/min'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);