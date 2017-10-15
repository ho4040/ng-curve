const gulp = require('gulp');
const cssnano= require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const del = require('del');
const gls = require('gulp-live-server');
const ngAnnotate = require('gulp-ng-annotate')

gulp.task('default', ['build_css', 'build_js'], function() {
  
});

gulp.task('clean', function(){
	return del(['dist']);
});



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
	.pipe(ngAnnotate())
	.pipe(uglify())
	.on('error', function(err){
		gutil.log(gutil.colors.red('[Error]'), err.toString())
	})
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dist/'));
});


gulp.task('build', ['build_css', 'build_js']);

gulp.task('test', ['build'], function(){
	var server = gls.static('./', 8888);
	server.start();
	gulp.watch(['src/*.js', 'src/*.css', './*.html'], function (file) {
		gulp.run(['build']);
		server.notify.apply(server, [file]);
	});
});