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
    indianCurrency
} from "../../actions/currencyData.js"
import { 
    Bubbles,
    DoubleBounce, 
    Bars, 
    Pulse 
   } from 'react-native-loader';


class coinExchange extends PureComponent {


    constructor() {
        super () 
        this.coinURL = "BTC"
        this.searchMarket = []
        this.combineExchangeDate = false,
        this.coinExchangeArray = []
    }

    state = {
        searchMarket: false
    }

    onSearch = (text) => {
        //If no text 
        if (text == "" || text == " ") {
            this.setState({searchMarket: false})
            this.searchMarket = []
        } else {
            this.setState({searchMarket: true})
            this.searchMarket = []
                 for (let i = 0; i< this.coinExchangeArray.length; i++ ) {
                    let exchangeName = this.coinExchangeArray[i]["market"]
                    if (exchangeName.indexOf(text) > - 1) {
                        this.searchMarket.push({
                            market: this.coinExchangeArray[i]["market"],
                            value: this.coinExchangeArray[i]["value"]
                           
                        })
                      }
                 }
        //When Text
         }
    }

   

    componentDidMount() {
        this.props.exchangeToDisplay(this.coinURL)
        this.props.indianCurrency()
    }
    render () {     
        
        if (!this.props.exchangeSort && !this.props.exchangeError && !this.props.currencyFetching) {
            console.log(this.props.currencyINR)
            console.log(this.props.currencyINR["rates"]["USD"])
                //Koinex
                if (!this.combineExchangeDate && this.coinExchangeArray.length < 1) {
                    this.coinExchangeArray.push({
                    "market": "Koinex",
                    "value" : parseFloat(this.props.exchange[0]["data"]["prices"]["inr"][this.coinURL])*(this.props.currencyINR["rates"]["USD"])
                    })

                    //Coin Delta 
                    for (let i=0; i<this.props.exchange[1]["data"].length; i++) {
                        let coinUrl = this.coinURL.toLocaleLowerCase()
                        coinUrl = coinUrl + "-inr"
                        if (coinUrl == this.props.exchange[1]["data"][i]["MarketName"] ) {
                        this.coinExchangeArray.push({
                            "market": "CoinDelta",
                            "value" : this.props.exchange[1]["data"][i]["Last"]*(this.props.currencyINR["rates"]["USD"])
                        })
                        }
                    }

                    //Multiple Exchange 
                    for (let i=0; i<this.props.exchange[2]["data"]["ticker"]["markets"].length; i++) { 
                        this.coinExchangeArray.push({
                            "market":  this.props.exchange[2]["data"]["ticker"]["markets"][i]["market"],
                            "value": parseFloat(this.props.exchange[2]["data"]["ticker"]["markets"][i]["price"])
                        })
                    }
                    console.log(this.coinExchangeArray)
            }
        }

        return (
            <View style={exchangeMain}> 
           
                { this.props.exchangeLoading ? 
                <View style={loadingComponent}>       
                    <Bars  size={15} color="#4CAF50" /> 
                { this.props.exchangeError ?  (<Text> There seems to be some problem fetching data </Text>) : null }
                </View> :  
                    <View style={{flex: 1}}>
                         <View style={header}> 
                            <Text style={textHeader}> {this.coinURL} </Text>
                            <View style={viewSearchExchange}> 
                                <TextInput
                                    style={searchExchange}
                                    placeholder="Search Market"
                                    onChangeText={(text) => this.onSearch(text)}/>
                          </View>
                       </View>
                    <FlatList 
                    style={flatlistStyle}
                    data={this.state.searchMarket ?  this.searchMarket : this.coinExchangeArray}
                    extraData={[this.coinExchangeArray, this.searchMarket]}
                    keyExtractor={item => item.short}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={exchangeList}>
                                <View style={subExchangeHeading1}>
                                <Text style={heading}>Market</Text>
                                <Text style={Value}>{item["market"]}</Text>
                                </View>
                                <View style={subExchangeHeading2}> 
                                    <Text style={heading}>Price</Text>
                                    <Text style={Value}>{this.props.currencyLoaded[0]["currencySymbol"]} {(parseFloat(item["value"])*(this.props.currencyLoaded[0]["currencyPrice"])).toFixed(3)} </Text>
                                </View>
                            </View>
                        )
                    }} /> 
                    </View>}
                
                <BottomNavigation navigation={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        currencyFetching: state.currency.DataFetching,
        currencyINR: state.currency.DataINR,
        currencyLoaded: state.currency.DataSucess,
        exchange: state.exchange.DataSucess,
        exchangeLoading: state.exchange.DataFetching,
        exchangeError: state.exchange.DateError,
        exchangeSort: state.exchange.DataSort
    }
}

export default connect(mapStateToProps,{
exchangeToDisplay,
indianCurrency
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
        marginTop: 10, 
        marginLeft: 5,
        marginRight: 5,
    },
    searchExchange: {
        width: "80%",
        borderRadius: 15,
        backgroundColor: "white",
        height: 35,
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
        width: "35%"
    },
    subExchangeHeading1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "20%"
    },
    subExchangeHeading2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "30%"
    },
      heading: {
          textAlign: "center",
          fontSize: 12,
          marginBottom: 12,
          paddingTop: 5,
          color: "#4A708B"
      },
      Value: {
        textAlign: "center",
        marginTop: 3,
        fontSize: 15,
        paddingBottom: 5
      },
      flatlistStyle: {
         
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
    subExchangeHeading1,
    subExchangeHeading2
} = styles

//https://api.coindelta.com/api/v1/public/getticker/
//https://github.com/ccxt/ccxt
//https://api.cryptonator.com/api/full/btc-usd