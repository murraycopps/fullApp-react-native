import { DISTANCES, vdotTable } from './table.js';



export function getVdotLables(isRace) {
    var lables = [];
    if (!isRace) {
        for (var i = 0; i < DISTANCES.length; i++) {
            lables.push(DISTANCES[i]["label"] + ":");
        }
    }
    else {
        lables = ["Easy:", "Marathon", "Tempo", "Interval", "Repetiton", "", "", "", "", ""];
    }
    return lables;
}

export function extractVdotTimes(myVdotTemp, isRace, isTime, isImperial) {
    if(myVdotTemp == 0) return isRace? ['0:00-0:00','0:00.0','0:00.0','0:00.0','0:00.0','','','','','',''] : ['0:00.0','0:00.0','0:00.0','0:00.0','0:00.0','0:00.0','0:00.0','0:00.0','0:00.0','0:00.0','0:00.0'];
    var myVdot = myVdotTemp["vdot"];
    var timeOff = myVdotTemp["timeOff"];
    var myVdotTimes = [];
    if (!isRace) {
        for (var i = 0; i < DISTANCES.length; i++) {
            var tempVdotTime = vdotTable["TIMES"][DISTANCES[i]["value"]][myVdot] * timeOff;
            if (isTime) {
                var tempVdotDis = DISTANCES[i]["distance"];
                var meterTime = tempVdotTime / tempVdotDis;
                tempVdotTime = meterTime * (isImperial? 1609.34 : 1000);
            }
            myVdotTimes.push(outTime(tempVdotTime));
        }
    }

    else {
        var options = ["e", "m", "t", "i", "r"];
        var convert = isImperial? 1 : 1000/1609.34;

        for (var i = 0; i < options.length; i++) {
            if (i < 3) {
                var tempVdotTime = vdotTable["PACES"][myVdot][options[i]]["mile"] * convert * timeOff;
            }
            else {
                var tempVdotTime = vdotTable["PACES"][myVdot][options[i]]["400m"] * (isImperial? 4.0225 : 2.5) * timeOff;

            }
            myVdotTimes.push(outTime(tempVdotTime));

        }
        for (var i = 0; i < 5; i++) {
            myVdotTimes.push("");
        }
        var tempVdotTime = vdotTable["PACES"][myVdot]["e"]["mile"];
        console.log(myVdot);
        console.log(vdotTable["PACES"][myVdot]);
        console.log(tempVdotTime);
        myVdotTimes[0] = outTime(Math.round((tempVdotTime - 13)*convert)) + "-" + outTime(Math.round((tempVdotTime + 27)*convert));
    }

    return myVdotTimes;
}


export function findVdot(myTime, distance) {
    if(isNaN(myTime) || myTime == 0) return 0;
    var index = 0;
    var timeOff;
    var vdotOff;
    var smallestDiff = 100000;        //arbitray large number that cannot be inputed
    for (var i = 30; i <= 85; i++) {

        var tableTime = vdotTable["TIMES"][distance["value"]][i.toString()];
        var diff = absDiff(myTime, tableTime);

        if (diff < smallestDiff) {
            index = i.toString();
            smallestDiff = diff;
            timeOff = myTime / tableTime;
            vdotOff = index * timeOff - index;
        }
    }
    return { "vdot": index, "timeOff": timeOff, "vdotDec": Math.round((index - vdotOff) * 10) / 10 };

}

export function absDiff(valueOne, valueTwo) {
    return Math.abs(valueOne - valueTwo);
}

//take int time input and return it as a string in 0:00:00 form

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


