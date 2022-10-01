export default function calc(disDex, min, sec, custom, paceOrSplit) {
    //declare variables 
    var time = 60 * min + 1*sec;
    disDex = disDex + 1;
    var disOptions = [800, 1609, 3218, 5000, 8000, 10000];
    var splitReturnOptions = [[100, 200, 300, 400, 600, 800], [100, 200, 400, 409, 800, 809, 1200, 1609], [400, 800, 1609, 2400, 3218], [400, 800, 1609, 3218, 5000], [400, 800, 1609, 3218, 5000, 8000], [400, 800, 1609, 3218, 5000, 8000, 10000]];
    var splitReturns = [];
    var dis;

    if (!paceOrSplit) {
        splitReturnOptions = [[100, 200, 400, 600, 1000, 1200, 1609], [100, 200, 400, 600, 800, 1000, 1500, 3218, 5000], [200, 400, 800, 1609, 3000, 5000], [400, 800, 1609, 3000, 3218, 8000, 10000], [400, 800, 1609, 3000, 3218, 5000, 10000], [400, 800, 1609, 3000, 3218, 5000, 8000]];
    }
    //check if function will work
    if (disDex == 0) {
        return;
    }
    else if (disDex == 1) {
        dis = custom;
        dis = parseFloat(dis);
        var addDis = 400;

        //set list to distances at each compleated lap of the track

        if (paceOrSplit) {
            if (dis <= 4400) {
                for (var i = 0; addDis < dis; i++) {
                    splitReturns[i] = addDis;
                    addDis += 400;
                }
                splitReturns.push(dis);
            }
            else {
                var disAdd = [400, 800, 1609, 3218, 5000, 8000, 10000]
                for (var i = 0; disAdd[i] < dis; i++) {
                    splitReturns[i] = disAdd[i];

                }
                splitReturns.push(dis);
            }
        }
        else {
            var options = [400, 800, 1609, 3000, 3218, 5000, 8000, 10000];
            var isFirst = true;
            for (var i = 0; i < options.length; i++) {
                if (options == dis) {
                    isFirst = false;
                }
                else if (options[i] > dis && isFirst) {
                    splitReturns.push(dis);
                    isFirst = false;
                }
                splitReturns.push(options[i]);
            }
        }
    }
    else {
        dis = disOptions[disDex - 2];
        splitReturns = splitReturnOptions[disDex - 2];
    }
    if (isNaN(dis) || isNaN(time)) {            //check if function will run returning if not
        return;
    }
    var output = [];
    var ratio = time / dis;
    for (var o = 0; o < splitReturns.length; o++) {
        if (isNaN(splitReturns[o])) {
            return;
        }
        output[o] = splitReturns[o] + ":    " + outTime(splitReturns[o] * ratio);
    }
    return output.join("\n");
}



//take int time input and return it as a string in 0:00 form

function outTime(time) {
    var min = Math.round(time / 60 - 0.5);
    var sec = Math.round(10 * (time - 60 * min)) / 10;
    if (sec < 10) {
        sec = "0" + sec;
    }
    return min + ":" + sec;
}