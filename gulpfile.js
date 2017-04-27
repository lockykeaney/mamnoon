//Require Packages
var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var browserSync = require( 'browser-sync' );
var rename = require( 'gulp-rename' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var cleanCSS = require( 'gulp-clean-css' );
var babel = require( 'gulp-babel' );

//Directories
var sassInput = 'dev/sass/**/*.scss';
var jsInput = 'dev/scripts/**/*.js';
var dist = 'dist';

//BrowserSync server
gulp.task('browser-sync', ['sass','js'],  function() {
	browserSync({
    proxy: '127.0.0.1:6000',
    port: 6000,
    open: true,
    notify: false
	});
});

//Sass
gulp.task('sass', function() {
  	gulp.src( sassInput )
    	.pipe( sass().on('error', sass.logError) )
    	.pipe( autoprefixer( ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true} ) )
		  .pipe( concat('style.css') )
    	.pipe( gulp.dest( dist ) )
		  .pipe( browserSync.reload({ stream: true }) )
});
//CSS Minify
gulp.task('minify-css', function() {
	gulp.src( dist + '/style.css' )
		.pipe( cleanCSS({debug: true}, function(details) {console.log( details.name + ': ' + details.stats.originalSize +' > minified to > '+ details.stats.minifiedSize );}))
		.pipe( concat( 'style.min.css' ) )
		.pipe( gulp.dest( dist ) )
});
//JS
gulp.task('js', function() {
	gulp.src( jsInput )
		.pipe( babel() )
		.pipe( concat( 'scripts.js' ) )
		.pipe( gulp.dest( dist ) )
		.pipe( uglify() )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( dist ) )
		.pipe( browserSync.reload({ stream: true }) )
});
//Watch
gulp.task('watch', function() {
	gulp.watch( 'views/*.hbs', browserSync.reload )
  gulp.watch( sassInput, ['sass','minify-css'] )
	gulp.watch( jsInput, ['js'] )
	gulp.on('change', function( event ) {
  	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	})
})

gulp.task( 'default', ['browser-sync','watch'] );
