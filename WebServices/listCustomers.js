
module.exports=function(app,client,url){
var common = require("./commonscripts.js");
var path=common.listCustomers;
app.get(path, function (req, res) {
var x=req.query['cif'];
	
	var query="select * from dfs.tmp.vw_dim_customer";
	 if ((typeof x !== "undefined") && (x !== null)){
	 console.log('here');
		query="select * from dfs.tmp.vw_mongo_customers where cif ="+x;
	 }
	var args1_js = {
	data:{"queryType": "SQL",
	"query": query},
	headers: { "Content-Type": "application/json" }
};
	
var req2=client.post(url, args1_js, function (data1, response) {
    // parsed response body as js object	
   console.log(data1);
   res.json(data1);
	
});
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

});

}