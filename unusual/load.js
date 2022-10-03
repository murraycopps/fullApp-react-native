import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { calcuate } from './scripts.js';

export default function Vdot() {
    const [unitTime, setUnitTime] = useState('');
    const [output, setOutput] = useState('');
    const [inDis, setInDis] = useState('');
    const [outDis, setOutDis] = useState([0]);
    const [lastDis, setLastDis] = useState(0);
    const [hour, setHour] = useState('');
    const [minute, setMin] = useState('');
    const [second, setSec] = useState('');
    const [plusColor, setPlusColor] = useState('black');

    useEffect(() => {
        setUnitTime((hour * 3600 + minute * 60 + second * 1) / inDis);
    }, [hour, minute, second, inDis])

    useEffect(() => {
        setOutput(calcuate(unitTime, outDis, lastDis));
    }, [unitTime, outDis, lastDis])

    const addOutput = () => {
        var tempOutDis = outDis;
        if (tempOutDis[tempOutDis.length - 1] == 0) return;
        tempOutDis.push(0);
        if (tempOutDis.length == 11) tempOutDis.shift();
        setOutDis(tempOutDis);
        setLastDis(0);
        setPlusColor('red');
        setTimeout(() => {
            setPlusColor('black');
        }, 500);
    }

    const reset = () => {
        setOutDis([0]);
        setLastDis(0);
        setHour('');
        setMin('');
        setSec('');
    }


    return (
        <SafeAreaView style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <StatusBar style="auto" />
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.fullInput}
                            placeholder=""
                            keyboardType="numeric"
                            onChangeText={newText => setInDis(newText)}
                            defaultValue={inDis}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.timeInput}
                            placeholder=""
                            keyboardType="numeric"
                            onChangeText={newText => setHour(newText)}
                            defaultValue={hour}
                        />
                        <Text style={styles.colon}>:</Text>
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
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.fullInput}
                            placeholder=""
                            keyboardType="numeric"
                            onChangeText={newText => setLastDis(newText)}
                            defaultValue={lastDis}
                        />
                    </View>
                    <View style={styles.output}>
                        <Text style={styles.outputText}>{output}</Text>
                        <FontAwesome name="plus" color={plusColor} style={styles.plus} onPress={addOutput} />
                    </View>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity style={styles.fullButton} title="Reset" onPress={reset}>
                            <Text style={styles.buttonText}>Reset</Text>
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
        margin: 1,
        width: '95%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    output: {
        flex: 8,
        margin: windowWidth / 160,
        width: .95 * windowWidth,
        backgroundColor: '#fff',
        zIndex: -5,
        position: 'relative',
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
        width: '30.66666666666667%',
        height: '100%',
        backgroundColor: "#fff",
        color: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: normalize(20),
    },
    fullInput: {
        width: '100%',
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

    outputText: {
        fontSize: normalize(25),
    },
    plus: {
        fontSize: normalize(30),
        backgroundColor: "#fff",
        position: 'absolute',
        right: 0,
    }


});
