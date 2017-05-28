function Select(select) {
    this.ontoggle = function () {
        select.classList.toggle('select--active');
    }

    var that = this;

    var input = select.querySelector('.select-input');
    var btn = select.querySelector('.select-btn');

    var values = select.querySelectorAll('.select-value');
    for (var j = 0; j < values.length; j++) {
        var value = values[j].getAttribute('value');
        values[j].innerHTML = value;

        values[j].innerHTML = value;
        values[j].addEventListener('click', function (event) {
            for (var k = 0; k < values.length; k++) {
                values[k].classList.remove('select-value--active');
            }
            this.classList.add('select-value--active');

            input.setAttribute('value', event.currentTarget.value);
            input.value = event.currentTarget.value;
            that.ontoggle();
        });
    }
    btn.addEventListener('click', this.ontoggle);
    input.addEventListener('click', this.ontoggle);

    input.setAttribute('value', values[0].getAttribute('value'));
}

function initSelects() {

    var selects = document.querySelectorAll('.select');

    for (var i = 0; i < selects.length; i++) {
        var select = new Select(selects[i]);
    }

    [].forEach.call(document.querySelectorAll('.select-value_list'), function (el) {
        Ps.initialize(el, { theme: 'square' });
    });
}
window.addEventListener('load', function () {
    initSelects();
});