import React, { Component} from 'react';
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

import {
    CurrencyRate,
    CurrencyState
} from '../actions/currencyData.js'
import BottomNavigation from '../components/BottomNavigation';
import Icons from 'react-native-vector-icons/Entypo';

let k=1;
class Language extends Component {
    constructor() {
        super() 
        this.displaySearch
        this.CurrencyDisplay = CurrencyDisplay
    }
     state = {
         searchCurrency: false,
     }
    onSearch = (text) => {
        // Set State to false
        if (text == "" || text == " ") {
         this.CurrencyDisplay = []
         this.CurrencyDisplay = CurrencyDisplay
          this.setState({searchCurrency: false})
        } else {     
            if (!this.state.searchCurrency) {
                this.setState({searchCurrency: true})
                }
         this.CurrencyDisplay = []
         for (let i=0; i<CurrencyDisplay.length; i++) {
          let currencyVal = CurrencyDisplay[i]["long"] + CurrencyDisplay[i]["short"]
         if (currencyVal.indexOf(text) > -1) {
            this.CurrencyDisplay.push({
             no: {i},
             short: CurrencyDisplay[i]["short"],
             long: CurrencyDisplay[i]["long"],
             Co: CurrencyDisplay[i]["Co"]
            })
          }
        }
      }
    }

    setGlobalLanguage = (event, eventLong) => {
        //Event is short Name here for currency and event long is large name for image 
        this.props.CurrencyRate(event)
        this.props.navigation.navigate('Home')
        AsyncStorage.setItem('currencySelected', event)
        AsyncStorage.setItem('ImageLong', eventLong, () => {
            this.props.CurrencyState(true)
        })
    }



    render() {
        
        return (
            <View style={currencySlectionMain}> 
                   
                    <View style={searchText}>    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                     <Text> 
                         <Icons name="chevron-left" size={30} color="white" />
                    </Text> 
                   </TouchableOpacity>
                        <TextInput
                        style={textInput}
                        placeholder="Search Currnecy"
                        onChangeText={(text) => this.onSearch(text)} />
                    </View> 
                <ScrollView
                 contentContainerStyle={{paddingBottom:60}}>
                  <View style={listOfCurrencies}> 
                  { this.CurrencyDisplay.map(data => {
                  let CurrencyURl = "https://www.countryflags.io/" + data["Co"] + "/shiny/32.png"
                  let dataShort = data["short"]
                  return (
                  <TouchableOpacity onPress={() => this.setGlobalLanguage(data["short"], data["Co"])}>
                      <View style={IndvidualCurrencyMain}> 
                      <View style={imagDataLong}>
                        <Image 
                        source={{uri: CurrencyURl}}
                        style={currencyFlagImage}/> 
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
      CurrencyState 
    })(Language);

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
            width: "80%",
            height: 35,
            marginLeft: 5,
            marginRight: 5,
            borderWidth: 0,
            backgroundColor: "white",
            borderRadius: 15,
            textAlign: 'center',
          },
          searchText: {
            backgroundColor: "#3b5998",
            paddingTop: 35,
            paddingBottom: 10,
            display: "flex",
            flexDirection: "row"
          }
    
    })
    const {
        listOfCurrencies,
        IndvidualCurrencyMain,
        dataLong, 
        currencySlectionMain,
        currencyFlagImage,
        imagDataLong,
        textInput,
        searchText
    } = styles