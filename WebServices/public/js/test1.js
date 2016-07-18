$.getJSON('http://104.236.94.128:8081/listExpensesByCategoryYearly?cif=53001&year=2015', function(json1) {
	var categories=[];
		//we will push categories in this variable from received JSON
		
		var data1=[];
		var drilleddata=[];
		var data2=[];
		
	var length=json1.rows.length;
		//length=2;
		console.log('length is '+length);
		var sum=0;
			for(var z=0; z< length;z++){
							
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				
				var catname=json1.rows[z].CATG_NAME;
				var subcatname=json1.rows[z].SUB_CATG_NAME
				var prevcatname;
				//console.log(expenses);
				//console.log(catname);
				//console.log(subcatname);
				if(z>0){
					if(prevcatname!=catname){
					//	debugger;
						//console.log('Now i can push the data for catg'+prevcatname);
						//console.log('total expenses is '+sum);
						data1.push({"name" :catname,"y":sum});
						drilleddata.push({"categoryname":subcatname,"expense":expenses});
						data2.push({"name" :catname,"id":catname,"data":drilleddata});
						sum=expenses;
					}
					else{
						sum=sum+expenses;
					}
					
				}
				else{
					sum=sum+expenses;
				}
				prevcatname=catname;
				if(z==length-1){
					data1.push({"name" :catname,"y":sum});
					drilleddata.push({"categoryname":subcatname,"expense":expenses});
					data2.push({"name" :catname,"id":catname,"data":drilleddata});
					//data2.push({"name" :catname,"id":catname,"":sum});
					//console.log('Now i can push the data for catg'+catname);
					//	console.log('total expenses is '+sum);
				}
				
				//categories.push(year);
				//data1.push(income);
				//data2.push(expenses);
			}
	console.log(data1);
	console.log(data2);
	//console.log(drilleddata);
	
	
});