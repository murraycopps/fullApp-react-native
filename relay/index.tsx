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
import { outTime } from "../scripts";
import TimeInput from "../components/TimeInput";

export default function Relay() {
  const [times, setTimes] = useState([0, 0, 0, 0]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(outTime(times.reduce((a, b) => a + b, 0)));
  }, [times]);

  const insertAtIndex = (value: any, index: number) => {
    if (value === "") value = 0;
    const newArray = [...times];
    newArray[index] = parseFloat(value);
    setTimes(newArray);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />

          {times.map((t, i) => (
            <TimeInput
              time={t}
              setTime={(time) => insertAtIndex(time, i)}
              style={{ maxHeight: 80, minHeight: 30, marginBottom: 1 }}
              key={i}
            />
          ))}

          <View style={styles.output}>
            <Text style={styles.outputText}>{output}</Text>
          </View>

          <View
            style={[
              styles.buttonBox,
              { marginBottom: windowWidth / 40, marginTop: windowWidth / 80 },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setTimes((oldValue) =>
                  oldValue.length < 10 ? [...oldValue, 0] : [...oldValue]
                )
              }
            >
              <Text style={styles.buttonText}>Add Field</Text>
            </TouchableOpacity>
            <View style={styles.gap} />
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setTimes((oldValue) =>
                  oldValue.length !== 1
                    ? [...oldValue.slice(0, -1)]
                    : [...oldValue]
                )
              }
            >
              <Text style={styles.buttonText}>Remove Field</Text>
            </TouchableOpacity>
            <View style={styles.gap} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setTimes([0, 0, 0, 0])}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const scale = windowWidth / 320;

var outputSize = 5.5;

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
    justifyContent: "center",
    flexDirection: "row",
    minHeight: 45,
    maxHeight: 80,
  },
  output: {
    flex: 6.5,
    margin: windowWidth / 160,
    width: 0.95 * windowWidth,
    backgroundColor: "#fff",
    zIndex: -5,
    position: "relative",
    borderRadius: 30,
  },
  half: {
    width: "50%",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  gap: {
    width: windowWidth / 80,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    zIndex: -1,
    borderRadius: 100,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  outputText: {
    fontSize: normalize(35),
    textAlign: "center",
    marginTop: 15,
    marginLeft: 15,
  },
});
