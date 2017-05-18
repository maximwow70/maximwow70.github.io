function initSelect() {

    var selects = document.querySelectorAll('.select');

    for (var i = 0; i < selects.length; i++) {
        var select = selects[i];
        var input = select.querySelector('.select-input');
        var btn = select.querySelector('.select-btn');

        function toggleSelect() {
            select.classList.toggle('select--active');
        }

        btn.addEventListener('click', function () {
            toggleSelect();
        });

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