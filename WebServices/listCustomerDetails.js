module.exports=function(app,client,url){
var common = require("./commonscripts.js");
var path=common.listCustomerDetails;
app.get(path, function (req, res) {
var cif=req.query['cif'];

res.setHeader('Access-Control-Allow-Origin', '*');
	var query="";
	var validated=false;
	var mandatoryAttributeMessage="Please enter cif ";
	 if ((typeof cif !== "undefined") && (cif !== null)){

			  		 validated=true;
					 query="select CUST.Cust_Name,CUST.Cust_Contact,CUST.Cust_Email from hdfs.tmp.vw_mongo_customers CUST where CUST.cif ="+cif+" ";

		 }
		 else{
			res.send(mandatoryAttributeMessage);
		 }	  
	   //console.log("query is "+query);
	 
	
	var args1_js = {
	data:{"queryType": "SQL",
	"query": query},
	headers: { "Content-Type": "application/json" }
};
if(validated){	
var req2=client.post(url, args1_js, function (data1, response) {
    // parsed response body as js object
	
   //console.log(data1);
   res.json(data1);
	
});
}

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