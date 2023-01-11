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
import { useState, useEffect, useRef } from "react";
import { outTime } from "../scripts";
import TimeInput from "../components/TimeInput";

export default function Unusual() {
  const [inputDistance, setInputDistance] = useState(0);
  const [outputDistances, setOutputDistances] = useState([0]);
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);


  useEffect(() => {
    if (inputDistance <= 0 || time <= 0) return;
    setOutput(
      outputDistances.map((o) => {
        return o + ": " + outTime((o / inputDistance) * time);
      })
    );
  }, [outputDistances, inputDistance, time]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          <View style={styles.buttonBox}>
            <TextInput
              keyboardType="numeric"
              placeholder="Input Distance"
              placeholderTextColor="#878787"
              value={inputDistance !== 0 ? inputDistance.toString() : ''}
              defaultValue=''
              onChangeText={(text) => {
                if (text !== "") setInputDistance(parseFloat(text));
              }}
              style={styles.fullInput}
            />
          </View>
          <View style={styles.buttonBox}>
            <TimeInput time={time} setTime={setTime} />
          </View>
          <View style={styles.buttonBox}>
            <TextInput
              keyboardType="numeric"
              placeholder="Output Distance"
              placeholderTextColor="#878787"
              value={outputDistances[outputDistances.length - 1] !== 0 ? outputDistances[outputDistances.length - 1].toString() : ''}
              
              onChangeText={(text) => {
                if (text !== "")
                  setOutputDistances((oldValue) => [
                    ...oldValue.slice(0, -1),
                    parseFloat(text),
                  ]);
              }}
              style={styles.fullInput}
            />
          </View>
          <View style={styles.output}>
            <Text style={styles.outputText}>{output.join("\n")}</Text>
          </View>
          <View
            style={[
              styles.buttonBox,
              { marginBottom: windowWidth / 40, marginTop: windowWidth / 80 },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setOutputDistances((oldValue) => [...oldValue, 0]);
              }}
            >
              <Text style={styles.buttonText}>Add Distance</Text>
            </TouchableOpacity>
            <View style={styles.gap} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (outputDistances.length !== 1) {
                  setOutputDistances((oldValue) => [...oldValue.slice(0, -1)]);
                  outputDistances[outputDistances.length - 2].toString();
                }
              }}
            >
              <Text style={styles.buttonText}>Remove Distance</Text>
            </TouchableOpacity>
            <View style={styles.gap} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setOutputDistances([0]);
              }}
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
  },
  output: {
    flex: 7.5,
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
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#fff",
    zIndex: 1000,
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
    backgroundColor: "#fff",
    fontSize: normalize(20),
  },
  icon: {
    fontSize: normalize(30),
    height: "100%",
    textAlign: "center",
    color: "red",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  outputText: {
    fontSize: normalize(25),
    marginTop: 15,
    marginLeft: 15,
  },
  plus: {
    fontSize: normalize(30),
    position: "absolute",
    right: 4,
    top: 4,
  },

  button: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  gap: {
    width: windowWidth / 80,
  },
});
