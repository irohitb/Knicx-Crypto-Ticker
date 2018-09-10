import React, { PureComponent } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';






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
               console.log("Component Will recieve props")
              this.setState({decreased: true, increased: false})
              setTimeout(
                function() {
                    this.setState({decreased: false, increased: false})
                }.bind(this), 500)
            }
           }

           if (this.props.coinPrice < nextProps.coinPrice) {
               if (this.props.coinPrice > nextProps.coinPrice) {
               console.log("Component Will recieve props")
            this.setState({increased: true, decreased: false})
            setTimeout(
                function() {
                    this.setState({decreased: false, increased: false})
                }.bind(this), 500)
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

        console.log("Inside render", this.props.coinShortName)
        return (
            
            <TouchableWithoutFeedback onPress={() => this.touched(this.props.coinShortName)}>
                <View>
                    <View style={[upperRow, container1,this.state.increased ? {backgroundColor: "#B4EEB4"} : null,this.state.decreased ? {backgroundColor: "#ffe5e5"} : null]}>
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
             </View>
        </TouchableWithoutFeedback>

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
