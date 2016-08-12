var base46URL;

$(document).ready(function(){


$('body').on('click', 'td.editable', function(e) {
    e.stopPropagation(); //<-------stop the bubbling of the event here
    var value = $(this).html();
	 $(this).removeClass("editable");
    updateVal(this, value.replace(/ /g,'&nbsp;'));
  });

  function updateVal(currentEle, value) {
    console.log("Current Element is" + currentEle);
    $(currentEle).html('<input class="thVal" type="text" value='+ value +' />');
    $(".thVal").focus();
   $(".thval").keyup(function(event) {
     if (event.keycode == 13) {
        $(currentele).html($(".thval").val());
       //$(currentele).html($(".thval").val().trim());


     }

   });

    $(".thVal").focusout(function () {
	 $(currentEle).addClass("editable");
    $(currentEle).html($(".thVal").val());
	
});
  }
});



$(document).ready(function(){

   $("#btnsubmit").click(function(){ 
      
		// var json = '{';
		// var otArr = [];
		// var tbl2 = $('#transactions_table_data1 tr').each(function(i) {        
		// x = $(this).children();
		// var itArr = [];
		// x.each(function() {
			// itArr.push('"' + $(this).text() + '"');
		// });
		// otArr.push('"' + i + '": [' + itArr.join(',') + ']');
		// })
		// json += otArr.join(",") + '}'
        // alert(json)
        
		
		var rows = [];
            $('table tr').each(function(i, n){
                var $row = $(n);
                rows.push({
                    Date: 			$row.find('td:eq(1)').text(),
                    Description:    $row.find('td:eq(2)').text(),
                    Amount:         $row.find('td:eq(3)').text(),
                    Tags:           $row.find('td:eq(4)').text(),
                    
                });
            });
            alert(JSON.stringify(rows));

	});   
	
		
//	test();
	/* Pie Chart */
	var handleFileSelect = function(evt) {
			var files = evt.target.files;
			var file = files[0];

			if (files && file) {
				var reader = new FileReader();

				reader.onload = function(readerEvt) {
					var binaryString = readerEvt.target.result;
					base46URL=btoa(binaryString);
					
				};

				reader.readAsBinaryString(file);
			}
		};
		
		
		//var data=base46URL;
		
		 var dataToBePassed={"encodedImage": base46URL,"fileType":"jpg"};
		var data1={"fileType":"jpg","encodedImage":base46URL}
		$("#btngo").click(function(){ 	
          //alert(base46URL);	
		 $("#loader").show();
		 $("#btngo").attr("disabled", true);
		 
		    var dataToBePassed={"encodedImage": base46URL,"fileType":"jpg"};
             
         		  
         jQuery.ajax(
				    {
					 url : "http://162.243.171.209:8080/SpringMVC/ocrservice/read",
					 type: 'POST',
					 dataType : "json",
					 contentType: "application/json; charset=utf-8",
					 data: JSON.stringify(dataToBePassed),
					 success:function(data) 
					 { 
					  for (var i=0; i<data.transactions.length;i++)
					  {
					    $('<tr><td class="editable">'+data.transactions[i].transactionDate.replace(/ /g,'-')+'</td><td class="editable">'+data.transactions[i].description +'</td><td class="editable">'+data.transactions[i].transactionType+'</td><td class="editable">'+data.transactions[i].paidIn+'</td><td class="editable">'+data.transactions[i].paidOut+'</td><tr>').appendTo('#transactions_table_data1');
					  }
					  $("#loader").hide();
					   $("#btngo").removeAttr("disabled");
					   
					 //console.log(data); 
					 },
					 error: function() {console.log("Error");
						$("#loader").hide();
						 $("#btngo").removeAttr("disabled");
						 
						}
					 });

	  
        		
		//$.getJSON('http://162.243.167.245:8081/listtransactiondata?cif=53001&year=2015&month=6',function(jsondata) {
		//$('#transactions_table_data1').empty();

		//$.each(jsondata.rows, function(key, obj) {
			//var tempTag;

			// if(obj.TAGS=="")
				// tempTag='<a class="addtag">Add Tag</a>';		
			// else
				// tempTag='<span class="tagDetails"><a href="#" class="MR-10 hide"><i class="fa fa-pencil"></i></a>'+obj.TAGS+'<a href="" class="ML-10 deletetag hide"><i class="fa fa-times"></i></a></span>';

				/*Display service data into table*/
					
			//$('<tr><td class="editable">'+obj.BSNS_DATE+'</td><td class="editable">'+obj.DESCRIPTION +'</td><td class="editable">'+obj.EXPENSES+'</td><td class="editable">'+obj.TAGS+'</td><tr>').appendTo('#transactions_table_data1');
			
		//});	
	
	//});
		});
		
		

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
		
		
});