var chart1,chart2,chart3;

$(document).ready(function(){
	
	/* Pie Chart */
	

//var cif=window.getElementById('cif');
var temp = window.location.search.substr(1);
var prmarr = temp.split("=");
var total_expense_val=0;
var selectedMonth=6;
var cif=prmarr[1];
	$('.total_expense select').change(function() {
		var month;
		var expense_month;
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
		selectedMonth=parseInt(month);

		DrawPieChart(data1,month);
	});
	DrawPieChart('2016','06');
	
	
function DrawPieChart(year,month)
{			
	$.getJSON('http://162.243.171.209:8081/listCategorySubcategoryExpense?cif='+cif+'&year='+year+'&month='+month, function(json1) {
		var categories=[];
		//we will push categories in this variable from received JSON
		
		var seriesdata=[];
		var drilleddata=[];
		var drilleddowndata=[];
		var array=[];
	
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
		'#007898',//turquoise 4 website:cloford
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
						['#007898','#00C5CD','#00E5EE','#00CED1','','','','','',''],
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
            text: ''
        },
		legend: {
				title:{
					text:'Category Name   %',
					style: {
						fontStyle: 'italic',
						fontWeight:'bold',
						color:'#009990',
						fontSize:'14px'
					}
				},
				
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
				percentage=((this.y/total)*100).toFixed(0); 
				return '<span>'+ this.name + '</span><span> '+percentage+'%</span>'; 
					            },				   
          
					        },
												        tooltip: {
					            pointFormat: '<b>{point.percentage:.2f}%</b>'
					        },
        plotOptions: {
                 pie: {
					 size:'90%',
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
			credits: {
				enabled: false
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
		var sum=0;
		var i=0,j=0;
		//total_expense_val=0;
			for(var z=0; z< length;z++){
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var subcatname=json1.rows[z].SUBCATEGORY;
				var catname=json1.rows[z].CATEGORY;
				
				var prevcatname;
				if(z>0){
					if(prevcatname!=catname){
						seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname,'color':getColor[i]});
						i++;
						drilleddowndata.push({"name" :prevcatname,"id":prevcatname,"data":drilleddata});
						j=0;
						drilleddata=[];
						drilleddata.push({'name':subcatname,'y':expenses,'color':getColorShed[i][j]});
						j++;
						sum=expenses;
					}
					else{
						sum=sum+expenses;
						drilleddata.push({'name':subcatname,'y':expenses,'color':getColorShed[i][j]});
						j++;
					}
					
				}
				else{
					sum=sum+expenses;
						drilleddata.push({'name':subcatname,'y':expenses,'color':getColorShed[i][j]});
						j++;
					
				}
				prevcatname=catname;
				if(z==length-1){
					seriesdata.push({"name" :catname,"y":sum,"drilldown":catname,'color':getColor[i]});
					drilleddowndata.push({"name" :catname,"id":catname,"data":drilleddata});
				}
			}
			
	chart1=new Highcharts.Chart(options);
	//});
});

	
/** Default Landing Page - Default Column Chart (Yearly) **/
	
	
	//function()
	$.getJSON('http://162.243.171.209:8081/getAllMonthExpenses?cif='+cif+'&year='+year, function(json1) {   
		var categories=[];
		//we will push categories in this variable from received JSON
		
		var data1=[];
		var data2=[];
		
			var length=json1.rows.length;
		var monthlyExpenses=new Object();
		
			for(var z=0; z< length;z++){
							
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var month=parseFloat(json1.rows[z].MONTH_NO);	
				monthlyExpenses[month]=expenses;
				switch (month)
				{
					case 1:expense_month='Jan';
					break;
					case 2:expense_month='Feb';
					break;
					case 3:expense_month='Mar';
					break;
					case 4:expense_month='Apr';
					break;
					case 5:expense_month='May';
					break;
					case 6:expense_month='Jun';
					break;
					case 7:expense_month='Jul';
					break;
					case 8:expense_month='Aug';
					break;
					case 9:expense_month='Sep';
					break;
					case 10:expense_month='Oct';
					break;
					case 11:expense_month='Nov';
					break;
					case 12:expense_month='Dec';
					break;
				}
				categories.push(expense_month);
				//data1.push(income);
				data2.push(expenses);
			}
			total_expense_val=monthlyExpenses[selectedMonth];
			$('#total_expense_val').html(total_expense_val);
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
					text:'Month',
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
				text:'Expenses (£)',
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
							format:'{point.y}',
							color:'#000'
						}
					}
			},
			tooltip:
			{
			    pointFormat: '<b>{point.y:1f}</b>'
			},
			credits: {
				enabled: false
			},
			series: [
				{
					showInLegend: false,
					name:'',
					data:data2
				}
			]
		}
		chart2=new Highcharts.Chart(options1);
	});
