import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, TouchableOpacity, PixelRatio, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Pacing from './pacing/load.js';
import Vdot from './vdot/load.js';
import Unusual from './unusual/load.js';
import Scoring from './scoring/load.js';
import Relay from './relay/load.js';
import Timer from './timer/load.js';
import Hill from './hill/load.js';
import Settings from './settings/load.js';
import TimeConversion from './time-conversion/load.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { back } from 'react-native/Libraries/Animated/Easing.js';
import { TouchableWithoutFeedback } from 'react-native-web';
import { loadSetSettings, saveNew } from './settings/settings.js';
import { storage } from './settings/storage.js';

const Stack = createNativeStackNavigator();
function NavBar({ navigation, page, settings, setSettings }) {

  const fullList = [
    { label: 'Pacing', value: 'Pacing' },
    { label: 'Vdot', value: 'Vdot' },
    { label: 'Unusual', value: 'Unusual' },
    { label: 'Scoring', value: 'Scoring' },
    { label: 'Relay', value: "Relay" },
    { label: 'Timer', value: 'Timer' },
    { label: 'Convert', value: 'Conversion' },
    { label: 'Hill', value: 'Hill' },
    { label: 'Settings', value: 'Settings' },
  ];

  const [defaultPage, setDefaultPage] = useState(settings['defaultPage']);
  const [secondPage, setSecondPage] = useState(settings['secondPage']);

  useEffect(() => {
    setDefaultPage(settings['defaultPage']);
    setSecondPage(settings['secondPage']);
  }, [settings]);

  useEffect(() => {
    setItems(fullList.filter(item => item.value != defaultPage && item.value != secondPage));
  }, [defaultPage, secondPage]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(fullList);


  const [firstPageDisabled, setFirstPageDisabled] = useState(false);
  const [secondPageDisabled, setSecondPageDisabled] = useState(false);



  function setPaceDropdown(tempValue) {
    if (tempValue == null) return;
    navigation.navigate(tempValue);
  }

  const onPageChange = () => {
    if (page == defaultPage) { setFirstPageDisabled(true); setValue(null); }
    else if (page == secondPage) { setSecondPageDisabled(true); setValue(null); }
    else setValue(page);
  }

  React.useEffect(() => {
    const onLoad = navigation.addListener('focus', () => {
      onPageChange();
    });
    return onLoad;
  }, [navigation]);

  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity style={[styles.halfButton, firstPageDisabled ? { backgroundColor: 'rgba(255,255,255,.8)' } : null]} disabled={firstPageDisabled} onPress={() => navigation.navigate(defaultPage)}>
        <Text style={styles.buttonText}>{defaultPage}</Text>
      </TouchableOpacity>
      <View style={styles.gap} />
      <TouchableOpacity style={[styles.halfButton, secondPageDisabled ? { backgroundColor: 'rgba(255,255,255,.8)' } : null]} disabled={secondPageDisabled} onPress={() => navigation.navigate(secondPage)}>
        <Text style={styles.buttonText}>{secondPage}</Text>
      </TouchableOpacity>
      <View style={styles.gap} />
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

function PacingScreen({ navigation, settings, setSettings }) {
  const newPage = 'Pacing';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Pacing style={styles.importedScreen} settings={settings} />
    </SafeAreaView>
  );
}

function VdotScreen({ navigation, settings, setSettings }) {
  const newPage = 'Vdot';
  // console.log('vdot screen',settings['imperial']);
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Vdot style={styles.importedScreen} isImperial={settings['imperial']} />
    </SafeAreaView>
  );
}

function UnusualScreen({ navigation, settings, setSettings }) {
  const newPage = 'Unusual';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Unusual style={styles.importedScreen} />
    </SafeAreaView>
  );
}
function ScoringScreen({ navigation, settings, setSettings }) {
  const newPage = 'Scoring';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Scoring style={styles.importedScreen} />
    </SafeAreaView>
  );
}
function RelayScreen({ navigation, settings, setSettings }) {
  const newPage = 'Relay';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Relay style={styles.importedScreen} />
    </SafeAreaView>
  );
}

function TimerScreen({ navigation, settings, setSettings }) {
  const newPage = 'Timer';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Timer style={styles.importedScreen} />
    </SafeAreaView>
  );
}
function ConversionScreen({ navigation, settings, setSettings }) {
  const newPage = 'Conversion';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <TimeConversion style={styles.importedScreen} />
    </SafeAreaView>
  );
}
function HillScreen({ navigation, settings, setSettings }) {
  const newPage = 'Hill';
  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} navigation={navigation} settings={settings} setSettings={setSettings} page={newPage} />
      <Hill style={styles.importedScreen} isImperial={settings.imperial} />
    </SafeAreaView>
  );
}


function SettingsScreen({ navigation, settings, setSettings }) {
  const newPage = 'Settings';
  const [defaultValue, setDefaultValue] = useState(settings['defaultPage']);
  const [secondValue, setSecondValue] = useState(settings['secondPage']);
  const [isImperial, setIsImperial] = useState(settings['imperial']);


  useEffect(() => {
    if (defaultValue == settings['defaultPage'] && secondValue == settings['secondPage'] && isImperial == settings['imperial']) return;
    setSettings({ defaultPage: defaultValue, secondPage: secondValue, imperial: isImperial, loaded: true });
  }, [defaultValue, secondValue, isImperial]);

  return (
    <SafeAreaView style={styles.screen}>
      <NavBar style={styles.navBar} page={newPage} settings={settings} setSettings={setSettings} navigation={navigation} />
      <Settings style={styles.importedScreen} defaultValue={defaultValue} setDefaultValue={setDefaultValue} secondValue={secondValue} setSecondValue={setSecondValue} isImperial={isImperial} setIsImperial={setIsImperial} />
    </SafeAreaView>
  );
}

function LoadingScreen({ navigation, settings, setSettings }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    storage
      .load({
        key: 'Settings',
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true
        }
      })
      .then(ret => {
        // found data go to then()
        // console.log('settings,ret: ', { ...settings, ...ret })
        setSettings({ ...settings, ...ret });
        setLoaded(ret.loaded);
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            saveNew('Settings', { loaded: true });
            setLoaded(true);
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  }, []);

  useEffect(() => {
    if (loaded) navigation.navigate(settings['defaultPage']);
  }, [loaded]);
  return (
    <SafeAreaView style={styles.screen}>
    </SafeAreaView>
  );
}

export default function App() {
  const [settings, setSettings] = useState({
    defaultPage: 'Pacing',
    secondPage: 'Vdot',
    imperial: true,
    loaded: false,
  });

  useEffect(() => {
    // console.log('settings.loaded: ', settings.loaded);
    if (settings.loaded) {
      saveNew('Settings', settings);
    }
  }, [settings]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Loading'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Loading'>
          {props => <LoadingScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Pacing">
          {props => <PacingScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Vdot">
          {props => <VdotScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Unusual">
          {props => <UnusualScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Scoring">
          {props => <ScoringScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Relay">
          {props => <RelayScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Timer">
          {props => <TimerScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {props => <SettingsScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Conversion">
          {props => <ConversionScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
        <Stack.Screen name="Hill">
          {props => <HillScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
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
    marginTop: windowWidth / 80,
    marginBottom: windowWidth / 80,
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
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  gap: {
    width: 2,
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
