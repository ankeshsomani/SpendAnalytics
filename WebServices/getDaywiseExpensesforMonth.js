module.exports=function(app,client,url){
var common = require("./commonscripts.js");
var path=common.getDaywiseExpensesforMonth;
app.get(path, function (req, res) {
var cif=req.query['cif'];
var year=req.query['year'];
var month=req.query['month'];
	
	var query="";
	var validated=false;
	var mandatoryAttributeMessage="Please enter cif,year,month";
	 
	 if ((typeof cif !== "undefined") && (cif !== null)){
		if ((typeof year!== "undefined") && (year !== null)){
	       if ((typeof month!== "undefined") && (month !== null)){
			
			validated=true;
				 query="select substr(day1.DAY_KEY,7,2) AS DAY_NUMBER,sum(bct.PAID_OUT) as Expenses from hdfs.tmp.vw_mongo_transactions bct join hdfs.tmp.vw_mongo_days day1 on day1.bsns_date=bct.bsns_date where day1.BSNS_YEAR="+year+" and bct.CIF="+cif+" and day1.MONTH_NO="+month+" group by day1.DAY_KEY " ;
			}
			else{
				res.send(mandatoryAttributeMessage);
			}	 
		 }
		 else{
			res.send(mandatoryAttributeMessage);
		 }	  
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