import { 
  createSwitchNavigator,
  createStackNavigator
   } from 'react-navigation';

import CoinCapCharts from "./src/container/CoinCapCharts.js"
import CurrencySelection from './src/container/CurrencySelection.js'
import CoinCap from './src/container/CoinCap.js';
import CoinChart from './src/container/coinChartComponents/coinChart.js'
import News from "./src/container/News/coinNews.js"
import Exchange from "./src/container/Exchanges/coinExchange.js"
import CryptoToShowcase from "./src/container/Exchanges/coinSelect.js"
import CryptoProfile from "./src/container/Profile/cryptoProfile.js"

export const homeStackNavigator = createStackNavigator({
  Home: {
    screen: CoinCap
  }, 
  CoinCapCharts: { 
    screen: CoinCapCharts
   },
 CurrencySelection: { 
   screen: CurrencySelection
 },
 CoinChart: { 
   screen: CoinChart
 }
},{
  headerMode: 'none'
 }
)

export const exchangeStackNavigator = createStackNavigator({
    Home: {
      screen: Exchange
    },
    cryptoToShow: {
      screen: CryptoToShowcase
    }
}, {
    headerMode: 'none'
  }
)

export const MyScreen = createSwitchNavigator({
  home: {  //Switch Navigator
    screen: homeStackNavigator
  },
  News: { //Switch Navigator 
    screen: News
  },
  Exchange: {
    screen: exchangeStackNavigator 
  },
  About: {
    screen: CryptoProfile 
  }

},{
    initialRouteName: 'home',
});


// export const Drawer = DrawerNavigator({
//   Tabs: { screen: Tab },
//   Stack: { screen: MyScreen },
// })

//Adding Navigation in React Native 
//Import the component You want to import 
//Screen which tells the component name 
//Then we navigate and pass any props we want like this 
// this.props.navigation.navigate('CoinCapCharts', {
//   coinShortName: this.props.coinShortName, coinLongName: this.props.coinName


//Type of Popular Navigation Stack 
// createSwitchNavigator
//createStackNavigator

//Navigate Props passed into all screen component 
//Navigate props have properties like 
//Go back 
//GetParma
//dispatch 
//isFocused 
//addListener 
//state 

//Example of passing Data Between Screens 
// this.props.navigation.navigate('CoinCapCharts', {
//   coinShortName: this.props.coinShortName, coinLongName: this.props.coinName
// })}>

//Then wherever we are passing above, we can do 
//this.props.navigation.state.params.coinShortName -> To acess it 

//We can also do 
 // .navigation.getParam( 
//    'greeting',
//    'Hi'
//  )


//Note: - We can't use goback in switch Navigator 


//Difference between Push and Navigate in React Navigation 
// navigate('something') -> navigate to a route - switch if already exsist 

// push('something) -> Navigate to the screen by pushing the new instance to the react 

//Composing Navigator 