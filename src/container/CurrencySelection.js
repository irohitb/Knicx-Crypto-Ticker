import React, { PureComponent} from 'react';
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput
} from "react-native";
import { connect } from 'react-redux';
import  { 
    CurrencyDisplay
} from "../actions/currencyDetails.js"

import {CurrencyRate} from '../actions/currencyData.js'
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
                    <TextInput
                    style={textInput}
                    placeholder="Search Coin"
                    onChangeText={(text) => this.onSearch(text)} />
                    </View> 
                       <ScrollView>
                  <View style={listOfCurrencies}>
               
                  { CurrencyDisplay.map(data => {
                  let CurrencyURl = "https://www.countryflags.io/" + data["Co"] + "/flat/32.png"
                  console.log(CurrencyURl)
                  return (
                  <TouchableOpacity>
                      <View style={IndvidualCurrencyMain}> 
                      <View style={imagDataLong}>
                      <Image 
                            source={{uri: CurrencyURl}}
                            style={currencyFlagImage}
                            /> 
                       
                          <Text  style={dataLong}> {data["long"]}</Text>
                        </View>
                          <Text  style={dataShort}>{data["short"]}</Text> 
                         
                      </View>
                  </TouchableOpacity>)})}
                
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
            marginBottom: 60,
            
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
            marginBottom: 5,
            justifyContent:  "space-between"
           

        },
        dataLong:{
            fontSize: 13,
            marginLeft: 3,
            width: 150
        },
        dataShort: {
            fontSize: 13,
            marginRight: 5
        },
        index: {
            marginLeft: 2,
            width: 20
        },
        currencyFlagImage: {
            height: 25,
            width: 25,
            marginLeft: 5,
            marginRight: 5
        },
        imagDataLong: {
            display: "flex",
            flexDirection: "row"
        }, 
        textInput: { 
            height: 35,
            marginLeft: 5,
            marginRight: 5,
            borderWidth: 0,
            backgroundColor: "white",
            borderRadius: 15,
            textAlign: 'center'
          },
          searchText: {
            backgroundColor: "#3b5998"
          }
    
    })

    const {
        listOfCurrencies,
        IndvidualCurrencyMain,
        dataLong, 
        dataShort,
        index,
        currencySlectionMain,
        currencyFlagImage,
        imagDataLong,
        textInput,
        searchText

    } = styles