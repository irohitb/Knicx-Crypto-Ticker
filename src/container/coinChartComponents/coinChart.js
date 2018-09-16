import React, { PureComponent} from "react"
import { 
    VictoryBar,
     VictoryChart, 
     VictoryTheme 
} from "victory-native";
import { 
    View, 
    StyleSheet,
    ScrollView 
} from 'react-native'


class CoinChart extends PureComponent {
    render () {
        return (
            <ScrollView>
        <View style={container}>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={this.props.coinHistory} x="no" y="cHTVU" />
                </VictoryChart>
            </View>
            </ScrollView>
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