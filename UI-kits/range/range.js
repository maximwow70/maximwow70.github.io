function RangeControl(rangeControlVM, minValue, maxValue, points, barVM) {
    var that = this;

    var valueVM = rangeControlVM.querySelector('.range-value');

    this.range = parseFloat(rangeControlVM.getAttribute('data-range'));
    this.onchange = function () { };

    if (isNaN(this.range)) {
        changeRange(points.length > 0 ? points[0] : 0);
    }

    function getNearPoint(proportion) {
        if (that.range < proportion){
            var rightPoint = points[points.length - 1];
            for (var i = points.length - 1; i >= 0; i--) {
                rightPoint = (points[i] > that.range) ? points[i] : rightPoint;
            }
            rightPoint = (Math.abs(rightPoint - proportion) < Math.abs(that.range - proportion)) ? rightPoint : that.range;
            return rightPoint;
        } else {
            var leftPoint = points[0];
            for (var i = 0; i < points.length; i++) {
                leftPoint = (points[i] < that.range) ? points[i] : leftPoint;
            }
            leftPoint = (Math.abs(leftPoint - proportion) < Math.abs(that.range - proportion)) ? leftPoint : that.range;
            return leftPoint;
        }
    }

    function mouseMove(event) {
        var leftX = event.clientX - barVM.getBoundingClientRect().left;
        var proportion = leftX / parseFloat(window.getComputedStyle(barVM).width);
        if (proportion > 1) {
            proportion = 1;
        } else if (proportion < 0) {
            proportion = 0;
        }

        if (points.length > 0) {
            changeRange(getNearPoint(proportion));
        } else {
            changeRange(proportion);
        }
    }

    function changeRange(proportion) {
        that.range = Math.min(Math.max(proportion, 0), 1);

        rangeControlVM.style.left = that.range * 100 + "%";

        var currentValue = that.range * (maxValue - minValue) + minValue;
        rangeControlVM.setAttribute('data-range', currentValue);
        valueVM.textContent = Math.round(currentValue);

        that.onchange();
    }

    rangeControlVM.addEventListener('mousedown', function () {
        document.addEventListener('mousemove', mouseMove);
    });
    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', mouseMove);
    });
    rangeControlVM.addEventListener('keydown', function (event) {
        if (event.keyCode == 39) {
            if (points.length > 0) {
                var min = 0;
                for (var i = 0; i < points.length; i++) {
                    if (points[i] > that.range) {
                        min = points[i];
                        break;
                    }
                }
                changeRange(Math.max(min, that.range));
            } else {
                changeRange(that.range += 0.1);
            }
        } else if (event.keyCode == 37) {
            if (points.length > 0) {
                var max = points[points.length - 1];
                for (var i = 0; i < points.length; i++) {
                    if (points[i] < that.range) {
                        max = points[i];
                    }
                }
                changeRange(Math.min(max, that.range));
            } else {
                changeRange(that.range -= 0.1);
            }
        }
    })

    this.setRange = function (proportion) {
        changeRange(proportion);
    }

    if (points.length > 0){
        for (var i = 0; i < points.length; i++){
            if (this.range <= points[i]){
                this.setRange(points[i]);
                break;
            }
        }
    } else {
        changeRange(this.range);
    }

}

function Range(rangeVM) {
    var that = this;

    this.onchange = function () { };

    this.points = [];
    this.controls = [];
    this.onchange = function () { };

    this.minValue = parseFloat(rangeVM.getAttribute('data-min'));
    this.maxValue = parseFloat(rangeVM.getAttribute('data-max'));

    var pointsVM = rangeVM.querySelectorAll('.range-point');
    var barVM = rangeVM.querySelector('.range-bar');
    var progressBarVM = rangeVM.querySelector('.range-progress_bar');

    for (var i = 0; i < pointsVM.length; i++) {
        this.points.push(parseFloat(pointsVM[i].getAttribute('data-point')));
        if (this.points[i] > 1) {
            this.points[i] = 1;
        } else if (this.points[i] < 0) {
            this.points[i] = 0;
        }
        pointsVM[i].style.left = this.points[i] * 100 + "%";
    }
    this.points.sort(function (a, b) { return a > b });

    var controlsVM = rangeVM.querySelectorAll('.range-control');
    for (var i = 0; i < controlsVM.length; i++) {
        var control = new RangeControl(
            controlsVM[i],
            this.minValue,
            this.maxValue,
            this.points,
            barVM
        );
        control.onchange = onControlChange;
        this.controls.push(control);
    }

    function onControlChange() {
        var dataRange = that.getData();
        if (dataRange.length === 1) {
            progressBarVM.style.width = dataRange[0] * 100 + "%";
        }
        if (dataRange.length === 2) {
            if (dataRange[0] > dataRange[1]) {
                that.controls[0].setRange(dataRange[1]);
            } 
            progressBarVM.style.width = (dataRange[1] - dataRange[0]) * 100 + "%";
            progressBarVM.style.left = dataRange[0] * 100 + "%";
        }
        that.onchange();
    }

    this.getData = function () {
        var dataRange = [];
        for (var i = 0; i < that.controls.length; i++) {
            dataRange.push(that.controls[i].range);
        }
        return dataRange;
    }

    onControlChange();
}

; (function initAllRanges() {

    var ranges = document.querySelectorAll('.range');

    for (var i = 0; i < ranges.length; i++) {
        new Range(ranges[i]);
    }

})();
