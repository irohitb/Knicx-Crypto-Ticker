import React, {PureComponent} from "react"
import {
    View,
    StyleSheet, 
    Text,
    Image, 
    StatusBar,
    ScrollView, 
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import {
    coinNews 
} from "../../actions/coinNews.js"
import BottomNavigation from '../../components/BottomNavigation.js'
import { 
    Bubbles,
    DoubleBounce, 
    Bars, 
    Pulse 
   } from 'react-native-loader';
import Icons from 'react-native-vector-icons/Entypo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



class News extends PureComponent {

    constructor() {
        super()
        this.config
        this.spaceyfiLogo = (<Image source={require('./../../images/spaceyfi.png')}  style={imgS} />) 
    }
    state = {
        number: 0
    }



        pageChangeNext = () => {
            let number
              if (this.state.number != 50) {
                  number = this.state.number
                  number = number + 1
                  this.setState({number: number})
                  }
          }

          pageChangePrev = () => {
            let number
            if (this.state.number != 0) {
                number = this.state.number
                number = number - 1
                this.setState({number: number})
                }
          }

    componentDidMount() {
        this.props.coinNews()
    }
    render() {
        if (!this.props.newsLoading) {
            this.config = {
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
              };
        }
        
        return (
            <View style={coinNewsMain}>
             <View>
             <StatusBar hidden={true}  />
            </View>

            { this.props.newsLoading ?
              (  <View style={loadingComponent}>       
                <Bars  size={15} color="#4CAF50" /> 
            </View> ) :
                ( 
                    <ScrollView
                    contentContainerStyle={{paddingBottom:60}}>
                    
                      
                    <View style={layoutMain}>
                    <GestureRecognizer     
                    onSwipeLeft={() =>  this.pageChangeNext()}
                    onSwipeRight={() => this.pageChangePrev()}
                    config={this.config}>
                
                        <View stye={ImageNews}>             
                        <Image 
                                source={{uri: this.props.news["Data"][this.state.number]["imageurl"]}}
                                style={imageurl}
                                />  
                        </View>

                        <View style={newsTitleView}>
                            <Text style={newsTitleText}> {this.props.news["Data"][this.state.number]["title"]}</Text>
                        </View> 

                        <View style={titleSubHeading}>
                            <Text style={publishTime}>{new Date(this.props.news["Data"][this.state.number]["published_on"]*1000).toString().split(' ').slice(0, 5).join(' ')}</Text>
                            <Text style={publishSource}>By {this.props.news["Data"][this.state.number]["source"]}</Text>
                        </View>
                        <View style={newsBodyView}> 
                            <Text style={newsBodyText}> {this.props.news["Data"][this.state.number]["body"]} </Text>
                        </View>
                        </GestureRecognizer>
                    </View> 
              
            
                    <View style={loveSpaceyfiFotter}> 
                         { this.spaceyfiLogo }
                        <Text style={spaceyfiText}>Spaceyfi Crypto Ticker</Text>
                    </View>

                </ScrollView>

                 )}
                    <BottomNavigation navigation={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
  return {
    cryptoLoaded: state.coincap.itemsSucess,
    cryptoLoading: state.coincap.itemsFetching,
    cryptoGlobal: state.coincap.itemGlobal,
    currencyLoaded: state.currency.DataSucess,
    news: state.news.DataSucess,
    newsLoading: state.news.DataFetching
  }
}

export default connect(mapStateToProps, 
    {
    coinNews
})(News);

const styles = StyleSheet.create({ 
    coinNewsMain: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    ImageNews:{

    },
    layoutMain:{

    },
    imageurl: {
        height: 300,
        width: "100%"
    },
    loadingComponent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      },
      newsTitleView: {
          width: "100%",
          marginLeft: 2,
          marginRight: 2,
          marginTop: 5
        
      }, 
      newsTitleText: {
        fontSize: 22
      },
      newsBodyText: {
          marginTop: 20,
          fontSize: 16,
          textAlign: "justify",
          marginLeft: 5,
          marginRight: 10,
          color: "#424242",
          lineHeight: 20.5
      },
      newsBodyView: {
        width: "100%",
        marginTop: 5
      },
      titleSubHeading: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      },
      publishTime:{
    
      },
      publishSource:{

      },
      navigationArrow:{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        top: 10,
        width: "100%"
      },
      nextPage: {
        borderRadius: 50,
          display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white"
      }, 
      lastPage: {
        borderRadius: 50,
          display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white"
      },
      loveSpaceyfiFotter: {
        width: "100%",
        display: "flex",
        bottom: 0,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
       
    },
    spaceyfiText: {
        fontSize: 15,
        textAlign: "right"
    },
    imgS: {
        height: 35, 
        width: 35,
    }

})

const {
 coinNewsMain,
 ImageNews,
 layoutMain,
 loadingComponent,
 imageurl,
 newsTitleView,
 newsTitleText,
 newsBodyView,
 newsBodyText,
 titleSubHeading,
 publishTime,
 publishSource,
 navigationArrow,
 lastPage,
 nextPage,
 loveSpaceyfiFotter,
 spaceyfiText,
 imgS
} = styles

