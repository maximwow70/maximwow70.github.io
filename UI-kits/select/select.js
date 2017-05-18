function initSelect() {

    let selects = document.querySelectorAll('.select');

    for (let i = 0; i < selects.length; i++) {
        let select = selects[i];
        let input = select.querySelector('.select-input');
        let btn = select.querySelector('.select-btn');

        function toggleSelect() {
            select.classList.toggle('select--active');
        }

        btn.addEventListener('click', function () {
            toggleSelect();
        });

        let values = select.querySelectorAll('.select-value');
        for (let j = 0; j < values.length; j++) {
            let value = values[j].getAttribute('value');
            values[j].innerHTML = value;

            values[j].innerHTML = value;
            values[j].addEventListener('click', function () {
                for (let k = 0; k < values.length; k++) {
                    values[k].classList.remove('select-value--active');
                }
                this.classList.add('select-value--active');

                input.setAttribute('value', value);
                toggleSelect();
            });
        }

        input.setAttribute('value', values[0].getAttribute('value'));
    }

    [].forEach.call(document.querySelectorAll('.select-value_list'), function (el) {
        Ps.initialize(el, { theme: 'square' });
    });
}
window.addEventListener('load', function(){
    initSelect();
});