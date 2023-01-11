import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TimeInput from "../components/TimeInput";
import { outTime } from "../scripts";
import Dropdown from "../components/Dropdown";

export default function Pacing() {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);
  const [isLong, setIsLong] = useState(false);
  const [custom, setCustom] = useState(0);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const inputDistances = [
    { value: 200 },
    { value: 400 },
    { value: 800 },
    { value: 1500 },
    { label: "Mile", value: 1609.34 },
    { label: "3k", value: 3000 },
    { label: "2 Mile", value: 3218.69 },
    { label: "5k", value: 5000 },
    { label: "10k", value: 10000 },
    { label: "Half Marathon", value: 21097 },
    { label: "Marathon", value: 42195 },
    { label: "Custom", value: -1 },
  ];

  useEffect(() => {
    const outputDistances = [
      { value: 100, max: 3218.69, min: 0 },
      { value: 200, max: 5000, min: 0 },
      { value: 400, max: 10000, min: 0 },
      { value: 600, max: 4000, min: 0 },
      { value: 800, max: 20000, min: 0 },
      { value: 1000, max: 10000, min: 0 },
      { value: 1200, max: 3218.69, min: 1200 },
      { value: 1500, max: 40000, min: 0 },
      { value: 1600, max: 1609.34, min: 1600 },
      { value: 1609.34, max: 50000, min: 0 },
      { value: 2000, max: 3218.69, min: 2000 },
      { value: 2400, max: 3218.69, min: 2400 },
      { value: 2800, max: 3218.69, min: 2800 },
      { value: 3000, max: 50000, min: 200 },
      { value: 3218.69, max: 50000, min: 200 },
      { value: 5000, max: 50000, min: 400 },
      { value: 10000, max: 50000, min: 1500 },
      { value: 21097.5, max: 50000, min: 5000 },
      { value: 42195, max: 50000, min: 5000 },
    ];

    if (distance === -1) {
      setIsCustomOpen(true);
    }
    if (distance <= 0 || time <= 0) {
      setOutput([""]);
    } else if (isLong) {
      const filteredList = outputDistances.filter((item) => {
        const isSplitOption =
          item.value === 1200 ||
          item.value === 2000 ||
          item.value === 2400 ||
          item.value === 2800;
        const isInRange = item.min <= distance && item.max >= distance;
        return item.value != distance && (!isSplitOption || isInRange);
      });

      setOutput(
        filteredList.map((dist, index) => {
          return `${Math.floor(dist.value)}: ${outTime(
            (time / distance) * dist.value
          )}`;
        })
      );
    } else {
      const filteredList = outputDistances.filter((item, index) => {
        return (
          item.min <= distance && item.max >= distance && item.value != distance
        );
      });
      setOutput(
        filteredList.map((dist) => {
          return `${Math.floor(dist.value)}: ${outTime(
            (time / distance) * dist.value
          )}`;
        })
      );
    }
  }, [distance, time, isLong]);

  useEffect(() => {
    if (custom > 0) {
      setDistance(custom);
    }
  }, [custom]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          <View style={styles.buttonBox}>
            <TimeInput
              time={time}
              setTime={setTime}
              showHour={distance === 42195 || distance === 21097.5 || distance === -1}
            />
            <View style={styles.gap} />
            <View style={styles.half}>
              {!isCustomOpen ? (
                <Dropdown
                  placeholder="Select Distance"
                  items={inputDistances}
                  value={distance}
                  setValue={setDistance}
                />
              ) : (
                <View style={styles.custom}>
                  <TextInput
                    style={styles.customInput}
                    keyboardType="numeric"
                    defaultValue={custom.toString()}
                    onChangeText={(text) => {
                      if (text !== "") setCustom(parseInt(text));
                    }}
                  />
                  <FontAwesome
                    style={styles.icon}
                    name="ban"
                    onPress={() => {
                      setIsCustomOpen(false);
                      setDistance(0);
                    }}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.output}>
            <Text
              style={[styles.outputText, isLong && { fontSize: normalize(23) }]}
            >
              {output.join("\n")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsLong(!isLong)}
            style={[styles.switch, isLong ? styles.left : null]}
            activeOpacity={1}
          >
            <Text
              style={[
                {
                  position: "absolute",
                  width: "100%",
                },
                isLong
                  ? {
                      textAlign: "left",
                    }
                  : {
                      textAlign: "right",
                    },
              ]}
            >
              {isLong ? "Show Less" : "Show More"}
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
    width: "95%",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 100,
    gap: windowWidth / 80,
  },
  output: {
    flex: 9,
    margin: windowWidth / 80,
    backgroundColor: "#fff",
    zIndex: -1,
    borderRadius: 30,
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
    flex: 48,
    height: "100%",
    backgroundColor: "#fff",
    color: "black",
    fontSize: normalize(20),
    textAlign: "center",
  },
  colon: {
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
    paddingTop: "6%",
    paddingBottom: "6%",
    paddingRight: "1%",
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  outputText: {
    width: "100%",
    fontSize: normalize(26),
    marginTop: 15,
    marginLeft: 15,
  },
  gap: {
    width: windowWidth / 40,
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
    marginBottom: windowWidth / 80,
    flex: 1.25,
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
