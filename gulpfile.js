var gulp = require('gulp'),

	browserSync = require('browser-sync'),
	sass = require('gulp-ruby-sass'),
	autoprefix = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	imagemin = require('gulp-imagemin');

var paths = {
	scriptsBase: 'app/js/*.js',
	scripts: ['app/js/components/libs/*.js', 'app/js/components/*.js', 'app/js/*.js'],
	images: ['app/images/**/*.jpg', 'app/images/**/*.png'],
	scssBase: 'app/css/sass/frontend.scss',
	scss: 'app/css/sass/**/*.scss',
};

gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: './app'
		}
	});
});

gulp.task('css', function () {
	gulp.src(paths.scssBase)
		.pipe(sass({style: 'compact'}))
		.pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function () {
	browserSync.reload();
});

gulp.task('js', function () {
	gulp.src(paths.scriptsBase)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('minify', function () {
	gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(concat('frontend.min.js'))
		.pipe(gulp.dest('build/js'));
	gulp.src(paths.scssBase)
		.pipe(sass({style: 'compressed'}))
		.pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
		.pipe(gulp.dest('build/css'));
	gulp.src(paths.images)
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: false, removeUselessStrokeAndFill: false}]
		}))
		.pipe(gulp.dest("build/images"));
});

gulp.task('slice', ['browser-sync'], function() {
	gulp.watch(paths.scss, ['css']);
	gulp.watch(paths.scriptsBase, ['js']);
	gulp.watch("app/**/*.html", ['html']);
	gulp.watch(paths.images, ['html']);
});