LoadTransactionList();
	function LoadTransactionList()
	{
		$.getJSON('http://162.243.171.209:8081/listtransactiondata?cif='+cif+'&year='+year+'&month='+month,function(jsondata) {
		
		$('#transactions_table_data').empty();
		
		$.each(jsondata.rows, function(key, obj) {
			var tempTag;
			var checkboxbtn;
			
			checkboxbtn='<input type=checkbox />'
			
			
			if(obj.TAGS=="" || obj.TAGS==null)
				tempTag='<a class="addtag">Add Tag</a>';		
			else
				tempTag='<span class="tagDetails">'+obj.TAGS+'<a href="#" class="MR-10"><i class="addtag fa fa-pencil"></i></a><a href="" class="ML-10 deletetag hide"><i class="fa fa-times"></i></a>';
			
				

				/*Display service data into table*/
					
			$('<tr><td>'+checkboxbtn+'</td><td>'+obj.BSNS_DATE+'</td><td>'+obj.DESCRIPTION+'</td><td>'+obj.EXPENSES+'</td><td>'+tempTag+'</td><tr>').appendTo('#transactions_table_data');
			
				/*Show Edit and Delete button on click of checkbox*/
			/*As per new requirement dont show Add and hide button
			$('#transactions_table_data :checkbox').click(function() {
				
				var $this = $(this);
				if ($this.is(':checked')) {
					$('.actionBtn').removeClass('hide')
					
				} else {
					$('.actionBtn').addClass('hide')
				}
			});
				*/
				
				
			/*Add tag functionality*/
				
			$('.addtag').click(function(){
				
				var $this=$(this);
				var inputbox='<input type="text" class="addTagTextBox"/><a class="saveTag ML-10"><i class="fa fa-check"></i></a><a class="cancelTag ML-10"><i class="fa fa-times"></i></a>'
				//this.parentElement.parentElement.style.display='none'; not in use
				$(this).html(inputbox).find('.addTagTextBox').focus();
				
				/*Save new added tag*/
				
				$('.saveTag').click(function(){
					var objDesc =$(this).closest("tr").find('td:eq(2)').text();
					var tagData=$('.addTagTextBox').val();
					saveUpdatedCategory(objDesc,tagData)
					//this.parentElement.parentElement.innerHTML=tagData;
				});
			
				$('.cancelTag').click(function(){
					// //alert("Cancel:-" + $(this).closest("tr").find('td:eq(4)').text());
					// // alert("Cancel:" + $(this).closest("tr").find('td:eq(2)').text() + ":" + $(this).closest("tr").find('td:eq(4)').text());
					// // alert($(this).parent().find('.addTagTextBox').val());
					
					// var objTagData =$(this).closest("tr").find('td:eq(4)').text();
					// var temp="";
					// if(objTagData=="")
						// temp='<a class="addtag">Add Tag</a>';
					// else
					// {
						// temp='<span class="tagDetails">'+objTagData+'<a href="#" class="MR-10"><i class="addtag fa fa-pencil"></i></a><a href="" class="ML-10 deletetag hide"><i class="fa fa-times"></i></a>';
						
					// this.parentElement.parentElement.innerHTML=temp;
					//$('#transactions_table_data').empty();
					LoadTransactionList();
				});
				
			});
			
			
			
			//Delete transaction functionality
	
			$('.deleteTransaction').click(function(){
				$('#transactions_table_data input[type=checkbox]:checked').parent().parent().remove();
			});
					
			//Edit Transaction functionality
			
			$('.editTransaction').click(function(){
				var self=this;	
				// Get all values from selected row
				var getCheckedCheckbox=$('#transactions_table_data input[type=checkbox]:checked');
				var getTransDate=getCheckedCheckbox.closest("tr").find('td:eq(1)').text();
				var getTransDecription=getCheckedCheckbox.closest("tr").find('td:eq(2)').text();
				var getTransAmt=getCheckedCheckbox.closest("tr").find('td:eq(3)').text();
				var getTransTag=getCheckedCheckbox.closest("tr").find('td:eq(4)').text();
				
				// Open edit transaction modal with values
					$('#editTransactionModal').modal('show');
				
				// Populate selected table row values into respective textboxes
					$('#editTransDescription').val(getTransDecription);
					$('#editTransAmount').val(getTransAmt);
					$('#editTransTags').val(getTransTag);
					$('#editTransDate').val(getTransDate);
			    
				
			});
			
		});	
	
			
			
			
	});
	}
	function saveUpdatedCategory(desc,tag)
	{		
		//alert(desc + ":" + tag);
		var transactionElement = {
				"DESCRIPTION": desc,
				"SUBCATEGORY": tag
			}
	   jQuery.ajax(
			{
			type: 'POST',
			url : "http://162.243.171.209:8081/updateSubcategory",
			dataType : "json",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(transactionElement),
			success:function(data2) 
			 { 
				alert("Success");
				//$('#transactions_table_data').empty();
				LoadTransactionList();
			  //alert(data2);
				//console.log(data2);
			 },
			 error: function(data2) {
				alert("fail");
			 //alert(data2); 	
			 //console.log(data2);
			 }
			
			 });
			
	}
	
	// average chart 
	
	$.getJSON('http://162.243.171.209:8081/AvgSpendCategory?cif='+cif, function(json1) {
	     var seriesdata1=[];
		 var drilleddata1=[];
		 var drilleddowndata1=[];

	
		var length=json1.rows.length;
		//length=2;
		var baseYear=[];
		var sum=0;
		//total_expense_val=0;
			for(var z=0; z< length;z++){
				var yearno=parseFloat(json1.rows[z].BSNS_YEAR);
				if(baseYear.indexOf(yearno)<0)
				{
				var prevyearno;
					for(var i=0; i< length;i++){
						var year_no=parseFloat(json1.rows[i].BSNS_YEAR);
						var totalexpenses=parseFloat(json1.rows[i].TOTEXPENSES);
						var catname=json1.rows[i].CATEGORY;
						var averegexpense=parseFloat(Math.round(json1.rows[i].AVGEXPENSES));
						
						
						if(yearno==year_no)
						{
						//alert(prevyearno);
							if(prevyearno!=year_no){
							if(prevyearno!=null){
								seriesdata1.push({"name" :prevyearno,"y": sum,"drilldown":prevyearno});
								drilleddowndata1.push({"name" :prevyearno,"id":prevyearno,"data":drilleddata1});
								}
								
								drilleddata1=[];
								drilleddata1.push({'name':catname,'y':averegexpense});
								sum=totalexpenses;
								prevyearno=year_no;
								baseYear.push(yearno);
							}
							else{
								sum=sum+totalexpenses;
								drilleddata1.push({'name':catname,'y':averegexpense});
							}
						}
						
					}
				}
				if(z==length-1){
						seriesdata1.push({"name" :yearno,"y": sum,"drilldown":yearno});
						drilleddowndata1.push({"name" :yearno,"id":yearno,"data":drilleddata1});
					}
			}	
	
    // Create the chart
    var options={
        chart: {
            type: 'column',
			renderTo:'average-chart'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category'
        },
		 yAxis: {
            title: {
                text: 'Total Expense (£)'
            }

        },
        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                }
            }
        },
    
       series: [{
            name: 'Brands',
            colorByPoint: true,
            data: seriesdata1
        }],
        drilldown: {
            series: drilleddowndata1
			}
    }
  chart2=new Highcharts.Chart(options);

});

