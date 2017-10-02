var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var imagemin = require('gulp-imagemin'); // 压缩图片
var htmlmin = require('gulp-htmlmin'); // 压缩html
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify'); // 压缩js
var _if = require('gulp-if'); // 引用判断
var del = require('del'); // 清空文件和文件夹
var stripDebug = require('gulp-strip-debug'); // Strip console, alert, and debugger statements
var sh = require('shelljs');

var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var args = require('yargs').argv;
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');
var htmlreplace = require('gulp-html-replace');
// This is intended to be a temporary solution until the release of gulp 4.0 which has support
// for defining task dependencies in series or in parallel.
var runSequence = require('run-sequence');

// === PATHS ===
var paths = {
  html: ['./src/*.html'],
  css: ['./src/lib/ionic/css/ionic.css', './src/css/**/*'],
  sass: ['./src/css/scss/*.scss'],
  templates: ['./src/pages/**/*.html'],
  images: ['./src/images/**/*'],
  fonts: ['./src/fonts/**/*', './src/lib/ionic/fonts/**/*'],
  boot: ['./src/js/app/app.js'],
  js: ['./src/js/**/*.js', '!./src/js/app/app.js'],
  pages: ['./src/pages/**/*.js'],
  scripts: ['./src/js/**/*.js', './src/pages/**/*.js', '!./src/js/app/app.js', '!./src/js/app/app.templates.js'],
  dist: ['./www'],
  lib: [
    './src/lib/ionic/js/ionic.bundle.js',
    './src/lib/ngCordova/dist/ng-cordova.min.js',
    './src/lib/ionic-native-transitions/dist/ionic-native-transitions.min.js',
    './src/lib/angular-cookies/angular-cookies.js',
    './src/lib/ionic-image-lazy-load/ionic-image-lazy-load.js'
  ],
  inject: [
    './src/lib/ionic/css/ionic.css',
    './src/css/**/*',
    './src/js/**/*.js',
    './src/pages/**/*.js'
  ],
  watch: ['./src/**/*']
};

// ============ TOP LEVEL TASKS (invoke with "gulp <task-name>") ============

// production task
var productionTask = ['index', 'boot', 'scripts', 'minify-third-library-js', 'templates', 'copy-fonts', 'css', 'imagemin'];

// 开发模式
gulp.task('dev', ['clean', 'inject'], function () {
  runSequence(
    'copy',
    function () {
      gutil.log(gutil.colors.yellow('正在为您打开浏览器, 请稍后!'));
      sh.exec('ionic serve');
    });
});

// 生产模式
gulp.task('pro', ['clean'], function () {
  gutil.log(gutil.colors.yellow('构建开始!'));
  runSequence(productionTask, function () {
    gutil.log(gutil.colors.yellow('构建完成!'));
  });
});

// 或者使用一种方式开做开发模式和生产模式
gulp.task('build', function () {
  if (!args.env || (args.env === "dev")) {
    runSequence('dev');
  } else if (args.env && args.env === "pro") {
    runSequence('pro');
  } else {
    gutil.log(gutil.colors.yellow('Wong arguments! Please check again!'));
  }
});

// ==================================== children TASKS ====================================

// clean task
gulp.task('clean', function () {
  return del([
    paths.dist + '/**/*'
  ]);
});

// copy src to www
gulp.task('copy', function () {
  return gulp.src(paths.watch)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist + '/'));
});

// 监视src文件中的变化
function handleWatchType(type) {
  if (!type) {
    return;
  }
  if (type === 'add' || type === 'unlink') {
    injectFunc(); // 添加新文件 或 删除文件
  }
  // 备注 change 不做处理
}

gulp.task('watch', function () {
  gulp.src(paths.watch)
    .pipe(plumber())
    .pipe(watch(paths.watch, function (vinyl) {
      handleWatchType(vinyl.event);
    }))
    .pipe(gulp.dest(paths.dist + '/'))
});

// automatic injection third library script in the index file
function injectFunc() {
  return gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(inject(gulp.src(paths.css, {read: false}), {starttag: '<!-- inject:css:{{ext}} -->', relative: true}))
    .pipe(inject(gulp.src(paths.lib, {read: false}), {starttag: '<!-- inject:lib:{{ext}} -->', relative: true}))
    .pipe(inject(gulp.src(paths.boot, {read: false}), {starttag: '<!-- inject:boot:{{ext}} -->', relative: true}))
    .pipe(inject(gulp.src(paths.js, {read: false}), {starttag: '<!-- inject:js:{{ext}} -->', relative: true}))
    .pipe(inject(gulp.src(paths.pages, {read: false}), {
      starttag: '<!-- inject:pages:{{ext}} -->',
      relative: true
    }))
    .pipe(gulp.dest('./src/'))
}
gulp.task('inject', injectFunc);

// prepare Index.html for dist - ie. using min files
gulp.task('index', function () {
  gulp.src(paths.html)
    .pipe(plumber())
    .pipe(htmlreplace({
      'css': 'css/app.min.css',
      'boot': 'js/app.boot.min.js',
      'js': 'js/app.bundle.min.js',
      'third-library-js': 'js/app.plugin.min.js',
      'templates': 'js/app.templates.min.js'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist + '/.'));
});

// css task including sass
gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(plumber())
    .pipe(_if('*.scss', sass.sync()))
    .pipe(cleanCSS({rebase: false}))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest(paths.dist + '/css'));
});

// imagemin images and output them in dist
gulp.task('imagemin', function () {
  gulp.src(paths.images)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + '/images'));
});

// copy fonts task
gulp.task('copy-fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist + '/fonts'));
});

// minify third library script 第三方不用去 stripDebug
gulp.task('minify-third-library-js', function () {
  gulp.src(paths.lib)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.plugin.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

// boot task
gulp.task('boot', function () {
  gulp.src(paths.boot)
    .pipe(plumber())
    .pipe(stripDebug())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.boot.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

// scripts task
gulp.task('scripts', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(stripDebug())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.bundle.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

// templatesCache task
gulp.task('templates', function () {
  gulp.src(paths.templates)
    .pipe(plumber())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({
      standalone: true,
      root: 'pages'
    }))
    .pipe(uglify())
    .pipe(concat('app.templates.min.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
});
