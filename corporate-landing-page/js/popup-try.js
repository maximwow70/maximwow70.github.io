$(document).ready(function(){
	$('.btn-try-click').on('click',function(){
		$('.popup-try').toggleClass('open');
		$('.popup-try-close').toggleClass('open');
	});
});
