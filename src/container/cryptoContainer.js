import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import {ScrollView, TextInput, StyleSheet, FlatList, View} from 'react-native';
import {fetchCoin, updateCrypto} from "../actions/cryptoAction.js"
import CoinCard from "../components/CoinCard.js"
import Header from './../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'






class cryptoTicker extends PureComponent {

  constructor() {
    super();
  this.updateCoinData = []
   this.displaySearchCrypto = []
}
  
  state = {
    searchCoin: false, 
    updateCoinData: false

  }

  componentDidMount() {
    this.socket = openSocket('https://coincap.io');
    this.props.fetchCoin()
    this.props.CurrencyRate()
  }

  componentDidUpdate() {

   
    if (this.state.updateCoinData || this.updateCoinData.length < 1 ) {
      this.updateCoinData = [...this.props.cryptoLoaded];
     this.setState({updateCoinData: true})
    }
  
      this.socket.on('trades', (tradeMsg) => {
       
      for (let i=0; i< this.updateCoinData.length; i++) {
     

        if (this.updateCoinData[i]["short"] == tradeMsg.coin ) {


        //Search for changed Crypto Value
       this.updateCoinData[i]["long"] = tradeMsg["message"]["msg"]["long"]
       this.updateCoinData["short"] = tradeMsg["message"]["msg"]["short"]
       this.updateCoinData[i]["perc"] = tradeMsg["message"]["msg"]["perc"]
       this.updateCoinData[i]["mktcap"]= tradeMsg['message']['msg']["mktcap"]
       this.updateCoinData[i]["price"] = tradeMsg['message']['msg']['price']


        //Update the crypto Value state in Redux
        this.props.updateCrypto(this.updateCoinData);

          }
        }
      })

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

     
             <View style={{height: '100%'}}>
             <Header />
             {/* Custom Search Input */}
           
             <TextInput
              style={textInput}
              placeholder="Search Coin"
              onChangeText={(text) => this.onSearch(text)} />
       
            
              <FlatList

               data={this.state.searchCoin ? this.displaySearchCrypto : this.props.cryptoLoaded}
               style={{flex:1}}
                    extraData={this.displaySearchCrypto}
                    keyExtractor={item => item.short}
                    initialNumToRender={50}
                    windowSize={21}
                 
                    removeClippedSubviews={true}
               renderItem={({ item, index }) => (
               <CoinCard
                  key = {index}
                  no = {index + 1}
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
         
       )
  }
}

//Creating Stylesheet 
const styles = StyleSheet.create({ 
  textInput: {

    borderColor: 'gray',
    flex: 0.08,
     borderWidth: 2
    
  
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