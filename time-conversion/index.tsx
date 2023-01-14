import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
  TextInput,
  Platform,
} from "react-native";
import { useState, Component, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { outTime } from "../scripts";
import TimeInput from "../components/TimeInput";
import Dropdown from "../components/Dropdown";

export default function TimeConversion({ settings }) {
  const [distance, setDistance] = useState(1);
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);
  const [isTime, setIsTime] = useState(false);
  const [disType, setDisType] = useState(1609.34);
  const [speed, setSpeed] = useState(0);

  const inputDistances = [
    { label: "Mi", value: 1609.34 },
    { label: "Km", value: 1000 },
    { label: "M", value: 1 },
    { label: "Mar", value: 42195 },
  ];

  const inputSpeeds = [
    { label: "Mph", value: 1609.34 },
    { label: "Kph", value: 1000 },
    { label: "M/s", value: 1 },
  ];

  const timeToSpeed = (distance: number, time: number, newDistance: number) => {
    return (3600 * distance) / time / newDistance;
  };

  const speedToTime = (speed: number, distance: number) => {
    if (distance != 1) return outTime(distance / speed);
    else return distance / speed;
  };

  useEffect(() => {
    if (isTime) {
      const distanceInMeters = distance * disType;
      if (distance <= 0 || time <= 0) return;
      const outputLables = [
        "Time",
        "Seconds",
        "Mph",
        "Kph",
        "M/S",
        "Mins/Mile",
        "Mins/Km",
      ];
      const outputs = [
        outTime(time),
        time,
        Math.round(timeToSpeed(distanceInMeters, time, 1609.34) * 10) / 10,
        Math.round(timeToSpeed(distanceInMeters, time, 1000) * 10) / 10,
        Math.round((timeToSpeed(distanceInMeters, time, 1) / 3600) * 100) / 100,
        outTime((time / distanceInMeters) * 1609.34),
        outTime((time / distanceInMeters) * 1000),
      ];
      setOutput(
        outputLables.map((o, i) => outputLables[i] + ": " + outputs[i])
      );
    } else {
      if (distance <= 0 || speed <= 0) return;
      if (disType === 1) {
        const outputOptions = [
          { label: "Mile Time", value: 1609.34 },
          { label: "Km Time", value: 1000 },
          { label: "Meter Time", value: 1 },
          { label: "Marathon Time", value: 42195 },
          { label: "Mph", value: 1609.34 },
          { label: "Kph", value: 1000 },
          { label: "M/S", value: 1 },
        ];
        const outputs = outputOptions.map((o, i) => {
          if (i < 4) {
            const time = speedToTime(speed, o.value);
            if (typeof time === "string") return o.label + ": " + time;
            else return o.label + ": " + time;
          }
          if (o.value === disType) return "";
          if (o.value !== 1)
            return (
              o.label +
              ": " +
              Math.round(((speed * disType) / o.value) * 3600 * 10) / 10
            );
          return (
            o.label +
            ": " +
            Math.round(((speed * disType) / o.value / 3600) * 10) / 10
          );
        });
        setOutput(outputs.filter((o) => o));
      } else {
        const outputOptions = [
          { label: "Mile Time", value: 1609.34 },
          { label: "Km Time", value: 1000 },
          { label: "M Time", value: 1 },
          { label: "Marathon Time", value: 42195 },
          { label: "Mph", value: 1609.34 },
          { label: "Kph", value: 1000 },
          { label: "M/S", value: 1 },
        ];
        const outputs = outputOptions.map((o, i) => {
          if (i < 4) {
            const time = speedToTime((speed * disType) / 3600, o.value);
            if (typeof time === "string") return o.label + ": " + time;
            else return o.label + ": " + outTime(time);
          }
          if (o.value === disType) return "";
          if (o.value !== 1)
            return (
              o.label +
              ": " +
              Math.round(((speed * disType) / o.value) * 10) / 10
            );
          return (
            o.label +
            ": " +
            Math.round(((speed * disType) / o.value / 3600) * 10) / 10
          );
        });
        setOutput(outputs.filter((o) => o));
      }
    }
  }, [disType, distance, time, speed, isTime]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          {isTime ? (
            <>
              <TimeInput
                time={time}
                setTime={setTime}
                style={{ flex: 1, marginHorizontal: windowWidth / 80 }}
              />
              <View style={styles.buttonBox}>
                <View
                  style={[
                    styles.half,
                    {
                      flex: 6,
                      borderBottomRightRadius: 0,
                      borderTopRightRadius: 0,
                    },
                  ]}
                >
                  <TextInput
                    style={styles.disInput}
                    placeholder="Distance"
                    placeholderTextColor="#878787"
                    keyboardType="numeric"
                    onChangeText={(dis) => setDistance(parseFloat(dis))}
                    defaultValue={distance.toString()}
                  />
                </View>
                <View
                  style={[
                    styles.half,
                    { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
                  ]}
                >
                  <Dropdown
                    items={inputDistances}
                    value={disType}
                    setValue={setDisType}
                  />
                </View>
              </View>
            </>
          ) : (
            <View style={styles.buttonBox}>
              <View
                style={[
                  styles.half,
                  {
                    flex: 6,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                  },
                ]}
              >
                <TextInput
                  style={styles.disInput}
                  placeholder="Speed"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(newText) => setSpeed(parseFloat(newText))}
                />
              </View>
              <View
                style={[
                  styles.half,
                  { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
                ]}
              >
                <Dropdown
                  items={inputSpeeds}
                  value={disType}
                  setValue={setDisType}
                />
              </View>
            </View>
          )}
          <View style={[styles.output, { flex: isTime ? 8 : 9}]}>
            <Text style={styles.outputText}>{output.join("\n")}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsTime(!isTime);
              setOutput([]);
            }}
            style={[styles.switch, isTime ? styles.left : null]}
            activeOpacity={1}
          >
            <Text
              style={[
                {
                  position: "absolute",
                  width: "100%",
                },
                isTime
                  ? {
                      textAlign: "left",
                    }
                  : {
                      textAlign: "right",
                    },
              ]}
            >
              Switch to {isTime ? "Speed" : "Time"}
            </Text>
            <View style={styles.switchItem} />
          </TouchableOpacity>
        </View>
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
    margin: windowWidth / 80,
    width: windowWidth * 0.95,
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 100,
  },
  output: {
    flex: 9,
    margin: windowWidth / 80,
    width: 0.95 * windowWidth,
    backgroundColor: "#fff",
    zIndex: -1,
    borderRadius: 30,
    flexDirection: "row",
  },
  half: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    position: "relative",
    zIndex: 1000,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  halfButton: {
    width: "49%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  gap: {
    width: "2%",
  },
  fullButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    zIndex: -5,
    borderRadius: 50,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  timeInput: {
    // width: '48%',
    flex: 48,
    height: "100%",
    backgroundColor: "#fff",
    color: "black",
    fontSize: normalize(20),
    textAlign: "center",
  },
  disInput: {
    height: "100%",
    width: "100%",
    color: "black",
    fontSize: normalize(20),
    textAlign: "center",
  },
  colon: {
    // width: '4%',
    flex: 8,
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
  custom: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  customInput: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    // backgroundColor: "#fff",
    fontSize: normalize(20),
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    textAlign: "center",
  },
  icon: {
    fontSize: normalize(30),
    height: "100%",
    textAlign: "center",
    color: "red",
    justifyContent: "center",
    // backgroundColor: "#fff",
    paddingTop: "6%",
    paddingBottom: "6%",
    paddingRight: "1%",
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  outputText: {
    flex: 1,
    fontSize: normalize(25),
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },

  switch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    borderRadius: 50,
    position: "relative",
    userSelect: "none",
    boxSize: "border-box",
    zIndex: -5,
    flex: 1.25,
    margin: windowWidth / 80,
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: "row-reverse",
  },
  switchItem: {
    height: "90%",
    aspectRatio: 1,
    backgroundColor: "#F65900",
    borderRadius: 1000,
  },
});
