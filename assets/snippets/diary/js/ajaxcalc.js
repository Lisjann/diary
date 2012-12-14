function showContent(link) {

		var cont = document.getElementById('result_info');
		var loading = document.getElementById('loading');

		cont.innerHTML = loading.innerHTML;

		var http = createRequestObject();					// создаем ajax-объект
		if( http ) {
			http.open('get', link);							// инициируем загрузку страницы
			http.onreadystatechange = function () {			// назначаем асинхронный обработчик события
				if(http.readyState == 4) {
					cont.innerHTML = http.responseText;		// присваиваем содержимое
				}
			}
			http.send(null);    
		} else {
			document.location = link;	// если ajax-объект не удается создать, просто перенаправляем на адрес
		}
	}

	// создание ajax объекта
	function createRequestObject() {
		try { return new XMLHttpRequest() }
		catch(e) {
			try { return new ActiveXObject('Msxml2.XMLHTTP') }
			catch(e) {
				try { return new ActiveXObject('Microsoft.XMLHTTP') }
				catch(e) { return null; }
			}
		}
	}
	
 $(document).ready(function(){
	/*глубина*/
	$('#depth').keyup(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelValues = $('select#steel option:selected').val();
		var polyValues = $('select#poly option:selected').val();
		var steelNFValues = $('select#steel_notfirm option:selected').val();
		var polyNFValues = $('select#poly_notfirm option:selected').val();
		var steelPValues = $('select#steel_pump option:selected').val();
		var steel2PValues = $('select#steel2_pump option:selected').val();
		
		var nm = $("input#mountain:checked").length;
		var nnf = $("input#notfirm:checked").length;
		var np = $("input#pump:checked").length;
		if(nm==1){
		var urlcalc='/calc?boging=mountain&steelpr='+steelValues+'&poly='+polyValues+'&depth='+depthValues+'&runam='+runamValues;
		}
		if(nnf==1){
		var urlcalc='/calc?boging=notfirm&steelNF='+steelNFValues+'&polyNF='+polyNFValues+'&depth='+depthValues+'&runam='+runamValues;
		}
		if(np==1){
		var urlcalc='/calc?boging=pump&steelP='+steelPValues+'&steel2P='+steel2PValues+'&depth='+depthValues+'&runam='+runamValues;
		}
		
		showContent(urlcalc);
	});

	/*километраж*/
	$('#runam').keyup(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelValues = $('select#steel option:selected').val();
		var polyValues = $('select#poly option:selected').val();
		var steelNFValues = $('select#steel_notfirm option:selected').val();
		var polyNFValues = $('select#poly_notfirm option:selected').val();
		var steelPValues = $('select#steel_pump option:selected').val();
		var steel2PValues = $('select#steel2_pump option:selected').val();
		
		var nm = $("input#mountain:checked").length;
		var nnf = $("input#notfirm:checked").length;
		var np = $("input#pump:checked").length;
		if(nm==1){
		var urlcalc='/calc?boging=mountain&steelpr='+steelValues+'&poly='+polyValues+'&depth='+depthValues+'&runam='+runamValues;
		}
		if(nnf==1){
		var urlcalc='/calc?boging=notfirm&steelNF='+steelNFValues+'&polyNF='+polyNFValues+'&depth='+depthValues+'&runam='+runamValues;
		}
		if(np==1){
		var urlcalc='/calc?boging=pump&steelP='+steelPValues+'&steel2P='+steel2PValues+'&depth='+depthValues+'&runam='+runamValues;
		}
		
		showContent(urlcalc);
	});

	
	
	var nm = $("input#mountain:checked").length;
	var nnf = $("input#notfirm:checked").length;
	var np = $("input#pump:checked").length;
		if(nm==1){
			$('.pipe_mountain').css({'display':'block'});
			$('.pipe_notfirm').css({'display':'none'});
			$('.pipe_pump').css({'display':'none'});
		}
		if(nnf==1){
			$('.pipe_mountain').css({'display':'none'});
			$('.pipe_notfirm').css({'display':'block'});
			$('.pipe_pump').css({'display':'none'});
		}
		if(np==1){
			$('.pipe_mountain').css({'display':'none'});
			$('.pipe_notfirm').css({'display':'none'});
			$('.pipe_pump').css({'display':'block'});
		}


	/*Скальный Грунт*/
	$('#mountain').click(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelValues = $('select#steel option:selected').val();
		var polyValues = $('select#poly option:selected').val();
		showContent('/calc?boging=mountain&steelpr='+steelValues+'&poly='+polyValues+'&depth='+depthValues+'&runam='+runamValues);
		$('.pipe_mountain').css({'display':'block'});
		$('.pipe_notfirm').css({'display':'none'});
		$('.pipe_pump').css({'display':'none'});
	});
	$('#steel').change(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelValues = $('select#steel option:selected').val();
		var polyValues = $('select#poly option:selected').val();
		showContent('/calc?boging=mountain&steelpr='+steelValues+'&poly='+polyValues+'&depth='+depthValues+'&runam='+runamValues);
	//return false;
	});
	$('#poly').change(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelValues = $('select#steel option:selected').val();
		var polyValues = $('select#poly option:selected').val();
		showContent('/calc?boging=mountain&steelpr='+steelValues+'&poly='+polyValues+'&depth='+depthValues+'&runam='+runamValues);
	//return false;
	});
	
	
	
	
	/*Неустойчивый грунт*/
	$('#notfirm').click(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelNFValues = $('select#steel_notfirm option:selected').val();
		var polyNFValues = $('select#poly_notfirm option:selected').val();
		showContent('/calc?boging=notfirm&steelNF='+steelNFValues+'&polyNF='+polyNFValues+'&depth='+depthValues+'&runam='+runamValues);
		$('.pipe_mountain').css({'display':'none'});
		$('.pipe_pump').css({'display':'none'});
		$('.pipe_notfirm').css({'display':'block'});
	//return false;
	});
	$('#steel_notfirm').change(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelNFValues = $('select#steel_notfirm option:selected').val();
		var polyNFValues = $('select#poly_notfirm option:selected').val();
		showContent('/calc?boging=notfirm&steelNF='+steelNFValues+'&polyNF='+polyNFValues+'&depth='+depthValues+'&runam='+runamValues);
	//return false;
	});
	$('#poly_notfirm').change(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelNFValues = $('select#steel_notfirm option:selected').val();
		var polyNFValues = $('select#poly_notfirm option:selected').val();
		showContent('/calc?boging=notfirm&steelNF='+steelNFValues+'&polyNF='+polyNFValues+'&depth='+depthValues+'&runam='+runamValues);
	//return false;
	});
	
	
	
	
	
	/*Бурение с буровым насосом */
	$('#pump').click(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelPValues = $('select#steel_pump option:selected').val();
		var steel2PValues = $('select#steel2_pump option:selected').val();
		showContent('/calc?boging=pump&steelP='+steelPValues+'&steel2P='+steel2PValues+'&depth='+depthValues+'&runam='+runamValues);
		$('.pipe_mountain').css({'display':'none'});
		$('.pipe_notfirm').css({'display':'none'});
		$('.pipe_pump').css({'display':'block'});
	});
	$('#steel_pump').change(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelPValues = $('select#steel_pump option:selected').val();
		var steel2PValues = $('select#steel2_pump option:selected').val();
		showContent('/calc?boging=pump&steelP='+steelPValues+'&steel2P='+steel2PValues+'&depth='+depthValues+'&runam='+runamValues);
	//return false;
	});
	$('#steel2_pump').change(function(){
		var depthValues = $("#depth").val();
		var runamValues = $("#runam").val();
		var steelPValues = $('select#steel_pump option:selected').val();
		var steel2PValues = $('select#steel2_pump option:selected').val();
		showContent('/calc?boging=pump&steelP='+steelPValues+'&steel2P='+steel2PValues+'&depth='+depthValues+'&runam='+runamValues);
	//return false;
	});
	
	
	
	
//Объекты	
	
	$('#region').change(function(){
		var regionValues = $('select#region option:selected').val();
		showContent('/obj?region='+regionValues);
	});
	$('#letter').change(function(){
		var letterValues = $('select#letter option:selected').val();
		showContent('/obj?letter='+letterValues);
	
	});


	
});	