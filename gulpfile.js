const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');

// Paths
const paths = {
  html: {
    src: 'src/html/**/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/scss/style.scss',
    watch: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/assets/images/'
  },
  fonts: {
    src: 'src/assets/fonts/**/*',
    dest: 'dist/assets/fonts/'
  },
  videos: {
    src: 'src/assets/videos/**/*',
    dest: 'dist/assets/videos/'
  }
};

// HTML
function html() {
  console.log('Processing HTML...');
  return gulp.src(['src/html/**/*.html', '!src/html/parts/**'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Styles
function styles() {
  console.log('Compiling SCSS...');
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ basename: 'style', suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Scripts
function scripts() {
  console.log('Processing JS...');
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Images
function images() {
  console.log('Moving Images...');
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Fonts
function fonts() {
  console.log('Moving Fonts...');
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Videos
function videos() {
  console.log('Moving Videos...');
  return gulp.src(paths.videos.src)
    .pipe(gulp.dest(paths.videos.dest))
    .pipe(browserSync.stream());
}

// Serve
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  }, () => console.log('BrowserSync started at http://localhost:3000'));

  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
  gulp.watch(paths.videos.src, videos);
}

// Build task
const build = gulp.series(gulp.parallel(html, styles, scripts, images, fonts, videos), serve);

// Export
exports.default = build;