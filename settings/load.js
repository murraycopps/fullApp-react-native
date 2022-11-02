import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Button, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import { useState, Component, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { loadSetSettings, setSettings, settings, saveNew } from './settings.js';

export default function Settings({ defaultValue, setDefaultValue, secondValue, setSecondValue, isImperial, setIsImperial }) {
    const fullList = [
        { label: 'Pacing', value: 'Pacing' },
        { label: 'Vdot', value: 'Vdot' },
        { label: 'Unusual', value: 'Unusual' },
        { label: 'Scoring', value: 'Scoring' },
        { label: 'Relay', value: "Relay" },
        { label: 'Timer', value: 'Timer' },
        { label: 'Conversion', value: 'Conversion' },
    ];

    const [defaultOpen, setDefaultOpen] = useState(false);
    const [defaultItems, setDefaultItems] = useState(fullList);
    const [secondOpen, setSecondOpen] = useState(false);
    const [secondItems, setSecondItems] = useState(fullList);


    const setList = (value) => {
        var newList = [];
        for (i in fullList) {
            if (fullList[i].value != value) {
                newList.push(fullList[i]);
            }
        }
        return newList;
    }

    useEffect(() => {
        if (defaultValue == null) return;
        setSecondItems(setList(defaultValue));
    }, [defaultValue]);

    useEffect(() => {
        if (secondValue == null) return;
        setDefaultItems(setList(secondValue));
    }, [secondValue])

    const toggleImperial = () => {
        setIsImperial(!isImperial);
    }


    return (
        <SafeAreaView style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <StatusBar style="auto" />
                    <View style={[styles.buttonBox, { zIndex: 1000, backgroundColor: 'transparent' }]}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Set Default Page</Text>
                        </View>
                        <View style={styles.gap}></View>
                        <View style={[styles.half, { zIndex: 1000 }]}>
                            <DropDownPicker
                                open={defaultOpen}
                                value={defaultValue}
                                items={defaultItems}
                                setOpen={setDefaultOpen}
                                setValue={setDefaultValue}
                                setItems={setDefaultItems}
                                style={styles.dropDown} />


                        </View>

                    </View>
                    <View style={[styles.buttonBox, { zIndex: 900, backgroundColor: 'transparent' }]}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Set Second Page</Text>
                        </View>
                        <View style={styles.gap}></View>
                        <View style={[styles.half, { zIndex: 1000 }]}>
                            <DropDownPicker
                                open={secondOpen}
                                value={secondValue}
                                items={secondItems}
                                setOpen={setSecondOpen}
                                setValue={setSecondValue}
                                setItems={setSecondItems}
                                style={styles.dropDown} />


                        </View>
                    </View>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity style={styles.fullButton} onPress={toggleImperial}>
                            <Text style={styles.buttonText}>Set to {isImperial ? 'Imperial' : 'Metric'}</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.buttonBox, { zIndex: -5, marginBottom: windowWidth / 40 }]}>

                    </View>
                    <View style={{ flex: 7 }}></View>
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
        aligndefaultItems: 'center',
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
        width: '49%',
        justifyContent: 'center',
        alignContent: 'center',
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
        borderRadius: 50,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
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
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
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
        borderRadius: 50,
    },
    label: {
        fontSize: normalize(13),
        color: 'black',
        textAlign: 'center',
    },
});
