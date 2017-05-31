
function Datapicker(datapickerVM, title) {

    this.dataVMs = datapickerVM.querySelectorAll('.datapicker-data');

    this.oncnange = function() {};

    for (var i = 0; i < this.dataVMs.length; i++){
        this.dataVMs[i].setAttribute('data-picked', 'false');
        this.dataVMs[i].addEventListener('click', togglePicked);
    }

    var that = this;
    function togglePicked(event){
        var data = event.currentTarget;
        var isPicked = data.getAttribute('data-picked');
        if (isPicked == 'true'){
            data.classList.remove('datapicker-data--picked');
            data.setAttribute('data-picked', 'false');
        } else {
            data.classList.add('datapicker-data--picked');
            data.setAttribute('data-picked', 'true');
        }
        that.oncnange();
    }
}
Datapicker.prototype.getPickedData = function () {
    var pickedData = [];
    for (var i = 0; i < this.dataVMs.length; i++){
        if (this.dataVMs[i].getAttribute('data-picked') == 'true'){
            pickedData.push(this.dataVMs[i].value);
        }
    }
    return pickedData;
}

;(function initDataPickers(){

    var colorpicker = new Datapicker(
        document.querySelector('.datapicker--colors')
    );
    // colorpicker.oncnange = function() {
    //     console.log(this.getPickedData());
    // }

    var sizepicker = new Datapicker(
        document.querySelector('.datapicker--sizes')
    );
    // sizepicker.oncnange = function() {
    //     console.log(this.getPickedData());
    // }

})();

