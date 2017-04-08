'use strict';

//Require Packages
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';

//Directories
const sassInput = 'dev/sass/**/*.scss';
const jsInput = 'dev/scripts/**/*.js';
const dist = 'dist';

//BrowserSync server
gulp.task('browser-sync', ['sass','js'],  () => {
	browserSync({
    proxy: '127.0.0.1:6000',
    port: 6000,
    open: true,
    notify: false
	});
});

//Sass
gulp.task('sass', () => {
  	gulp.src( sassInput )
    	.pipe( sass().on('error', sass.logError) )
    	.pipe( autoprefixer( ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true} ) )
		  .pipe( concat('style.css') )
    	.pipe( gulp.dest( dist ) )
		  .pipe( browserSync.reload({ stream: true }) )
});
//CSS Minify
gulp.task('minify-css', () => {
	gulp.src( dist + '/style.css' )
		.pipe( cleanCSS({debug: true}, (details) => {console.log( details.name + ': ' + details.stats.originalSize +' > minified to > '+ details.stats.minifiedSize );}))
		.pipe( concat( 'style.min.css' ) )
		.pipe( gulp.dest( dist ) )
});
//JS
gulp.task('js', () => {
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
gulp.task('watch', () => {
	gulp.watch( 'views/*.hbs', browserSync.reload )
  gulp.watch( sassInput, ['sass','minify-css'] )
	gulp.watch( jsInput, ['js'] )
	gulp.on('change', ( event ) => {
  	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	})
})

gulp.task( 'default', ['browser-sync','watch'] );
