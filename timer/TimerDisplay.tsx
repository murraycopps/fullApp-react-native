import { useState, Component, useEffect, useRef } from 'react';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity, PixelRatio, TextInput, Platform } from 'react-native';

export default function TimerDisplay(props) {

    const outTime = (time: number) => {
        let min = Math.round(time / 60 - 0.5) as number | string
        let sec = Math.round(100 * (time - 60 * parseFloat(min.toString()))) / 100 as number | string
    
        if (sec < 10) {
            sec = "0" + sec;
        }
        let secS = sec.toString();
    
        if (secS.length == 2) {
            sec = sec + ".00"
        }
        else if (secS.length == 4) {
            sec = sec + "0";
        }
    
        if (min < 10) {
            min = "0" + min;
        }
        return min + ":" + sec;
    }

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
    }
});
