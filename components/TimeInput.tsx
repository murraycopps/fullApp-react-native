import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
  PixelRatio,
  Platform,
} from "react-native";

type TimeInputProps = {
  time: number;
  setTime: (time: number) => void;
  showHour?: boolean;
  style?: any;
};

export default function TimeInput({
  time,
  setTime,
  showHour = true,
  style = {},
}: TimeInputProps) {
  const [hour, setHour] = useState(Math.floor(time / 3600));
  const [min, setMin] = useState(Math.floor((time / 60) % 60));
  const [sec, setSec] = useState(time % 60);
  useEffect(() => {
    if (hour < 0) setHour(0);
    if (min < 0) setMin(0);
    if (sec < 0) setSec(0);
    setTime(hour * 3600 + min * 60 + sec);
  }, [hour, min, sec]);

  useEffect(() => {
    setHour(Math.floor(time / 3600));
    setMin(Math.floor((time / 60) % 60));
    setSec(time % 60);
  }, [time]);

  return (
    <View style={[styles.container, style]}>
      {showHour && (
        <>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="hh"
            placeholderTextColor="#878787"
            defaultValue={hour != 0 ? hour.toString() : ""}
            onChangeText={(text) => {
              if (text != "") setHour(parseFloat(text));
              else setHour(0);
            }}
          />
          <Text style={styles.text}>:</Text>
        </>
      )}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        defaultValue={min != 0 ? min.toString() : ""}
        placeholder="mm"
        placeholderTextColor="#878787"
        onChangeText={(text) => {
          if (text != "") setMin(parseFloat(text));
          else setMin(0);
        }}
      />
      <Text style={styles.text}>:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        defaultValue={sec != 0 ? sec.toString() : ""}
        placeholder="ss"
        placeholderTextColor="#878787"
        onChangeText={(text) => {
          if (text != "") setSec(parseFloat(text));
          else setSec(0);
        }}
      />
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const scale = windowWidth / 320;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 1000,
  },
  input: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
    fontSize: 22,
    textAlign: "center",
    color: "inherit",
  },
  text: {
    display: "flex",
    alignItems: "center",
    fontSize: normalize(35),
  },
});
