import React, {PureComponent} from "react"
import {
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import {
    coinNews 
} from "../../actions/coinNews.js"
import BottomNavigation from '../../components/BottomNavigation.js'



class News extends PureComponent {
    componentDidMount() {
        this.props.coinNews()
    }
    render() {
   console.log(this.props.coinNewsMain)
        return (
            <View style={coinNewsMain}>
                    <BottomNavigation navigation={this.props.navigation}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
  return {
    cryptoLoaded: state.coincap.itemsSucess,
    cryptoLoading: state.coincap.itemsFetching,
    cryptoGlobal: state.coincap.itemGlobal,
    currencyLoaded: state.currency.DataSucess,
    news: state.news.DataSucess
  }
}

export default connect(mapStateToProps, 
    {
    coinNews 
})(News);

const styles = StyleSheet.create({ 
    coinNewsMain: {
        display: "flex",
        flex: 1
    },
    BottomNavigator: {
        bottom: 0 
    }
})

const {
 coinNewsMain,
 BottomNavigator
} = styles