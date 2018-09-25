import React from 'react';
import { 
  MyScreen
}from './Screen.js';
import {
  View
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <MyScreen/>
    );
  }
}

//This is exported to index.js
//https://codeburst.io/react-native-navigation-stack-navigator-inside-tab-navigator-inside-drawer-navigator-b2f21836708d 