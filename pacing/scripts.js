
export default function calc(disDex, min, sec, custom, paceOrSplit, settings) {
    //declare variables 
    var time = 60 * min + 1 * sec;
    disDex = disDex + 1;
    var disOptions = [800, 1000, 1500, 1609.34, 3000, 3218.68, 5000, 8000, 10000]; 
    var splitReturnOptions =
        paceOrSplit ?
            settings['isImperial'] ?
                [[100, 200, 300, 400, 600, 800], [100, 200, 300, 400, 600, 800, 1000], [100, 200, 400, 800, 1000, 1200, 1500], [100, 200, 400, 409.34, 800, 809.34, 1200, 1609.34], [100, 200, 400, 800, 1500, 1609.34, 2400, 3000], [100, 200, 400, 800, 1609.34, 2400, 3218.68], [100, 200, 400, 800, 1609.34, 3218.68, 5000], [100, 200, 400, 800, 1609.34, 3218.68, 5000, 8000], [100, 200, 400, 800, 1609.34, 3218.68, 5000, 8000, 10000]] :
                [[100, 200, 300, 400, 600, 800], [100, 200, 300, 400, 600, 800, 1000], [100, 200, 400, 800, 1000, 1200, 1500], [100, 200, 400, 409.34, 800, 809.34, 1000, 1200, 1609.34], [100, 200, 400, 800, 1000, 1500, 2400, 3000], [100, 200, 400, 800, 1000, 2400, 3218.68], [100, 200, 400, 800, 1000, 3000, 5000], [100, 200, 400, 800, 1000, 3000, 5000, 8000], [100, 200, 400, 800, 1000, 3000, 5000, 8000, 10000]]
            :
            settings['isImperial'] ?
                [[100, 200, 400, 600, 1000, 1200, 1500, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1200, 1500, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1000, 1200, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1000, 1500, 3000, 3218.68, 5000], [200, 400, 800, 1500, 1609.34, 3218.68, 5000, 8000, 10000], [200, 400, 800, 1609.34, 3000, 5000, 8000, 10000], [200, 400, 800, 1609.34, 3000, 3218.68, 8000, 10000], [400, 800, 1609.34, 3000, 3218.68, 5000, 10000], [400, 800, 1609.34, 3000, 3218.68, 5000, 8000]] :
                [[100, 200, 400, 600, 1000, 1200, 1500, 1600, 3200, 5000], [100, 200, 400, 600, 800, 1200, 1500, 1600, 3200, 5000], [100, 200, 400, 600, 800, 1000, 1200, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1000, 1500, 3000, 5000], [200, 400, 800, 1000, 1500, 3200, 5000, 8000, 10000], [200, 400, 800, 1000, 1500, 3000, 5000, 8000, 10000], [200, 400, 800, 1000, 1500, 3000, 8000, 10000], [400, 800, 1000, 1500, 3000, 5000, 10000], [400, 800, 1500, 3000, 5000, 8000]];

    var splitReturns = [];
    var dis;


    //check if function will work
    if (disDex == 0) {
        return;
    }
    else if (disDex == 1) {
        dis = custom;
        dis = parseFloat(dis);
        var addDis = 400;

        //set list to distances at each compleated lap of the track

        splitReturns = [100, 200]
        if (paceOrSplit) {
            if (dis <= 4400) {
                for (var i = 2; addDis < dis; i++) {
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
            var options = [400, 800, 1500, 1609, 3000, 3218, 5000, 8000, 10000];
            var isFirst = true;
            for (var i = 0; i < options.length; i++) {
                if (options[i] == dis) {
                    isFirst = false;
                }
                else if (options[i] > dis && isFirst) {
                    splitReturns.push(dis);
                    isFirst = false;
                }
                splitReturns.push(options[i]);
            }
            if (dis > 10000) {
                splitReturns.push(dis);
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
        output[o] = Math.round(splitReturns[o]-0.5) + ":    " + outTime(splitReturns[o] * ratio);
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