var token = '317a4480-af23-4db7-b16b-050c4a0768e2';
console.log('Token : ' + token);

var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();

var util  = require('util'),
    spawn = require('child_process').spawn;
    exec = require('child_process').exec;


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.send("Letsgonesia git webhook");
});

var deploy = function(script, isManual) {
  var d  = spawn(script, [isManual]);
  console.log('Calling script....');
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

// FRONTEND

app.post(`/${token}/frontend-staging`,function(req,res){
  console.log('----------------------------------------------------------------- New commit in Frontend Staging');
  if (req.headers['x-gitlab-event'] == 'Push Hook') {
    deploy(__dirname + '/deploy-frontend-staging.sh');
  }
  res.send('Please wait a bit. We are deploying the code just for you...');
});
app.get(`/${token}/frontend-staging`,function(req,res){
  console.log('----------------------------------------------------------------- Manual deploy in Frontend Staging');
  deploy(__dirname + '/deploy-frontend-staging.sh');
  res.send('Please wait a bit. We are deploying the code just for you...');
});

app.get(`/${token}/frontend-alpha`,function(req,res){
  console.log('----------------------------------------------------------------- Manual deploy in Frontend Beta');
  deploy(__dirname + '/deploy-frontend.sh', true);
  res.send('Please wait a bit. We are deploying the code just for you...');
});

app.get(`/${token}/frontend-beta`,function(req,res){
  console.log('----------------------------------------------------------------- Manual deploy in Frontend Alpha');
  deploy(__dirname + '/deploy-frontend.sh', true);
  res.send('Please wait a bit. We are deploying the code just for you...');
});

// BACKEND

app.post(`/${token}/backend-staging`,function(req,res){
  console.log('----------------------------------------------------------------- New commit in Backend Staging');
  if (req.headers['x-gitlab-event'] == 'Push Hook') {
    deploy(__dirname + '/deploy-backend-staging.sh');
  }
  res.send('Please wait a bit. We are deploying the code just for you...');
});
app.get(`/${token}/backend-staging`,function(req,res){
  console.log('----------------------------------------------------------------- Manual deploy in Backend Staging');
  deploy(__dirname + '/deploy-backend-staging.sh');
  res.send('Please wait a bit. We are deploying the code just for you...');
});

app.get(`/${token}/backend-alpha`,function(req,res){
  console.log('----------------------------------------------------------------- Manual deploy in Backend Alpha');
  deploy(__dirname + '/deploy-backend.sh', true);
  res.send('Please wait a bit. We are deploying the code just for you...');
});

/* app.get(`/${token}/backend-beta`,function(req,res){ */
/*   console.log('----------------------------------------------------------------- Manual deploy in Backend Beta'); */
/*   deploy(__dirname + '/deploy-backend.sh', true); */
/*   res.send('Please wait a bit. We are deploying the code just for you...'); */
/* }); */

app.listen(8000,function(){
  console.log("Started on PORT 8000");
})
