$(document).ready(function(){  
    // контроль и отправка данных на сервер в фоновом режиме  
    // при нажатии на кнопку "отправить сообщение"  
    $("#wlpeUserRegisterForm").submit(function(){  
		var email = $("#wlpeUserRegisterEmail").val();  
        var name = $("#wlpeUserRegisterUserName").val(); 
		var fullname  = $("#wlpeUserRegisterFullName").val();
		var car = $('select#wlpeUserProfileMobile option:selected').val();
		var pas  = $("#wlpeUserRegisterPassword").val();
		var pas2  = $("#wlpeUserRegisterPasswordConfirm").val();
		var formcode  = $("#wlpeUserRegisterCaptcha").val();
		var service  = $("#wlpeSaveRegisterButton").val();
		
		
		if (email ==''){  
                alert ("Введите адресс почты!");  
                return false;  
            } 
			if (name ==''){  
                alert ("Введите логин пользователя!");  
                return false;  
            }
			if (fullname ==''){  
                alert ("Введите имя пользователя!");  
                return false;  
            }
			if (car ==''){  
                alert ("Введите марку автомобиля!");  
                return false;  
            }  
            if (pas ==''){  
                alert ("Введите пароль!");  
                return false;  
            } 
			if (pas2 ==''){  
                alert ("Подтвердите пароль!");  
                return false;  
            }
			if (formcode ==''){  
                alert ("Введите код с картинки!");  
                return false;  
            }  			
            $.ajax({
                type: "POST",  
                url: "user/register",  
                data: "email="+email+"&username="+name+"&fullname="+fullname+"&mobilephone="+car+"&password="+pas+"&password.confirm="+pas2+"&formcode="+formcode	+"&service="+service,  
				success: function(html){
					$("#fancy_ajax").html(html);
					/*$(".reg_bg").html(html);*/
				}
			});
			
			
			/*$('#fancy_wrap').css({'display':'none'});
			$('#fancy_overlay').css({'display':'none'});*/
        return false;  
       });
	var wM=$(".wlpeMessageText").text();
	if(wM=="Посмотрите подробную информацию о новом профиле в вашем почтовом ящике. АвтоРеформа"){
		$.ajax({
				type: "POST",  
				url: "user/entry",  
				success: function(html){$("#fancy_ajax").html(html);}
		});
	}
});