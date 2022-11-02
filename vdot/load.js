import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Button, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as vdot from './scripts.js';
import { DISTANCES, vdotTable } from './table.js';

export default function Vdot({ isImperial }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(DISTANCES);


    const [minute, setMin] = useState('');
    const [second, setSec] = useState('');
    const [hour, setHour] = useState('');
    const [index, setIndex] = useState(-1);
    const [myVdot, setVdot] = useState();
    const [label, setLabel] = useState();
    const [output, setOutput] = useState();
    const [isRace, setRace] = useState(false);
    const [isTime, setTime] = useState(false);
    const [isTimeOverride, setTimeOverride] = useState(false);

    useEffect(() => {
        var distance;
        if (index != -1) {
            distance = DISTANCES[index];
            var myVdotTemp = vdot.findVdot(3600 * hour + minute * 60 + second * 1, distance);
            setVdot("Vdot: " + (myVdotTemp == 0 ? 0 : myVdotTemp["vdotDec"]));

            var outputs = vdot.extractVdotTimes(myVdotTemp, isRace, isTime, isImperial);
            setOutput(outputs.join('\n'));

            var outputLables = vdot.getVdotLables(isRace);
            setLabel(outputLables.join('\n'));
        }
    }, [isRace, index, hour, minute, second, isTime]);

    

    useEffect(() => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].value == value) {
                setIndex(i);
            }
        }
        if(value != 'DISTANCE_MARATHON' && value != 'DISTANCE_HALF') setHour(0);
    }, [value])

    const changeRace = () => {
        Keyboard.dismiss();
        if (!isRace) {
            setTime(true);
        }
        else if (!isTimeOverride) {
            setTime(false);
        }
        isRace ? setRace(false) : setRace(true);

    }

    const changeTime = () => {
        if (!isRace) {
            isTime ? setTime(false) : setTime(true);
            isTimeOverride ? setTimeOverride(false) : setTimeOverride(true);

        }
    }

    return (
        <SafeAreaView style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <StatusBar style="auto" />
                    <View style={styles.buttonBox}>
                        <View style={[styles.half, value == 'DISTANCE_MARATHON' || value == 'DISTANCE_HALF' ? { flex: 3 } : null]}>
                            {value == 'DISTANCE_MARATHON' || value == 'DISTANCE_HALF' ?
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
                                style={[styles.timeInput, value == 'DISTANCE_MARATHON' || value == 'DISTANCE_HALF' ? null : styles.left]}
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
                            <DropDownPicker
                                style={styles.dropDown}
                                placeholder='Distance'
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onPress={Keyboard.dismiss}
                            />




                        </View>

                    </View>

                    <View style={styles.output}>
                        <Text style={styles.vdotText}>{myVdot}</Text>
                        <View style={styles.labelBox}>
                            <Text style={[styles.labelOutput, isRace ? { flex: 2 } : { flex: 3 }]}>{label}</Text>
                            <Text style={[styles.outputText, isRace ? { flex: 3 } : { flex: 2 }]}>{output}</Text>
                        </View>
                    </View>
                    <View style={[styles.buttonBox, { zIndex: -5, marginBottom: windowWidth / 40 }]}>
                        <TouchableOpacity
                            style={styles.halfButton}
                            onPress={changeRace}
                            underlayColor='#fff'>
                            <Text style={styles.buttonText}>{isRace ? <Text>Training</Text> : <Text>Race</Text>}</Text>
                        </TouchableOpacity>
                        <View style={styles.gap}></View>
                        <TouchableOpacity
                            style={styles.halfButton}
                            onPress={changeTime}
                            underlayColor='#fff'>
                            <Text style={styles.buttonText}>{isTime ? <Text>Pace</Text> : <Text>Time</Text>}</Text>
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
    },
    output: {
        flex: 9,
        margin: windowWidth / 80,
        width: .95 * windowWidth,
        backgroundColor: '#fff',
        zIndex: -5,
        borderRadius: 30,
    },
    half: {
        flex: 2,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    gap: {
        width: '2%',
    },
    halfButton: {
        width: '49%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        zIndex: -1,
        borderRadius: 50,
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
        marginTop: 15,
        marginLeft: 15,
    },
    labelBox: {
        flex: 6,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
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
