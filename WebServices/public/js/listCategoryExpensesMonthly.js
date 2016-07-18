var chart1,chart2,chart3;

$(document).ready(function(){
//	test();
	/* Pie Chart */
	$.getJSON('http://104.236.94.128:8081/listExpensesByCategoryMonthly?cif=53001&year=2015&month=1', function(json) {        
	var temp=extractJson(json);
	debugger;

	
var options = {
		chart: {
            type: 'pie',
			renderTo:'pie-chart'
        },
        title: {
            text: 'Expenses'
        },
        plotOptions: {
                 pie: {
                     allowPointSelect: true,
                     cursor: 'pointer',
                     dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',

                     }
                 }
            },
		legend: {
			layout: 'vertical',
			style: {
				left: 'auto',
				bottom: 'auto',
				right: '50px',
				top: '100px'
			}
		},
		series: [
			{
				type:'pie',
				data:temp
			}
		]
	}
	chart1=new Highcharts.Chart(options);
});

function extractJson(json){
		debugger;
		var data=[];
		var rows=[];
		rows=json.rows;
		var length=rows.length;
		//console.log(rows.length);
		//var length=Object.keys(json.rows[0]).length;
		for(var z=0; z< length;z++){
						
			var expenses=parseFloat(json.rows[z].EXPENSES);
			var catname=json.rows[z].CATG_NAME.toString();
			
			data.push({"name" :catname,"y":expenses});

		}
		return data;
	}
	
});