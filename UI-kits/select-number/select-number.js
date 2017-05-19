function initSelectNumber() {

    var selectsNumber = document.querySelectorAll('.select_number');

    for (var i = 0; i < selectsNumber.length; i++) {

        var select = selectsNumber[i];
        var input = select.querySelector('.select_number-value');
        var value = input.getAttribute('value');

        var min = parseFloat(input.getAttribute('min'));
        var max = parseFloat(input.getAttribute('max'));
        var step = parseFloat(input.getAttribute('step'));

        function setValue(value) {
            if (value < min) {
                input.value = min;
            } else if (value > max) {
                input.value = max;
            } else {
                input.value = value;
            }
        }

        input.oninput = function (event) {
            var value = parseFloat(input.value);
            if (isNaN(value)) {
                input.value = 0;
            } else {
                setValue(value);
            }
        }

        var btnIncrement = select.querySelector('.select_number-btn--top');
        btnIncrement.addEventListener('click', function () {
            setValue(parseFloat(input.value) + step);
        });

        var btnDecrement = select.querySelector('.select_number-btn--bottom');
        btnDecrement.addEventListener('click', function () {
            setValue(parseFloat(input.value) - step);
        });
    }
};
window.addEventListener('load', function(){
    initSelectNumber();
})
