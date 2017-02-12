var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync')
    jshint      = require('gulp-jshint');

var paths = {
  assets: ['./src/assets/'],
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

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('js:lint', function(){
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'jshint done'}));
});

gulp.task('js:build', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({message: 'JS concated'}));
});

gulp.task('js:watch', ['js:build'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html:build', function(){
  return gulp.src(paths.html)
    .pipe(gulp.dest('./public/'))
    .pipe(notify({message: 'HTML pages built'}));
});

gulp.task('html:watch', ['html:build'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('css:build', function(){
  return gulp.src(paths.styles)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(notify({message: 'CSS done'}));
});

gulp.task('css:watch', ['css:build'], function (done) {
    console.log('twerk CSS')
    browserSync.reload();
    done();
});

gulp.task('build', ['html:build', 'js:build', 'css:build']);

gulp.task('watch', function(){
  gulp.watch(paths.html, ['html:build']);
  gulp.watch(paths.scripts, ['js:lint', 'js:watch']);
  gulp.watch(paths.styles, ['css:watch']);
});

gulp.task('default', ['build', 'serve', 'watch']);