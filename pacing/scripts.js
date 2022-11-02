
export default function calc(disDex, hour, min, sec, custom, paceOrSplit, settings) {
    //declare variables 
    var time = (disDex > 9 ? 3600 * hour : 0) + 60 * min + 1 * sec;
    disDex = disDex + 1;
    var disOptions = [800, 1000, 1500, 1609.34, 3000, 3218.68, 5000, 8000, 10000, 21097.5, 42195];
    var splitReturnOptions =
        paceOrSplit ?
            settings['imperial'] ?
                [[100, 200, 300, 400, 600, 800], [100, 200, 300, 400, 600, 800, 1000], [100, 200, 400, 800, 1000, 1200, 1500], [100, 200, 400, 409.34, 800, 809.34, 1200, 1609.34], [100, 200, 400, 800, 1500, 1609.34, 2400, 3000], [100, 200, 400, 800, 1609.34, 2400, 3218.68], [100, 200, 400, 800, 1609.34, 3218.68, 5000], [100, 200, 400, 800, 1609.34, 3218.68, 5000, 8000], [100, 200, 400, 800, 1609.34, 3218.68, 5000, 8000, 10000], [1609.34, 3218.68, 5000, 10000, 21097.5], [1609.34, 3218.68, 5000, 10000, 21097.5, 42195]] :
                [[100, 200, 300, 400, 600, 800], [100, 200, 300, 400, 600, 800, 1000], [100, 200, 400, 800, 1000, 1200, 1500], [100, 200, 400, 409.34, 800, 809.34, 1000, 1200, 1609.34], [100, 200, 400, 800, 1000, 1500, 2400, 3000], [100, 200, 400, 800, 1000, 2400, 3218.68], [100, 200, 400, 800, 1000, 3000, 5000], [100, 200, 400, 800, 1000, 3000, 5000, 8000], [100, 200, 400, 800, 1000, 3000, 5000, 8000, 10000], [1000, 3000, 5000, 10000, 21097.5], [1000, 3000, 5000, 10000, 21097.5, 42195]]
            :
            settings['imperial'] ?
                [[100, 200, 400, 600, 1000, 1200, 1500, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1200, 1500, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1000, 1200, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1000, 1500, 3000, 3218.68, 5000], [200, 400, 800, 1500, 1609.34, 3218.68, 5000, 8000, 10000], [200, 400, 800, 1609.34, 3000, 5000, 8000, 10000], [200, 400, 800, 1609.34, 3000, 3218.68, 8000, 10000], [400, 800, 1609.34, 3000, 3218.68, 5000, 10000], [400, 800, 1609.34, 3000, 3218.68, 5000, 8000], [1609.34, 3000, 3218.68, 5000, 8000, 10000, 42195], [1609.34, 3000, 3218.68, 5000, 8000, 10000, 21097.5]] :
                [[100, 200, 400, 600, 1000, 1200, 1500, 1600, 3200, 5000], [100, 200, 400, 600, 800, 1200, 1500, 1600, 3200, 5000], [100, 200, 400, 600, 800, 1000, 1200, 1609.34, 3218.68, 5000], [100, 200, 400, 600, 800, 1000, 1500, 3000, 5000], [200, 400, 800, 1000, 1500, 3200, 5000, 8000, 10000], [200, 400, 800, 1000, 1500, 3000, 5000, 8000, 10000], [200, 400, 800, 1000, 1500, 3000, 8000, 10000], [400, 800, 1000, 1500, 3000, 5000, 10000], [400, 800, 1500, 3000, 5000, 8000], [1000, 3000, 5000, 8000, 10000, 42195], [1000, 3000, 5000, 8000, 10000, 21097.5]];

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
            var options = [400, 800, 1500, 1609, 3000, 3218, 5000, 8000, 10000, 21097.5, 42195];
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
        output[o] = Math.round(splitReturns[o] - 0.5) + ":    " + outTime(splitReturns[o] * ratio);
    }
    return output.join("\n");
}



//take int time input and return it as a string in 0:00 form

function outTime(time) {
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