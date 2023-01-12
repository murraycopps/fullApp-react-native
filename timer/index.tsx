import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PixelRatio,
  TextInput,
  Platform,
} from "react-native";
import { useState, Component, useEffect, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";
import TimerDisplay from "./TimerDisplay";
import { outTime } from "../scripts";
import Dropdown from "../components/Dropdown";

export default function Timer() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerDisplayed, setIsTimerDisplayed] = useState(false);

  const [disOpen, setDisOpen] = useState(false);
  const [disValue, setDisValue] = useState(null);
  const [disItems, setDisItems] = useState([
    { label: "800", value: 800 },
    { label: "Mile", value: 1609.34 },
    { label: "3k", value: 3000 },
    { label: "Two Mile", value: 3218.68 },
    { label: "5k", value: 5000 },
  ]);

  const [disChosen, setDisChosen] = useState(false);

  const [splitOpen, setSplitOpen] = useState(false);
  const [splitValue, setSplitValue] = useState(null);
  const [splitItems, setSplitItems] = useState([]);

  const [finalTime, setFinalTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const [lapTimes2, setLapTimes2] = useState([]);

  const [time, setTime] = useState(0);

  const [currentDistance, setCurrentDistance] = useState(0);

  useEffect(() => {
    if (disValue == null) return;

    setDisChosen(true);
    setSplitValue(null);

    if (disValue == 800) {
      setSplitItems([
        { label: "Every 200m", value: 200 },
        { label: "Every 400m", value: 400 },
      ]);
    } else if (disValue == 1609.34) {
      setSplitItems([
        { label: "Every 200m", value: 200 },
        { label: "Every 400m", value: 400 },
        { label: "Every 800m", value: 800 },
      ]);
    } else if (disValue == 3000) {
      setSplitItems([
        { label: "Every 400m", value: 400 },
        { label: "Every 800m", value: 800 },
        { label: "Every 1000m", value: 1000 },
      ]);
    } else if (disValue == 3218.68) {
      setSplitItems([
        { label: "Every 400m", value: 400 },
        { label: "Every 800m", value: 800 },
        { label: "Every Mile", value: 1609.34 },
      ]);
    } else if (disValue == 5000) {
      setSplitItems([
        { label: "Every 400m", value: 400 },
        { label: "Every 800m", value: 800 },
        { label: "Every 1000m", value: 1000 },
        { label: "Every Mile", value: 1609.34 },
      ]);
    }
  }, [disValue]);

  useEffect(() => {
    if (disValue == null) return;
    if (disOpen) setDisChosen(false);
    else setDisChosen(true);
  }, [disOpen]);

  React.useEffect(() => {
    if (splitValue == null) return;
    setIsTimerRunning(true);
    setIsTimerDisplayed(true);
  }, [splitValue]);

  React.useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 0.01);
        setLapTime((lapTime) => lapTime + 0.01);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning]);

  const reset = () => {
    setIsTimerDisplayed(false);
    setDisValue(null);
    setSplitValue(null);
    setSplitItems([]);
    setFinalTime(0);
    setTime(0);
    setLapTime(0);
    setLapTimes([]);
    setLapTimes2([]);
    setCurrentDistance(0);
    setDisChosen(false);
  };

  const roundOff = (value, precision) =>
    Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);

  const lap = () => {
    var currentDistanceTemp = roundOff(currentDistance + splitValue, 12);
    if (disValue == 1609.34 && splitValue == currentDistanceTemp)
      currentDistanceTemp += 9.34;
    if (disValue == 3218.68 && splitValue == currentDistanceTemp)
      currentDistanceTemp += 18.68;
    if (
      (disValue == 5000 || disValue == 3000) &&
      splitValue == currentDistanceTemp &&
      (splitValue == 400 || splitValue == 800)
    )
      currentDistanceTemp -= 200;
    if (disValue == 5000 && currentDistanceTemp == 4828.02)
      currentDistanceTemp = 5000;

    if (currentDistanceTemp >= disValue) setIsTimerRunning(false);

    setCurrentDistance(currentDistanceTemp);
    setFinalTime((time / currentDistanceTemp) * disValue);

    if (lapTimes.length < 6) {
      var tempLapTimes = lapTimes;
      tempLapTimes.push(outTime(lapTime));
      setLapTimes(tempLapTimes);
    } else {
      var tempLapTimes = lapTimes2;
      tempLapTimes.push(outTime(lapTime));
      setLapTimes2(tempLapTimes);
    }
    setLapTime(0);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {isTimerDisplayed ? (
          <View>
            <StatusBar style="auto" />
            <TimerDisplay style={styles.buttonBox} time={time} />
            <TimerDisplay style={styles.buttonBox} time={finalTime} />
            <TimerDisplay style={styles.buttonBox} time={lapTime} />
            <View style={styles.lapsBox}>
              <Text style={styles.lapText}>Laps:</Text>
              <View style={styles.lapLabelBox}>
                <Text style={styles.lapOutput}>{lapTimes.join("\n")}</Text>
                <Text style={styles.lapsText}>{lapTimes2.join("\n")}</Text>
              </View>
            </View>
            <View style={[styles.buttonBox, { margin: windowWidth / 80 }]}>
              {isTimerRunning ? (
                <TouchableOpacity style={styles.fullButton} onPress={lap}>
                  <Text style={styles.buttonText}>Lap</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.fullButton} onPress={reset}>
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View>
            <StatusBar style="auto" />
            <View style={{ flex: 1, zIndex: -1 }}></View>
            <View style={styles.buttonBox}>
              <Dropdown
                placeholder="Set Finish Distance"
                value={disValue}
                items={disItems}
                setValue={setDisValue}
              />
            </View>
            <View style={{ flex: 1, zIndex: -1 }}></View>
            <View style={styles.buttonBox}>
              {disChosen ? (
                <Dropdown
                  placeholder="Set Split Intervals"
                  value={splitValue}
                  items={splitItems}
                  setValue={setSplitValue}
                />
              ) : null}
            </View>
            <View style={{ flex: 5, zIndex: -1 }}></View>
          </View>
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const scale = windowWidth / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F65900",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonBox: {
    flex: 1,
    margin: 1,
    width: "95%",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  half: {
    width: "50%",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  halfButton: {
    width: "50%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    zIndex: -1,
  },
  fullButton: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: normalize(30),
  },
  timeInput: {
    width: "30.66666666666667%",
    height: "100%",
    backgroundColor: "#fff",
    color: "black",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: normalize(20),
    textAlign: "center",
  },
  left: {
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  right: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },

  fullInput: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    color: "black",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: normalize(20),
    borderRadius: 50,
  },
  colon: {
    width: "4%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontSize: normalize(35),
    backgroundColor: "#fff",
  },
  dropDown: {
    height: "100%",
    borderWidth: 0,
    zIndex: 1000,
    borderRadius: 50,
  },
  lapText: {
    flex: 1,
    width: "100%",
    fontSize: normalize(30),
    textAlign: "center",
    marginTop: 15,
    marginLeft: 15,
  },
  lapLabelBox: {
    flex: 6,
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
  },
  lapOutput: {
    fontSize: normalize(25),
    flex: 3,
    whiteSpace: "pre-wrap",
  },
  lapsText: {
    fontSize: normalize(25),
    whiteSpace: "pre-wrap",
    flex: 2,
    textAlign: "right",
  },
  lapsBox: {
    flex: 3,
    margin: windowWidth / 160,
    width: 0.95 * windowWidth,
    marginHorizontal: 0.025 * windowWidth,
    backgroundColor: "#fff",
    zIndex: -5,
    position: "relative",
    borderRadius: 30,
  },
});
