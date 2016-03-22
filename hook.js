var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();
var exec = require('child_process').exec;

var util  = require('util'),
    spawn = require('child_process').spawn;


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.send("Letsgonesia webhook");
});

app.post('/',function(req,res){
  console.log('pushed');
  console.log(process.argv[2]);
 
  var deploy  = spawn('git', ['clone', process.argv[2]]);
  
  deploy.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });
  
  deploy.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
  
  deploy.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });
});


app.listen(8002,function(){
  console.log("Started on PORT 8002");
})
