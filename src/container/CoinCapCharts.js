import React, { PureComponent} from 'react'
import { connect } from 'react-redux';
import { 
    View, 
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Linking
} from 'react-native'
import Header from '../components/header.js';
import BottomNavigation from '../components/BottomNavigation';
import { 
    coinHistory, 
    coinComplete 
} from "../actions/coinCapAction.js"

import {
    fetchRedditPosts
} from "../actions/socialAndNews.js"
 import CoinChartStatus from './coinChartComponents/coinChartStatus'
 import CoinChart from "./coinChartComponents/coinChart.js"
 
 







class CoinCapCharts extends PureComponent {


    constructor(){
        super() 
        this.image
        this.text
    }
   
 state = {
     activeButton: 1
 }

    //Coin Chart to display function 
    //Accepted value 
    //1, 7, 30, 90, 180, 365
    changeHistoryChart = (value) => {
        this.setState({activeButton: value}, () => {
            this.props.coinHistory(this.state.activeButton, this.props.navigation.state.params.coinShortName)
        })
    }

    componentDidMount() {
        this.props.coinHistory(1, this.props.navigation.state.params.coinShortName) 
        this.props.coinComplete(this.props.navigation.state.params.coinShortName)
        this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName)
        
    }

   

    render ()  {

            return (
       
                <View style={CoinCapChartsMain}> 
                <ScrollView>
                    <Header 
                    navigation = {this.props.navigation} 
                    enable = "true" />   



                
              
                   <CoinChart 
                    coinHistory = {this.props.coinHistoryDisplay}
                    chartColor = {this.props.coinCompleteDisplay} 

                    //  Chart color here is actually sending everything and we are using it for more than color operations now
                   />
                <View style={buttonMain}>
                    <View>
                        <TouchableOpacity
                            style
                            onPress={() => this.changeHistoryChart(1)}
                            style={button}>
                               <Text style={[buttonT, this.state.activeButton == 1 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>Today</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.changeHistoryChart(7)}
                            style={button}>
                            <Text style={[buttonT, this.state.activeButton == 7 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>7D</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                                onPress={() => this.changeHistoryChart(30)}
                                style={button}>
                                <Text style={[buttonT, this.state.activeButton == 30 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>1M </Text>
                        </TouchableOpacity>
                        </View>
                        <View>
                        <TouchableOpacity
                                onPress={() => this.changeHistoryChart(90)}
                                style={button}>
                                <Text style={[buttonT, this.state.activeButton == 90 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>3M</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.changeHistoryChart(180)}
                                style={button}>
                                <Text style={[buttonT, this.state.activeButton == 180 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>6M</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={button}>
                            <TouchableOpacity
                                onPress={() => this.changeHistoryChart(365)}
                                style={button}>
                                <Text style={[buttonT, this.state.activeButton == 365 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>1Y </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CoinChartStatus 
                    coinDetails = {this.props.coinCompleteDisplay}
                    />
                    <View style={reddit}>
                        <Text style={redditTextMain}> Latest on Reddit</Text>
                    <FlatList
                        data={this.props.redditCryptoNews.slice(0,8)}
                        renderItem={({index, item}) => {
                            if (item["data"]["title"].length < 90) {
                            this.text = item["data"]["title"]
                            } else {
                                this.text = item["data"]["title"].substring(0, 90) + ".."
                            }
                        
                            if (item["data"]["thumbnail"] == "self" || item["data"]["thumbnail"] == "none" || item["data"]["thumbnail"] == "default") {
                              
                                this.image = require('./../images/reddit.png');
                              } else {
                                this.image = { uri: item["data"]["thumbnail"] };
                              }
                            return (
                        <TouchableOpacity
                            onPress={() => {Linking.openURL(item["data"]["url"])}}
                            style={redditMain} > 
                                 <Image 
                                     source={ this.image }
                                     style={img}
                                     /> 
                            <Text style={RedditList}>{this.text}</Text>
                            </TouchableOpacity>
                            
                            )}}
               
                    />
                </View>
               
                </ScrollView>
               <BottomNavigation />
                </View>
            
        

                
            )
    }

}
const mapStateToProps = state => {
    return {
      coinCompleteDisplay: state.coincap.itemComplete,
      coinHistoryDisplay: state.coincap.itemHistory ,
      cryptoLoading: state.coincap.itemsFetching, 
      redditCryptoNews: state.news.DataSucess,
      redditFetching: state.news.DataFetching
    }
  };

export default connect(mapStateToProps, 
  {coinHistory, 
    coinComplete, 
    fetchRedditPosts
  })(CoinCapCharts);

  const styles = StyleSheet.create({ 
    buttonMain: {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white"
      },
    button: {
    
    },
    buttonT: {
        padding: 5,
        fontSize: 15
    }, 
    reddit: {
        marginTop: 15,
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 5
    },
    redditMain: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center"
    },
    RedditList: {
       flex: 1, 
       flexWrap: 'wrap',
       fontSize: 14,
       marginLeft: 5,
       marginRight: 5,
       color: "#323232"
     }, 
    
     img: {
        width: 40,
        height: 40,
        marginLeft: 5
    },
    redditTextMain: {
        textAlign: 'center',
        fontSize: 23, 
        color: "#4A708B",
        marginBottom: 5,
        marginTop: 5
    },
    CoinCapChartsMain:{
        flex: 1
    }
  })

  const { 
    buttonMain,
    button,
    buttonT, 
    reddit,
    RedditList,
    img,
    redditMain,
    redditTextMain,
    CoinCapChartsMain
  
    } = styles



//cHT: 1536892140000, cHTVU: 6519.44, cHTVF: "$6,519.44", no: 0




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
