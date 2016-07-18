var chart1,chart2,chart3;

$(document).ready(function(){
	
	/* Pie Chart */
	


	$('select').change(function() {
		debugger;
		var month;
		var data1=$('#year_for_catwaise_expense').val();
		var data2=$('#month_for_catwaise_expense').val();
		switch (data2)
		{
			case 'Jan':month=1;
			break;
			case 'Feb':month=2;
			break;
			case 'Mar':month=3;
			break;
			case 'Apr':month=4;
			break;
			case 'May':month=5;
			break;
			case 'Jun':month=6;
			break;
			case 'Jul':month=7;
			break;
			case 'Aug':month=8;
			break;
			case 'Sep':month=9;
			break;
			case 'Oct':month=10;
			break;
			case 'Nov':month=11;
			break;
			case 'Dec':month=12;
			break;
		}
		//console.log(data1);
		//console.log(month);
		DrawPieChart(data1,month);
	});
	DrawPieChart('2016','06');
	
	
function DrawPieChart(year,month)
{
		$.getJSON('http://104.236.94.128:8081/listExpensesByCategoryMonthly?cif=53001&year='+year+'&month='+month, function(json1) {
		var categories=[];
		//we will push categories in this variable from received JSON
		
		var seriesdata=[];
		var drilleddata=[];
		var drilleddowndata=[];
	var array=[];
	   // var getColor = ['#FF0000','#0000FF','#FFFF00','#00FFFF','#FF00FF','#800000','#808080','#008000','#800080','#008080','#000080'];
	
	 var getColor = [
        '#FF0000',//'Red': website: rapid tables
        '#0000FF',//'Blue':website: rapid tables
        '#FFFF00', //'Yellow':website: rapid tables
        '#00FFFF', //'Aqua':website: rapid tables
        '#FF00FF', //'Magenta':website: rapid tables
        '#800000', //'Maroon':website: rapid tables
        '#808080', //'Gray':website: rapid tables
        '#008000', //'Green':website: rapid tables
        '#800080', //'Purple':website: rapid tables
        '#008080', //'Teal':website: rapid tables
        '#000080',//'Navy':website: rapid tables
		'#00868B',//turquoise 4 website:cloford
		'#FFA500',//orange 1 (orange)
		'#8B7500',//gold 4
		'#8B4500',//darkorange 4
		'#EE4000'//orangered 2
    ];
	
		var getColorShed = [['#800000','#8B0000','#A52A2A','#B22222','#DC143C','#FF0000','#FF6347','#FF7F50','#CD5C5C','#F08080'],
						['#191970','#4169E1','#00008B','#0000CD','#0000FF','#4169E1','#483D8B','#6A5ACD','#7B68EE','#87CEFA'],
						['#FFFF00','#F0E68C','#B8860B','#DAA520','#EEE8AA','#BDB76B','#ADFF2F','#FFD700','#7FFF00','#FFA500'],
						['#00FFFF','#00CED1','#40E0D0','#40E0D0','#AFEEEE','#7FFFD4','#B0E0E6','#00BFFF','#ADD8E6','#87CEEB'],
						['#FF00FF','#8B008B','#9400D3','#BA55D3','#800080','#DA70D6','#C71585','#DB7093','#FF1493','#FF69B4'],
						['#800000','#B22222','#DC143C','#FF6347','#CD5C5C','#FA8072','','','',''],
						['#708090','#778899','#B0C4DE','#E6E6FA','#696969','#A9A9A9','#C0C0C0','#D3D3D3','#F0F8FF','#DCDCDC'],
						['#008000','#006400','#228B22','#00FF00','#32CD32','#90EE90','#8FBC8F','#00FA9A','#00FF7F','#2E8B57'],
						['#800080','#DDA0DD','#D8BFD8','#EE82EE','#DA70D6','#C71585','#DB7093','#FF1493','#FF69B4','#FFB6C1'],
						['#008080','#008B8B','#00FFFF','#00FFFF','#E0FFFF','#00CED1','#40E0D0','#48D1CC','#AFEEEE','#7FFFD4'],
						['#000080','#0000CD','#191970','#4169E1','#00008B','#483D8B','#6A5ACD','#7B68EE','#87CEEB','#87CEFA'],
						['#00868B','#00C5CD','#00E5EE','#00CED1','','','','','',''],
						['#FFA500','','','','','','','','',''],
						['#8B7500','','','','','','','','',''],
						['#8B4500','#ED9121','#FF7F00','#CD6600','#FFA54F','','','','',''],
						['#EE4000','#C76114','#D2691E','#F4A460','','','','','','']];

	
	var options = {
		chart: {
            type: 'pie',
			renderTo:'pie-chart'
        },
        title: {
            text: 'Expenses'
        },
		legend: {
		            align: 'right',
    layout: 'vertical',
    verticalAlign: 'middle',
    x: 1,
    y: 0,
		        labelFormatter: function() {
				var total = 0, percentage; 

                $.each(this.series.data, function() { 
						total+=this.y; 
					    }); 
				percentage=((this.y/total)*100).toFixed(2); 
				return '<span>'+ this.name + '</span><span> '+percentage+'%</span>'; 
				//return '<span style="color:#000000,font-size:12px !important;"><b>'+ this.name + '</b></span><br/><span style="color:#000000,font-size:12px !important;">'+this.y+'</span>'; 
										
					            },				   
          
					        },
												        tooltip: {
					            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
					        },
        plotOptions: {
                 pie: {
					 size:'110%',
                     allowPointSelect: true,
                     cursor: 'pointer',
                     dataLabels: {
                        enabled: false,
                        color: '#000',
						fontSize:'8px',
                        connectorColor: '#000000',
                     },
					 showInLegend: true
                 }
            },
		series: [
			{
			//	type:'pie',
				data:seriesdata
			}
		],
		drilldown: {
			series:drilleddowndata
		}
	}
	
	var length=json1.rows.length;
		//length=2;
		console.log('length is '+length);
		var sum=0;
		var i=0,j=0;
			for(var z=0; z< length;z++){
						debugger;	
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var subcatname=json1.rows[z].SUB_CATG_NAME;

				// array.push(subcatname);
				// array.push(expenses);
				// drilleddata.push(array);
				// array=[];
				var catname=json1.rows[z].CATG_NAME;
				
				var prevcatname;
				//console.log(expenses);
				//console.log(catname);
				//console.log(subcatname);
				if(z>0){
					if(prevcatname!=catname){
						debugger;
						
						//console.log('Now i can push the data for catg'+prevcatname);
						//console.log('total expenses is '+sum);
						seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname,'color':getColor[i]});
						i++;
						console.log(i);
						//drilleddata.push({"categoryname":subcatname,"expense":expenses});
						drilleddowndata.push({"name" :prevcatname,"id":prevcatname,"data":drilleddata});
						j=0;
						drilleddata=[];
						//array.push(subcatname);
						//array.push(expenses);
						//drilleddata.push(array);getColorShed
						drilleddata.push({'name':subcatname,'y':expenses,'color':getColorShed[i][j]});
						j++;
						//array=[];
						sum=expenses;
					}
					else{
						sum=sum+expenses;
						// array.push(subcatname);
						// array.push(expenses);
						// drilleddata.push(array);
						// array=[];
						drilleddata.push({'name':subcatname,'y':expenses,'color':getColorShed[i][j]});
						j++;
					}
					
				}
				else{
					sum=sum+expenses;
					// array.push(subcatname);
					// array.push(expenses);
					// drilleddata.push(array);
					// array=[];
						drilleddata.push({'name':subcatname,'y':expenses,'color':getColorShed[i][j]});
						j++;
					
				}
				prevcatname=catname;
				if(z==length-1){
					seriesdata.push({"name" :catname,"y":sum,"drilldown":catname,'color':getColor[i]});
					//drilleddata.push({"categoryname":subcatname,"expense":expenses});
					drilleddowndata.push({"name" :catname,"id":catname,"data":drilleddata});
				}
			}
			
	
	console.log(drilleddowndata);	
	console.log(options);	
	chart1=new Highcharts.Chart(options);
	//});
});
}

	
/** Default Landing Page - Default Column Chart (Yearly) **/
	
	
	//function()
	$.getJSON('http://104.236.94.128:8081/getAllYearIncomeExpenses?cif=53001', function(json1) {        
		var categories=[];
		//we will push categories in this variable from received JSON
		
		var data1=[];
		var data2=[];
		
			var length=json1.rows.length;
		
			for(var z=0; z< length;z++){
							
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var income=parseFloat(json1.rows[z].INCOME);
				var year=parseFloat(json1.rows[z].YEAR_NO);
				categories.push(year);
				data1.push(income);
				data2.push(expenses);
			}
		//console.log(temp2);
		var options1 = {
			chart: {
				type: 'column',
				renderTo:'column-chart'
			},
			title: {
				text: ''
			},
			
			xAxis: {
				categories:categories,
				lineColor: '#000',
				tickColor: '#000',
			  //type:'category',
				labels: {
					style: {
					  color: '#000'
					}
				},
				title: {
					text:'Year',
					style: {
					  color: '#333',
					  fontWeight: 'bold',
					  fontSize: '12px',
					  fontFamily: 'Trebuchet MS, Verdana, sans-serif'

					}
				}
			},
			yAxis:{
				labels: {
					style: {
						color: '#000',
						font: '11px Trebuchet MS, Verdana, sans-serif'
					}
				},
			  title: {
				text:'Expenses',
				style: {
						color: '#333',
						fontWeight: 'bold',
						fontSize: '12px',
						fontFamily: 'Trebuchet MS, Verdana, sans-serif'

					}
				}
			},
			plotOptions:{
				series:{
						borderWidth:0,
						dataLabels:{
							enabled:true,
							format:'{point.y:.1f}',
							color:'#000'
						}
					}
			},
			series: [
				{
					name:'Income',
					data:data1
				},
				{
					name:'Expenses',
					data:data2
				}
			]
		}
	
		chart2=new Highcharts.Chart(options1);
	});

