var gulp     = require("gulp");
var prettify = require("gulp-prettify");
var rimraf   = require("rimraf");
var bs       = require("browser-sync");

module.exports = function () {
  // promise = THE END tu peux ré enregistrer un truc
  // prettify
  gulp.task('prettify', function (event) {
    return Promise.all([
      new Promise(function (resolve, reject) {
        gulp.src('render/**/*.html')
        .pipe(prettify({indent_car:'', indent_size: 2}))
        .pipe(gulp.dest('render'))
        .on('end', resolve)
        // .pipe(bs.reload(event.path))
        // .pipe(bs.reload({stream: true }))
        .pipe(bs.stream({ once: true }))
      })
    ]).then(function () {
      // bs.reload({stream: true })
      console.log('prettify terminé destroyed slim + css folder')
    }).then(function () {
      rimraf('./render/**/slim',function (err) {
        console.log("all done del slim");
      });
      rimraf('./render/**/css',function (err) {
        console.log("\x1b[30m\x1b[42m%s\x1b[0m", "all done del css");
      });
    }).then(function () {
      console.log(` THE END!!!!!!!!! ` );
    })
  });

}
