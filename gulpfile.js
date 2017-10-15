const gulp = require('gulp');
const cssnano= require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const del = require('del');


gulp.task('clean', function(){
	return del(['dist']);
})

gulp.task('default', ['build_css', 'build_js'], function() {
  
})

gulp.task('build_css', function(){
	gulp.src('./src/*.css')
	.pipe(cssnano())
	.pipe(gulp.dest('./dist/'))
});

gulp.task('build_js', function(){
	gulp.src('./src/*.js')
	.pipe(babel({
            presets: ['env']
        }))
	.pipe(gulp.dest('./dist/'))
	.pipe(uglify())
	.on('error', function(err){
		gutil.log(gutil.colors.red('[Error]'), err.toString())
	})
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dist/'));
});
