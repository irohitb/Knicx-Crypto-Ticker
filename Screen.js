import { 
  createStackNavigator,
   } from 'react-navigation';

import CoinCapCharts from "./src/container/CoinCapCharts.js"
import CurrencySelection from './src/container/CurrencySelection.js'
import CoinCap from './src/container/CoinCap.js';
import CoinChart from './src/container/coinChartComponents/coinChart.js'


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
    },
  CurrencySelection: {
    screen: CurrencySelection
  },
  CoinChart: {
    screen: CoinChart
  }

},{
    initialRouteName: 'Home',
    headerMode: 'none'
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