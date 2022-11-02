import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getOutputs } from './scripts.js';

export default function TimeConversion({ settings }) {
  const [isTime, setIsTime] = useState(true);
  const [hour, setHour] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [dis, setDis] = useState(1);
  const [speed, setSpeed] = useState('');
  const [unitDis, setUnitDis] = useState('');
  const [output, setOutput] = useState('');
  const [labels, setLabels] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1609.34);
  const [items, setItems] = useState([
    { label: 'mi', value: 1609.34 },
    { label: 'km', value: 1000 },
    { label: 'm', value: 1 },
    { label: 'mar', value: 42195 },
  ]);

  useEffect(() => {
    if(isTime) setUnitDis(value * dis);
    else setUnitDis(value);
  }, [value, dis]);

  useEffect(() => {
    var time = hour * 3600 + min * 60 + sec * 1;
    setLabels(getOutputs( time , unitDis, speed, isTime)["labels"].join('\n'));
    setOutput(getOutputs( time , unitDis, speed, isTime)["values"].join('\n'));
  }, [isTime, hour, min, sec, unitDis, speed]);

  useEffect(() => {
    if(value == 42195) setValue(1609.34);
    setItems(isTime ? [
      { label: 'mi', value: 1609.34 },
      { label: 'km', value: 1000 },
      { label: 'm', value: 1 },
      { label: 'mar', value: 42195 },
    ]:[
      { label: 'mph', value: 1609.34 },
      { label: 'kph', value: 1000 },
      { label: 'm/s', value: 1 },
    ]);
  }, [isTime]);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          {isTime ? <>
            <View style={styles.buttonBox}>
              <TextInput
                style={[styles.timeInput, styles.left]}
                placeholder="Hour"
                placeholderTextColor="#878787"
                keyboardType="numeric"
                onChangeText={newText => setHour(newText)}
                defaultValue={hour}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="Min"
                placeholderTextColor="#878787"
                keyboardType="numeric"
                onChangeText={newText => setMin(newText)}
                defaultValue={min}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={[styles.timeInput, styles.right]}
                placeholder="Sec"
                placeholderTextColor="#878787"
                keyboardType="numeric"
                onChangeText={newText => setSec(newText)}
                defaultValue={sec}
              />
            </View>
            <View style={styles.buttonBox}>
              <View style={[styles.half, { flex: 6, borderBottomRightRadius: 0, borderTopRightRadius: 0 }]}>
                <TextInput style={styles.disInput} placeholder="Distance" placeholderTextColor="#878787" keyboardType="numeric" onChangeText={newText => setDis(newText)} defaultValue={dis} />
              </View>
              <View style={[styles.half, { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }]}>
                <DropDownPicker style={styles.dropDown}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </View></> :
            <View style={styles.buttonBox}>
              <View style={[styles.half, { flex: 6, borderBottomRightRadius: 0, borderTopRightRadius: 0 }]}>
                <TextInput style={styles.disInput} placeholder="Speed" placeholderTextColor="#878787" keyboardType="numeric" onChangeText={newText => setSpeed(newText)} defaultValue={speed} />
              </View>
              <View style={[styles.half, { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }]}>
                <DropDownPicker style={styles.dropDown}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </View>}
          <View style={styles.output}>
            <Text style={styles.outputText}>{labels}</Text>
            <Text style={[styles.outputText, { textAlign: 'right' }]}>{output}</Text>
          </View>
          <View style={[styles.buttonBox, { zIndex: -5, marginBottom: windowWidth / 40 }]}>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => setIsTime(!isTime)}
              underlayColor='#fff'>
              <Text style={styles.buttonText}>Switch to {isTime ? <Text>Time</Text> : <Text>Speed</Text>}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scale = windowWidth / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F65900',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonBox: {
    flex: 1,
    margin: windowWidth / 80,
    width: '95%',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  output: {
    flex: 9,
    margin: windowWidth / 80,
    width: 0.95 * windowWidth,
    backgroundColor: '#fff',
    zIndex: -1,
    borderRadius: 30,
    flexDirection: 'row',
  },
  half: {
    // width: '49%',
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  halfButton: {
    width: '49%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  gap: {
    width: '2%',
  },
  fullButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    zIndex: -5,
    borderRadius: 50,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  timeInput: {
    // width: '48%',
    flex: 48,
    height: '100%',
    backgroundColor: "#fff",
    color: 'black',
    fontSize: normalize(20),
    textAlign: 'center',

  },
  disInput: {
    height: '100%',
    width: '100%',
    color: 'black',
    fontSize: normalize(20),
    textAlign: 'center',
  },
  left: {
    paddingLeft: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  right: {
    paddingRight: 10,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  colon: {
    // width: '4%',
    flex: 8,
    height: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: normalize(35),
    backgroundColor: '#fff',
  },
  dropDown: {
    height: '100%',
    borderRadius: 0,
    borderWidth: 0,
    zIndex: 1000,
    borderRadius: 50,
  },
  custom: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  customInput: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    // backgroundColor: "#fff",
    fontSize: normalize(20),
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    textAlign: 'center',
  },
  icon: {
    fontSize: normalize(30),
    height: '100%',
    textAlign: 'center',
    color: 'red',
    justifyContent: 'center',
    // backgroundColor: "#fff",
    paddingTop: '6%',
    paddingBottom: '6%',
    paddingRight: '1%',
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


});
