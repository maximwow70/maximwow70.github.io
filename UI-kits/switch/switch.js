function initSwitch() {

    let switches = document.querySelectorAll('.switch');

    for (let i = 0; i < switches.length; i++) {

        let _switch = switches[i];

        if (_switch.value == "true") {
            _switch.classList.add('switch--active');
        } else {
            _switch.classList.remove('switch--active');
        }

        function onSwitchClicked() {
            if (_switch.value == "true") {
                _switch.value = false;
                _switch.setAttribute('value', 'false');
            } else {
                _switch.value = true;
                _switch.setAttribute('value', 'true');
            }
            _switch.classList.toggle('switch--active');
        }
        _switch.addEventListener('click', onSwitchClicked);

        if (_switch.classList.contains('switch--disabled')) {
            _switch.removeEventListener('click', onSwitchClicked);
        }
    }
}
window.addEventListener('load', function () {
    initSwitch();
});