import React from 'react';
import {  
    StyleSheet, 
    View, 
    Text
  } from 'react-native';

const coinStatus = (props) => {
   

    return (
        <View style={coinDetailsMain}> 
            <View style={coinDetailsH}>
            <Text style={mainHeading}> Coin Additional Details </Text>
            </View>
            {/* <View style={coinDetails}>
                <Text style={subHeadingContent}>Display Name:</Text>
                <Text> {props.coinDetails.display_name} ({props.coinDetails.id})</Text>
            </View> */}
            <View style={coinDetails}>
                <Text style={subHeadingContent}>Volume 24 Hour:  </Text>
                <Text style={subHeadingValue}> {props.coinDetails.volume} </Text>
            </View>
          
            <View style={coinDetails}>
                <Text style={subHeadingContent}>Market Cap: </Text>
                <Text style={subHeadingValue}> {[props.coinDetails.market_cap].toLocaleString()}</Text>
            </View>
            <View style={coinDetails}>
                <Text style={subHeadingContent}>24H Cap Change: </Text>
                <Text style={subHeadingValue}> {props.coinDetails.cap24hrChange}</Text>
            </View>
            <View style={coinDetails}>
                <Text style={subHeadingContent}>Price</Text>
                <Text style={subHeadingValue}> {[props.coinDetails.price_usd].toLocaleString()} </Text>
            </View>
            <View style={coinDetails}>
                <Text style={subHeadingContent}>Price in Bitcoin: </Text>
                <Text style={subHeadingValue}> {props.coinDetails.price_btc} </Text>
            </View>



        </View>
    )
}

export default coinStatus;

const styles = StyleSheet.create({ 
    coinDetailsMain: {
      marginTop: 15,
      display: "flex",
      flexDirection: "column",
      borderWidth: 0,
      backgroundColor: "white",
      borderRadius: 15,
      marginLeft: 5,
      marginRight: 5
    }, 
    coinDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent:  "space-between",
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
    }, 
    coinDetailsH: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    mainHeading: {
        textAlign: 'center',
        fontSize: 25, 
        color: "#4A708B"
    }, 
    subHeadingContent: {
        fontSize: 15,
        color: "#808080"
    },
    subHeadingValue: {
        fontSize: 15,
        color: "black",
        textAlign: "left"
    }
  })
  
  const {
    subHeadingContent, 
    subHeadingValue,
    coinDetails,
    coinDetailsMain,
    mainHeading,
    coinDetailsH
  } = styles
//coinDetails

// altCap: 91136287650.82591
// alt_name: "bitcoin"
// bitnodesCount: 9839
// btcCap: 112764544273.0243
// btcPrice: 7475
// cap24hrChange: 0.84
// display_name: "Bitcoin"
// dom: 38.57
// id: "BTC"
// market_cap: 112764544273.0243
// price: 6529.93487776
// price_btc: 1
// price_eth: 30.234668757709326
// price_eur: 5600.426016508046
// price_ltc: 113.23857273118857
// price_usd: 7475
// price_zec: 53.62634471162699
// rank: 1
// status: "available"
// supply: 17268862
// totalCap: 203900831923.85068
// type: "cmc"
// volume: 3517315555.62
// volumeAlt: 433422518.3436162
// volumeBtc: 272099890.4491198
// volumeTotal: 705522408.792735
// vwap_h24: 6501.0851100531945
// _id: "179bd7dc-72b3-4eee-b373-e719a9489ed9"