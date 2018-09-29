import React, { PureComponent} from 'react';
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import { connect } from 'react-redux';
import  { 
    CurrencyDisplay,
    currencyDetails,
    currencyKey
} from "../actions/currencyDetails.js"
import {CurrencyRate} from '../actions/currencyData.js'
import Header from '../components/header.js';
import BottomNavigation from '../components/BottomNavigation';

let k=1;
class Language extends PureComponent {

    constructor() {
        super() 
        this.selectedLanguage = "AUD"
    }

    componentDidMount() {
        this.props.CurrencyRate(this.selectedLanguage)
    }

    render() {
        return (
            <View style={currencySlectionMain}> 
                   <Header 
                    navigation = {this.props.navigation} 
                    enable = "true" />   
                       <ScrollView>
                  <View style={listOfCurrencies}>
               
                  { CurrencyDisplay.map(data => 
                  <TouchableOpacity>
                      <View style={IndvidualCurrencyMain}> 
                          <Text  style={dataLong}> {data["long"]}</Text>
                          <Text  style={dataShort}>{data["short"]}</Text> 
                      </View>
                  </TouchableOpacity>)}
                
                </View>
                </ScrollView> 
                <BottomNavigation />
             </View>
       
        )
    }
}


export default connect(null, 
    {
      CurrencyRate, 
    })(Language);

    //Creating StyleSheet 

    const styles = StyleSheet.create({ 
        listOfCurrencies: {
            display: "flex",
            flexDirection: "column",
            marginBottom: 60
        }, 
        IndvidualCurrencyMain: {
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            height: 80,
            alignItems: "center",
            height: 50,
            borderRadius: 10,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 5,
            marginBottom: 5

        },
        dataLong:{
            marginLeft: 3,
            width: 150
        },
        dataShort: {
            marginLeft: "48%",
            marginRight: 5
        },
        index: {
            marginLeft: 2,
            width: 20
        },
        currencySlectionMain: {
            flex: 1
        }
    })

    const {
        listOfCurrencies,
        IndvidualCurrencyMain,
        dataLong, 
        dataShort,
        index,
        currencySlectionMain
    } = styles