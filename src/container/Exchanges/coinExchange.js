import React, { PureComponent} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TextInput, 
    FlatList, 
    TouchableOpacity,
    AsyncStorage,
    Image,
    StatusBar
} from "react-native"
import { connect } from 'react-redux';
import BottomNavigation from '../../components/BottomNavigation.js'
import {
    exchangeToDisplay,
    coinUpdateState
} from "../../actions/coinExchange.js"
import {
    indianCurrency
} from "../../actions/currencyData.js"
import { 
    Bars, 
   } from 'react-native-loader';
import Icons1 from "react-native-vector-icons/FontAwesome"
class coinExchange extends PureComponent {


    constructor() {
        super () 
        this.coinURL = "BTC"
        this.coinURLFull = ""
        this.searchMarket = []
        this.combineExchangeDate = false
        this.coinExchangeArray = []
    }

    state = {
        searchMarket: false,
        coinExchangeArray: [],
        isFetching: false
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
         }
    }

 
    onRefresh = () => {
        this.coinExchangeArray=[]
        this.setState({coinExchangeArray: [...this.coinExchangeArray]})
        this.setState({isFetching: true})
            refreshData = async () => {
                await this.props.indianCurrency()
                await this.props.exchangeToDisplay(this.coinURL, true)
                await this.setState({isFetching: false})
            }
            refreshData()
    }

   

    componentDidMount() {
        this.props.coinUpdateState(true)
        this.props.indianCurrency()
        displayData()
    //Set Timeout API Call
    }




    render () {     
          //Async Storage -> We are storing currency in local storage (in currency selection) and calling it here 
        if (this.props.cryptoUpdateState) {
      
            displayData = async () => {
                this.coinURL = await AsyncStorage.getItem("CryptoCurrencySelected").catch((error) => {
                    console.log(error)
                })

                 if (await (this.coinURL != null)) {
                  this.props.exchangeToDisplay(this.coinURL)
                  this.props.coinUpdateState(false)
                  this.coinExchangeArray = []
                 }
    
                 if (await (this.coinURL == null)) {
                    this.coinURL = "BTC"
                    this.props.coinUpdateState(false)
                    this.coinExchangeArray = []
                 }
            }  
            displayData()
           
        }

   
        if (!this.props.exchangeSort && !this.props.exchangeError && !this.props.currencyFetching) {
            //Koinex
                if (!this.combineExchangeDate && this.coinExchangeArray.length < 1) {

                    if (!isNaN(parseFloat(this.props.exchange[0]["data"]["prices"]["inr"][this.coinURL])*(this.props.currencyINR["rates"]["USD"])))  {
                    this.coinExchangeArray.push({
                    "market": "Koinex",
                    "value" : parseFloat(this.props.exchange[0]["data"]["prices"]["inr"][this.coinURL])*(this.props.currencyINR["rates"]["USD"])
                    })
                }

                    //Coin Delta -> No Coin FIx exsist 
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
                    if (this.props.exchange[2]["data"]["error"] != "Pair not found") {
                        for (let i=0; i<this.props.exchange[2]["data"]["ticker"]["markets"].length; i++) { 
                    
                            this.coinExchangeArray.push({
                                "market":  this.props.exchange[2]["data"]["ticker"]["markets"][i]["market"],
                                "value": parseFloat(this.props.exchange[2]["data"]["ticker"]["markets"][i]["price"])
                            })
                        }
                    }

                    //CoinCap Api as well 
                    for (let i=0; i<this.props.cryptoLoaded.length; i++) {
                        if (this.coinURL == this.props.cryptoLoaded[i]["short"]) {
                            this.coinURLFull = this.props.cryptoLoaded[i]["long"]
                            this.coinURLFull = this.coinURLFull.replace(/\s+/g, '');
                            this.coinURLFull = this.coinURLFull.trim()
                            this.coinExchangeArray.push({
                                "market": "CoinCap Api",
                                "value": this.props.cryptoLoaded[i]["price"]
                            })
                         }
                    }

                
                this.setState({coinExchangeArray: [...this.coinExchangeArray]})
            }
        }

        return (
            <View style={exchangeMain}> 
            <View>
               <StatusBar backgroundColor="white" 
                barStyle="light-content"/>
            </View>
                { this.props.exchangeLoading ? 
                <View style={loadingComponent}>       
                    <Bars  size={15} color="#4CAF50" /> 
                { this.props.exchangeError ?  (<Text> There seems to be some problem fetching data. Check your Internet connection or any available update. </Text>) : null }
                </View> :  
                    <View style={{flex: 1}}>
                         <View style={header}> 
                            <View style={imageHeader}>
                                <Image 
                                style={ImageHeading}
                                source={{uri: "https://coincap.io/images/coins/" + this.coinURLFull + ".png"}}/>
                                
                                <Text style={textHeader}> {this.coinURLFull} ({this.coinURL}) </Text>
                            </View>
                            <View style={viewSearchExchange}> 
                                <TextInput
                                    style={searchExchange}
                                    placeholder="Search Market"
                                    onChangeText={(text) => this.onSearch(text)}/>
                                   
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('cryptoToShow')}>
                                    <View style={cryptoSelect}>
                                        <Text> <Icons1 name="exchange" size={30} color="white"></Icons1></Text>
                                    </View>
                                </TouchableOpacity>
                                
                          </View>
                       </View>
             
                    <FlatList 
                    style={flatlistStyle}
                    data={this.state.searchMarket ?  this.searchMarket : this.coinExchangeArray}
                    extraData={[this.coinExchangeArray, this.searchMarket]}
                    keyExtractor={item => item.short}
                    contentContainerStyle={{paddingBottom:60}}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
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
        cryptoLoaded: state.coincap.itemsSucess,
        currencyFetching: state.currency.DataFetching,
        currencyINR: state.currency.DataINR,
        currencyLoaded: state.currency.DataSucess,
        exchange: state.exchange.DataSucess,
        exchangeLoading: state.exchange.DataFetching,
        exchangeError: state.exchange.DateError,
        exchangeSort: state.exchange.DataSort,
        cryptoUpdateState: state.exchange.DataUpdate
    }
}

export default connect(mapStateToProps,{
exchangeToDisplay,
indianCurrency,
coinUpdateState
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    searchExchange: {
        width: "90%",
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
          paddingTop: 8,
          marginBottom: 10
      },
    
      subExchangeHeading3: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "22%"
    },
    subExchangeHeading1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "30%"
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
          color: "#4A708B",
          display: "flex",
          flexDirection: "row"
      },
      imageHeader: {
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 2
      },
      Value: {
        textAlign: "center",
        marginTop: 3,
        fontSize: 15,
        paddingBottom: 5
      },
      value1: {
          textAlign: "center",
         backgroundColor: "#32CD32",
         padding: 3,
         color: "white"
      },
      cryptoSelect: {
          marginLeft: 3,
          marginRight: 5,
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          color: "white"
      },
      flatlistStyle: {
          display: "flex",
          flex: 1
      },
      ImageHeading: {
          height: 30,
          width: 30
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
    subExchangeHeading3,
    heading,
    Value,
    flatlistStyle,
    subExchangeHeading1,
    subExchangeHeading2,
    value1,
    cryptoSelect,
    ImageHeading,
    imageHeader
} = styles

//https://api.coindelta.com/api/v1/public/getticker/
//https://github.com/ccxt/ccxt
//https://api.cryptonator.com/api/full/btc-usd