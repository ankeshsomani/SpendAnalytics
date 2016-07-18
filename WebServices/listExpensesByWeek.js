module.exports=function(app,client,url){
var common = require("./commonscripts.js");
var path=common.listExpensesByWeek;
app.get(path, function (req, res) {
var cif=req.query['cif'];
var year=req.query['year'];
var month=req.query['month'];
	res.setHeader('Access-Control-Allow-Origin', '*');
	var query="";
	var validated=false;
	var mandatoryAttributeMessage="Please enter cif,year & month";
	 if ((typeof cif !== "undefined") && (cif !== null)){
		if ((typeof year!== "undefined") && (year !== null)){
			 if ((typeof month!== "undefined") && (month !== null)){
			 var tempMonth=parseInt(month);
			 if(tempMonth>0 && tempMonth <10){
				month="0"+month;
			 }
			 var keyformed=year+month;
			 var a =  parseInt(keyformed+"01");var b =  parseInt(keyformed+"07");
			 var c =  parseInt(keyformed+"08");var d =  parseInt(keyformed+"14");
			 var e =  parseInt(keyformed+"15");var f =  parseInt(keyformed+"21");
			 var g =  parseInt(keyformed+"22");var h =  parseInt(keyformed+"29");
			 var i =  parseInt(keyformed+"30");var j =  parseInt(keyformed+"31");
				 validated=true;
				 query="select 1 AS WEEk_NUMBER,sum(BCT.PAID_OUT) AS EXPENSES from hdfs.tmp.vw_mongo_transactions BCT JOIN hdfs.tmp.vw_mongo_days DAY1 on BCT.BSNS_DATE=DAY1.BSNS_DATE where BCT.cif ="+cif+" and DAY_KEY between "+a +"and "+b +" group by BSNS_YEAR UNION select 2 AS WEEk_NUMBER,sum(BCT.PAID_OUT) AS EXPENSES from hdfs.tmp.vw_mongo_transactions BCT JOIN hdfs.tmp.vw_mongo_days DAY1 on BCT.BSNS_DATE=DAY1.BSNS_DATE where BCT.cif ="+cif+" and DAY_KEY between "+c +"and "+d +" group by BSNS_YEAR UNION select 3 AS WEEk_NUMBER,sum(BCT.PAID_OUT) AS EXPENSES from hdfs.tmp.vw_mongo_transactions BCT JOIN hdfs.tmp.vw_mongo_days DAY1 on BCT.BSNS_DATE=DAY1.BSNS_DATE where BCT.cif ="+cif+" and DAY_KEY between "+e +"and "+f +" group by BSNS_YEAR UNION select 4 AS WEEk_NUMBER,sum(BCT.PAID_OUT) AS EXPENSES from hdfs.tmp.vw_mongo_transactions BCT JOIN hdfs.tmp.vw_mongo_days DAY1 on BCT.BSNS_DATE=DAY1.BSNS_DATE where BCT.cif ="+cif+" and DAY_KEY between "+g +"and "+h +" group by BSNS_YEAR UNION select 5 AS WEEk_NUMBER,sum(BCT.PAID_OUT) AS EXPENSES from hdfs.tmp.vw_mongo_transactions BCT JOIN hdfs.tmp.vw_mongo_days DAY1 on BCT.BSNS_DATE=DAY1.BSNS_DATE where BCT.cif ="+cif+" and DAY_KEY between "+i +"and "+j +" group by BSNS_YEAR";
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