module.exports=function(app,client,url){
var common = require("./commonscripts.js");
//var bodyParser = require("body-parser");
var path=common.authenticateUser;
//app.use(bodyParser.json({extended : true}));
app.post(path, function (req, res) {

//var userName="";
//var password="";
var x;
//console.log(req.body.username);
var jsonString = '';
   req.on('data', function(data) {
   
      console.log("Received body data:");
	  //  console.log(req.body.username); 
		//console.log(req.body.password); 
     console.log(data[0].password);
var y=data;
//console.log(y);
 //console.log(y.username);
 jsonString=jsonString+"["+y+"]";
 //jsonString.push(y);
 console.log(jsonString);
// var s=[{"username":53001,"password":123}];
 //console.log(s[0].username);
//  '{"username":53001,"password":123}';

	//var t=JSON.stringify(data.toString());
	 // var y= '{"result":true,"count":1}';
//=jsonString;
	  obj = JSON.parse(jsonString);

console.log(obj.password);
//console.log(data);
	//  console.log(x);
	 // console.log(x.username);
	//   console.log(x.password);
    });
	
    
    req.on('end', function() {
      // empty 200 OK response for now
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.end();
    });
  //  data = req.data;
  //     console.log( data );
   req.on('requestTimeout', function (req) {
	console.log('request has expired');
	res.send('request has expired');
	req.abort();
});
 
req.on('responseTimeout', function (res) {
	console.log('response has expired');
 res.send('response has expired');
});
 
//it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts 
req.on('error', function (err) {
	console.log('request error', err);
res.send(err);
});
})
}