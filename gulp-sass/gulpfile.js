const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('sass/**/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../src/files/css/'));
});

gulp.task('clean', () => {
    return del([
	'../src/files/css/**',
    ],{force: true});
});

gulp.task('default', gulp.series(['clean', 'styles']));
