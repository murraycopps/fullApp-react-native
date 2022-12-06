
function outTime(time, dispMin) {
    var outhour = Math.round(time / 3600 - 0.5);
    var outmin = Math.round((time - outhour * 3600) / 60 - 0.5);
    var outsec = Math.round(10 * (time - (outhour * 3600 + outmin * 60))) / 10;
    if (dispMin && outsec < 10) {
        outsec = "0" + outsec;
    }
    if (outhour == 0) {
        if(!dispMin && outmin == 0) return outsec;
        return outmin + ":" + outsec;
    }
    else {
        if (outmin < 10) {
            outmin = "0" + outmin;
        }
        return outhour + ":" + outmin + ":" + outsec;
    }
}

function timeToSpeed(time, distance, unit) {
    var speed = distance / time;
    speed /= unit;
    speed *= 3600;
    return Math.round(speed * 10) / 10;
}

function speedToTime(speed, distance) {
    var time = distance / speed;
    return Math.round(time * 10) / 10;
}

export function getOutputs(time, distance, speed, isTime) {
    if ((speed == 0 && !isTime) || distance == 0 || (time == 0 && isTime)) return { labels: [], values: [] };
    if (isTime) {
        var kmSpeed = timeToSpeed(time, distance, 1000);
        var mileSpeed = timeToSpeed(time, distance, 1609.34);
        var metSpeed = Math.round(timeToSpeed(time, distance, 1) / 360) / 10;
        return { labels: ["Time", "Seconds", "kph", "mph", "m/s"], values: [outTime(time,true), time, kmSpeed, mileSpeed, metSpeed] };
    }
    else {
        if(distance != 1) speed = speed * distance / 3600;
        var mileTime = speedToTime(speed, 1609.34);
        var kmTime = speedToTime(speed, 1000);
        var metTime = speedToTime(speed, 1);
        var mileSpeed = timeToSpeed(mileTime, 1609.34, 1609.34);
        var kmSpeed = timeToSpeed(kmTime, 1000, 1000);
        var metSpeed = Math.round(timeToSpeed(mileTime, 1609.34, 1) / 360) / 10;

        if (distance == 1609.34) return { labels: ['Mile Time: ', 'Km Time: ', 'Meter Time: ', 'kph: ', 'm/s: '], values: [outTime(mileTime,true), outTime(kmTime,true), outTime(metTime), kmSpeed, metSpeed] };
        if (distance == 1000) return { labels: ['Mile Time: ', 'Km Time: ', 'Meter Time: ', 'mph: ', 'm/s: '], values: [outTime(mileTime,true), outTime(kmTime,true), outTime(metTime), mileSpeed, metSpeed] };
        if (distance == 1) return { labels: ['Mile Time: ', 'Km Time: ', 'Meter Time: ', 'mph: ', 'kph: '], values: [outTime(mileTime,true), outTime(kmTime,true), outTime(metTime), mileSpeed, kmSpeed] };
    }
}