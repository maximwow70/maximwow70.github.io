$(document).ready(function(){
	if (window.pageYOffset > 100)
		$('.nav-hand').addClass('open');
	else
		$('.nav-hand').removeClass('open');
	$(window).scroll(function(){
		if (window.pageYOffset > 100)
			$('.nav-hand').addClass('open');
		else{
			$('.nav-hand').removeClass('open');
		}
	});

	$('.btn-nav').on('click', function(){
		$('.btn-nav-open').toggleClass('open');
		$('.nav-hand').toggleClass('open-nav');
	});
	$(".btn-nav-open").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 800);
	});
	$('.btn-nav-open a').on('click', function(){
		$('.btn-nav-open').toggleClass('open');
	});
});

