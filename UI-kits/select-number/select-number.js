function SelectNumber(select) {
    var that = this;

    var input = select.querySelector('.select_number-value');
    var value = input.getAttribute('value');

    var min = parseFloat(input.getAttribute('min'));
    var max = parseFloat(input.getAttribute('max'));
    var step = parseFloat(input.getAttribute('step'));

    this.onchange = function() {};

    input.oninput = function (event) {
        var value = parseFloat(input.value);
        if (isNaN(value)) {
            input.value = 0;
        } else {
            that.setValue(value);
        }

        that.onchange();
    }

    var btnIncrement = select.querySelector('.select_number-btn--top');
    if (btnIncrement){
        btnIncrement.addEventListener('click', function () {
            that.setValue(parseFloat(input.value) + step);
        });
    }

    var btnDecrement = select.querySelector('.select_number-btn--bottom');
    if (btnDecrement){
        btnDecrement.addEventListener('click', function () {
            that.setValue(parseFloat(input.value) - step);
        });
    }

    this.getValue = function() {
        return input.value;
    }
    this.setValue = function(value) {
        if (value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
        } else {
            input.value = value;
        }
    }
};
window.addEventListener('load', function () {

    var selectNumbers = document.querySelectorAll('.UI-kit > .select_number');
    for (var i = 0; i < selectNumbers.length; i++) {
        new SelectNumber(selectNumbers[i]);
    }

})
