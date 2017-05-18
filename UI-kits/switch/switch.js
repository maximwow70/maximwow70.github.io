function Switch(_switch){

    this.onclicked = function() {
        if (_switch.value == "true") {
            _switch.value = false;
            _switch.setAttribute('value', 'false');
        } else {
            _switch.value = true;
            _switch.setAttribute('value', 'true');
        }
        _switch.classList.toggle('switch--active');
    }
    
    
    if (_switch.value == "true") {
        _switch.classList.add('switch--active');
    } else {
        _switch.classList.remove('switch--active');
    }

    _switch.addEventListener('click', this.onclicked);

    if (_switch.classList.contains('switch--disabled')) {
        _switch.removeEventListener('click', this.onclicked);
    }

}

function initSwitches() {
    var switches = document.querySelectorAll('.switch');

    for (var i = 0; i < switches.length; i++) {
        var _switch = new Switch(switches[i]);
    }
}

window.addEventListener('load', function () {
    initSwitches();
});