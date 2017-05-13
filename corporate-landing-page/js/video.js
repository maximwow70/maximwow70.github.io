$(function(){
	$('.btn-video').on('click', function(){
		$('.video-container').toggleClass('open');
		$('.btn-video-stop').toggleClass('open');
		$('.wrapper-content-index').toggleClass('open');
		$('nav').toggleClass('open-video');
		$('.video')[0].muted = false;

		if ($('.video')[0].paused) {
          	$('.video')[0].currentTime = 0;
          	$('.video')[0].muted = false;
          	$('.video')[0].play();
       	} else {
       		$('.video')[0].muted = true;
          	$('.video')[0].pause();
          	$('.video')[0].currentTime = 0;
          	//$('.video')[0].currentTime = 0;
       	}
	});
});
