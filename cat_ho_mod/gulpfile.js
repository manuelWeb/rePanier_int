/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/
// to disable>dest path replace fs
/*----------  dependance  > package.json > node_modules  ----------*/
var gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    slim           = require("gulp-slim"),
    sass           = require('gulp-sass'),
    plumber        = require('gulp-plumber'),
    premailer      = require('gulp-premailer'),
    autoprefixer   = require('gulp-autoprefixer'),
    rename         = require('gulp-rename'),
    using          = require('gulp-using'),
    rm             = require('gulp-rimraf'),
    rimraf         = require('rimraf'),
    prettify       = require('gulp-html-prettify'),
    changed        = require('gulp-changed');
    const notifier = require('node-notifier');

// src & output
var  src = 'src/';
function errorLog(error) {
  // console.log(error.toString());
  notifier.notify({
    'title': 'Gulp Error !!!',
    'message': '1-Show Console Error to debug \n 2-Kill gulp process ctrl+c \n 3-debug error'
  });
  console.log(error.toString());
  // this.emit('end');
}
/*=================================
=            task init            =
=================================*/
// browser-sync task !attention il faut un index.html obligatoire
gulp.task('browserSync',function () {
  browserSync({
    // browser: 'chrome',
    server: {
      baseDir: 'render/FR'
    }
  })
})

// cp img folder
gulp.task('img',['sass'], function() {
  return gulp.src([src+'**/images/*.{png,jpg,gif}'])
  // .pipe(npm()) // img optimize
  .pipe(changed('src/**/images/'))
  .pipe(gulp.dest('render'))
  .on('end',function () {
    // start slim to render
    gulp.start('slim');
  })
})

// sass task
gulp.task('sass', function() {
  return gulp.src(src+'**/scss/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sass({errLogToConsole: true}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(rename(function(path) {
    path.dirname += "/../css";
  }))
  .pipe(changed('render/**/css/'))
  .pipe(gulp.dest('render'))
  .pipe(using())
  .pipe(browserSync.reload({stream: true }));
})

// slim task
gulp.task('slim', function () {
  var slimEnd = false;
  return gulp.src([src+'**/slim/*.slim'])
  // .pipe(plumber())
  .pipe(slim({
    pretty: true,
    tabsize: 2
  })) 
  // .pipe(using())// cb // {read:false},
  .on('error', errorLog)
  .pipe(gulp.dest('render')) // slim folder
  .pipe(rename(function(path) {
    path.dirname += "/../";
  }))
  .pipe(gulp.dest('render')) // html folder
  // .on('end',function () {
  //   slimEnd = true;
  //   premailergo(slimEnd);
  // })
});
// premailer task // si erreur sass > rendu incomplet à gérer
gulp.task('premailer', function () {
  var premailEnd = false;
  gulp.src('render/**/*.html')
  .pipe(plumber())
  .pipe(premailer()) //,{read:false}
  // .pipe(prettify({indent_car:'', indent_size: 2}))
  .pipe(gulp.dest('render'))
  .on('end',function () {
    premailEnd = true;
    console.log('premailerOK: '+premailEnd+' rm render/slim folder ');
    gulp.start('rmRenderSlimFolder');
    gulp.start('rmRenderCssFolder');
  })
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('rmRenderSlimFolder', function (cb) {
  rimraf('./render/**/slim',function (err) {
    console.log("all done del slim");
    return cb(null);
  });
});
gulp.task('rmRenderCssFolder', function (cb) {
  rimraf('./render/**/css',function (err) {
    console.log("all done del css");
    return cb(null);
  });
});

//
function premailergo (slimEnd) {
  if(slimEnd=true){
    console.log('slim complete: '+slimEnd);
    gulp.start(['premailer']);
  }else{
    console.log('slim pas prêt.......')
  }
};

// lancement > fonction watch // ,'sass'
gulp.task('dev',['img','slim','browserSync'], function() {
  gulp.watch([src+'**/images/*.{png,jpg,gif}'],['img'])
  // gulp.watch([src+'**/slim/*.slim',src+'**/**/*.slim'],['browserSync','sass','slim','img']);
  gulp.watch([src+'**/slim/*.slim',src+'**/**/*.slim'],['sass','slim','img']);
  // gulp.watch(src+'**/scss/*.scss',['sass','slim']);
});