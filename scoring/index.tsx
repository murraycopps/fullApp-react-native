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
import { getXCScores, getTrackScores } from "./scripts";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Dropdown from "../components/Dropdown";

export default function Scoring() {
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isTrack, setIsTrack] = useState(true);
  const [scores, setScores] = useState<any>(null);
  const [numEvents, setNumEvents] = useState(0);
  const [custom, setCustom] = useState(false);
  const [index, setIndex] = useState(-1);

  const inputRefs = Array(10)
    .fill(0)
    .map((_, i) => React.createRef<TextInput>());

  const eventOptions = [
    { label: "Indoor - 10 Events", value: 10 },
    { label: "Outdoor - 16 Events", value: 16 },
    { label: "Professional - 21 Events", value: 21 },
    { label: "Custom", value: 0 },
  ];

  const insertAtIndex = (value: any, index: number) => {
    if (value === "") value = 0;
    const newArray = [...inputs];
    newArray[index] = parseFloat(value);
    setInputs(newArray);
  };

  useEffect(() => {
    setInputs(isTrack ? [0, 0, 0, 0, 0, 0] : [0, 0, 0]);
    if (!inputRefs[0].current) return;
    inputRefs.forEach((ref: any) => {
      if (ref.current) ref.current.value = "";
    });
  }, [isTrack]);

  useEffect(() => {
    if (isTrack) {
      const scores = getTrackScores(inputs, numEvents);
      setScores(scores);
    } else {
      const scores = getXCScores(inputs);
      setScores(scores);
    }
  }, [inputs, numEvents, isTrack]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          <View style={{ flex: isTrack ? 4 : 7, marginBottom: 5 }}>
            {isTrack ? (
              <>
                <View style={{ flex: 1, zIndex: 1000, position: "relative" }}>
                  {!custom ? (
                    <Dropdown
                      placeholder="Number of Events"
                      items={eventOptions}
                      value={numEvents}
                      setValue={(value) => {
                        setNumEvents(value);
                        setCustom(value === 0);
                      }}
                    />
                  ) : (
                    <>
                      <TextInput
                        style={[styles.input, { marginTop: 0 }]}
                        placeholder="Number of Events"
                        placeholderTextColor="#878787"
                        keyboardType="numeric"
                        onChangeText={(value) => setNumEvents(parseInt(value))}
                      />
                      <FontAwesome
                        style={styles.icon}
                        name="ban"
                        onPress={() => {
                          setCustom(false);
                          setNumEvents(0);
                        }}
                      />
                    </>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Number of Firsts"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 0)}
                  ref={inputRefs[0]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Number of Seconds"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 1)}
                  ref={inputRefs[1]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Number of Thirds"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 2)}
                  ref={inputRefs[2]}
                />
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="First Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 0)}
                  ref={inputRefs[3]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Second Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 1)}
                  ref={inputRefs[4]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Third Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 2)}
                  ref={inputRefs[5]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Fourth Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 3)}
                  ref={inputRefs[6]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Fifth Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 4)}
                  ref={inputRefs[7]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Sixth Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 5)}
                  ref={inputRefs[8]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Seventh Place"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={(value) => insertAtIndex(value, 6)}
                  ref={inputRefs[9]}
                />
              </>
            )}
          </View>
          <View style={[styles.output, { flex: !isTrack ? 3.5 : 6.5 }]}>
            <Text style={styles.outputText}>{scores}</Text>
          </View>

          <View
            style={[
              styles.buttonBox,
              { marginBottom: windowWidth / 40, marginTop: windowWidth / 80 },
            ]}
          >
            <TouchableOpacity
              style={styles.halfButton}
              onPress={() => setIsTrack(!isTrack)}
            >
              <Text style={styles.buttonText}>{isTrack ? "Track" : "XC"}</Text>
            </TouchableOpacity>
            <View style={styles.gap}></View>
            <TouchableOpacity style={styles.halfButton}>
              <Text style={styles.buttonText}>Reset</Text>
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
    borderRadius: 50,
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
    fontSize: normalize(20),
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    textAlign: "center",
  },
  icon: {
    fontSize: normalize(30),
    textAlign: "center",
    color: "red",
    position: "absolute",
    right: 5,
    top: 8,
    boxSizing: "border-box",
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
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginTop: 1,
    paddingLeft: 10,
  },
});
