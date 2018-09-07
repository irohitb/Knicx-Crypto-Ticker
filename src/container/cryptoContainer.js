import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import {ScrollView, TextInput, StyleSheet, FlatList, View} from 'react-native';
import {fetchCoin, updateCrypto} from "../actions/cryptoAction.js"
import CoinCard from "../components/CoinCard.js"
import Header from './../components/header.js';
import {CurrencyRate} from '../actions/currencyData.js'



class cryptoTicker extends PureComponent {

  componentDidMount() {
    this.props.fetchCoin()
    this.props.CurrencyRate()
  }
  render() {
  return (
           <ScrollView>
             <Header />
              <View>
              <FlatList
               data={this.props.cryptoLoaded}
               renderItem={({ item }) => (
               <CoinCard
                  key={item["long"]}
                  />
              )}
      />
      </View>
           </ScrollView>
       )
  }
}



//Redux
const mapStateToProps = state => {
  return {
    cryptoLoaded: state.posts.itemsSucess

  }
};

export default connect(mapStateToProps, {fetchCoin, updateCrypto, CurrencyRate})(cryptoTicker);


// function foo () {
//   value = "rohit"

//   console.log(value)
//   console.log(this.value)
// }