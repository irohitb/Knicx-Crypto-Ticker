import React, { PureComponent} from "react"
import { 
    VictoryBar,
    VictoryArea,
    VictoryGroup,
     VictoryChart, 
     VictoryTheme 
} from "victory-native";
import { 
    Text,
    View, 
    StyleSheet,
    ScrollView 
} from 'react-native'

let coinMinimumA = []
class CoinChart extends PureComponent {
    constructor() {
        super()
            this.coinHistoryData
            this.coinMinimum
            this.coinMaximum
            this.chartColor
         
    }

    state = {
        loaded: false
    }

 

    
    render () {

        if (this.props.coinHistory.length > 1) {
        this.coinHistoryData = this.props.coinHistory
                coinMinimumA =[]
            for (let i = 0; i < this.props.coinHistory.length; i++ ) {
                coinMinimumA.push(this.props.coinHistory[i]["y"])
            }
                this.coinMinimum = Math.min(...coinMinimumA)
                this.coinMaximum = Math.max(...coinMinimumA)
            if (this.props.chartColor.cap24hrChange > 0) {
                this.chartColor = "#4CAF50"
            } else if (this.props.chartColor.cap24hrChange < 0) {
       
                this.chartColor = "#F44336"
            }
            if (!this.state.loaded ) {
            this.setState({loaded: true})
          }
        } 





        return (
 
  
        <View style={container}>
          { this.state.loaded ? 
             (<VictoryGroup 
                 padding={0}
                 height= {200}>
                    <VictoryArea
                        style={{ data: { fill: this.chartColor } }}
                        data={this.coinHistoryData} 
                        domain={{ 
                            y: [this.coinMinimum, this.coinMaximum] 
                        }}
                    />
                    </VictoryGroup>)
          : (<Text> Loading..</Text>)}</View>
        )
    }
}

export default CoinChart;


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
      backgroundColor: "#f5fcff"
    }, 
    graphStyle: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 0
    


    }
  });

  const {
    container,
    graphStyle
  } = styles
////cHT: 1536892140000, cHTVU: 6519.44, cHTVF: "$6,519.44", no: 0

//coinHistory