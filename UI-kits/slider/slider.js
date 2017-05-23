function Slider(slider) {

    var btnLeft = slider.querySelector('.slider-btn--right');
    var btnRight = slider.querySelector('.slider-btn--left');

    btnRight.onclick = function () { };
    btnLeft.onclick = function () { };

    var sliderList = slider.querySelector('.slider-slide_list');
    sliderList.style.left = 0;

    var slides = slider.querySelectorAll('.slider-slide');
    var slideWidth = Math.round(
        parseFloat(getComputedStyle(slides[0]).width) /
        parseFloat(getComputedStyle(slider).width) * 100
    );


    function manageClick() {
        if (parseFloat(sliderList.style.left) >= 0) {
            btnRight.onclick = function () { };
            btnRight.classList.add('slider-btn--disabled');
        } else {
            btnRight.onclick = onBtnRightClick;
            btnRight.classList.remove('slider-btn--disabled');
        }
        if (100 - slideWidth * slides.length >= parseFloat(sliderList.style.left)) {
            btnLeft.onclick = function () { };
            btnLeft.classList.add('slider-btn--disabled');
        } else {
            btnLeft.onclick = onBtnLeftClick;
            btnLeft.classList.remove('slider-btn--disabled');
        }
    }

    function onBtnLeftClick() {
        var positionLeft = parseFloat(sliderList.style.left);
        positionLeft -= slideWidth;
        sliderList.style.left = positionLeft + "%";

        manageClick();
    }
    function onBtnRightClick() {
        var positionLeft = parseFloat(sliderList.style.left);
        positionLeft += slideWidth;
        sliderList.style.left = positionLeft + "%";

        manageClick();
    }

    manageClick();

    window.addEventListener('resize', function () {
        btnRight.onclick = function () { };
        btnLeft.onclick = function () { };

        sliderList = slider.querySelector('.slider-slide_list');
        sliderList.style.left = 0;

        slides = slider.querySelectorAll('.slider-slide');
        slideWidth = Math.round(
            parseFloat(getComputedStyle(slides[0]).width) /
            parseFloat(getComputedStyle(slider).width) * 100
        );
        manageClick();
    });
}



function initSliders() {

    var sliders = document.querySelectorAll('.slider');
    for (var i = 0; i < sliders.length; i++) {
        var slider = new Slider(sliders[i]);
    }

};
window.addEventListener('load', initSliders);
