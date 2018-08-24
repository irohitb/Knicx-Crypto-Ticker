import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { ScrollView } from 'react-native';
import {fetchCoin, updateCrypto} from "../actions/cryptoAction.js"
import CoinCard from "../components/CoinCard.js"
import Header from './../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'




class cryptoTicker extends Component {



  componentWillMount() {
    this.props.fetchCoin()
    this.props.CurrencyRate()
  }

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
    

  //Update State from websocket
  var CryptoData = this.props.cryptoLoaded;
  
  let i=0;
 
  let displayCrypto = CryptoData.map(el => {
    return (<CoinCard
       no={i++}
       key={el["short"]}
       coinShortName = {el["short"]}
       coinName = {el["long"]}
       coinPrice = {el["price"].toFixed(2)}
       marketCap = {(el["mktcap"]/1000000000).toFixed(4)}
       percentChange = {el["perc"].toFixed(2)}
       vwapData={el["vwapData"].toFixed(2)}
      />
    )

  })




  return (

           <ScrollView>
             <Header />
            {displayCrypto}
           </ScrollView>
       );
  }
}


//Redux
const mapStateToProps = state => {
  return {
    cryptoLoaded: state.posts.itemsSucess,
    cryptoLoading: state.posts.itemsFetching,
    currencyLoaded: state.currency.DataSucess
  }
};

export default connect(mapStateToProps, {fetchCoin, updateCrypto, CurrencyRate})(cryptoTicker);
