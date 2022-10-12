import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect, useRef } from 'react';
import { getXCScores, getTrackScores } from './scripts.js';

export default function Scoring() {
    const [output, setOutput] = useState('');
    const [firstPlace, setFirstPlace] = useState('');
    const [secondPlace, setSecondPlace] = useState('');
    const [thirdPlace, setThirdPlace] = useState('');
    const [forthPlace, setForthPlace] = useState('');
    const [fifthPlace, setFifthPlace] = useState('');
    const [sixthPlace, setSixthPlace] = useState('');
    const [seventhPlace, setSeventhPlace] = useState('');
    const [placeList, setPlaceList] = useState([firstPlace, secondPlace, thirdPlace, forthPlace, fifthPlace, sixthPlace, seventhPlace]);
    const [isXC, setIsXC] = useState(true);

    useEffect(() => {
        setPlaceList([firstPlace, secondPlace, thirdPlace, forthPlace, fifthPlace, sixthPlace, seventhPlace]);
    }, [firstPlace, secondPlace, thirdPlace, forthPlace, fifthPlace, sixthPlace, seventhPlace]);

    const reset = () => {
        setFirstPlace('');
        setSecondPlace('');
        setThirdPlace('');
        setForthPlace('');
        setFifthPlace('');
        setSixthPlace('');
        setSeventhPlace('');
        setPlaceList([firstPlace, secondPlace, thirdPlace, forthPlace, fifthPlace, sixthPlace, seventhPlace]);
    }

    const toggleXC = () => {
        setIsXC(!isXC);
        setFirstPlace('');
        setSecondPlace('');
        setThirdPlace('');
        setForthPlace(isXC ? '16' : '');
        setFifthPlace('');
        setSixthPlace('');
        setSeventhPlace('');
        setPlaceList([firstPlace, secondPlace, thirdPlace, forthPlace, fifthPlace, sixthPlace, seventhPlace]);
    }

    useEffect(() => {
        runFunctions();
    }, [placeList]);


    const runFunctions = () => {
        if (isXC) setOutput(getXCScores(placeList));
        else setOutput(getTrackScores(placeList));
    }
    return (
        <SafeAreaView style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <StatusBar style="auto" />
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.fullInput}
                            placeholder={isXC ? "First Runner" : "Number of Firsts"}
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setFirstPlace(newText)}
                            value={firstPlace}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.fullInput}
                            placeholder={isXC ? "Second Runners Place" : "Number of Seconds"}
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setSecondPlace(newText)}
                            value={secondPlace}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.fullInput}
                            placeholder={isXC ? "Third Runners Place" : "Number of Thirds"}
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setThirdPlace(newText)}
                            value={thirdPlace}
                        />

                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.fullInput}
                            placeholder={isXC ? "Forth Runners Place" : "Number of Events"}
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setForthPlace(newText)}
                            value={forthPlace}
                        />

                    </View>
                    {isXC ?
                        <View style={styles.buttonBox}>
                            <TextInput
                                style={styles.fullInput}
                                placeholder="Fifth Runners Place"
                                placeholderTextColor="#878787"
                                keyboardType="numeric"
                                onChangeText={newText => setFifthPlace(newText)}
                                value={fifthPlace}
                            />

                        </View> 
                        : null}
                        {isXC ?
                        <View style={styles.buttonBox}>
                            <TextInput
                                style={styles.fullInput}
                                placeholder="Sixth Runners Place"
                                placeholderTextColor="#878787"
                                keyboardType="numeric"
                                onChangeText={newText => setSixthPlace(newText)}
                                value={sixthPlace}
                            />

                        </View> 
                        : null}
                        {isXC ?
                        <View style={styles.buttonBox}>
                            <TextInput
                                style={styles.fullInput}
                                placeholder="Seventh Runners Place"
                                placeholderTextColor="#878787"
                                keyboardType="numeric"
                                onChangeText={newText => setSeventhPlace(newText)}
                                value={seventhPlace}
                            />

                        </View> 
                        : null}

                    <View style={[styles.output, { flex: isXC ? 3.5 : 4.5 }]}>
                        <Text style={styles.outputText}>{output}</Text>
                    </View>

                    <View style={[styles.buttonBox, { marginBottom: windowWidth / 40, marginTop: windowWidth / 80 }]}>
                        <TouchableOpacity style={styles.halfButton} title="Reset" onPress={toggleXC}>
                            <Text style={styles.buttonText}>{isXC ? <Text>XC</Text> : <Text>Track</Text>}</Text>
                        </TouchableOpacity>
                        <View style={styles.gap}></View>
                        <TouchableOpacity style={styles.halfButton} title="Reset" onPress={reset}>
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

var outputSize = 5.5;

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
        margin: windowWidth / 160,
        width: .95 * windowWidth,
        backgroundColor: '#fff',
        zIndex: -5,
        position: 'relative',
        borderRadius: 30,
    },
    half: {
        width: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
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
        borderRadius: 50,
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
        textAlign: 'center',
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
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        color: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: normalize(20),
        borderRadius: 50,
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
        marginTop: 15,
        marginLeft: 15,
    },
    plus: {
        fontSize: normalize(30),
        position: 'absolute',
        right: 4,
        top: 4,
    }


});
