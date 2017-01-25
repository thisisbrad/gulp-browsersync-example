var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    connect 		= require('gulp-connect'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    nodemon     = require('gulp-nodemon'),
    jshint      = require('gulp-jshint'),
    lrPort      = 35729;

var paths = {
  assets: ['./client/assets/'],
  scripts: [
    './src/js/main.js',
    './src/**/*.js'
  ],
  html: [
  	'./src/html/*.html',
  	'./src/html/index.html'
  ],
  styles: [
  	'./src/css/styles.css',
  	'./src/css/*.css'
  ]
};



// var gulp = require('gulp'),
//   connect = require('gulp-connect');
 
gulp.task('fire:connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});
 
gulp.task('fire:html', function () {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});
 
gulp.task('fire:watch', function () {
  gulp.watch(['./src/html/*.html'], ['fire:html']);
});
 
gulp.task('fire', ['fire:connect', 'fire:watch']);











gulp.task('serve', function(){
  nodemon({'script': './server.js'});
});

gulp.task('js:lint', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({message: 'jshint done'}));
});

gulp.task('js:build', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(refresh(server))
    .pipe(notify({message: 'JS concated'}));
});

gulp.task('html:build', function(){
  return gulp.src(paths.html)
  	.pipe(plumber())
    .pipe(gulp.dest('./public/'))
    .pipe(notify({message: 'HTML pages built'}));
});

gulp.task('css:build', function(){
  return gulp.src(paths.styles)
    .pipe(gulp.dest('./public/css'))
    .pipe(refresh(server))
    .pipe(notify({message: 'CSS done'}));
});

gulp.task('build', ['html:build', 'js:build', 'css:build']);

gulp.task('lr', function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error('###BOOM###', err);}
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.html, ['html:build']);
  gulp.watch(paths.scripts, ['js:lint', 'js:build']);
  gulp.watch(paths.styles, ['css:build']);
});

gulp.task('default', ['build', 'lr', 'serve', 'watch']);