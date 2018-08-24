import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import {ScrollView, TextInput, StyleSheet } from 'react-native';
import {fetchCoin, updateCrypto} from "../actions/cryptoAction.js"
import CoinCard from "../components/CoinCard.js"
import Header from './../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'
import ModalDropdown from 'react-native-modal-dropdown';



let displaySearchCrypto = []

class cryptoTicker extends Component {



  state = {
    searchCoin: false
  }

  componentWillMount() {
    console.log("here inside comppnent will mount")
    this.props.fetchCoin()
    this.props.CurrencyRate()
  }

  //On Search type 
onSearch = (text) => {

  if (text == "") {
    this.setState({searchCoin: false})
  }
 
    //check if coins are loaded or not 
    if (!this.props.cryptoLoading) {
        this.setState({searchCoin: true})
        let updateCoinData = [...this.props.cryptoLoaded];
        for (let i=0; i<updateCoinData.length; i++) {
          let coinVal = updateCoinData[i]["long"] + updateCoinData[i]["short"]
          if (coinVal.indexOf(text) > - 1) {
              displaySearchCrypto.push(<CoinCard 
                no={i}
                key={updateCoinData[i]["long"]}
                coinShortName = {updateCoinData[i]["short"]}
                coinName = {updateCoinData[i]["long"]}
                coinPrice = {updateCoinData[i]["price"].toFixed(2)}
                marketCap = {(updateCoinData[i]["mktcap"]/1000000000).toFixed(4)}
                percentChange = {updateCoinData[i]["perc"].toFixed(2)}
                vwapData={updateCoinData[i]["vwapData"].toFixed(2)}    
                coinImage={"https://coincap.io/images/coins/" + updateCoinData[i]["long"] + ".png"} />
            )
        }
        
    }
  }
}



  //On Clear 

  //Socket.io
  componentDidUpdate() {
    var socket = openSocket('https://coincap.io');
    var updateCoinData = [...this.props.cryptoLoaded];
     socket.on('trades', (tradeMsg) => {
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



  render() {

  //CurrencyData

  //
 //If condition to see if we need to display the spinner
 // if (this.props.cryptoLoading) {
 //
 // }

 let displayCrypto;

    if (this.state.searchCoin) {
      displayCrypto =  displaySearchCrypto
      console.log(displayCrypto)

    }

  //Update State from websocket
  var CryptoData = this.props.cryptoLoaded;
  let i=1;
 
  if (!this.state.searchCoin) {
     displayCrypto = CryptoData.map(el => {
      return (<CoinCard
        no={i++}
        key={el["short"]}
        coinShortName = {el["short"]}
        coinName = {el["long"]}
        coinPrice = {el["price"].toFixed(2)}
        marketCap = {(el["mktcap"]/1000000000).toFixed(4)}
        percentChange = {el["perc"].toFixed(2)}
        vwapData={el["vwapData"].toFixed(2)}
        coinImage={"https://coincap.io/images/coins/" + el["long"] + ".png"}
        />
      )
    })
  }

  console.log(typeof displayCrypto)
  console.log(this.props.currencyLoaded)




  return (

           <ScrollView>
             <Header />
             {/* Custom Search Input */}
             <TextInput
              style={textInput}
              placeholder="Search Coin"
              onChangeText={(text) => this.onSearch(text)} />

              {displayCrypto}
           </ScrollView>
       )
  }
}

//Creating Stylesheet 
const styles = StyleSheet.create({ 
  textInput: {
    borderColor: 'gray',
    flex: 0.8,
     borderWidth: 2,
     height: 45
  
  }
})

const {
  textInput
} = styles



//Redux
const mapStateToProps = state => {
  return {
    cryptoLoaded: state.posts.itemsSucess,
    cryptoLoading: state.posts.itemsFetching,
    currencyLoaded: state.currency.DataSucess
  }
};

export default connect(mapStateToProps, {fetchCoin, updateCrypto, CurrencyRate})(cryptoTicker);
