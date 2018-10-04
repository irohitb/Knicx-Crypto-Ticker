import React, { PureComponent} from 'react'
import {
    View, 
    Text,
    StyleSheet
} from "react-native"
import { connect } from 'react-redux';
import BottomNavigation from '../../components/BottomNavigation.js'

class coinExchange extends PureComponent {
    render () {
        return (
            <View style={exchangeMain}> 
                <BottomNavigation navigation={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        currencyLoaded: state.currency.DataSucess,
    }
}

export default connect(mapStateToProps)(coinExchange);

const styles = StyleSheet.create({ 
    exchangeMain: {
        display: "flex",
        flex: 1
    }
})

const {
    exchangeMain
} = styles

//https://api.coindelta.com/api/v1/public/getticker/
//https://github.com/ccxt/ccxt
//https://api.cryptonator.com/api/full/btc-usd