//Spline with symbol chart

$.getJSON('http://162.243.171.209:8081/getAllMonthExpenses?cif='+cif+'&year='+year, function(json1) {   
		var categories=[];
		//we will push categories in this variable from received JSON
		var data2=[];
		
		
		
			var length=json1.rows.length;
		var monthlyExpenses=new Object();
		
			for(var z=0; z< length;z++){
							
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var month=parseFloat(json1.rows[z].MONTH_NO);	
				monthlyExpenses[month]=expenses;
				switch (month)
				{
					case 1:expense_month='Jan';
					break;
					case 2:expense_month='Feb';
					break;
					case 3:expense_month='Mar';
					break;
					case 4:expense_month='Apr';
					break;
					case 5:expense_month='May';
					break;
					case 6:expense_month='Jun';
					break;
					case 7:expense_month='Jul';
					break;
					case 8:expense_month='Aug';
					break;
					case 9:expense_month='Sep';
					break;
					case 10:expense_month='Oct';
					break;
					case 11:expense_month='Nov';
					break;
					case 12:expense_month='Dec';
					break;
				}
				categories.push(expense_month);
				data2.push(expenses);
			}
			
			var data4=[];
			//second year data
			var year1=(year-1);
			
			//alert(year1);
			$.getJSON('http://162.243.171.209:8081/getAllMonthExpenses?cif='+cif+'&year='+year1, function(json2) {   
			//we will push categories in this variable from received JSON
			var length=json2.rows.length;
			var monthlyExpenses=new Object();
		
			for(var z=0; z< length;z++){
				var expenses=parseFloat(json2.rows[z].EXPENSES);
				var month=parseFloat(json2.rows[z].MONTH_NO);	
				monthlyExpenses[month]=expenses;
				switch (month)
				{
					case 1:expense_month='Jan';
					break;
					case 2:expense_month='Feb';
					break;
					case 3:expense_month='Mar';
					break;
					case 4:expense_month='Apr';
					break;
					case 5:expense_month='May';
					break;
					case 6:expense_month='Jun';
					break;
					case 7:expense_month='Jul';
					break;
					case 8:expense_month='Aug';
					break;
					case 9:expense_month='Sep';
					break;
					case 10:expense_month='Oct';
					break;
					case 11:expense_month='Nov';
					break;
					case 12:expense_month='Dec';
					break;
				}
				if(categories.indexOf(expense_month)<0)
					categories.push(expense_month);
				
				data4.push(expenses);
			}
	
    var options={
        chart: {
            type: 'spline',
			renderTo:'spline-chart'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Expense (£)'
            },
            labels: {
                formatter: function () {
                    return this.value + '';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: year,
            marker: {
                symbol: 'square'
            },
            data: data2

        },
		{
            name: year1,
            marker: {
                symbol: 'diamond'
            },
            data: data4

        }
		]
    
	}
	chart2=new Highcharts.Chart(options);
});
});


	
}
/****/	

	var objTransactionType = "";
	$("input:radio[name=optradio]").change(function(){
		if( $(this).is(":checked") ){ // check if the radio is checked
			objTransactionType = $(this).val(); // retrieve the value
		}
	});

	$('#addTransaction #addNewTransaction').on('click',function(){	
		
		//$('#addTransaction').modal('hide');
			
			var amount=$("#amount").val();
			var description=$("#description").val();
			var date=$('#date').val();
			var tags=$('#tags').val();
			var temptag;
			var checkBoxBtn='<input type="checkbox" autofocus/>'
			if(tags=="")
			{
				tempTag='<a class="addNewtag">Add Tag</a>';
			}
			else
			{
				tempTag=tags;
			}
			///  add transaction 
			
			if(validateform())
			{
			$('#addTransaction').modal('hide');
			

			var transactionCollection = {};
			var transactions = [];
			transactionCollection.transactions = transactions;
			
			var objDescription=$("#addTransaction #description").val();
			var objAmount = $("#addTransaction #amount").val();
			var objDate = $('#date').val();
			

			var transactionElement = {
				"TRANSACTION_ID": 999987, 
                "CIF": parseInt(cif), 
				"BSNS_DATE": objDate, //"14-Jul-16", 
				"TRANSACTION_TYPE": objTransactionType, 
				"DESCRIPTION": objDescription,//, 
				"PAID_IN": 0,//0, 
				"PAID_OUT": parseInt(objAmount),
				"BALANCE": 0,//0, 
				"ACCOUNT_NO": 1236698612
                
			}
			transactionCollection.transactions.push(transactionElement);
			
			   jQuery.ajax(
				    {
					type: 'POST',
					//url : "http://localhost:8082/addTransactions",
					url : "http://162.243.171.209:8081/addTransactions",
					dataType : "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(transactionCollection),
					
					success:function(data2) 
					 { 
						alert("Success");
						//location.reload();
						//$('#transactions_table_data').empty();
						LoadTransactionList();
					  
					 },
					 error: function(data2) {
						alert("fail");
					 //alert(data2); 	
					 //console.log(data2);
					 }
					
					 });
			
			
			// var table = document.getElementById("transactions_table_data");
			// var row = table.insertRow(-1);
			
			// var checktransaction = row.insertCell(0);
			// var trans_date = row.insertCell(1);
			// var trans_desc = row.insertCell(2);
			// var trans_amount = row.insertCell(3);
			// var trans_tags = row.insertCell(4);
			
			// checktransaction.innerHTML = checkBoxBtn;
			// trans_date.innerHTML = date;
			// trans_amount.innerHTML = amount;
			// trans_desc.innerHTML = description;
			// trans_tags.innerHTML = tempTag;
			
			}

			
			 
			
		
	});	
	
	$('.addNewtag').click(function(){
				
				var $this=$(this);
				var inputbox='<input type="text" class="addTagTextBox"><a class="saveTag ML-10"><i class="fa fa-check"></i></a><a class="cancelTag ML-10"><i class="fa fa-times"></i></a>'
				$(this).html(inputbox).find('.addTagTextBox').focus();
				
				/*Save new added tag*/
				
				$('.saveTag').click(function(){
				alert("alert save tag");
				var tagData=$('.addTagTextBox').val();
				this.parentElement.parentElement.innerHTML=tagData;
				});
			
				$('.cancelTag').click(function(){
					var temp='<a class="addNewtag">Add Tag</a>';
					this.parentElement.parentElement.innerHTML=temp;
				});
				
			});

