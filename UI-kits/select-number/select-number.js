function initSelectNumber() {

    let selectsNumber = document.querySelectorAll('.select_number');

    for (let i = 0; i < selectsNumber.length; i++) {

        let select = selectsNumber[i];
        let input = select.querySelector('.select_number-value');
        let value = input.getAttribute('value');

        let min = Number.parseFloat(input.getAttribute('min'));
        let max = Number.parseFloat(input.getAttribute('max'));
        let step = Number.parseFloat(input.getAttribute('step'));

        console.log('kek');

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
            let value = Number.parseFloat(input.value);
            if (Number.isNaN(value)) {
                input.value = 0;
            } else {
                setValue(value);
            }
        }

        let btnIncrement = select.querySelector('.select_number-btn--top');
        btnIncrement.addEventListener('click', function () {
            setValue(Number.parseFloat(input.value) + step);
        });

        let btnDecrement = select.querySelector('.select_number-btn--bottom');
        btnDecrement.addEventListener('click', function () {
            setValue(Number.parseFloat(input.value) - step);
        });
    }
};
window.addEventListener('load', function(){
    initSelectNumber();
})
