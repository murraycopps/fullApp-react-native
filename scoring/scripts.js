function addPlaces(list) {
    var total = 0;
    for (var i = 0; i < 5; i++) {
        total += list[i] * 1;
    }
    return total;

}

function getOtherPlaces(list) {
    var i = 1;
    var k = 0;
    var otherScores = [];
    while (i < list[list.length - 1] || otherScores.length < 7) {
        if (list[k] == i) {
            k++;
        }
        else {
            otherScores.push(i);
        }

        i++;
    }

    return otherScores;
}

export function getXCScores(list) {
    var myScore = addPlaces(list);
    var otherPlaces = getOtherPlaces(list);
    var otherScore = addPlaces(otherPlaces);
    var out = "Your Score is: " + myScore + "\nOther Score is: " + otherScore;
    return out;
}

export function getTrackScores(list, numEvents) {
    console.log(numEvents);
    var myScore = 5 * list[0] + 3 * list[1] + 1 * list[2];
    var maxScore = 9 * numEvents;
    var otherScore = maxScore - myScore;
    console.log("otherScore: " + otherScore);
    var out = "Your Score is: " + myScore + (otherScore > 0 ? ("\nOther Score is: " + otherScore) : '');
    return out;
}