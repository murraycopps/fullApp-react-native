
  
  export function calcuate(unitTime, outDis, lastDis) {
    var tempOutDis = outDis;
    // console.log("calcuate " + tempOutDis);
    tempOutDis[tempOutDis.length-1]=lastDis;
    if (!isFinite(unitTime) || isNaN(unitTime) || isNaN(lastDis)) {
      console.log("variables not defined");
      return;
    }
    var outputList = [];
    for (var i = 0; i < tempOutDis.length; i++) {
      outputList.push(tempOutDis[i] + ": " + outTimeHour(tempOutDis[i] * unitTime));
    }
    return outputList.join("\n");
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