import React, { PureComponent } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableWithoutFeedback 
} from 'react-native';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/Entypo';





class  CoinCard extends PureComponent {

    state = {
        increased: false,
        decreased: false,
        selectedPostId: "none",
        stateToDisplay: false, 
        searchable: ''
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.coinPrice > nextProps.coinPrice ) {
           if (this.props.coinPrice > nextProps.coinPrice) {
               
              this.setState({decreased: true, increased: false})
              setTimeout(
                function() {
                    this.setState({decreased: false, increased: false})
                }.bind(this), 1500)
            }
           }

           if (this.props.coinPrice < nextProps.coinPrice) {
               if (this.props.coinPrice > nextProps.coinPrice) {
             
            this.setState({increased: true, decreased: false})
            setTimeout(
                function() {
                    this.setState({decreased: false, increased: false})
                }.bind(this), 1500)
           }
        }
    }

    touched = (id) => {
        this.setState({selectedPostId: id})
        if (this.props.coinShortName == this.state.selectedPostId ) {
           this.setState({stateToDisplay: !this.state.stateToDisplay})
        }
    }
    render () { 
       
        return (
            
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CoinCapCharts', {
                coinShortName: this.props.coinShortName, coinLongName: this.props.coinName
            })}>
               <View style={container1}>
                    <View style={upperRow}>
                       
                        <Image 
                            source={{uri: this.props.coinImage}}
                            style={img}
                            /> 
                             <Text style={coinSymbol}>{this.props.coinShortName}</Text>
                            <Text style={coinFullName}> {this.props.coinName} </Text>
                       </View>
                        <View style={lowerRow}>
                         <View style={aboveHeading}>
                            <Text style={sno}>SNo</Text>
                            <Text style={sno1}> {this.props.no} </Text>
                          </View>
                          <View style={aboveHeading}>
                             <Text style={sno}>Price</Text>
             
                                {/* <Text style={[this.state.increased ? {color: "green"} : null,this.state.decreased ? {color: "red"} : null]}></Text> */}
                                 <Text style={[coinPrice, this.state.increased ? {color: "green"} : null,this.state.decreased ? {color: "red"} : null]}>
                                 {[this.state.increased ? <Icons name="triangle-up" size={20} color="green" /> : null, this.state.decreased ? <Icons name="triangle-down" size={20} color="red" /> : null]}
                                {this.props.currencyLoaded[0]["currencySymbol"]}  {(this.props.coinPrice*this.props.currencyLoaded[0]["currencyPrice"]).toFixed(2)}
                                 </Text>
                           
                          </View>
                           <View style={aboveHeading}>
                             <Text style={sno}>%Change</Text>
                              <View style={percentageBox}>
                                <Text style={this.props.percentChange < 0 ? percentChangeMinus : percentChangePlus }>{this.props.percentChange}%</Text>
                             </View>
                            </View>

                        </View>
             </View>
        </TouchableWithoutFeedback>

        )

    }
}


const styles = StyleSheet.create({
    container1: {
        marginTop: 15,
        borderBottomColor: "#e5e5e5",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10
    },
    sno1: {
        marginTop: 10,
    },
    sno: {
        marginTop: 10,
        color: "#808080",
        textAlign: 'center',
    },
    upperRow: {
        padding: 2,
        display: "flex",
        flexDirection: "row",
    },
    lowerRow: {
        marginTop: 7,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    aboveHeading: {
        display: "flex",
        flexDirection: "column"
    },
    img: {
        width: 30,
        height: 30,
        marginTop: 6,
        marginLeft: 5
    },
    coinSymbol: {
    
        marginTop: 10,
        marginLeft: 20,
        marginRight: 0,  
        fontSize: 17,    
    },
    coinFullName: {
        color: "#808080",
        marginTop: 10,
        marginLeft: 1,
        marginRight: 5,   
        fontSize: 17,
    },
    seperator: {
        marginTop: 10,
        color: "black"
    },
    coinPrice: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 5,  
    },
    image: {
        width: 35,
        height: 35,
    },
    statisticsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center'
    },
    percentChangePlus: {
        backgroundColor: "#32CD32",
        color: "white",
        padding: 4
    },
    percentChangeMinus: {
        backgroundColor: "#FF2400",
        color: "white",
        padding: 4
    }, 
    signSpacing: {
        marginTop: 5,
        marginLeft: "auto",
        marginRight: 3
      }, 
      marketCap: {
        color: "#808080",
        fontSize: 12,
      }, 
    vwapData: {
        fontSize: 12,
        color: "#808080",
    }, 
    seperator1: {
        marginLeft: 12,
        marginRight: 12,
        color: "black"
    }, 
    percentageBox: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }, 
    arrowTick: {
        display: "flex",
        flexDirection: "row"
    }
})

const {    
    container1,
    sno, 
    img,
    upperRow,
    coinSymbol,
    coinPrice,
    percentChangePlus,
    percentChangeMinus,
    statisticsContainer,
    marketCap,
    whiteColor,
    vwapData,
    seperator1,
    percentageBox,
    coinFullName,
    lowerRow,
    aboveHeading, 
    sno1
} = styles;


// export default CoinCard

const mapStateToProps = state => {
    return {
        currencyLoaded: state.currency.DataSucess,
    }
}

export default connect(mapStateToProps)(CoinCard);