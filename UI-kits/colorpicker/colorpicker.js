
function Colorpicker(colorpickerVM, title) {

    this.colorsVM = colorpickerVM.querySelectorAll('.colorpicker-color');

    for (var i = 0; i < this.colorsVM.length; i++){
        this.colorsVM[i].setAttribute('data-picked', 'false');
        this.colorsVM[i].addEventListener('click', togglePicked);
    }

    function togglePicked(event){
        var color = event.currentTarget;
        var isPicked = color.getAttribute('data-picked');
        if (isPicked == 'true'){
            color.classList.remove('colorpicker-color--picked');
            color.setAttribute('data-picked', 'false');
        } else {
            color.classList.add('colorpicker-color--picked');
            color.setAttribute('data-picked', 'true');
        }
    }
}
Colorpicker.prototype.getPickedColors = function () {
    var pickedColors = [];
    for (var i = 0; i < this.colorsVM.length; i++){
        if (this.colorsVM[i].getAttribute('data-picked') == 'true'){
            pickedColors.push(this.colorsVM[i].value);
        }
    }
    return pickedColors;
}

;(function initColorPickers(){

    var colorpicker = new Colorpicker(
        document.querySelector('.colorpicker')
    );
    colorpicker.getPickedColors();

})();

