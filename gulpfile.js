var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    notify      = require('gulp-notify'),
    nodemon     = require('gulp-nodemon'),
    jshint      = require('gulp-jshint'),
    lrPort      = 35729;

var paths = {
  assets: ['./client/assets/'],
  scripts: [
    '.src/js/main.js',
    './src/**/*.js'
  ],
  html: [
  	'./src/html/*.html',
  	'./src/html/index.html'
  ],
  styles: [
  	'./src/css/styles.css',
  	'./src/css/*.css'
  ],
  server: {
    js: ['./server/**/*.js'],
    specs: ['./server/cards/specs/*.js']
  }
};

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
    .pipe(refresh(server));
});

gulp.task('css:build', function(){
  return gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(gulp.dest('./src/css'))
    .pipe(refresh(server))
    .pipe(notify({message: 'CSS done'}));
});

gulp.task('build', ['html:build', 'js:build', 'css:build']);

gulp.task('lr', function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error(err);}
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.html, ['html:build']);
  gulp.watch(paths.scripts, ['js:lint', 'js:build']);
  gulp.watch(paths.styles, ['css:build']);
});

gulp.task('default', ['build', 'lr', 'serve', 'watch']);

// var gulp = require('gulp')
// var nodemon = require('gulp-nodemon')

// gulp.task('server', function () {
// 	nodemon({
// 		script: 'server.js',
// 		ext: 'js',
// 		ignore: ['ng*', 'gulp*', 'public']
// 	})
// })

// gulp.task('html:build', function () {
// 	return gulp.src('./public/**/*.html')
// 	.pipe(gulp.dest('./public/views/'))
// })

// gulp.task('html:watch', ['html:build'], function () {
// 	gulp.watch('./**/*.html', ['html:build'])
// })

// gulp.task('js:build', function () {
// 	gulp.src('./js/*.js')
// 	.pipe(gulp.dest('./js'))
// })

// gulp.task('js:watch', ['js:build'], function () {
// 	gulp.watch('./ng/**/*.js', ['js:build'])
// })

// gulp.task('build', ['html:build', 'js:build'])
// gulp.task('watch', ['html:watch', 'js:watch'])
// gulp.task('default', ['server', 'watch'], function () {
// 	console.log('Gulp starting')
// })

// var http = require('http')
// , path = require('path')
// , Promise = Promise || require('es6-promise').Promise
// , express = require('express')
// , gulp = require('gulp')
// , log = require('gulp-util').log
// , tinylr = require('tiny-lr')
// , livereload = require('gulp-livereload')

// , ROOT = 'dist'
// , GLOBS = [path.join(ROOT, "/**/*")]
// , PORT = 8000
// , PORT_LR = PORT + 1

// , app = express()
// ;

// app.use(require('connect-livereload')({port: PORT_LR}))
// app.use('/', express.static("./dist"))

// http.createServer(app).listen(PORT, function() {
//   log("Started express server on http://localhost:" + PORT);
// });

// lrUp = new Promise(function(resolve, reject) {
//   lrServer = tinylr()
//   lrServer.listen(PORT_LR, function(err) {
//     if (err) return reject(err)
//     resolve(lrServer)
//   })
// })

// gulp.watch(GLOBS, function(evt) {
//   if (evt.type === 'deleted') return

//   lrUp.then(function(lrServer) {
//     log("LR: reloading", path.relative(ROOT, evt.path));
//     gulp.src(evt.path).pipe(livereload(lrServer))
//   })
//   .catch(console.log)
// });