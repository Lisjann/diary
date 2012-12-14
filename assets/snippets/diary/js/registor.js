$(document).ready(function(){  
    // контроль и отправка данных на сервер в фоновом режиме  
    // при нажатии на кнопку "отправить сообщение"  
	var url="";
	var url2="";
	$("#wlpeLoginButton").mousedown(function(){
		var service  = $("#wlpeLoginButton").val();
		if(service!=undefined){url=url+"&service="+service;}
	 });
	$("#wlpeReminderButton").mousedown(function(){
		var notpas  = $("#wlpeReminderButton").val();
		if(notpas!=undefined){url=url+"&service="+notpas;}
	 });
	 
	/*var name = $("#wlpeUsernameid").val();  
	var pas  = $("#wlpePassword").val();
				
	if(name!=undefined){url=url+"&username="+name;}
	if(pas!=undefined){url=url+"&password="+pas;}*/
	$("#entryForm").submit(function(){
	
	var name = $("#wlpeUsernameid").val();  
	var pas  = $("#wlpePassword").val();
				
	if(name!=undefined){url=url+"&username="+name;}
	if(pas!=undefined){url=url+"&password="+pas;}
		
 		if (name ==''){  
			alert ("Введите имя пользователя!");  
			return false;  
		}  
		if (pas ==''){  
            alert ("Введите пароль!");  
			return false;  
        }  
		$.ajax({
            type: "POST",  
            url: "user/entry",  
            data: url,  
			success: function(html){
				$("#fancy_ajax").html(html);
			}
		});
    return false;  
	});
	/*$("#wlpeResetButton").mousedown(function(){
		var inputpas  = $("#wlpeResetButton").val();
		if(inputpas!=undefined){url2=url2+"&service="+inputpas;}
	});
	var mail  = $("#wlpeResetEmail").val();
	if(mail!=undefined){url2=url2+"&password="+mail;}
	 
	$("#entryForm").submit(function(){  
 		if (mail ==''){  
			alert ("Введите E-mail!");  
			return false;  
		}  
		$.ajax({
            type: "POST",  
            url: "user/entry",  
            data: url2,  
			success: function(html){
				$("#fancy_ajax").html(html);
			}
		});
    return false;  
	});*/
	   
	var wM=$(".avtoryes").text();
	if(wM!=""){
		$('#fancy_overlay').css({'display':'none'});
		$('#fancy_wrap').css({'display':'none'});		
		$.ajax({
				type: "POST",  
				url: "price",  
				success: function(html){$("#main_page").html(html);}
		});
	}
});