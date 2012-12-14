$(document).ready(function(){
	function naivgation(nav){ 
		$(".diary th ."+nav).click(function(){
			$.ajax({
				type: "POST",  
				url: "/",  
				data: '&nav='+nav,  
				success: function(html){
					$("#diary").html(html);
				}
			});
		});
	};
	
	$(".delete").click(function(){
		var start = $(this).attr("id");
		start = parseInt(start);
		$.ajax({
			type: "POST",  
			url: "/",  
			data: '&type=del&start= '+start,  
			success: function(html){
				$("#diary").html(html);
			}
		});
	return false;
	});
	
$("#load").ajaxStart(function(){ $(this).show();});
$("#load").ajaxStop(function(){ $(this).hide();});

	naivgation('back');
	naivgation('today');
	naivgation('next');
});