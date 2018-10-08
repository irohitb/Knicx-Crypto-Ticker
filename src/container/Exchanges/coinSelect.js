import React, { Component} from 'react';
import {
    View, 
    Text, 
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput, 
    FlatList
} from "react-native";
import { connect } from 'react-redux';
import BottomNavigation from '../../components/BottomNavigation';
import Icons from 'react-native-vector-icons/Entypo';
import { 
    exchangeToDisplay,
    coinUpdateState 
} from "../../actions/coinExchange";
import {
    fetchCoin
} from "../../actions/coinCapAction.js"






let k=1;
class coinSelect  extends Component {
    constructor() {
        super() 
        this.displaySearch,
        this.displaySearchCrypto = []
    }

     state = {
         searchCoin: false,
     }

    onSearch = (text) => {   
        if (text == "") {
            this.setState({searchCoin: false})
            this.displaySearchCrypto = []
          } else if (!this.props.cryptoLoading) {
                if (!this.state.searchCoin) {
                this.setState({searchCoin: true})
                }
                this.displaySearchCrypto = []
                for (let i=0; i<this.props.cryptoLoaded.length; i++) {
                  let coinVal = this.props.cryptoLoaded[i]["long"] + this.props.cryptoLoaded[i]["short"]
                  if (coinVal.indexOf(text) > - 1) {
                      this.displaySearchCrypto.push({
                        no: {i},
                        key: this.props.cryptoLoaded[i]["long"],
                        short: this.props.cryptoLoaded[i]["short"],
                        long: this.props.cryptoLoaded[i]["long"]
                       })
                }
              }
          }
    }


    setCryptoCurrency = (text) => {

        console.log(text)
        let CryptoCurrencySelected = text.toUpperCase()
   
        AsyncStorage.setItem('CryptoCurrencySelected', CryptoCurrencySelected).then(() => {
            this.props.coinUpdateState(true)
            this.props.exchangeToDisplay(CryptoCurrencySelected)
            this.props.navigation.navigate('Home')
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
                        placeholder="Search Coin"
                        onChangeText={(text) => this.onSearch(text)} />
                    </View> 


            <FlatList
              data={this.state.searchCoin ? this.displaySearchCrypto : this.props.cryptoLoaded}
              extraData={[this.displaySearchCrypto, this.props.cryptoLoaded]}
              keyExtractor={item => item.short}
              initialNumToRender={50}
              windowSize={21}
              removeClippedSubviews={true}
              renderItem={({ item, index }) => {
                let newlong  = item["long"]
                newlong = newlong.replace(/\s+/g, '');
                newlong = newlong.trim()
                return (
                
                    <TouchableOpacity style={listOfCurrencies}
                    onPress={() => this.setCryptoCurrency(item["short"])}> 
                        <View style={imageTextLong}>
                            <Image 
                            source={{uri: "https://coincap.io/images/coins/" + newlong + ".png"}}
                            style={currencyCoinImage} />
                        <Text style={coinSelectLong}> {item["long"]} </Text>
                        </View>
                        <View>
                             <Text style={coinSelectShort}> {item["short"]} </Text>
                        </View>
                    </TouchableOpacity>
                 )
                }}          
              />

             <BottomNavigation />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      cryptoLoaded: state.coincap.itemsSucess,
      cryptoGlobal: state.coincap.itemGlobal,
      currencyLoaded: state.currency.DataSucess,
    }
  };

export default connect(mapStateToProps, {
    fetchCoin,
    exchangeToDisplay,
    coinUpdateState
})(coinSelect);

    const styles = StyleSheet.create({ 
        listOfCurrencies: {
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
            justifyContent: "space-between"
        }, 
        imageTextLong: {
            display: "flex",
            flexDirection: "row"
        },
        currencyCoinImage: {
            height: 25,
            width: 25,
            marginLeft: 5,
            marginRight: 5
        },
        dataShort: {
            fontSize: 13,
            marginRight: 5
        },
        index: {
            marginLeft: 2,
            width: 20
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
          },
          coinSelectLong: {

          },
          coinSelectShort: {

          }
    
    })
    const {
        listOfCurrencies,
        currencySlectionMain,
        textInput,
        searchText,
        currencyCoinImage,
        coinSelectShort,
        coinSelectLong,
        imageTextLong
    } = styles