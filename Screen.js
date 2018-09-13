import { createStackNavigator } from 'react-navigation';
import Home from './home';
import CoinCapCharts from "./src/container/CoinCapCharts.js"

const screen = createStackNavigator({
  Home: { screen: Home },
  CoinCapCharts: { screen: CoinCapCharts}
},{
    initialRouteName: 'Home',
    headerMode: 'none'
});

export default screen;