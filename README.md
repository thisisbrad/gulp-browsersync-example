# Gulp with BrowserSync for LiveReload

Using Gulp to run simple dev tasks. Using BrowserSync to start local dev server and live reload.

- BrowserSync
- Sass
- Simple builds

### File Path Structure
This is used to refer to your folder structure through out the gulp file.
`const paths = {
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
};`

### Basic Tasks
- *gulp serve* - starts BrowserSync

- *gulp js:lint* - lints the JS code in paths
- *gulp js:build* - build JS code in paths
- *gulp js:watch* - watchs all JS

- *gulp css:build* - builds Sass into CSS code
- *gulp css:watch* - watchs all Sass

- *gulp build* - calls all build tasks
- *gulp watch* - watchs all files

- *gulp* - ['build', 'serve', 'watch']


