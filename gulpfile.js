var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("./sass/*.sass", ['sass']);
    gulp.watch("./js/*.js", ['js']);
    gulp.watch("./*").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./sass/*")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js/min'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);