$(document).ready(function(){
	$("#entry a").fancybox({						
		"hideOnContentClick" :false, 
		"centerOnScroll" : false,
		"frameWidth" : 307,
		"frameHeight" : 320,
		"overlayOpacity" : 0.6,
	});
			
	$("#reg a").fancybox({						
		"hideOnContentClick" :false,
		"centerOnScroll" : false,
		"frameWidth" : 307,
		"frameHeight" : 730,
		"overlayOpacity" : 0.6,
	});
	$("#reg_linck").fancybox({						
		"hideOnContentClick" :false,
		"centerOnScroll" : false,
		"frameWidth" : 307,
		"frameHeight" : 730,
		"overlayOpacity" : 0.6,
	});
	$(document).ready(function() {$("a.gallery").fancybox();});
	$(".slides_container  a").fancybox();
});