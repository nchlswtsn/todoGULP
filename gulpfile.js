var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var dir = {
  src: {
    images: 'src/images/*',
    templates: 'src/templates/**/*',
    js: 'src/js/**/*',
    scss: 'src/styles/**/*.scss',
    bower: 'src/bower_components/**/*'
  },
  dest: {
    images: 'public/images',
    html: 'public/html',
    js: 'public/js',
    css: 'public/style',
    bower: 'public/bower_components'
  }
}

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(dir.src.scss)
        .pipe(sass())
        .pipe(gulp.dest(dir.dest.css));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(dir.src.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dir.dest.js))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.dest.js));
});

gulp.task('html', function() {
  return gulp.src(dir.src.templates)
    .pipe(gulp.dest(dir.dest.html))
})

gulp.task('images', function() {
  return gulp.src(dir.src.images)
    .pipe(gulp.dest(dir.dest.images))
})

gulp.task('watch', function() {
  gulp.watch(dir.src.js, ['scripts']);
  gulp.watch(dir.src.scss, ['sass']);
  gulp.watch(dir.src.templates, ['html']);
  gulp.watch(dir.src.images, ['images']);
});

gulp.task('default', ['sass', 'scripts', 'images', 'html', 'watch']);

gulp.task('deploy', ['sass', 'scripts', 'html', 'images', 'bower']);
