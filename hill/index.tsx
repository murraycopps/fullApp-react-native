import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
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

export default function Hill({ isImperial }) {
  const [time, setTime] = useState(0);

  const [elevation, setElevation] = useState(0);
  const [output, setOutput] = useState("");
  const [isPrediction, setIsPrediction] = useState(false);

  useEffect(() => {
    let newTime = time;
    if (!isPrediction) newTime -= (1.74 * elevation) / 10;
    else newTime += (1.74 * elevation) / 10;
    newTime = Math.max(newTime, 0);
    newTime = Math.round(newTime * 100) / 100;
    setOutput(outTime(newTime));
  }, [time, elevation, isPrediction]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          <View style={styles.buttonBox}>
            <TimeInput time={time} setTime={setTime} showHour={false} />
            <View style={styles.gap}/>
            <View style={styles.half}>
              <TextInput
                style={styles.input}
                placeholder="Elevation"
                placeholderTextColor="#878787"
                keyboardType="numeric"
                onChangeText={(newText) => setElevation(parseInt(newText))}
                defaultValue={elevation.toString()}
              />
            </View>
          </View>

          <View style={styles.output}>
            <Text style={styles.outputText}>Final Time: {output}</Text>
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
    margin: windowWidth / 80,
    width: "95%",
    justifyContent: "center",
    flexDirection: "row",
  },
  output: {
    flex: 9,
    margin: windowWidth / 80,
    width: 0.95 * windowWidth,
    backgroundColor: "#fff",
    zIndex: -5,
    borderRadius: 30,
  },
  half: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  gap: {
    width: "2%",
  },
  halfButton: {
    width: "49%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    zIndex: -1,
    borderRadius: 50,
  },
  fullButton: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
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
  left: {
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 10,
  },
  right: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    paddingRight: 10,
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
  input: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    fontSize: normalize(20),
    borderRadius: 50,
    paddingLeft: 20,
  },
  outputText: {
    fontSize: normalize(25),
    margin: 20,
  },
});
