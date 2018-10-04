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
    Linking,
    StatusBar
} from 'react-native'
import Header from '../components/header.js';
import BottomNavigation from '../components/BottomNavigation';
import { 
    coinHistory, 
    coinComplete 
} from "../actions/coinCapAction.js"
import Spinner from 'react-native-loading-spinner-overlay';
import {
    fetchRedditPosts
} from "../actions/socialAndNews.js"
 import CoinChartStatus from './coinChartComponents/coinChartStatus'
 import CoinChart from "./coinChartComponents/coinChart.js"
 import { 
    Bubbles,
    DoubleBounce, 
    Bars, 
    Pulse 
   } from 'react-native-loader';
 
 







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
                  <View>
                    <StatusBar hidden={true}  />
                 </View>

                { this.props.cryptoLoading ?  
              (  <View style={loadingComponent}>       
                <Bars  size={15} color="#4CAF50" /> 
            </View> ) : 
                (<ScrollView>
                  { this.props.itemHistoryFetching ?  (  <View style={historyBarLoading}>       
                           <Bars  size={15} color="#4CAF50" /> 
                        </View> )  : 
                  ( <CoinChart 
                    coinHistory = {this.props.coinHistoryDisplay}
                    chartColor = {this.props.coinCompleteDisplay} 
                    navigation={this.props.navigation}

                    //  Chart color here is actually sending everything and we are using it for more than color operations now
                   />)}
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
                </ScrollView>)}
               <BottomNavigation navigation={this.props.navigation}/>
                </View>
            
        

                
            )
    }

}
const mapStateToProps = state => {
    return {
      coinCompleteDisplay: state.coincap.itemComplete,
      coinHistoryDisplay: state.coincap.itemHistory ,
      cryptoLoading: state.coincap.itemsFetching, 
      redditCryptoNews: state.redditNews.DataSucess,
      redditFetching: state.redditNews.DataFetching,
      itemHistoryFetching: state.coincap.itemHistoryFetching
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
    },
    loadingComponent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      },
      historyBarLoading: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
        marginBottom: 75 
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
    CoinCapChartsMain,
    loadingComponent,
    historyBarLoading
  
    } = styles


