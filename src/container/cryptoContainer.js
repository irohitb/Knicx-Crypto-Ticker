import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import {ScrollView, TextInput, StyleSheet, FlatList, View} from 'react-native';
import CoinCard from "../components/CoinCard.js"
import Header from './../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import {ApiCoinCap} from '../urls.js';


let displaySearchCrypto = []
var socket

class cryptoTicker extends Component {



  state = {
    searchCoin: false, 
    currencyData: [],
    error: false
  }

  componentWillMount() {
    this.props.fetchCoin()
    this.props.CurrencyRate()
  }

  componentDidMount() {
     this.socket = openSocket('https://coincap.io');

    var updateCoinData = [...this.props.cryptoLoaded];
    console.log(this.props.cryptoLoaded)
      this.socket.on('trades', (tradeMsg) => {
    
      for (let i=0; i<updateCoinData.length; i++) {
     

        if (updateCoinData[i]["short"] == tradeMsg.coin ) {

        //Search for changed Crypto Value
        updateCoinData[i]["long"] = tradeMsg["message"]["msg"]["long"]
        updateCoinData[i]["short"] = tradeMsg["message"]["msg"]["short"]
        updateCoinData[i]["perc"] = tradeMsg["message"]["msg"]["perc"]
        updateCoinData[i]['mktcap'] = tradeMsg['message']['msg']["mktcap"]
        updateCoinData[i]['price'] = tradeMsg['message']['msg']['price']


        //Update the crypto Value state in Redux
        this.props.updateCrypto(updateCoinData);

          }
        }
      })
  }

  //On Search type 
onSearch = (text) => {
  //Setting
  displaySearchCrypto = [];
 console.log("Inside onSearch", text)
 
    //check if coins are loaded or not 
    if (!this.props.cryptoLoading) {
        this.setState({searchCoin: true})
        let updateCoinData = [...this.state.currencyData];
        for (let i=0; i<updateCoinData.length; i++) {
          let coinVal = updateCoinData[i]["long"] + updateCoinData[i]["short"]
          console.log(coinVal)
          if (coinVal.indexOf(text) > - 1) {
              displaySearchCrypto.push({
                no: {i},
                short: updateCoinData[i]["short"],
                long: updateCoinData[i]["long"],
                price: updateCoinData[i]["price"],
                mktcap: updateCoinData[i]["mktcap"],
                perc: updateCoinData[i]["perc"],
                vwapData: updateCoinData[i]["vwapData"] 
               })
          
        }
      }
  }
}

componentWillUnmount() {
  this.socket.disconnect();
}


  //On Clear 

  //Socket.io
  // componentDidUpdate() {
  //   // var socket = openSocket('https://coincap.io');

  //   // var updateCoinData = [...this.props.cryptoLoaded];
  //   //  socket.on('trades', (tradeMsg) => {
      // for (let i=0; i<updateCoinData.length; i++) {

      //   if (updateCoinData[i]["short"] == tradeMsg.coin ) {

      //   //Search for changed Crypto Value
      //   updateCoinData[i]["long"] = tradeMsg["message"]["msg"]["long"]
      //   updateCoinData[i]["short"] = tradeMsg["message"]["msg"]["short"]
      //   updateCoinData[i]["perc"] = tradeMsg["message"]["msg"]["perc"]
      //   updateCoinData[i]['mktcap'] = tradeMsg['message']['msg']["mktcap"]
      //   updateCoinData[i]['price'] = tradeMsg['message']['msg']['price']


      //   //Update the crypto Value state in Redux
      //   this.props.updateCrypto(updateCoinData);

      //     }
      //   }
  //   //  })
  // }



  render() {




  return (

           <ScrollView>
             <Header />
             {/* Custom Search Input */}
             <View>
             <TextInput
              style={textInput}
              placeholder="Search Coin"
              onChangeText={(text) => this.onSearch(text)} 
              onClear={this.onClear}
              />
              </View>
              <View>
              <FlatList
               data={this.state.searchCoin ? displaySearchCrypto : this.state.currencyData }
               renderItem={({ item }) => (
               <CoinCard
                  key={item["long"]}
                  coinShortName = {item["short"]}
                  coinName = {item["long"]}
                  coinPrice = {item["price"].toFixed(2)}
                  marketCap = {(item["mktcap"]/1000000000).toFixed(4)}
                  percentChange = {item["perc"].toFixed(2)}
                  vwapData={item["vwapData"].toFixed(2)}
                  coinImage={"https://coincap.io/images/coins/" + item["long"] + ".png"}
                  />
              )}
      />
      </View>
           </ScrollView>
       )
  }
}

//Creating Stylesheet 
const styles = StyleSheet.create({ 
  textInput: {
    borderColor: 'gray',
    flex: 0.5,
     borderWidth: 2,
     height: 45,
     borderRadius:0
  
  }
})

const {
  textInput
} = styles



//Redux
const mapStateToProps = state => {
  return {
    currencyLoaded: state.currency.DataSucess
  }
};

export default connect(mapStateToProps, {fetchCoin, updateCrypto, CurrencyRate})(cryptoTicker);


// function foo () {
//   value = "rohit"

//   console.log(value)
//   console.log(this.value)
// }