//Start Not required 
function isValidDate(subject){
  if (subject.match(/^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/)){
    return true;
  }else{
    return false;
  }
}	
//End Not required 

function ValidateDate(subject) {
  //var dtRegex = new RegExp("^([0]?[1-9]|[1-2]\\d|3[0-1])-(JAN|FEB|MAR|APR|MAY|JUN|JULY|AUG|SEP|OCT|NOV|DEC)-[1-2]\\d{3}$", 'i');
  var dtRegex = new RegExp("^([0]?[1-9]|[1-2]\\d|3[0-1])-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-[1-2]\\d{1}$", 'i');
  return dtRegex.test(subject);
}

function validateform(){ 
                 regExp= /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
			             var amount=$("#amount").val();
						 if($('#date').val() ==""){
								alert("Please Enter date");
								return false;
						 }
						  if($('#date').val() !=""){
							 if(!ValidateDate($('#date').val())){
								alert("Please enter valid date");
								return false;
							 }
						 }
						 
				         if($("#description").val()==""){
							alert("Please Enter description");
								return false;
						 }
						 if($("#amount").val()==""){
							alert("Please Enter amount");
								return false;
						 }
						 if($("#amount").val()!=""){
						   if(isNaN(amount)){
								alert("Please Enter Valid amount");
								return false;
								}
						 }
						 // if(!regExp.match($('#date').val())){
						   // alert("Please enter valid date");
						   // return false;
						 // }
						 
						
						 
						 return true;
				
					}		  

