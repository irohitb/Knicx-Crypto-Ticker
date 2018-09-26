import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { 
  TextInput, 
  StyleSheet, 
  FlatList, 
  View, 
  Text
} from 'react-native';
import {
  fetchCoin, 
  updateCrypto, 
  globalData
} from "../actions/coinCapAction.js"
import CoinCard from "./CoinCard.js"
import Header from '../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'
import Spinner from 'react-native-loading-spinner-overlay';
import BottomNavigation from '../components/BottomNavigation.js'
import ModalDropdown from 'react-native-modal-dropdown';
 






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
    this.props.globalData()
    this.props.fetchCoin()
    this.props.CurrencyRate("AUD")
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
          { this.props.cryptoLoading ? 
            (  <View style={{ flex: 1 }}>
                <Spinner visible={this.props.cryptoLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View> ) :
            (<View style={mainView}>
             <Header />
             {/* Custom Search Input */}
           <View style={searchDrop}> 
             <TextInput
              style={textInput}
              placeholder="Search Coin"
              onChangeText={(text) => this.onSearch(text)} />
              <ModalDropdown 
              options={['option 1', 'option 2']}
              defaultValue="USD"/>
            </View>
            
              <FlatList
                     data={this.state.searchCoin ? this.displaySearchCrypto : this.props.cryptoLoaded}
                     style={{flex:1}}
                    extraData={[this.displaySearchCrypto, this.props.cryptoLoaded]}
                    keyExtractor={item => item.short}
                    initialNumToRender={50}
                    windowSize={21}
                    removeClippedSubviews={true}
                   renderItem={({ item, index }) => {
                 let newlong  = item["long"]
                 //Removing spaces in image name
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
                    
                 )}}          
      />
        <BottomNavigation />
       </View>)}

      
      </View>
         
       )
  }
}

//Creating Stylesheet 
const styles = StyleSheet.create({ 
  textInput: {
    flex: 0.9,
    height: 40,
    borderWidth: 0,
    backgroundColor: "white"
  }, 
  cryptoName: {
    textAlign: "center"
  }, 
  mainView: {
    flex: 1,
    height: "100%", 
    backgroundColor: "#f3f3f3"
  },
  superMainView:{
    flex: 1
  },
  searchDrop: {
    flex: 0.1,
    display: "flex",
    flexDirection: "row",
    height: 40

  }
})

const {
  textInput,
  cryptoName,
  mainView,
  superMainView,
  searchDrop
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
    CurrencyRate, 
    globalData
  })(cryptoTicker);