/****/	

/**Function to get JSON from API for pie chart**/	
	function extractJson(json){
		var data=[];
		var rows=[];
		rows=json.rows;
		var length=rows.length;
	//LOOP will run for every subcatg
	//BILLS SUBCAT1  100
	//BILLS SUBCAT2  200
	//BILLS SUBCAT2  300
	
	
		for(var z=0; z< length;z++){
						
			var expenses=parseFloat(json.rows[z].EXPENSES);
			var catname=json.rows[z].CATG_NAME.toString();
			do{
				
			}
			while(catname);
			data.push({"name" :catname,"y":expenses});

		}
		return data;
	}

	/** Line Chart**/
// var options2 ={
		// chart: {
				// renderTo:'line-chart'
			// },
		// title: {
            // text: 'Monthly Average Temperature',
            // x: -20 //center
        // },
        // subtitle: {
            // text: 'Source: WorldClimate.com',
            // x: -20
        // },
        // xAxis: {
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                // 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        // },
        // yAxis: {
            // title: {
                // text: 'Temperature (°C)'
            // },
            // plotLines: [{
                // value: 0,
                // width: 1,
                // color: '#808080'
            // }]
        // },
        // tooltip: {
            // valueSuffix: '°C'
        // },
        // legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'middle',
            // borderWidth: 0
        // },
        // series: [{
            // name: 'Tokyo',
            // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        // }, {
            // name: 'New York',
            // data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        // }, {
            // name: 'Berlin',
            // data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        // }, {
            // name: 'London',
            // data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        // }]
	// }
	
	// chart2=new Highcharts.Chart(options2);
	
	/****/
	
	/**Get transaction data into Table**/
	
	$.getJSON("http://104.236.94.128:8081/listtransactiondata?cif=53001&year=2015&month=3",function(jsondata) {
		$.each(jsondata.rows, function(key, obj) {
			var tempTag;
			var checkboxbtn;
			
			checkboxbtn='<input type=checkbox />'
			
			if(obj.TAGS=="")
				tempTag='<a class="addtag">Add Tag</a>';		
			else
				tempTag='<span class="tagDetails"><a href="#" class="MR-10 hide"><i class="fa fa-pencil"></i></a>'+obj.TAGS+'<a href="" class="ML-10 deletetag hide"><i class="fa fa-times"></i></a></span>';

				/*Display service data into table*/
				
			$('<tr><td>'+checkboxbtn+'</td><td>'+obj.BSNS_DATE+'</td><td>'+obj.DESCRIPTION+'</td><td>'+obj.EXPENSES+'</td><td>'+tempTag+'</td><tr>').appendTo('#transactions_table_data');
			
				/*Show Edit and Delete button on click of checkbox*/
			
			$('#transactions_table_data :checkbox').click(function() {
				
				var $this = $(this);
				if ($this.is(':checked')) {
					$('.actionBtn').removeClass('hide')
					
				} else {
					$('.actionBtn').removeClass('hide')
				}
			});
				
				
				
			/**/
				
			/*Add tag functionality*/
				
			$('.addtag').click(function(){
				debugger;
				var $this=$(this);
				var inputbox='<input type="text" class="addTagTextBox"><a class="saveTag ML-10"><i class="fa fa-check"></i></a><a class="cancelTag ML-10"><i class="fa fa-times"></i></a>'
				$(this).html(inputbox).find('.addTagTextBox').focus();
				
				/*Save new added tag*/
				
				$('.saveTag').click(function(){
				var tagData=$('.addTagTextBox').val();
				this.parentElement.parentElement.innerHTML=tagData;
				});
			
				$('.cancelTag').click(function(){
					var temp='<a class="addtag">Add Tag</a>';
					this.parentElement.parentElement.innerHTML=temp;
				});
				
			});
			
			//Delete transaction functionality
	
			$('.deleteTransaction').click(function(){
				$('#transactions_table_data input[type=checkbox]:checked').parent().parent().remove();
			});
					
			//Edit Transaction functionality
			
			$('.editTransaction').click(function(){
						
				// Get all values from selected row
				var getCheckedCheckbox=$('#transactions_table_data input[type=checkbox]:checked');
				var getTransDate=getCheckedCheckbox.closest("tr").find('td:eq(1)').text();
				var getTransDecription=getCheckedCheckbox.closest("tr").find('td:eq(2)').text();
				var getTransAmt=getCheckedCheckbox.closest("tr").find('td:eq(3)').text();
				var getTransTag=getCheckedCheckbox.closest("tr").find('td:eq(4)').text();
				
				// Open edit transaction modal with values
					$('#editTransactionModal').modal('show');
				debugger;
				
				// Populate selected table row values into respective textboxes
					$('#editTransDescription').val(getTransDecription);
					$('#editTransAmount').val(getTransAmt);
					$('#editTransTags').val(getTransTag);
					$('#editTransDate').val(getTransDate);
				
			});
			
		});	
	
	});
	
	/****/	
	
	
	//////////////Line chart
	var chartData = [];
	var chartCategories=[];
	var expData = [];
	//var flag=0;
	/*var array1=["BILLS", "CASH", "EDUC", "ENTER", "FOOD", "FUEL", "HOUSE", "LOAN", "PERS", "SUPERT"];
 	var array = [{name: 'Year 1800', 
				data: [107, 31, 635, 203, 2,50,60,70,80,90]
				}/*, { 
				name: 'Year 1900', 
				data: [133, 156, 947, 408, 6]
				}, {
				name: 'Year 2012',
				data: [1052, 954, 4250, 740, 38]
			}];*/
			GetMonthlyData("2014","10","2015","10");

			function GetMonthlyData(year1,month1,year2,month2){
			
			$.getJSON('http://104.236.94.128:8081/listExpensesByWeek?cif=53001&year='+year1+'&month='+month1, function(json1) {
			var monthName,weekName;
			switch(month1){
				case "1":
					monthName="January";
					break;
				case "2":
					monthName="February";
					break;
				case "3":
					monthName="March";
					break;
				case "4":
					monthName="April";
					break;
				case "5":
					monthName="May";
					break;
				case "6":
					monthName="June";
					break;
				case "7":
					monthName="July";
					break;
				case "8":
					monthName="August";
					break;
				case "9":
					monthName="September";
					break;
				case "10":
					monthName="October";
					break;
				case "11":
					monthName="November";
					break;
				case "12":
					monthName="December";
					break;
			};
		var length=json1.rows.length;
		//length=2;
						expData=[];
		var sum=0;
			for(var z=0; z< length;z++){
						//debugger;	
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var Weekname=json1.rows[z].WEEk_NUMBER;
				
				switch(Weekname){
				case "1":
					weekName="Week 1";
					break;
				case "2":
					weekName="Week 2";
					break;
				case "3":
					weekName="Week 3";
					break;
				case "4":
					weekName="Week 4";
					break;
				case "5":
					weekName="Week 5";
					break;
				case "6":
					weekName="Week 6";
					break;
			};
				
				if(chartCategories.length<length)
					chartCategories.push(weekName);
					
				expData.push(expenses);
				if(z==length-1){
					chartData.push({"name" : monthName+" "+year1, "data" : expData });
					//seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname});
				}
				
				//console.log("Category Name: " + catname + "Expense: " +expenses);
				}

				///////////////Second year data get
				$.getJSON('http://104.236.94.128:8081/listExpensesByWeek?cif=53001&year='+year2+'&month='+month2, function(json1) {
			var monthName,weekName;
			switch(month2){
				case "1":
					monthName="January";
					break;
				case "2":
					monthName="February";
					break;
				case "3":
					monthName="March";
					break;
				case "4":
					monthName="April";
					break;
				case "5":
					monthName="May";
					break;
				case "6":
					monthName="June";
					break;
				case "7":
					monthName="July";
					break;
				case "8":
					monthName="August";
					break;
				case "9":
					monthName="September";
					break;
				case "10":
					monthName="October";
					break;
				case "11":
					monthName="November";
					break;
				case "12":
					monthName="December";
					break;
			};
		var length=json1.rows.length;
		//length=2;
						expData=[];
		var sum=0;
			for(var z=0; z< length;z++){
						//debugger;	
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var Weekname=json1.rows[z].WEEk_NUMBER;
				
				switch(Weekname){
				case "1":
					weekName="Week 1";
					break;
				case "2":
					weekName="Week 2";
					break;
				case "3":
					weekName="Week 3";
					break;
				case "4":
					weekName="Week 4";
					break;
				case "5":
					weekName="Week 5";
					break;
				case "6":
					weekName="Week 6";
					break;
			};
				
				if(chartCategories.length<length)
					chartCategories.push(weekName);
					
				expData.push(expenses);
				if(z==length-1){
					chartData.push({"name" : monthName+" "+year2, "data" : expData });
					//seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname});
				}
				
				//console.log("Category Name: " + catname + "Expense: " +expenses);
				}
				DrawLineChart();
				});
				
				
				/////////////////////////////////////////////////////
			
			}
			
			
			);

			}
			
			function DrawLineChart()
			{
				var options = {
				chart: {
					type: 'spline',
					renderTo:'line-chart2'
				},
				title: {
					text: ''
				},
				subtitle: {
					text: ''
				},
				xAxis: {
					categories: chartCategories,
					title: {
						text: null
					}
				},
				yAxis: {
					title: {
						text: 'Expense (GBP)'
					},
					min: 0
				},
				tooltip: {
					headerFormat: '<b>{series.name}</b><br>',
					pointFormat: '{point.y:.2f} GBP'
				},

				plotOptions: {
					spline: {
						marker: {
							enabled: true
						}
					}
				},

				series: chartData
				}
		
			chart1=new Highcharts.Chart(options);
			
	}
	
	//////////////////////////////////////////////////
	
	////////////Combination Chart//////////////////////////////
	var chartData1 = [];
	var chartCategories1=[];
	var expData1 = [];
	GetCategoryWiseExpense("2014","06","2015","06");
	function GetCategoryWiseExpense(year1,month1,year2,month2)
	{
	$.getJSON('http://104.236.94.128:8081/listExpensesByCategoryMonthly?cif=53001&year='+year1+'&month='+month1, function(json1) {

					var length=json1.rows.length;
		//length=2;
						expData1=[];
		var sum=0;
			for(var z=0; z< length;z++){
						//debugger;	
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var catname=json1.rows[z].CATG_NAME;

				//chartCategories.push(catname);
				expData1.push(expenses);
				if(z==length-1){
					chartData1.push({"name" : "June 2014", "data" : expData1 });
					//seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname});
				}
				}
				
					$.getJSON('http://104.236.94.128:8081/listExpensesByCategoryMonthly?cif=53001&year='+year2+'&month='+month2, function(json1) {
	
	
		var length=json1.rows.length;

		var sum=0;
						expData1=[];
			for(var z=0; z< length;z++){
						//debugger;	
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var catname=json1.rows[z].CATG_NAME;

				chartCategories1.push(catname);
				expData1.push(expenses);
				if(z==length-1){
					chartData1.push({"name" : "June 2015", "data" : expData1 });
					//seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname});
				}
				}

		var options = {
		        chart: {
            type: 'bar',
			renderTo:'combination-chart'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartCategories1,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Expense (GBP)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' GBP'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
					allowOverlap: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 10,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: chartData1
		
		
		}
		
			chart3=new Highcharts.Chart(options);
		
	});
				
			
			});
	
	}

	$('.toggle-menu').on('click',function(){
		if($('.topnav').hasClass('responsive'))
		{
			$('.topnav').removeClass("responsive");
		}
		else
		{
			$('.topnav').addClass("responsive");
		}
	});
	
});


