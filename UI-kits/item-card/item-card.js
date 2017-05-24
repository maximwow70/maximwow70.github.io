function initItemList(_slider) {

    var slider = _slider;
    var slideListVM = slider.querySelector('.slider-slide_list');
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
        new Slider(_slider);
    })
}

window.addEventListener('load', function () {
    var itemLists = document.querySelectorAll('.slider');
    for (var itemList = 0; itemList < itemLists.length; itemList++){
        initItemList(itemLists[itemList]);
    }
})