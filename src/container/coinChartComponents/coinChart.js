import React, { PureComponent} from "react"
var _ = require('lodash');
import { 
    VictoryArea,
    VictoryGroup,
     VictoryScatter, 
     VictoryClipContainer,
     VictoryCursorContainer
} from "victory-native";
import { 
    Text,
    View, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import Icons from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';


let coinMinimumA = []
let point;
const { range, first, last } = _;


const findClosestPointSorted = (data, value) => {
	// assumes 3 things:
  // 1. data is sorted by x
  // 2. data points are equally spaced
  // 3. the search is 1-dimentional (x, not x and y)
 
  if (value === null) return null;
    const start = first(data).x;
    const range = (last(data).x - start);
  const index = Math.round((value - start)/range * (data.length - 1));
  return data[index];

};

class CoinChart extends PureComponent {
    constructor() {
        super()
            this.coinMinimum
            this.coinMaximum
            this.chartColor
            this.chartBorder
            this.valueAtSelectedTime
            this.selectedTime
            this.chartPriceColorMain
    }

    state = {
        loaded: false,
        activePoint: null
    }


    handleCursorChange = (value, props) => {

        //Converting the value we want to show 
        const numberSearch = Math.round(value)
        this.selectedTime = this.props.coinHistory[numberSearch]["cHT"]
        this.selectedTime  = new Date(this.selectedTime).toString()
        this.selectedTime = this.selectedTime.split(' ').slice(0, 5).join(' ');
        this.valueAtSelectedTime = this.props.coinHistory[numberSearch]["y"]
        //This will call function which declared in the global modular scope 
        this.setState({
          activePoint: findClosestPointSorted(this.props.coinHistory, value)
      });
    }
 

    
    render () {
     
       
 //THis is that dot which would appear on the slected point 
    let  activePoint  = this.state.activePoint;
    point = activePoint ?
    (<VictoryScatter data={[activePoint]} style={{data: {size: 200, fill: "#FFC107"} }}/>)
  : null;
        if (this.props.coinHistory.length > 1) {
            
                coinMinimumA =[]
            //Making aray of all the value in Y axis to make domain 
            for (let i = 0; i < this.props.coinHistory.length; i++ ) {
                coinMinimumA.push(this.props.coinHistory[i]["y"])
            }
            //Making minimum and maximum Domain for the chart 

                this.coinMinimum = Math.min(...coinMinimumA)
                this.coinMaximum = Math.max(...coinMinimumA)

                //Setting up color for the chart depending on the market cap
            if (this.props.chartColor.cap24hrChange > 0) {
                this.chartPriceColorMain = "#689F38"
                this.chartColor = "#8BC34A"
                this.chartBorder = "#689F38"

            } else if (this.props.chartColor.cap24hrChange < 0) {
                this.chartPriceColorMain = "#F44336"
                this.chartColor = "#ff4c4c"
                this.chartBorder = "#D32F2F"
            }

            if (!this.state.loaded ) {
            this.setState({loaded: true})
          }

       //Intially when user does not scroll the value of selected coin is null and hence we ae giving to the current coin value
          if (!this.valueAtSelectedTime && this.props.chartColor["price_usd"]) {
   
              this.valueAtSelectedTime =  this.props.chartColor["price_usd"]
              this.selectedTime = new Date().toString()
              this.selectedTime = this.selectedTime.split(' ').slice(0, 5).join(' ');
          }
        } 
        return (
        <View style={container}>
            <View style={heading}> 
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Text> 
                            <Icons name="chevron-left" size={30} color="black" />
                        </Text> 
                    </TouchableOpacity>
                </View>
                <Text style={heading1}> {this.props.chartColor.display_name} ({this.props.chartColor.id}) </Text>
                <Text style={[heading1, {color:this.chartPriceColorMain}]}> {this.props.currencyLoaded[0]["currencySymbol"]} {(this.valueAtSelectedTime*this.props.currencyLoaded[0]["currencyPrice"]).toFixed(4)}</Text>
                <Text style={[heading2, {color:this.chartColor}]}> {this.selectedTime}</Text>
            </View>
            { this.state.loaded ? 
             (<VictoryGroup 
                 padding={0}
                 height= {150}
                containerComponent={
                    <VictoryCursorContainer
                    cursorDimension="x"
                    onCursorChange={(value, props) => this.handleCursorChange(value,props)}
                            cursorLabel={(cursor) => ``}
                        />
                     }>
                    <VictoryArea
                        style={{ data: { fill: this.chartColor } }}
                        data={this.props.coinHistory} 
                        domain={{ 
                            y: [this.coinMinimum, this.coinMaximum] 
                        }}
                        groupComponent={<VictoryClipContainer clipPadding={{ top: 1, right: 1 }}/>}
                            style={{ data: { fill: this.chartColor, stroke: this.chartBorder, strokeWidth: 3, strokeLinecap: "round" } }}
                    />
                        {point}
                    </VictoryGroup>)
          : (<View style={{ flex: 1 }}>
          <Spinner visible={this.props.cryptoLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View> )}</View>
        )
    }
}


const mapStateToProps = state => {
    return {
        currencyLoaded: state.currency.DataSucess,
    }
}

export default connect(mapStateToProps)(CoinChart);


const styles = StyleSheet.create({
    container: {
      display: "flex",
      backgroundColor: "#f5fcff"
    }, 
    heading: {
        marginTop: 10,
        marginBottom: 20,
        display: "flex",
        flexDirection: "column"
    },
    heading1: {
        fontSize: 20,
        textAlign: 'center', 
    },
    heading2: {
        fontSize: 14,
        textAlign: 'center',  
    }

  });

  const {
    container,
    heading,
    heading1,
    heading2
  } = styles
////cHT: 1536892140000, cHTVU: 6519.44, cHTVF: "$6,519.44", no: 0

//coinHistory
//https://jsfiddle.net/boygirl/pqn3aub8/