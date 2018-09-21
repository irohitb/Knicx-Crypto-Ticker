/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import Store from "./src/store.js"



const Root = () => (
    <Provider store={Store}>
      <App />
    </Provider>
  )
  
  AppRegistry.registerComponent(appName, () => Root);



//What is import *?

//Searching with FLatList
//https://medium.freecodecamp.org/how-to-build-a-react-native-flatlist-with-realtime-searching-ability-81ad100f6699


//React Native Performance 
//https://stackoverflow.com/questions/52020855/react-native-performance-issue/52230865?noredirect=1#comment91480937_52230865


//React Native Motion 
//https://medium.com/react-native-motion/transition-challenge-9bc9fdef56c7

//eact Native Navigating between screens
//https://facebook.github.io/react-native/docs/navigation

//npm install --save react-navigation

//Relevant Git Repository 
//https://github.com/msenejoa/crypto-markets -> For graphs

//What is task orphaned for request?

//Fix Currency Rate 



//Things to implement 
//Price conversion in CoinCap 
//Price conversion in coin Sats 
//Implement Graph
//Implement loading 
//Implement Reddit, Twitter, News Integration 
//Implement Prices at various exchange 

//https://facebook.github.io/react-native/blog/2018/01/18/implementing-twitters-app-loading-animation-in-react-native 
//Implementing Twitter Animation

//react-native-spinkit
//https://www.npmjs.com/package/react-native-spinkit


//Twitter API 
//https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/overview