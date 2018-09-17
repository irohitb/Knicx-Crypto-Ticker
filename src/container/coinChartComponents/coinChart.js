import React, { PureComponent} from "react"

import { 
    Text,
    View, 
    StyleSheet,
    ScrollView 
} from 'react-native'

import ChartView from 'react-native-highcharts';



class CoinChart extends PureComponent {
    render() {
        var Highcharts='Highcharts';
        var conf={
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                        load: function () {
    
                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                    y = Math.random(); //Pass data here which comes from socket
                                    console.log("this is value of x", x)
                                series.addPoint([x, y], true, true);
                            }, 2000);
                        }
                    }
                },
                title: {
                    text: 'Live random data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
    
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
            };
    
        const options = {
            global: {
                useUTC: false
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        };
    
        return (
          <ChartView style={{height:300}} config={conf} options={options} javaScriptEnabled={true} originWhitelist={['']}
          domStorageEnabled={true}></ChartView>
        );
    }
    

    

}

export default CoinChart;




////cHT: 1536892140000, cHTVU: 6519.44, cHTVF: "$6,519.44", no: 0

//coinHistory

// { this.state.loaded ? 
//     (<VictoryChart
// theme={VictoryTheme.material}>
// <VictoryArea
// style={{ data: { fill: "#c43a31" } }}
// data={this.coinHistoryData} 

// domain={{ y: [7000, 10000] }}
// />
// </VictoryChart>)
// : (<Text> Loading..</Text>)}