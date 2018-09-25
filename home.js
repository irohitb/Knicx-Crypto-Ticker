import React from 'react';
import { 
  StyleSheet,  
  View 
} from 'react-native';


import CoinCap from './src/container/CoinCap.js';


export default class App extends React.Component {
  render() {
    return (
      <View>
        <CoinCap
        navigation = {this.props.navigation}
        />
      </View>
    );
  }
}

//This is being Exported to Screen.js
//We are passing Navigation Props to Coincap which it is forwarding to coincard.js -> Coincard.js forwards the name of the coin of which we want history




