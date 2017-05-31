
function Datapicker(datapickerVM, title) {
    var that = this;

    this.datapickerVM = datapickerVM;
    this.dataVMs = datapickerVM.querySelectorAll('.datapicker-data');

    this.oncnange = function () { };

    for (var i = 0; i < this.dataVMs.length; i++) {
        this.dataVMs[i].setAttribute('data-picked', 'false');
        this.dataVMs[i].addEventListener('click', togglePicked);
    }

    function togglePicked(event) {
        var data = event.currentTarget;
        var isPicked = data.getAttribute('data-picked');
        if (isPicked == 'true') {
            data.classList.remove('datapicker-data--picked');
            data.setAttribute('data-picked', 'false');
        } else {
            data.classList.add('datapicker-data--picked');
            data.setAttribute('data-picked', 'true');
        }
        that.oncnange();
    }

    if (datapickerVM.classList.contains('datapicker--cost')) {
        this.initCostPicker();
    }
}
Datapicker.prototype.getPickedData = function () {
    var pickedData = [];
    for (var i = 0; i < this.dataVMs.length; i++) {
        if (this.dataVMs[i].getAttribute('data-picked') == 'true') {
            pickedData.push(this.dataVMs[i].value);
        }
    }
    return pickedData;
}
Datapicker.prototype.initCostPicker = function () {
    var that = this;

    var selectNumberVM = this.datapickerVM.querySelectorAll('.select_number');
    var selectNumbersInputVM = this.datapickerVM.querySelectorAll('.select_number-value');
    var rangeVM = this.datapickerVM.querySelector('.range');

    this.min = selectNumbersInputVM[0].getAttribute('min');
    this.max = selectNumbersInputVM[0].getAttribute('max');

    selectNumbersInputVM[1].setAttribute('min', this.min);
    selectNumbersInputVM[1].setAttribute('max', this.max);
    rangeVM.setAttribute('data-min', this.min);
    rangeVM.setAttribute('data-max', this.max);

    var range = new Range(rangeVM);
    var selectLeft = new SelectNumber(selectNumberVM[0]);
    var selectRight = new SelectNumber(selectNumberVM[1]);
    range.onchange = onRangeChange;
    selectLeft.onchange = onLeftChange;
    selectRight.onchange = onRightChange;

    function onRangeChange() {
        selectLeft.setValue(
            Math.round(range.getData()[0])
        );
        selectRight.setValue(
            Math.round(range.getData()[1])
        );
        that.oncnange();
    }
    function onLeftChange() {
        range.controls[0].setRange(
            selectLeft.getValue() / that.max
        );
        that.oncnange();
    }
    function onRightChange() {
        range.controls[1].setRange(
            selectRight.getValue() / that.max
        );
        that.oncnange();
    }

    this.getPickedData = function() {
        return {
            min: selectLeft.getValue(),
            max: selectRight.getValue()
        }
    }

    onRangeChange();
}

; (function initDataPickers() {

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
    var costpicker = new Datapicker(
        document.querySelector('.datapicker--cost')
    );
    // costpicker.oncnange = function () {
    //     console.log(this.getPickedData());
    // }

})();

