import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Pacing from './pacing/load.js';
import Vdot from './vdot/load.js';
import Unusual from './unusual/load.js';
import Scoring from './scoring/load.js';
import Relay from './relay/load.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


function NavBar({ navigation }) {
  const [isPace, setPaceOrSplit] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Unusual', value: 'Unusual' },
    { label: 'Scoring', value: 'Scoring' },
    { label: 'Relay', value: "Relay" },
  ]);

  function setPaceDropdown(tempValue) {
    if(tempValue == null) return;
    console.log(tempValue);
    navigation.navigate(tempValue);
    setValue(null); 
  }


  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity style={styles.halfButton} onPress={() => navigation.navigate('Pacing')}>
        <Text style={styles.buttonText}>Pacing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfButton} onPress={() => navigation.navigate('Vdot')}>
        <Text style={styles.buttonText}>Vdot</Text>
      </TouchableOpacity>
      <View style={styles.half}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropdown}
          placeholder="Other"
          onChangeValue={(value) => setPaceDropdown(value)}
        />
      </View>
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
function ScoringScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} />
      <Scoring style={styles.importedScreen} />
    </SafeAreaView>
  );
}
function RelayScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} />
      <Relay style={styles.importedScreen} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Relay" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Vdot" component={VdotScreen} />
        <Stack.Screen name="Pacing" component={PacingScreen} />
        <Stack.Screen name="Unusual" component={UnusualScreen} />
        <Stack.Screen name="Scoring" component={ScoringScreen} />
        <Stack.Screen name="Relay" component={RelayScreen} />
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
    height: '7.5%',
    margin: windowWidth / 80,
    width: '95%',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1000,
  },
  halfButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 100,
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    zIndex: 1000,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  importedScreen: {
    width: '100%',
    zIndex: -100,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 0,
    height: '100%',
    borderRadius: 100,
    zIndex: 1000,
  },
  navBar: {
    zIndex: 1000,
  }
  
});
