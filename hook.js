var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();

var util  = require('util'),
    spawn = require('child_process').spawn;
    exec = require('child_process').exec;

var token = '317a4480-af23-4db7-b16b-050c4a0768e2';

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.send("Letsgonesia git webhook");
});

var deploy = function(script) {
   
  var d  = spawn(script);
  d.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });
  d.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
  d.on('exit', function (code) {
    console.log('child process DEPLOY exited with code ' + code);
  });
}

app.post('/317a4480-af23-4db7-b16b-050c4a0768e2-frontend',function(req,res){
  console.log('----------------------------------------------------------------- new commit in Frontend');
  if (req.headers['x-gitlab-event'] == 'Push Hook') {
    console.log('Kill existing instance')
    var cmd = "pkill -9 -f '/bin/bash " + __dirname + "/deploy-frontend.sh'";
    exec(cmd, function (err, stdout, stderr) {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
      deploy(__dirname + '/deploy-frontend.sh');
    })
  }
});

app.post('/317a4480-af23-4db7-b16b-050c4a0768e2-backend',function(req,res){
  console.log('----------------------------------------------------------------- new commit in Backend');
  if (req.headers['x-gitlab-event'] == 'Push Hook') {
    console.log('Kill existing instance')
    var cmd = "pkill -9 -f '/bin/bash " + __dirname + "/deploy-backend.sh'";
    exec(cmd, function (err, stdout, stderr) {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
      deploy(__dirname + '/deploy-backend.sh');
    })
  }
});


app.listen(8002,function(){
  console.log("Started on PORT 8002");
})
