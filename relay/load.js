import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect, useRef } from 'react';
import { addTimes } from './scripts.js';

export default function Relay() {
    const [output, setOutput] = useState('');
    const [minOne, setMinOne] = useState('');
    const [secOne, setSecOne] = useState('');
    const [minTwo, setMinTwo] = useState('');
    const [secTwo, setSecTwo] = useState('');
    const [minThree, setMinThree] = useState('');
    const [secThree, setSecThree] = useState('');
    const [minFour, setMinFour] = useState('');
    const [secFour, setSecFour] = useState('');

    useEffect(() => {
        setOutput(addTimes(minOne, secOne, minTwo, secTwo, minThree, secThree, minFour, secFour));
    }, [minOne, secOne, minTwo, secTwo, minThree, secThree, minFour, secFour]);

    return (
        <SafeAreaView style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <StatusBar style="auto" />
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.timeInput}
                            placeholder="Min"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setMinOne(newText)}
                            defaultValue={minOne}
                        />
                        <Text style={styles.colon}>:</Text>
                        <TextInput
                            style={[styles.timeInput, styles.right]}
                            placeholder="Sec"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setSecOne(newText)}
                            defaultValue={secOne}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.timeInput}
                            placeholder="Min"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setMinTwo(newText)}
                            defaultValue={minTwo}
                        />
                        <Text style={styles.colon}>:</Text>
                        <TextInput
                            style={[styles.timeInput, styles.right]}
                            placeholder="Sec"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setSecTwo(newText)}
                            defaultValue={secTwo}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.timeInput}
                            placeholder="Min"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setMinThree(newText)}
                            defaultValue={minThree}
                        />
                        <Text style={styles.colon}>:</Text>
                        <TextInput
                            style={[styles.timeInput, styles.right]}
                            placeholder="Sec"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setSecThree(newText)}
                            defaultValue={secThree}
                        />
                    </View>
                    <View style={styles.buttonBox}>
                        <TextInput
                            style={styles.timeInput}
                            placeholder="Min"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setMinFour(newText)}
                            defaultValue={minFour}
                        />
                        <Text style={styles.colon}>:</Text>
                        <TextInput
                            style={[styles.timeInput, styles.right]}
                            placeholder="Sec"
                            placeholderTextColor="#878787"
                            keyboardType="numeric"
                            onChangeText={newText => setSecFour(newText)}
                            defaultValue={secFour}
                        />
                    </View>
                    <View style={styles.output}>
                        <Text style={styles.outputText}>{output}</Text>
                    </View>

                    <View style={[styles.buttonBox, { marginBottom: windowWidth / 40, marginTop: windowWidth / 80 }]}>
                        <TouchableOpacity style={styles.fullButton} title="Reset">
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
        flex: 6.5,
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
        width: '48%',
        height: '100%',
        backgroundColor: "#fff",
        color: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: normalize(20),
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        textAlign: 'center',
      },
    right: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
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
        fontSize: normalize(35),
        textAlign: 'center',
        marginTop: 15,
        marginLeft: 15,
    },
  

});
