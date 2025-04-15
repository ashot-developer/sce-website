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
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  }
};

// HTML
function html() {
  return gulp.src(['src/html/**/*.html', '!src/html/parts/**']) // exclude partials
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
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ basename: 'style', suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}


// Scripts
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Serve
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(gulp.parallel(html, styles, scripts), serve);

exports.default = build;