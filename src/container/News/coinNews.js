import React, {PureComponent} from "react"
import {
    View
} from 'react-native'
import { connect } from 'react-redux';
import {
    coinNews 
} from "../../actions/coinNews.js"




class News extends PureComponent {
    componentDidMount() {
        this.props.coinNews()
    }
    render() {
   
        return (
            <View>

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