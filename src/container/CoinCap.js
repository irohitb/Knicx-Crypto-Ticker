import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { 
  TextInput, 
  StyleSheet, 
  FlatList, 
  View, 
  Text, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  fetchCoin, 
  updateCrypto, 
  // globalData
} from "../actions/coinCapAction.js"
import CoinCard from "./CoinCard.js"
import Spinner from 'react-native-loading-spinner-overlay';
import BottomNavigation from '../components/BottomNavigation.js'
import {
  CurrencyRate
} from '../actions/currencyData.js'




class cryptoTicker extends PureComponent {

  constructor() {
    super();
      this.updateCoinData = []
      this.displaySearchCrypto = []
      this.socket = openSocket('https://coincap.io');
  }
  
  state = {
    searchCoin: false, 
    loading: true

  }

  componentDidMount() {

    if (this.props.currencyLoaded.length == 0 || !this.props.currencyLoaded) {
      console.log("here")
      this.props.CurrencyRate("usd")
    }
    // this.props.globalData()
    this.props.fetchCoin()

      this.socket.on('trades', (tradeMsg) => {
          for (let i=0; i< this.updateCoinData.length; i++) {
              if (this.updateCoinData[i]["short"] == tradeMsg.coin ) {
                  //Search for changed Crypto Value
                  this.updateCoinData[i]["long"] = tradeMsg["message"]["msg"]["long"]
                  this.updateCoinData["short"] = tradeMsg["message"]["msg"]["short"]
                  this.updateCoinData[i]["perc"] = tradeMsg["message"]["msg"]["perc"]
                  this.updateCoinData[i]["mktcap"]= tradeMsg["message"]['msg']["mktcap"]
                  this.updateCoinData[i]["price"] = tradeMsg["message"]['msg']['price']
                  //Update the crypto Value state in Redux
                  this.props.updateCrypto(this.updateCoinData);
              }
          }
      })

  }

  componentWillReceiveProps(newProps){
          this.updateCoinData = [...newProps.cryptoLoaded];
  }

  //On Search type 
onSearch = (text) => {
  if (text == "") {
    this.socket = openSocket('https://coincap.io');
    this.setState({searchCoin: false})
    this.displaySearchCrypto = []
  } else if (!this.props.cryptoLoading) {
        if (!this.state.searchCoin) {
        this.setState({searchCoin: true})
        }
        this.socket.disconnect();
        this.displaySearchCrypto = []
        for (let i=0; i<this.props.cryptoLoaded.length; i++) {
          let coinVal = this.props.cryptoLoaded[i]["long"] + this.props.cryptoLoaded[i]["short"]
          if (coinVal.indexOf(text) > - 1) {
              this.displaySearchCrypto.push({
                no: {i},
                key: this.props.cryptoLoaded[i]["long"],
                short: this.props.cryptoLoaded[i]["short"],
                long: this.props.cryptoLoaded[i]["long"],
                price: this.props.cryptoLoaded[i]["price"],
                mktcap: this.props.cryptoLoaded[i]["mktcap"],
                perc: this.props.cryptoLoaded[i]["perc"],
                vwapData: this.props.cryptoLoaded[i]["vwapData"] 
               })
          
        }
      }
  }
}

componentWillUnmount() {
 this.socket.disconnect();
}
  render() {
   
  return (

     
             <View style={superMainView}>
            <View>
               <StatusBar backgroundColor="white" 
                barStyle="light-content"/>
            </View>
          { this.props.cryptoLoading ? 
            (  <View style={{ flex: 1 }}>
                <Spinner visible={this.props.cryptoLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View> ) :


            (<View style={mainView}>
    
             {/* Custom Search Input */}
           <View style={searchDrop}> 

             <TextInput
              style={textInput}
              placeholder="Search Coin"
              onChangeText={(text) => this.onSearch(text)} />

              <TouchableOpacity onPress={() => this.props.navigation.navigate("CurrencySelection")}>
              <View style={{flexDirection: "column"}}>
                  <Text style={money}> Currency </Text>
                  <Text style={money}> Selection </Text>
              </View>
              </TouchableOpacity>

            </View>
            
              <FlatList
              data={this.state.searchCoin ? this.displaySearchCrypto : this.props.cryptoLoaded}
              extraData={[this.displaySearchCrypto, this.props.cryptoLoaded]}
              keyExtractor={item => item.short}
              initialNumToRender={50}
              windowSize={21}
              removeClippedSubviews={true}
              renderItem={({ item, index }) => {
                let newlong  = item["long"]
                newlong = newlong.replace(/\s+/g, '');
                newlong = newlong.trim()
                return (
                  <CoinCard
                      navigation = {this.props.navigation}
                      key = {index}
                      no = {index + 1}
                      coinShortName = {item["short"]}
                      coinName = {item["long"]}
                      coinPrice = {item["price"].toFixed(2)}
                      marketCap = {(item["mktcap"]/1000000000).toFixed(4)}
                      percentChange = {item["perc"].toFixed(2)}
                      vwapData={item["vwapData"].toFixed(2)}
                      coinImage={"https://coincap.io/images/coins/" + newlong + ".png"}
                      />
                 )
                }}          
              />
        <BottomNavigation navigation={this.props.navigation}/>
       </View>)}

      
      </View>
         
       )
  }
}

//triangle-up

//Creating Stylesheet 
const styles = StyleSheet.create({ 
  textInput: { 
    width: "78%",
    height: 35,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 0,
    backgroundColor: "white",
    borderRadius: 15,
    textAlign: 'center'
  }, 
  cryptoName: {
    textAlign: "center"
  }, 
  mainView: {
    height: "100%", 
    backgroundColor: "#f3f3f3"
  },
  superMainView:{
  },
  searchDrop: {
    justifyContent:  "space-between",
    paddingTop: 32,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    height: 80,
    backgroundColor: "#3b5998"
  }, 
  money: {
    marginRight: 5,
    color: "white",
    textAlign: "center"
  }


})

const {
  textInput,
  mainView,
  superMainView,
  searchDrop,
  money
} = styles



//Redux
const mapStateToProps = state => {
  return {
    cryptoLoaded: state.coincap.itemsSucess,
    cryptoLoading: state.coincap.itemsFetching,
    cryptoGlobal: state.coincap.itemGlobal,
    currencyLoaded: state.currency.DataSucess,

  }
};

export default connect(mapStateToProps, 
  {fetchCoin, 
    updateCrypto, 
    CurrencyRate
    // globalData
  })(cryptoTicker);