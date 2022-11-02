import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import calc from './scripts.js';

export default function Pacing({ settings }) {
  const [isPace, setPaceOrSplit] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Custom', value: 'custom' },
    { label: '800', value: 800 },
    { label: '1000', value: 1000 },
    { label: '1500', value: 1500 },
    { label: 'Mile', value: 1609.34 },
    { label: '3k', value: 3000 },
    { label: 'Two Mile', value: 3218.68 },
    { label: '5k', value: 5000 },
    { label: '8k', value: 8000 },
    { label: '10k', value: 10000 },
    { label: 'Half Marathon', value: 21097.5 },
    { label: 'Marathon', value: 42195 },
  ]);
  const [minute, setMin] = useState('');
  const [second, setSec] = useState('');
  const [hour, setHour] = useState('');
  const [isCustom, setIsCustom] = useState(true);
  const [customDist, setCustomDist] = useState('');
  const [index, setIndex] = useState(-1);
  const [output, setOutput] = useState();



  useEffect(() => {
    setOutput(calc(index, hour, minute, second, customDist, isPace, settings));
  }, [isPace, value, hour, minute, second, customDist, index]);



  const toggleCustom = () => {
    if (isCustom && value == 'custom') {
      setIsCustom(false);
      setValue(-1);
    }
    else {
      setIsCustom(true);
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].value == value) {
        setIndex(i);
      }
    }
  }
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar style="auto" />
          <View style={styles.buttonBox}>
            <View style={[styles.half, value == '42195' || value == '21097.5' ? { flex: 3 } : null]}>
              {value == '42195' || value == '21097.5' ?
                <><TextInput
                  style={[styles.timeInput, styles.left]}
                  placeholder="Hour"
                  placeholderTextColor="#878787"
                  keyboardType="numeric"
                  onChangeText={newText => setHour(newText)}
                  defaultValue={hour}
                />
                  <Text style={styles.colon}>:</Text></>
                : null}
              <TextInput
                style={[styles.timeInput, value == '42195' || value == '21097.5' ? null : styles.left]}
                placeholder="Min"
                placeholderTextColor="#878787"
                keyboardType="numeric"
                onChangeText={newText => setMin(newText)}
                defaultValue={minute}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={[styles.timeInput, styles.right]}
                placeholder="Sec"
                placeholderTextColor="#878787"
                keyboardType="numeric"
                onChangeText={newText => setSec(newText)}
                defaultValue={second}
              />
            </View>
            <View style={styles.gap}></View>
            <View style={styles.half}>
              {isCustom ? <DropDownPicker
                placeholder='Distance'
                style={styles.dropDown}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setIndex={setIndex}
                setItems={setItems}
                onChangeValue={toggleCustom}
              /> : <View style={styles.custom}>
                <TextInput style={styles.customInput} onChangeText={newText => setCustomDist(newText)} />
                <FontAwesome style={styles.icon} name='ban' onPress={toggleCustom} />
              </View>


              }
            </View>

          </View>
          <View style={styles.output}>
            <Text style={styles.outputText}>{output}</Text>
          </View>
          <View style={[styles.buttonBox, { zIndex: -5, marginBottom: windowWidth / 40 }]}>
            <TouchableOpacity
              style={styles.fullButton}
              onPress={() => setPaceOrSplit(!isPace)}
              underlayColor='#fff'>
              <Text style={styles.buttonText}>Switch to {isPace ? <Text>Pace</Text> : <Text>Split</Text>}</Text>
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
    width: '100%',
    fontSize: normalize(25),
    marginTop: 15,
    marginLeft: 15,
  },


});
