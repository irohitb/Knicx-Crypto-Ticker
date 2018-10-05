import React, { PureComponent} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TextInput, 
    FlatList, 
    ScrollView
} from "react-native"
import { connect } from 'react-redux';
import BottomNavigation from '../../components/BottomNavigation.js'
import {
    exchangeToDisplay
} from "../../actions/coinExchange.js"
import { 
    Bubbles,
    DoubleBounce, 
    Bars, 
    Pulse 
   } from 'react-native-loader';


class coinExchange extends PureComponent {


    constructor() {
        super () 
        this.coinURL = "btc-usd"
    }

    componentDidMount() {
        this.props.exchangeToDisplay(this.coinURL)
    }
    render () {
        // console.log(this.props.exchangeLoading)
        // if (!this.props.exchangeLoading && !this.props.exchangeError) {
        // console.log(this.props.exchangeLoading)
        // console.log(this.props.exchange.ticker)
        // }
        return (
            <View style={exchangeMain}> 
                <View style={header}> 
                    <Text style={textHeader}> Bitcoin</Text>
                    <View style={viewSearchExchange}> 
                         <TextInput
                            style={searchExchange}
                            placeholder="Search Coin"/>
                    </View>
                </View>
                { this.props.exchangeLoading ? 
                <View style={loadingComponent}>       
                    <Bars  size={15} color="#4CAF50" /> 
                { this.props.exchangeError ?  (<Text> There seems to be some problem fetching data </Text>) : null }
                </View> :  
                 <FlatList 
                 style={flatlistStyle}
                 data={this.props.exchange.ticker["markets"]}
                 keyExtractor={item => item.short}
                 renderItem={({ item, index }) => {
                     return (
                        <View style={exchangeList}>
                            <View style={subExchangeHeading1}>
                             <Text style={heading}>Market</Text>
                              <Text style={Value}>{item["market"]}</Text>
                            </View>
                            <View style={subExchangeHeading}> 
                                <Text style={heading}>Price</Text>
                                <Text style={Value}> {parseFloat(item["price"]).toFixed(4)} </Text>
                            </View>
                            <View  style={subExchangeHeading}>
                                <Text style={heading}>  Volume </Text>
                               <Text  style={Value}> {item["volume"]}</Text>
                            </View>
                        </View>
                     )
                 }} /> }
                
                <BottomNavigation navigation={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        currencyLoaded: state.currency.DataSucess,
        exchange: state.exchange.DataSucess,
        exchangeLoading: state.exchange.DataFetching,
        exchangeError: state.exchange.DateError
    }
}

export default connect(mapStateToProps,{
exchangeToDisplay
} )(coinExchange);

const styles = StyleSheet.create({ 
    exchangeMain: {
        display: "flex",
        flex: 1,
        backgroundColor: "#f3f3f3"
    }, 
    header: {
        paddingTop: 38,
        paddingBottom: 10,
        backgroundColor: "#3b5998"
    },
    textHeader: {
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        color: "white"
    }, 
    viewSearchExchange:{
        marginTop: 20, 
        marginLeft: 5,
        marginRight: 5,
    },
    searchExchange: {
        width: "80%",
        borderRadius: 15,
        backgroundColor: "white",
        height: 40,
        textAlign: "center"
    },
    loadingComponent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      },
      exchangeList: {
          display: "flex",
          flexDirection:"row",
          justifyContent: "space-between",
          marginTop: 8,
          marginLeft: 5,
          marginRight: 8,
          backgroundColor: "white",
          borderRadius: 15,
          textAlign: "center",
          padding: 5,
          marginBottom: 10
      },
    
      subExchangeHeading: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "29%"
        
    },
    subExchangeHeading1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "25%"
        
    },
      heading: {
          textAlign: "center",
          fontSize: 12,
          marginBottom: 12,
          paddingTop: 5
      },
      Value: {
        textAlign: "center",
        marginTop: 3,
        fontSize: 15,
        paddingBottom: 5
      },
      flatlistStyle: {
          marginBottom: 35
      }
  
})

const {
    exchangeMain,
    header,
    textHeader,
    searchExchange,
    viewSearchExchange,
    loadingComponent,
    exchangeList,
    subExchangeHeading,
    heading,
    Value,
    flatlistStyle,
    subExchangeHeading1
} = styles

//https://api.coindelta.com/api/v1/public/getticker/
//https://github.com/ccxt/ccxt
//https://api.cryptonator.com/api/full/btc-usd