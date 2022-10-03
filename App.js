import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import Pacing from './pacing/load.js';
import Vdot from './vdot/load.js';
import Unusual from './unusual/load.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


function NavBar({ navigation }) {
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity style={styles.halfButton} onPress={() => navigation.navigate('Pacing')}>
        <Text style={styles.buttonText}>Pacing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfButton} onPress={() => navigation.navigate('Vdot')}>
        <Text style={styles.buttonText}>Vdot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfButton} onPress={() => navigation.navigate('Unusual')}>
        <Text style={styles.buttonText}>Unusual</Text>
      </TouchableOpacity>
    </View>
  )
}

function PacingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} />
      <Pacing style={styles.importedScreen} />
    </SafeAreaView>
  );
}

function VdotScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} />

      <Vdot style={styles.importedScreen} />
    </SafeAreaView>
  );
}

function UnusualScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} />
      <Unusual style={styles.importedScreen} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pacing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Vdot" component={VdotScreen} />
        <Stack.Screen name="Pacing" component={PacingScreen} />
        <Stack.Screen name="Unusual" component={UnusualScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F65900',
    alignItems: 'center',

  },
  buttonBox: {
    height: '6.666666666666667%',
    margin: windowWidth / 80,
    width: '95%',
    justifyContent: 'center',
    flexDirection: 'row',
    // position: 'absolute',
  },
  halfButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    margin: 1,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  importedScreen: {
    width: '100%',
  },
//  navBar: {
//    flex: 1,
//  }
});
