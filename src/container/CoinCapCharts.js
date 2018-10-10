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
 import { 
    Bubbles,
    DoubleBounce, 
    Bars, 
    Pulse 
   } from 'react-native-loader';
   import Icon from 'react-native-vector-icons/FontAwesome';






class CoinCapCharts extends PureComponent {


    constructor(){
        super() 
        this.image
        this.text
        this.redditURL
    }
   
 state = {
     activeButton: 1,
     redditActiveButton: "newest"
 }

    //Coin Chart to display function 
    //Accepted value 
    //1, 7, 30, 90, 180, 365
    changeHistoryChart = (value) => {
        this.setState({activeButton: value}, () => {
            this.props.coinHistory(this.state.activeButton, this.props.navigation.state.params.coinShortName)
        })
    }

    redditsearch = (type) => {
        if (type ==  "newest") {
            this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=all&sort=new")
            this.setState({redditActiveButton: "newest"})
        } 

        if (type == "hour") {
            this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=hour&sort=relevance")
            this.setState({redditActiveButton: "hour"})
        }

        if (type == "day") {
            this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=day&sort=relevance")
            this.setState({redditActiveButton: "day"})
        }

        if (type == "week") {
            this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=week&sort=relevance")
            this.setState({redditActiveButton: "week"})
        }

        if (type == "month") {
            this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=month&sort=relevance")
            this.setState({redditActiveButton: "month"})
        }

        if (type == "allTime") {
            this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=all&sort=relevance")
            this.setState({redditActiveButton: "allTime"})
        }  
    }

    componentDidMount() {
        
        this.props.coinHistory(1, this.props.navigation.state.params.coinShortName) 
        this.props.coinComplete(this.props.navigation.state.params.coinShortName)
        this.props.fetchRedditPosts(this.props.navigation.state.params.coinShortName + "&t=all&sort=new")
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

                  (
          
                       <CoinChart 
                    coinHistory = {this.props.coinHistoryDisplay}
                    chartColor = {this.props.coinCompleteDisplay} 
                    navigation={this.props.navigation}

                    //  Chart color here is actually sending everything and we are using it for more than color operations now
                   />
           
                   )}
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
                        <View style={redditMainHeading}>
                            <View>
                                <Text style={redditTextMain}> Latest on Reddit</Text>
                            </View>
                            <View style={redditSearch}>
                                <TouchableOpacity onPress={() => this.redditsearch("newest")}>
                                    <Text style={[redditSearchText, this.state.redditActiveButton == "newest"  ? {fontSize: 16, fontWeight: 'bold'} : {fontSize: 13} ]}> Newest </Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={() => this.redditsearch("hour")}>
                                   <Text style={[redditSearchText, this.state.redditActiveButton == "hour" ? {fontSize: 16, fontWeight: 'bold'} : {fontSize: 13} ]}> Hour  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.redditsearch("day")}>
                                   <Text style={[redditSearchText, this.state.redditActiveButton == "day" ? {fontSize: 16, fontWeight: 'bold'} : {fontSize: 13} ]}> Day </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.redditsearch("week")}>   
                                    <Text style={[redditSearchText, this.state.redditActiveButton == "week" ? {fontSize: 16, fontWeight: 'bold'} : {fontSize: 13} ]}> Week </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.redditsearch("month")}>
                                    <Text style={[redditSearchText, this.state.redditActiveButton == "month" ? {fontSize: 16, fontWeight: 'bold'} : {fontSize: 13}]}> Month </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.redditsearch("allTime")}>
                                    <Text style={[redditSearchText, this.state.redditActiveButton == "allTime" ? {fontSize: 16, fontWeight: 'bold'} : {fontSize: 13}]}> All TIme</Text> 
                                 </TouchableOpacity>                 
                            </View>
                        </View>
                    <FlatList
                     contentContainerStyle={{paddingBottom:60}}
                        data={this.props.redditCryptoNews.slice(0,8)}
                        renderItem={({index, item}) => {
                            if (item["data"]["title"].length < 90) {
                            this.text = item["data"]["title"]
                            } else {
                                this.text = item["data"]["title"].substring(0, 90) + ".."
                            }
                        
                            if (item["data"]["thumbnail"] == "self" || item["data"]["thumbnail"] == "none" || item["data"]["thumbnail"] == "default") {
                              
                                this.image = require('./../images/reddit.jpeg');
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
        flexDirection: "column",
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "white", 
    },
    redditSearch: {
        display: "flex",
        flexDirection: "row",
        marginTop: 8,
        justifyContent: "space-between",
        marginLeft: 3,
        marginRight: 3
    },
    redditMainHeading:{
        paddingBottom: 5,
        paddingTop: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "#3b5998",
    },
    redditMain: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        backgroundColor: "white",   
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
        fontSize: 20, 
        color: "white",
        marginBottom: 5,
        marginTop: 5,
        textAlign: "center"
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
      },
      redditSearchText: {
          color: "white"
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
    historyBarLoading,
    redditMainHeading,
    redditSearch,
    redditSearchText
    } = styles


