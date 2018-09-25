import { 
  createStackNavigator,
   TabNavigator,
   DrawerNavigator
   } from 'react-navigation';

import CoinCapCharts from "./src/container/CoinCapCharts.js"

import CoinCap from './src/container/CoinCap.js';


//THis is being Exported to App.js

//  export const Tab = TabNavigator({
//   TabA: {
//     screen: CoinCap 
//   },
//   TabB: {
//     screen: CoinCap
//   }
// }, {
//   order: ['TabA', 'TabB'],
//   animationEnabled: true,
// })

export const MyScreen = createStackNavigator({
  Home: { 
    screen: CoinCap
  },
  CoinCapCharts: {
     screen: CoinCapCharts
    }
},{
    initialRouteName: 'Home',
    headerMode: 'none'
});


// export const Drawer = DrawerNavigator({
//   Tabs: { screen: Tab },
//   Stack: { screen: MyScreen },
// })