$('#editTransactionModal #submit').click(function(){
	$('#editTransactionModal').modal('hide');
	var updatedDesc=$('#editTransDescription').val();
	var updatedAmt=$('#editTransAmount').val();
	var updatedTags=$('#editTransTags').val();
	var updatedDate=$('#editTransDate').val();
	
	
	//*Start *//
	
		jQuery.ajax(	
				    {
					type: 'POST',
					url : "http://162.243.171.209:8081/updateSubcategory",
					dataType : "json",
					contentType: "application/json; charset=utf-8",
					data: {"DESCRIPTION": "ISLINGTON POST OFFICE","SUBCATEGORY": "POSTAL EXPENSES"},
					success:function(data2) 
					 { 
						alert("Success");
						location.reload();
					  //alert(data2);
						//console.log(data2);
					 },
					 error: function(data2) {
						alert("fail");
					 //alert(data2); 	
					 //console.log(data2);
					 }
					
					 });
			
	//*End *//
	
	
	

	var getCheckedCheckbox=$('#transactions_table_data input[type=checkbox]:checked');
	getCheckedCheckbox.closest("tr").find('td:eq(1)').text(updatedDate);
	getCheckedCheckbox.closest("tr").find('td:eq(2)').text(updatedDesc);
	getCheckedCheckbox.closest("tr").find('td:eq(3)').text(updatedAmt);
	getCheckedCheckbox.closest("tr").find('td:eq(4)').text(updatedTags);
	getCheckedCheckbox.attr('checked',false);
	$('.actionBtn').addClass('hide');
	
});	


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

	
/** End of pie-chart, column-chart and table section **/

