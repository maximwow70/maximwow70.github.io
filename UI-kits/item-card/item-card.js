function initItemList(_slider) {

    var slider = _slider;
    var slideListVM = document.querySelector('.slider-slide_list');
    var _switch = slider.querySelector('.switch');

    var itemListVM = slider.querySelectorAll('.slider-slide');
    var itemListNewVM = [];
    for (var item = 0; item < itemListVM.length; item++) {
        if (itemListVM[item].querySelector('.item_card-new')) {
            itemListNewVM.push(itemListVM[item]);
        }
    }

    var controls = {
        left: slider.querySelector('.slider-btn--left'),
        right: slider.querySelector('.slider-btn--right')
    }

    _switch.addEventListener('click', function () {
        if (_switch.getAttribute('value') == 'true') {
            slideListVM.innerHTML = '';
            for (var item = 0; item < itemListNewVM.length; item++) {
                slideListVM.appendChild(itemListNewVM[item]);
            }
        } else {
            slideListVM.innerHTML = '';
            for (var item = 0; item < itemListVM.length; item++) {
                slideListVM.appendChild(itemListVM[item]);
            }
        }
        _slider = new Slider(document.querySelector('.slider'));
    })
}

window.addEventListener('load', function () {
    initItemList(
        document.querySelector('.slider')
    );
})