import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import {ScrollView, TextInput, StyleSheet, FlatList, View} from 'react-native';
import {fetchCoin, updateCrypto} from "../actions/cryptoAction.js"
import CoinCard from "../components/CoinCard.js"
import Header from './../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'
import ModalDropdown from 'react-native-modal-dropdown';



let displaySearchCrypto = []
var socket;
class cryptoTicker extends PureComponent {



  state = {
    searchCoin: false
  }

  componentWillMount() {

    this.props.fetchCoin()
    this.props.CurrencyRate()
  }

  componentDidUpdate() {
    //  this.socket = openSocket('https://coincap.io');
   

    // var updateCoinData = [...this.props.cryptoLoaded];
  
    //   this.socket.on('trades', (tradeMsg) => {
       
    //   for (let i=0; i<updateCoinData.length; i++) {
     

    //     if (updateCoinData[i]["short"] == tradeMsg.coin ) {

    //     //Search for changed Crypto Value
    //     updateCoinData[i]["long"] = tradeMsg["message"]["msg"]["long"]
    //     updateCoinData[i]["short"] = tradeMsg["message"]["msg"]["short"]
    //     updateCoinData[i]["perc"] = tradeMsg["message"]["msg"]["perc"]
    //     updateCoinData[i]['mktcap'] = tradeMsg['message']['msg']["mktcap"]
    //     updateCoinData[i]['price'] = tradeMsg['message']['msg']['price']


    //     //Update the crypto Value state in Redux
    //     this.props.updateCrypto(updateCoinData);

    //       }
    //     }
    //   })
  }

  //On Search type 
onSearch = (text) => {

  if (text == "") {
    this.setState({searchCoin: false})
    displaySearchCrypto = []
  }
 
    //check if coins are loaded or not 
    if (!this.props.cryptoLoading) {
        this.setState({searchCoin: true})
     
        for (let i=0; i<this.props.cryptoLoaded.length; i++) {
          let coinVal = this.props.cryptoLoaded[i]["long"] + this.props.cryptoLoaded[i]["short"]
          if (coinVal.indexOf(text) > - 1) {
              displaySearchCrypto.push({
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
 // socket.disconnect();
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
              onChangeText={(text) => this.onSearch(text)} />
              </View>
              <View>
              <FlatList
               data={this.state.searchCoin ? displaySearchCrypto : this.props.cryptoLoaded}
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


// function foo () {
//   value = "rohit"

//   console.log(value)
//   console.log(this.value)
// }