/** Code for line chart and bar-chart **/


		
	$('#go').on('click',function(){
	alert("hi");
		var year1=$('#first_year_selection').val();	
		
		var month1=$('#first_month_selection').val();	
		var year2=$('#second_year_selection').val();	
		var month2=$('#second_month_selection').val();	
		
		GetMonthlyData(year1,month1,year2,month2);	
	});
		
	GetMonthlyData("2015","6","2016","6");

	function GetMonthlyData(year1,month1,year2,month2){
			var chartData = [];
	var chartCategories=[];
	var expData = [];
		$.getJSON('http://162.243.171.209:8081/listExpensesByWeek?cif='+cif+'&year='+year1+'&month='+month1, function(json1){

			var monthName,weekName;
			switch(month1){
				case 1:
					monthName='Jan';
					break;
				case 2:
					monthName='Feb';
					break;
				case 3:
					monthName='Mar';
					break;
				case 4:
					monthName='Apr';
					break;
				case 5:
					monthName='May';
					break;
				case 6:
					monthName='Jun';
					break;
				case 7:
					monthName='Jul';
					break;
				case 8:
					monthName='Aug';
					break;
				case 9:
					monthName='Sep';
					break;
				case 10:
					monthName='Oct';
					break;
				case 11:
					monthName='Nov';
					break;
				case 12:
					monthName='Dec';
					break;
			};
		var length=json1.rows.length;
		//length=2;
		expData=[];
		
		var sum=0;
			for(var z=0; z< length;z++){
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var Weekname=json1.rows[z].WEEk_NUMBER;
				var monthName=parseInt(month1);
				monthName=getMonthName(monthName);
				var tempWeekName=parseInt(Weekname);
				switch(tempWeekName){
				case 1:
					tempWeekName="Week 1";
					break;
				case 2:
					tempWeekName="Week 2";
					break;
				case 3:
					tempWeekName="Week 3";
					break;
				case 4:
					tempWeekName="Week 4";
					break;
				case 5:
					tempWeekName="Week 5";
					break;
			};
			if(chartCategories.length<length)
				//chartCategories.push(weekName);
				chartCategories.push(tempWeekName);
					
				expData.push(expenses);
				
				if(z==length-1){
					chartData.push({"name" : monthName +" "+year1, "data" : expData });
					//seriesdata.push({"name" :prevcatname,"y":sum,"drilldown":prevcatname});
				}
				}

				///////////////Second year data get
		$.getJSON('http://162.243.171.209:8081/listExpensesByWeek?cif='+cif+'&year='+year2+'&month='+month2, function(json1) {				
					
			var monthNumber,weekName;
			var length=json1.rows.length;
					
			expData=[];
			var sum=0;
				for(var z=0; z< length;z++)
				{
					var expenses=parseFloat(json1.rows[z].EXPENSES);
					var Weekname=json1.rows[z].WEEk_NUMBER;
					var monthName=parseInt(month2);
					monthName=getMonthName(monthName);
					
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
					};
					
					if(chartCategories.length<length)
						chartCategories.push(weekName);
						
					expData.push(expenses);
					
					if(z==length-1){
						chartData.push({"name" :monthName +" "+year2, "data" : expData });
					}
				}
					DrawLineChart();
				});
			});

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
					title:{
						text:'Weeks'
					}
				},
				yAxis: {
					title: {
						text: 'Expense (£)'
					},
					min: 0
				},
				tooltip: {
					pointFormat: '£{point.y}'
				},

				plotOptions: {
					spline: {
						marker: {
							enabled: true
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
				series: chartData
				},
				chart1=new Highcharts.Chart(options);
			
			}
	
	//////////////////////////////////////////////////
	
	////////////Combination Chart//////////////////////////////
	var chartData1 = [];
	var chartCategories1=[];
	var expData1 = [];
	
	$.getJSON('http://162.243.171.209:8081/listExpensesByCategoryMonthly?cif='+cif+'&year='+year1+'&month='+month1, function(json1) {

		var length=json1.rows.length;
		//length=2;
		expData1=[];
		var sum=0;
			for(var z=0; z< length;z++){
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var catname=json1.rows[z].CATEGORY;
				var monthName=parseInt(month1);
				monthName=getMonthName(monthName);
				expData1.push(expenses);
				if(z==length-1){
					chartData1.push({"name" : monthName+"-"+year1, "data" : expData1 });
				}
				}
				
	$.getJSON('http://162.243.171.209:8081/listExpensesByCategoryMonthly?cif='+cif+'&year='+year2+'&month='+month2, function(json1) {
	
		var length=json1.rows.length;

		var sum=0;
						expData1=[];
			for(var z=0; z< length;z++){
				var expenses=parseFloat(json1.rows[z].EXPENSES);
				var catname=json1.rows[z].CATEGORY;
				var monthName=parseInt(month2);
			monthName=getMonthName(monthName);

				chartCategories1.push(catname);
				expData1.push(expenses);
				if(z==length-1){
					chartData1.push({"name" : monthName +"-"+year2 , "data" : expData1 });
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
                text: 'Category'
            },
			
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Expense (£)',
            }
        },
        tooltip: {
            valuePrefix:'£'
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

	/** Get customer details **/

	
	/****/	
	
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

	$('.user-profile').click(function(){
	
		if($('#user_details').hasClass('hide'))
		{
			$('#user_details').removeClass('hide');
			$.getJSON('http://162.243.171.209:8081/listCustomerDetails?cif='+cif+'',function(json1){
				var cust_name=json1.rows[0].Cust_Name;
				var cust_contact=json1.rows[0].Cust_Contact;
				var cust_email=json1.rows[0].Cust_Email;
				$('.user_name').html(cust_name);
				$('.user_mob_no').html('0'+cust_contact);
				$('.user_mail_id').html(cust_email);
			});
			/* if($('.topnav').hasClass("responsive"))
			{
				$('#user_details').addClass('hide');
			} */
				
		}
		else
		{
			$('#user_details').addClass('hide')
		}
	});
	
	$('#dashboard-container').click(function(){

		$.getJSON('http://162.243.171.209:8081/listCustomerDetails?cif='+cif+'',function(json1){
		
				var cust_name=json1.rows[0].Cust_Name;
				var cust_contact=json1.rows[0].Cust_Contact;
				var cust_email=json1.rows[0].Cust_Email;
				$('.user_name').html(cust_name);
				$('.user_mob_no').html('0'+cust_contact);
				$('.user_mail_id').html(cust_email);
			});
			
		
	
	});
	
	
});

function getMonthName(monthName){
	
	switch(monthName){
		 
				case 1:
					monthName='Jan';
					break;
				case 2:
					monthName='Feb';
					break;
				case 3:
					monthName='Mar';
					break;
				case 4:
					monthName='Apr';
					break;
				case 5:
					monthName='May';
					break;
				case 6:
					monthName='Jun';
					break;
				case 7:
					monthName='Jul';
					break;
				case 8:
					monthName='Aug';
					break;
				case 9:
					monthName='Sep';
					break;
				case 10:
					monthName='Oct';
					break;
				case 11:
					monthName='Nov';
					break;
				case 12:
					monthName='Dec';
					break;
			};
			return monthName;
}
