import React, { PureComponent} from "react"
import { 
    VictoryBar,
    VictoryArea,
     VictoryChart, 
     VictoryTheme 
} from "victory-native";
import { 
    Text,
    View, 
    StyleSheet,
    ScrollView 
} from 'react-native'


class CoinChart extends PureComponent {
    constructor() {
        super()
            this.coinHistoryData
    }

    state = {
        loaded: false
    }

    render () {

        if (this.props.coinHistory.length > 1) {
        this.coinHistoryData = this.props.coinHistory
        console.log(this.props.coinHistory)
            if (!this.state.loaded ) {
            this.setState({loaded: true})
          }
        } 




        return (
 
  
        <View style={container}>
          { this.state.loaded ? 
                            (<VictoryChart
                    theme={VictoryTheme.material}>
                    <VictoryArea
                        style={{ data: { fill: "#c43a31" } }}
                        data={this.coinHistoryData} 
                    
                        domain={{ y: [7000, 10000] }}
                    />
                    </VictoryChart>)
          : (<Text> Loading..</Text>)}</View>
        )
    }
}

export default CoinChart;


const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

  const {
    container
  } = styles
////cHT: 1536892140000, cHTVU: 6519.44, cHTVF: "$6,519.44", no: 0

//coinHistory