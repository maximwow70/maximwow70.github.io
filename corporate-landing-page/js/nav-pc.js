/*
var visitor;
function checkKeyUp(e){
	var keyID = e.keyCode || e.which,
		keyChar = String.fromCharCode(keyID);
		if (keyChar == ) {}
}*/
//smoothScrolling start
$(document).ready(function(){
	$(".nav-pc").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		//анимируем переход на расстояние - top за 800 мс
		$('body,html').animate({scrollTop: top}, 800);
	});
});
//smoothScrolling end
var sectionsId = [],
	wrapperClass = [],
	sectionsTop = [],
	sectionsHeight = [];
var sections = document.getElementsByClassName('section-link');
$(document).ready(function(){
	for (var i = 0 ; i < sections.length; i++) {
		// read ID of Sections
		if (sections[i].id){
			sectionsId[i] = '#' + sections[i].id;
		}
		// read className of Sections
		if ("."+sectionsId[i].substr(1)){
			wrapperClass[i] = "."+sectionsId[i].substr(1);
		}
		// read offset.top of Sections
		sectionsTop[i] = parseInt($(sectionsId[i]).offset().top);
		// read height/2 of Sections
		sectionsHeight[i] = parseInt($(wrapperClass[i]).outerHeight() / 2);
	}
});
/* test start
console.log(sectionsId);
console.log(wrapperClass);
console.log(sectionsTop);
console.log(sectionsHeight);
console.log(window.pageYOffset); //height of top:topOfWindow
test end */
$(document).ready(function(){
	/* test start
	console.log(document.body.scrollHeight);
	console.log(sectionsTop);
	test end */
	for (var i = sections.length - 1; i >= 0; i--) {
		if (window.pageYOffset >= sectionsTop[i]-sectionsHeight[i]) {
			$('.nav-pc a[href="'+sectionsId[i]+'"]').toggleClass('open');
			break;
		}
	}
	$(window).scroll(function () {
		/*
		for (var i = 0; i < sections.length - 2; i++) {
			if (window.pageYOffset >= sectionsTop[i]-sectionsHeight[i] &&
				window.pageYOffset < sectionsTop[i+1]-sectionsHeight[i+1]) {
				$('.nav-pc a').removeClass('open');
				$('.nav-pc a[href="'+sectionsId[i]+'"]').addClass('open');
				//console.log(i); //test
				break;
			}
			else{
				$('.nav-pc a').removeClass('open');
				$('.nav-pc a[href="'+sectionsId[sections.length-1]+'"]').addClass('open');
			}
		}
		*/
		if (window.pageYOffset >= sectionsTop[0]-sectionsHeight[0] &&
			window.pageYOffset < sectionsTop[1]-sectionsHeight[1]) {
			$('.nav-pc a').removeClass('open');
			$('.nav-pc a[href="'+sectionsId[0]+'"]').toggleClass('open');
		}
		if (window.pageYOffset >= sectionsTop[1]-sectionsHeight[1] &&
			window.pageYOffset < sectionsTop[2]-sectionsHeight[2]) {
			$('.nav-pc a').removeClass('open');
			$('.nav-pc a[href="'+sectionsId[1]+'"]').toggleClass('open');
		}
		if (window.pageYOffset >= sectionsTop[2]-sectionsHeight[2] &&
			window.pageYOffset < sectionsTop[3]-sectionsHeight[3]) {
			$('.nav-pc a').removeClass('open');
			$('.nav-pc a[href="'+sectionsId[2]+'"]').toggleClass('open');
		}
		if (window.pageYOffset >= sectionsTop[3]-sectionsHeight[3] &&
			window.pageYOffset < sectionsTop[4]-sectionsHeight[4]) {
			$('.nav-pc a').removeClass('open');
			$('.nav-pc a[href="'+sectionsId[3]+'"]').toggleClass('open');
		}
		if (window.pageYOffset >= sectionsTop[4]-sectionsHeight[4]) {
			$('.nav-pc a').removeClass('open');
			$('.nav-pc a[href="'+sectionsId[4]+'"]').toggleClass('open');
		}
	});
});