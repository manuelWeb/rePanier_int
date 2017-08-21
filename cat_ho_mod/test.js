const exec = require('child_process').exec
console.log('hello?')
exec('ruby rubyLib.rb', function (error, stdout, stderr) {
  if (stdout) {
    console.log('RUBY: ' + stdout);
    // une fois les Lib + price recup on lance le CB
    cb();
  }else if (stderr) {
    console.log('stderr: ' + stderr);
  }else if (error) {
    console.log('error: ' + error);
  }
});