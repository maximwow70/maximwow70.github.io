function Slider(slider) {
    var that = this;

    var btnLeft = slider.querySelector('.slider-btn--right');
    var btnRight = slider.querySelector('.slider-btn--left');

    btnRight.onclick = function () { };
    btnLeft.onclick = function () { };

    var sliderList;
    var slides;
    var slideWidth;
    this.init = function () {

        sliderList = slider.querySelector('.slider-slide_list');
        sliderList.style.left = 0;

        slides = slider.querySelectorAll('.slider-slide');
        slideWidth = Math.round(
            parseFloat(getComputedStyle(slides[0]).width) /
            parseFloat(getComputedStyle(slider).width) * 100
        );

        manageClick();
    }
    this.init();


    function manageClick() {
        if (parseFloat(sliderList.style.left) >= 0) {
            btnRight.onclick = function () { };
            btnRight.classList.add('slider-btn--disabled');
            btnRight.disabled = true;
        } else {
            btnRight.onclick = onBtnRightClick;
            btnRight.classList.remove('slider-btn--disabled');
            btnRight.disabled = false;
        }
        if (100 - slideWidth * slides.length >= parseFloat(sliderList.style.left)) {
            btnLeft.onclick = function () { };
            btnLeft.classList.add('slider-btn--disabled');
            btnLeft.disabled = true;
        } else {
            btnLeft.onclick = onBtnLeftClick;
            btnLeft.classList.remove('slider-btn--disabled');
            btnLeft.disabled = false;
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


    var mouseDownX;
    var mouseMoveX;

    sliderList.onmousedown = function () { };
    sliderList.onmousemove = function () { };
    sliderList.onmouseup = function () {};

    function onMouseMove(event) {
        mouseMoveX = event.screenX;
        console.log(slideWidth * (slides.length - 1));
        if (
            mouseMoveX - mouseDownX > 30 &&
            -Math.round(parseFloat(sliderList.style.left)) < slideWidth * slides.length - 100
        ) {
            onBtnLeftClick();
            sliderList.onmousemove = function () { };
        }
        if (
            mouseDownX - mouseMoveX > 30 &&
            -Math.round(parseFloat(sliderList.style.left)) > 0
        ) {
            onBtnRightClick();
            sliderList.onmousemove = function () { };
        }
    }
    sliderList.onmousedown = function (event) {
        mouseDownX = event.screenX;
        sliderList.onmousemove = onMouseMove;
    };
    sliderList.onmouseup = function () {
        sliderList.onmousemove = function () { };
    };

    window.addEventListener('resize', function () {
        that.init();
    });
}



function initSliders() {

    var sliders = document.querySelectorAll('.slider');
    for (var i = 0; i < sliders.length; i++) {
        var slider = new Slider(sliders[i]);
    }

    /*[].forEach.call(document.querySelectorAll('.slider-slide_list'), function (el) {
        Ps.initialize(el);

        document.addEventListener('ps-scroll-x', function(event) {
            console.log(event);
        });
    });*/
};
window.addEventListener('load', initSliders);
