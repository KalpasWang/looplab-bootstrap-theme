const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function style() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
};

function watch() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], style);
  gulp.watch("src/*.html").on('change', browserSync.reload);
}

function fonts() {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest("src/fonts"));
}

function fa() {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css')
    .pipe(gulp.dest("src/css"));
}

// gulp.task('default', ['js', 'watch', 'fa', 'fonts']);
exports.default = gulp.series(js, style, fonts, fa, watch);