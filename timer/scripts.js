export function outTime(time) {
    var min = Math.round(time / 60 - 0.5);
    var sec = Math.round(100 * (time - 60 * min)) / 100;

    if (sec < 10) {
        sec = "0" + sec;
    }
    var secS = sec.toString();

    if (secS.length == 2) {
        sec = sec + ".00"
    }
    else if (secS.length == 4) {
        sec = sec + "0";
    }

    if (min < 10) {
        min = "0" + min;
    }
    return min + ":" + sec;
}

export function roundOff(value, precision) {
    value = Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    return value;
}