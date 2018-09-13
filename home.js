import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import Store from "./src/store.js"

import CoinCap from './src/container/CoinCap.js';


export default class App extends React.Component {
  render() {
    return (
    <Provider store={Store}>
     
        <CoinCap
        navigation = {this.props.navigation}
        />
    
    </Provider>
    );
  }
}

//Styling 
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  } 
})




//A StackNavigator works exactly like a call stack or a stack of dishes. Each screen we navigate to is pushed to the top of the stack, and each time we hit the back button, this screen pops off the top of the stack.

// /**
//  * Sample React Native App
//  * hx
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


// export default class App extends Component{
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
