import React, { PureComponent} from 'react'
import { connect } from 'react-redux';
import { 
    View, 
    Text 
} from 'react-native'
import Header from '../components/header.js';
import { 
    coinHistory, 
    coinComplete 
} from "../actions/coinCapAction.js"
import { 
    VictoryBar,
    VictoryChart,
    VictoryArea,
    VictoryTheme
 } from "victory-native";
 import CoinChartStatus from './coinChartComponents/coinChartStatus'







class CoinCapCharts extends PureComponent {

    state = {
        days: 1
    }

    constructor () {
        super()
    }
    

    componentDidMount() {
        this.props.coinHistory(this.state.days, this.props.navigation.state.params.coinShortName) 
        this.props.coinComplete(this.props.navigation.state.params.coinShortName)
        
    }

    render ()  {   

        
            return (
                <View> 
                    <Header 
                    navigation = {this.props.navigation} 
                    enable = "true" />    

                    <CoinChartStatus 
                    coinDetails = {this.props.coinCompleteDisplay}
                    />
                </View>

                
            )
    }

}
const mapStateToProps = state => {
    return {
      coinCompleteDisplay: state.coincap.itemComplete,
      coinHistoryDisplay: state.coincap.itemHistory ,
      cryptoLoading: state.coincap.itemsFetching, 
    }
  };

export default connect(mapStateToProps, 
  {coinHistory, 
    coinComplete, 

  })(CoinCapCharts);










/* 


// Create a new linear scale instance, which we'll use as your y-scale.
const y = d3.scaleLinear()

    // Set our domain, which is our input data, which is our test scores,
    // which can be between 0 and 100.
    .domain([0, 100])

    // Set our range, which is our output data, which is the height of our
    // screen, which is 640 pixels.
    .range([0, 640]);

// Now if we want to know how high a test score of 50 is on our screen
// we pass the value from our domain and get our range of 320.
y(50); // 320
// Same thing here with 80.
y(80); // 512




*/
//This ART component will render the SVG path data created by D3.
//https://medium.com/@jennysihua/creating-a-donut-chart-in-react-native-with-d3-and-art-2a7ac91dda5c
//User Purchase is data 
//Width and ehight is for the pie chart we are creating 
//We did   const sectionAngles = d3.pie().value(d => d.price)(userPurchases) 
 //-->This maps each element, We will use the d3.pie() method to get angles for each slice of the donut chart.
 //-->This looks for price property via value method 
//We need to generate an SVG path that we can pass to our Surface component. We will do this via the d3.arc() function, which creates an SVG path based on the chart’s height and width.

// const { Surface, 
//     Group, 
//     Shape } = ART

// const width = 250
// const height = 250



// const userPurchases = [
//     {
//       itemName: 'Mountain Dew',
//       price: 3
//     },
//     {
//       itemName: 'Shoes',
//       price: 50
//     },
//     {
//       itemName: 'Kit Kat',
//       price: 1
//     },
//     {
//       itemName: 'Taxi',
//       price: 24
//     },
//     {
//       itemName: 'Watch',
//       price: 100
//     },
//     {
//       itemName: 'Headphones',
//       price: 15
//     },
//     {
//       itemName: 'Wine',
//       price: 16
//     }
//   ]


// const DataGraph = (props) => {
//     const sectionAngles = d3.pie().value(d => d.price)(userPurchases) 
//     const path = d3.arc()
//   .outerRadius(100) //must be less than 1/2 the chart's height/width
//   .padAngle(.05) //defines the amount of whitespace between sections
//   .innerRadius(.60) //the size of the inner 'donut' whitespace
 

//     console.log(sectionAngles)
//     return (
//         <Surface width={width} height={height}>
//   <Group x={width/2} y={height/2}>
//     {sectionAngles.map(section => (
//      <Shape
//        key={section.index}
//        d={path(section)}
//        stroke="#000"
//        fill={`rgb(0,0,255)`}
//        strokeWidth={1}
//      />
//     ))}
//   </Group>
// </Surface>
//     )

// }

// export default DataGraph;
