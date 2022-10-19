import { useState, Component, useEffect, useRef } from 'react';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import {outTime} from './scripts.js';

export default function TimerDisplay(props) {
    return (
            <View style={styles.timerBox} >
                <Text style={styles.timerText}>{outTime(props.time)}</Text>
            </View>
    )
};

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
    timerBox: {
        flex: 1,
        margin: 1,
        marginHorizontal: windowWidth * 0.025,
        width: '95%',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        alignSelf: 'center',
    },
    timerText: {
        fontSize: normalize(75),
        flex: 1,
        color: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'justify',
        fontStyle: '',
    }
});
