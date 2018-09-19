import React, { PureComponent} from "react"
var _ = require('lodash');
import { 
    VictoryArea,
    VictoryGroup,
    VictoryChart,
     VictoryVoronoiContainer,
     VictoryTooltip,
     VictoryScatter, 
     VictoryCursorContainer
} from "victory-native";
import { 
    Text,
    View, 
    StyleSheet,
    ScrollView 
} from 'react-native'

let coinMinimumA = []
let point;
const { range, first, last } = _;
const findClosestPointSorted = (data, value) => {
	// assumes 3 things:
  // 1. data is sorted by x
  // 2. data points are equally spaced
  // 3. the search is 1-dimentional (x, not x and y)
  if (value === null) return null;
	const start = first(data).y;
	const range = (last(data).y - start);
  const index = Math.round((value - start)/range * (data.length - 1));
  return data[index];
};

class CoinChart extends PureComponent {
    constructor() {
        super()
            this.coinHistoryData
            this.coinMinimum
            this.coinMaximum
            this.chartColor
         
    }

    state = {
        loaded: false,
        activePoint: "null"
    }

    handleCursorChange(value) {
        this.setState({
          activePoint: findClosestPointSorted(allData, value)
      });
    }
 

    
    render () {

    const { activePoint } = this.state;
        if (this.props.coinHistory.length > 1) {
          
            let point = activePoint ?
            (<VictoryScatter data={[activePoint]} style={{data: {size: 100} }}/>)
          : (<Text> Second</Text>);
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
                 height= {200}
                containerComponent={
                    <VictoryCursorContainer
                            dimension="x"
                            onChange={this.handleCursorChange.bind(this)}
                            cursorLabel={cursor => `${activePoint.x}, ${Math.round(activePoint.y)}`}
                        />
                     }>
                     {point}
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
//https://jsfiddle.net/boygirl/pqn3aub8/