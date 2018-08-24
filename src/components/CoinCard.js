import React, { Component } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import Display from 'react-native-display';





class  CoinCard extends Component {

    state = {
        increased: false,
        decreased: false,
        selectedPostId: "none",
        stateToDisplay: false, 
        searchable: ''
    }



    componentWillReceiveProps(nextProps) {

        if (this.props.coinPrice != nextProps.coinPrice ) {
           if (this.props.coinPrice > nextProps.coinPrice) {
              this.setState({decreased: true, increased: false})
           }

           if (this.props.coinPrice < nextProps.coinPrice) {
            this.setState({increased: true, decreased: false})
           }
        }
    }

    touched = (id) => {
        console.log("inside touched")
        this.setState({selectedPostId: id})
        if (this.props.coinShortName == this.state.selectedPostId ) {
            console.log("inside If condition in props.key and selected post")
           this.setState({stateToDisplay: !this.state.stateToDisplay})
        }
    }



    componentDidUpdate() {
        setTimeout(
            function() {
                this.setState({decreased: false, increased: false})
            }.bind(this), 100)
        }



    render () { 

    /* <View style={statisticsContainer}>
                
                              <Text style={marketCap}>Cap: {this.props.marketCap}B </Text>
                             <Text style={seperator1}>|</Text>
                             <Text style={vwapData}>24vwap: {this.props.vwapData} </Text>
                     </View> */

        return (

            <TouchableOpacity  style={[container1,this.state.increased ? {backgroundColor: "#B4EEB4"} : null,this.state.decreased ? {backgroundColor: "#ffe5e5"} : null]} onPress={() => this.touched(this.props.coinShortName)}>
                    <View style={upperRow}>
                    <Text style={sno}> {this.props.no} </Text>
                    <Image 
                        source={{uri: this.props.coinImage}}
                        style={img}
                        /> 
                        <Text style={coinSymbol}>{this.props.coinShortName}</Text>
                        <Text style={coinPrice}>${this.props.coinPrice}</Text>
                        <View style={percentageBox}>
                        <Text style={this.props.percentChange < 0 ? percentChangeMinus : percentChangePlus }>{this.props.percentChange}%</Text>
                        </View>
                        </View>
               
                <Display enable={this.state.stateToDisplay}>
                    <View style={statisticsContainer}>
                              <Text style={marketCap}>Cap: {this.props.marketCap}B </Text>
                             <Text style={seperator1}>|</Text>
                             <Text style={vwapData}>24vwap: {this.props.vwapData} </Text>
                    </View>
                </Display> 

             </TouchableOpacity>




        )

    }
}


const styles = StyleSheet.create({
    container1: {
        display: "flex",
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 10,
        backgroundColor: "white"
    },
    sno: {
        marginTop: 10,
        color: "#808080"
    },
    upperRow: {
        padding: 5,
        display: "flex",
        flexDirection: "row",
        //marginBottom: 15,
    },
    img: {
        width: 30,
        height: 30,
        marginTop: 6,
        marginLeft: 5
    },
    coinSymbol: {
        color: "#808080",
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,      
    },
    coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20,
        color: "#808080"
    },
    seperator: {
        marginTop: 10,
        color: "black"
    },
    coinPrice: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 5,
        color: "#808080"     
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
        marginTop: 10
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
    percentageBox
} = styles;


export default CoinCard
