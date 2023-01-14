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
import { outTime } from "../scripts";
import { DISTANCES, vdotTable } from "../scripts/vdot-table";
import TimeInput from "../components/TimeInput";
import Dropdown from "../components/Dropdown";

type OutputType = {
  labels: string[];
  values: string[];
};

export default function Vdot({ isImperial }) {
  const [value, setValue] = useState("");
  const [vdot, setVDOT] = useState({ vdot: "", precise: 0, percentOff: 0 });
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState<OutputType>({ labels: [], values: [] });
  const [isRace, setIsRace] = useState(true);
  const [isPace, setIsPace] = useState(false);
  const [outOfRange, setOutOfRange] = useState(false);

  useEffect(() => {
    if (value === "" || time === 0) {
      setOutput({ labels: [], values: [] });
      setVDOT({ vdot: "", precise: 0, percentOff: 0 });
      setOutOfRange(false);
      return;
    }
    const distance = DISTANCES.find((d) => d.value === value);
    if (distance) {
      const distanceTable =
        vdotTable.TIMES[distance.value as keyof typeof vdotTable.TIMES];
      const distanceArray = Object.entries(distanceTable);
      const closestTime = distanceArray.reduce((prev, curr) => {
        return Math.abs(curr[1] - time) < Math.abs(prev[1] - time)
          ? curr
          : prev;
      });
      const closestVdot = parseInt(closestTime[0]);
      const percentDiff = closestTime[1] / time;
      const preciseVdot = closestVdot * percentDiff;
      console.log(closestVdot, percentDiff, preciseVdot);
      setVDOT({
        vdot: closestVdot.toString(),
        precise: preciseVdot,
        percentOff: percentDiff,
      });
      if (
        (closestVdot === 85 && percentDiff > 1) ||
        (closestVdot === 30 && percentDiff < 1)
      ) {
        setOutOfRange(true);
      } else {
        setOutOfRange(false);
      }
    }
  }, [value, isRace, isPace, time]);

  useEffect(() => {
    if (
      vdot.precise === 0 ||
      vdot.vdot === "" ||
      vdot.precise < 10 ||
      vdot.precise > 100
    ) {
      setOutput({ labels: [], values: [] });
      return;
    }
    console.log(vdot);
    if (isRace) {
      const timesList = vdotTable.TIMES;
      const vdotArray = Object.entries(timesList);
      const labels = vdotArray.map((d) => {
        const distance = DISTANCES.find((dist) => dist.value === d[0]);
        const distanceLabel = distance?.label || distance?.value;
        return distanceLabel + ":";
      });
      const values = vdotArray.map((d) => {
        const distance = DISTANCES.find((dist) => dist.value === d[0]);
        const currentDistance = distance?.distance || 1;
        const time =
          d[1][vdot.vdot as keyof typeof d[1]] /
          (isPace ? currentDistance / 1609.34 : 1);
        return outTime(time / vdot.percentOff);
      });
      setOutput({ labels, values });
    } else {
      const vdotObject =
        vdotTable.PACES[vdot.vdot as keyof typeof vdotTable.PACES];
      const vdotArray = Object.entries(vdotObject);
      const labels = [
        "Easy",
        "Marathon",
        "Threshold",
        "Interval",
        "Repitition",
      ];
      console.log(vdotArray);
      const values = vdotArray.map((d, i) => {
        const time = d[1][i < 3 ? "mile" : "400m"];
        if (i > 2) {
          return `${outTime(time / vdot.percentOff)} (${outTime(
            (time / vdot.percentOff) * 4.02335
          )})`;
        }
        if (i != 0) {
          return `${outTime(time / vdot.percentOff)}`;
        }
        return `${outTime(time / vdot.percentOff - 13)} - ${outTime(
          time / vdot.percentOff + 27
        )}`;
      });

      setOutput({ labels, values });
    }
  }, [vdot, isRace, isPace]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          <View style={styles.buttonBox}>
            <TimeInput
              time={time}
              setTime={setTime}
              showHour={
                value === "DISTANCE_MARATHON" ||
                value === "DISTANCE_HALF" ||
                value === "DISTANCE_15k"
              }
            />
            <View style={styles.gap}></View>
            <View style={styles.half}>
              <Dropdown
                placeholder="Select Distance"
                items={DISTANCES}
                value={value}
                setValue={setValue}
              />
            </View>
          </View>
          <View style={styles.output}>
            {vdot.precise !== 0 && vdot.precise < 100 && vdot.precise > 10 ? (
              <>
                <Text style={styles.vdotText}>
                  Vdot: {vdot.precise.toFixed(2)}
                </Text>
                <View style={styles.labelBox}>
                  <Text
                    style={[
                      styles.outputText,
                      isRace ? { flex: 3 } : { flex: 2 },
                    ]}
                  >
                    {output.labels.join("\n")}
                  </Text>
                  <Text
                    style={[
                      styles.outputText,
                      isRace ? { flex: 2 } : { flex: 3 },
                      {
                        textAlign: "right",
                      },
                    ]}
                  >
                    {output.values.join("\n")}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
          <View
            style={[
              styles.buttonBox,
              { zIndex: -5, marginBottom: windowWidth / 40 },
            ]}
          >
            <TouchableOpacity
              onPress={() => setIsRace(!isRace)}
              style={[styles.switch, !isRace ? styles.left : null]}
              activeOpacity={1}
            >
              <Text
                style={[
                  {
                    position: "absolute",
                    width: "100%",
                  },
                  !isRace
                    ? {
                        textAlign: "left",
                      }
                    : {
                        textAlign: "right",
                      },
                ]}
              >
                {isRace ? "Show Training" : "Show Race"}
              </Text>
              <View style={styles.switchItem} />
            </TouchableOpacity>
            <View style={styles.gap} />
            <TouchableOpacity
              onPress={() => { if(isRace) setIsPace(!isPace)}}
              style={[styles.switch, isPace && isRace ? styles.left : null]}
              activeOpacity={1}
            >
              <Text
                style={[
                  {
                    position: "absolute",
                    width: "100%",
                  },
                  isPace && isRace
                    ? {
                        textAlign: "left",
                      }
                    : {
                        textAlign: "right",
                      },
                ]}
              >
                {isPace && isRace ? "Show Time" : "Show Pace"}
              </Text>
              <View style={styles.switchItem} />
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
  vdotText: {
    flex: 1,
    width: "100%",
    fontSize: normalize(40),
    textAlign: "center",
    marginTop: 15,
    marginLeft: 15,
  },

  outputText: {
    fontSize: normalize(25),
    flex: 6,
  },

  labelBox: {
    flex: 6,
    flexDirection: "row",
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
    margin: windowWidth / 80,
    flex: 1.25,
    paddingHorizontal: 10,
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
