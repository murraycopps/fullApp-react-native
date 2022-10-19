export function addTimes(minOne, secOne, minTwo, secTwo, minThree, secThree, minFour, secFour) {
    var total = 0;
    total += minOne * 60 + secOne * 1;
    total += minTwo * 60 + secTwo * 1;
    total += minThree * 60 + secThree * 1;
    total += minFour * 60 + secFour * 1;
    return "Total Time: " + outTimeHour(total);
}

//take int time input and return it as a string in 0:00:00 form

function outTimeHour(time) {
    var outhour = Math.round(time / 3600 - 0.5);
    var outmin = Math.round((time - outhour * 3600) / 60 - 0.5);
    var outsec = Math.round(10 * (time - (outhour * 3600 + outmin * 60))) / 10;
    if (outsec < 10) {
        outsec = "0" + outsec;
    }
    if (outhour == 0) {
        return outmin + ":" + outsec;
    }
    else {
        if (outmin < 10) {
            outmin = "0" + outmin;
        }
        return outhour + ":" + outmin + ":" + outsec;
    }
}