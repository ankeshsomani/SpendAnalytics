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
		
		var data=base46URL;
		$("#btngo	").click(function(){
 		
        // $.post( "http:// 162.243.167.245:8080/ExpenseAnalytics/ocrservice/read", {fileType:"jpg",encodedImage:base46URL} )
		// .done(function( data ) {
			// alert( "Data Loaded: " + data );
		// });	
        
		 // $.post( 
                  // "http:// 162.243.167.245:8080/ExpenseAnalytics/ocrservice/read",
                  // {fileType:"jpg",encodedImage:base46URL},
                  // function(data) {
                     // alert(data);
                  // }
               // );
     var dataToBePassed={"encodedImage": base46URL,"fileType":"jpg"};     
        jQuery.ajax(
				   {
					url : "http://162.243.167.245:8080/SpringMVC/ocrservice/read",
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					dataType : "json",
					//data: '{"fileType":"jpg",encodedImage:"'+base46URL},
					//	data:{"fileType":"jpg","encodedImage": "test"},
						data:JSON.stringify(dataToBePassed),
					success:function(data) { 
					alert('in success');
					alert(data);
						console.log(data); 
					},
					error: function() {
						console.log("Error"); 
						}

					});

	  
        		
		//$.getJSON('http://162.243.167.245:8081/listtransactiondata?cif=53001&year=2015&month=6',function(jsondata) {
		$('#transactions_table_data1').empty();

		$.each(jsondata.rows, function(key, obj) {
			var tempTag;

			// if(obj.TAGS=="")
				// tempTag='<a class="addtag">Add Tag</a>';		
			// else
				// tempTag='<span class="tagDetails"><a href="#" class="MR-10 hide"><i class="fa fa-pencil"></i></a>'+obj.TAGS+'<a href="" class="ML-10 deletetag hide"><i class="fa fa-times"></i></a></span>';

				/*Display service data into table*/
					
			$('<tr><td class="editable">'+obj.BSNS_DATE+'</td><td class="editable">'+obj.DESCRIPTION +'</td><td class="editable">'+obj.EXPENSES+'</td><td class="editable">'+obj.TAGS+'</td><tr>').appendTo('#transactions_table_data1');
			
		});	
	
	});
		});
		
		

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
		
		
});
