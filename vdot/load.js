import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect, useRef } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as vdot from './scripts.js';
import { DISTANCES, vdotTable } from './table.js';

export default function Vdot() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '1500', value: 1500 },
        { label: 'Mile', value: 1609.34 },
        { label: '3000', value: 3000 },
        { label: 'Two Mile', value: 3218.68 },
        { label: '5k', value: 5000 },
        { label: '10k', value: 10000 },
        { label: '15k', value: 15000 },
        { label: 'Half Marathon', value: 21097.5 },
        { label: 'Marathon', value: 42195 },
    ]);


    const [minute, setMin] = useState('');
    const [second, setSec] = useState('');
    const [index, setIndex] = useState(-1);
    const [myVdot, setVdot] = useState();
    const [label, setLabel] = useState();
    const [output, setOutput] = useState();
    const [isRace, setRace] = useState(false);
    const [isTime, setTime] = useState(false);
    const [isTimeOverride, setTimeOverride] = useState(false);

    const raceToggleRef = useRef(null);
    const [raceToggleButton, setRaceToggleButton] = useState();
    useEffect(() => {
        var distance;
        if (index != -1) {
            distance = DISTANCES[index];
            var myVdotTemp = vdot.findVdot(minute * 60 + second * 1, distance);
            setVdot("Vdot: " + myVdotTemp["vdotDec"]);

            var outputs = vdot.extractVdotTimes(myVdotTemp, isRace, isTime);
            setOutput(outputs.join('\n'));

            var outputLables = vdot.getVdotLables(isRace);
            setLabel(outputLables.join('\n'));
        }
    }, [isRace, index, minute, second, isTime]);


    useEffect(() => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].value == value) {
                setIndex(i);
            }
        }
    }, [value])

    useEffect(() => {
        setRaceToggleButton(raceToggleRef.current);
    }, [])

    const changeVariables = event => {
        if (raceToggleRef.current == event.target) {
            if (!isRace) {
                setTime(true);
            }
            else if (!isTimeOverride) {
                setTime(false);
            }
            isRace ? setRace(false) : setRace(true);
        }
        else if (!isRace) {
            isTime ? setTime(false) : setTime(true);
            isTimeOverride ? setTimeOverride(false) : setTimeOverride(true);

        }


    }
    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar style="auto" />
            <View style={styles.buttonBox}>
                <View style={styles.half}>
                    <TextInput
                        style={styles.timeInput}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={newText => setMin(newText)}
                        defaultValue={minute}
                    />
                    <Text style={styles.colon}>:</Text>
                    <TextInput
                        style={styles.timeInput}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={newText => setSec(newText)}
                        defaultValue={second}
                    />
                </View>
                <View style={styles.half}>
                    <DropDownPicker
                        style={styles.dropDown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    // onChangeValue={}
                    />




                </View>

            </View>
            <View style={[styles.buttonBox, { zIndex: -5 }]}>
                <TouchableOpacity
                    style={styles.halfButton}
                    onPress={changeVariables}
                    ref={raceToggleRef}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>{isRace ? <Text>Training</Text> : <Text>Race</Text>}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.halfButton}
                    onPress={changeVariables}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>{isTime ? <Text>Pace</Text> : <Text>Time</Text>}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.output}>
                <Text style={styles.vdotText}>{myVdot}</Text>
                <View style={styles.labelBox}>
                    <Text style={styles.labelOutput}>{label}</Text>
                    <Text style={styles.outputText}>{output}</Text>
                </View>
            </View>

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
    },
    output: {
        flex: 9,
        margin: windowWidth / 80,
        width: .95 * windowWidth,
        backgroundColor: '#fff',
        zIndex: -5,
    },
    half: {
        width: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    halfButton: {
        width: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        zIndex: -1,
    },
    fullButton: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    timeInput: {
        width: '48%',
        height: '100%',
        backgroundColor: "#fff",
        color: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: normalize(20),
    },
    colon: {
        width: '4%',
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
        borderColor: '#fff',
        zIndex: 1000,
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
        backgroundColor: "#fff",
        fontSize: normalize(20),
    },
    icon: {
        fontSize: normalize(30),
        height: '100%',
        textAlign: 'center',
        color: 'red',
        justifyContent: 'center',
        backgroundColor: "#fff",
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    vdotText: {
        flex: 1,
        width: '100%',
        fontSize: normalize(40),
        textAlign: 'center',
    },
    labelBox: {
        flex: 6,
        flexDirection: 'row',
    },
    labelOutput: {
        fontSize: normalize(25),
        flex: 3,
    },
    outputText: {
        fontSize: normalize(25),
        flex: 2,
        textAlign: 'right',
    }


});
