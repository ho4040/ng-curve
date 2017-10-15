const gulp = require('gulp');
const gls = require('gulp-live-server');

gulp.task('test', function() {
  var server = gls.static('demo', 8888);
  server.start();

  gulp.watch(['**/*.html'], function(file){
  	server.notify.apply(server, [file]);
  })

});