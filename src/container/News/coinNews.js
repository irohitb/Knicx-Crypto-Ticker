import React, {PureComponent} from "react"
import {
    View,
    StyleSheet, 
    Text,
    Image, 
    StatusBar,
    ScrollView, 
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import {
    coinNews 
} from "../../actions/coinNews.js"
import BottomNavigation from '../../components/BottomNavigation.js'
import { 
    Bubbles,
    DoubleBounce, 
    Bars, 
    Pulse 
   } from 'react-native-loader';
import Icons from 'react-native-vector-icons/Entypo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



class News extends PureComponent {

    constructor() {
        super()
        this.config
    }
    state = {
        number: 0
    }



        pageChangeNext = () => {
            let number
              if (this.state.number != 50) {
                  number = this.state.number
                  number = number + 1
                  this.setState({number: number})
                  }
          }

          pageChangePrev = () => {
            let number
            if (this.state.number != 0) {
                number = this.state.number
                number = number - 1
                this.setState({number: number})
                }
          }

    componentDidMount() {
        this.props.coinNews()
    }
    render() {
        if (!this.props.newsLoading) {
            this.config = {
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
              };
        }
        
        return (
            <View style={coinNewsMain}>
             <View>
             <StatusBar hidden={true}  />
            </View>

            { this.props.newsLoading ?
              (  <View style={loadingComponent}>       
                <Bars  size={15} color="#4CAF50" /> 
            </View> ) :
                ( 
                    <ScrollView>
                    
                      
                    <View style={layoutMain}>
                    <GestureRecognizer     
                    onSwipeLeft={() =>  this.pageChangeNext()}
                    onSwipeRight={() => this.pageChangePrev()}
                    config={this.config}>
                
                        <View stye={ImageNews}>             
                        <Image 
                                source={{uri: this.props.news["Data"][this.state.number]["imageurl"]}}
                                style={imageurl}
                                />  
                        </View>

                        <View style={newsTitleView}>
                            <Text style={newsTitleText}> {this.props.news["Data"][this.state.number]["title"]}</Text>
                        </View> 

                        <View style={titleSubHeading}>
                            <Text style={publishTime}>{new Date(this.props.news["Data"][this.state.number]["published_on"]*1000).toString().split(' ').slice(0, 5).join(' ')}</Text>
                            <Text style={publishSource}>By {this.props.news["Data"][this.state.number]["source"]}</Text>
                        </View>
                        <View style={newsBodyView}> 
                            <Text style={newsBodyText}> {this.props.news["Data"][this.state.number]["body"]} </Text>
                        </View>
                        </GestureRecognizer>
                    </View> 
              
            
                
                </ScrollView>

                 )}

                  {/* <View style={navigationArrow}>
                <TouchableOpacity style={lastPage} onPress={() => this.pageChangePrev()}>
                  <View style={nextPage}>
                     <Text> <Icons name="triangle-left" size={40} color="black" /> </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={nextPage} onPress={() => this.pageChangeNext()}>
                    <View style={lastPage}>
                      <Text> <Icons name="triangle-right" size={40} color="black" /> </Text>
                    </View>
                </TouchableOpacity>
                </View> */}
           
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
    news: state.news.DataSucess,
    newsLoading: state.news.DataFetching
  }
}

export default connect(mapStateToProps, 
    {
    coinNews
})(News);

const styles = StyleSheet.create({ 
    coinNewsMain: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    ImageNews:{

    },
    layoutMain:{

    },
    imageurl: {
        height: 300,
        width: "100%"
    },
    loadingComponent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      },
      newsTitleView: {
          width: "100%",
          marginLeft: 2,
          marginRight: 2,
          marginTop: 5
        
      }, 
      newsTitleText: {
        fontSize: 22
      },
      newsBodyText: {
          marginTop: 20,
          fontSize: 18,
          textAlign: "justify",
          marginLeft: 5,
          marginRight: 10,
      },
      newsBodyView: {
        width: "100%",
        marginTop: 5
      },
      titleSubHeading: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      },
      publishTime:{
    
      },
      publishSource:{

      },
      navigationArrow:{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        top: 10,
        width: "100%"
      },
      nextPage: {
        borderRadius: 50,
          display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white"
      }, 
      lastPage: {
        borderRadius: 50,
          display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white"
      }

})

const {
 coinNewsMain,
 ImageNews,
 layoutMain,
 loadingComponent,
 imageurl,
 newsTitleView,
 newsTitleText,
 newsBodyView,
 newsBodyText,
 titleSubHeading,
 publishTime,
 publishSource,
 navigationArrow,
 lastPage,
 nextPage
} = styles


// //0: {id: "435699", guid: "http://www.livebitcoinnews.com/?p=47057", published_on: 1538573443, imageurl: "https://images.cryptocompare.com/news/livebitcoinnews/9xINK4yOCd9.jpeg", title: "Deloitte Report: Blockchain ‘Closer to Its Breakout Moment Every Day’", …}
// 1: {id: "435701", guid: "https://bitcoinmagazine.com/articles/bitcoin-core-0170-released-heres-whats-new/#1538573301", published_on: 1538573301, imageurl: "https://images.cryptocompare.com/news/bitcoinmagazine/9GQ8h3mEd80.jpeg", title: "Bitcoin Core 0.17.0 Is Released: Here’s What’s New", …}
// 2: {id: "435621", guid: "https://www.cryptoglobe.com/latest/2018/10/shapesh…rhees-hits-back-at-deceptive-wall-street-journal/", published_on: 1538572500, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/9m8933jy2gA.png", title: "ShapeShift, Voorhees Hits Back at “Deceptive” Wall Street Journal", …}
// 3: {id: "435609", guid: "https://cointelegraph.com/news/ibm-awarded-patent-for-secure-system-based-on-blockchain", published_on: 1538572200, imageurl: "https://images.cryptocompare.com/news/cointelegraph/d203500a88w.jpeg", title: "IBM Awarded Patent for Secure System Based on Blockchain", …}
// 4: {id: "435576", guid: "https://www.financemagnates.com/?p=242353", published_on: 1538571946, imageurl: "https://images.cryptocompare.com/news/financemagnates/8BxOkES8009.jpeg", title: "Israel Securities Authority Now Using Blockchain Technology", …}
// 5: {id: "435561", guid: "https://bitcoinist.com/?p=88470", published_on: 1538571643, imageurl: "https://images.cryptocompare.com/news/bitcoinist/ehU688g1008.jpeg", title: "Coinbase Brings on Charles Schwab Exec to Expand Influence", …}
// 6: {id: "435562", guid: "https://www.newsbtc.com/?p=352534", published_on: 1538571627, imageurl: "https://images.cryptocompare.com/news/newsbtc/axEJaig084k.jpeg", title: "Coinbase To Be Valued At $8 Billion After $500M Investment, Crypto Community Bullish", …}
// 7: {id: "435563", guid: "https://nulltx.com/?p=69493", published_on: 1538571619, imageurl: "https://images.cryptocompare.com/news/themerkle/c34ww082000.jpeg", title: "Top 3 Companies Commercializing Ripple’s xRapid in 2018", …}
// 8: {id: "435481", guid: "https://www.cryptoglobe.com/latest/2018/10/lower-v…ng-to-bitcoin-as-a-store-of-value-analysts-claim/", published_on: 1538570711, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/9hccl6ko68Q.jpeg", title: "Bitcoin’s Lower Volatility Could Be “Market Slowly Adopting” It as a Store of Value, Analysts Claim", …}
// 9: {id: "435437", guid: "https://www.ccn.com/?p=148076", published_on: 1538570159, imageurl: "https://images.cryptocompare.com/news/ccn/dxwSb05SwAC.jpeg", title: "Google Bans Obfuscated Chrome Extensions to Cryptojackers’ Woe", …}
// 10: {id: "435435", guid: "https://www.coinspeaker.com/?p=58149", published_on: 1538570127, imageurl: "https://images.cryptocompare.com/news/coinspeaker/f50g0000000.jpeg", title: "Member of South Korea’s Governing Party Urges the State Legalize ICOs", …}
// 11: {id: "435391", guid: "https://www.financemagnates.com/?p=242345", published_on: 1538569669, imageurl: "https://images.cryptocompare.com/news/default/financemagnates.png", title: "Decline in Bitcoin Searches is a Positive Sign For Cryptocurrency Industry", …}
// 12: {id: "435333", guid: "https://www.cryptoglobe.com/latest/2018/10/ripple-ceo-responds-to-criticism-that-xrp-is-centralized/", published_on: 1538568900, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/e00wg000000.jpeg", title: "Ripple CEO Responds to Criticism That XRP is Centralized", …}
// 13: {id: "435311", guid: "https://www.financemagnates.com/?p=242346", published_on: 1538568636, imageurl: "https://images.cryptocompare.com/news/financemagnates/cg0y0020ww0.jpeg", title: "Binance to Invest $2.5 Million in Aussie Startup TravelbyBit", …}
// 14: {id: "435505", guid: "https://www.coindesk.com/?p=357262", published_on: 1538568055, imageurl: "https://images.cryptocompare.com/news/coindesk/9CAi2ppb318.jpeg", title: "Bitcoin's Proof-of-Work Can Be Made More Efficient, IBM Research Claims", …}
// 15: {id: "435378", guid: "https://cryptoinsider.com/?p=2958", published_on: 1538567452, imageurl: "https://images.cryptocompare.com/news/cryptoinsider/aW6k7zz1kPg.jpeg", title: "Are Anonymous Coins Really Necessary?", …}
// 16: {id: "435231", guid: "https://news.bitcoin.com/?p=224322", published_on: 1538567411, imageurl: "https://images.cryptocompare.com/news/bitcoin.com/8gdNH0i0x06.jpeg", title: "Wave of Mobile Tax Hikes Squeezes Africa’s Poor to Indulge Governments", …}
// 17: {id: "435220", guid: "https://www.financemagnates.com/?p=242341", published_on: 1538567270, imageurl: "https://images.cryptocompare.com/news/financemagnates/a0i6UGMko9H.jpeg", title: "John McAfee Among Defendants Named in Pump and Dump Lawsuit", …}
// 18: {id: "435207", guid: "https://nulltx.com/?p=69579", published_on: 1538567104, imageurl: "https://images.cryptocompare.com/news/themerkle/dzMokx00E80.jpeg", title: "XRP Price Drops by 7% During 2018 Swell Conference", …}
// 19: {id: "435195", guid: "https://www.cryptoglobe.com/latest/2018/10/siacoin…to-mining-centralization-with-upcoming-hard-fork/", published_on: 1538567100, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/a0002000000.jpeg", title: "Siacoin Says No To Mining Centralization With Upcoming Hard Fork", …}
// 20: {id: "435265", guid: "https://cointelegraph.com/news/ethical-questions-s…ive-halts-wall-street-journals-own-cryptocurrency", published_on: 1538567100, imageurl: "https://images.cryptocompare.com/news/cointelegraph/f028O0MU204.jpeg", title: "‘Ethical Questions’: Senior Executive Halts Wall Street Journal’s Own Cryptocurrency", …}
// 21: {id: "435194", guid: "https://coinnounce.com/?p=4240", published_on: 1538567028, imageurl: "https://images.cryptocompare.com/news/coinnounce/egu5S9wE1Ah.jpeg", title: "BTC at a small risk of losses. Bitcoin Price Analysis 3 Oct", …}
// 22: {id: "435181", guid: "https://www.newsbtc.com/?p=352593", published_on: 1538566868, imageurl: "https://images.cryptocompare.com/news/newsbtc/80000000000.jpeg", title: "[US Shift] Binance Invests $2.5 Million in Blockchain-based Travel Startup", …}
// 23: {id: "435182", guid: "https://www.newsbtc.com/?p=352577", published_on: 1538566765, imageurl: "https://images.cryptocompare.com/news/newsbtc/cf0c8cc4300.jpeg", title: "Ripple Swell Day Two Roundup: Regulation, Blockchain Adoption, and XRP", …}
// 24: {id: "435169", guid: "https://www.trustnodes.com/?p=17873", published_on: 1538566652, imageurl: "https://images.cryptocompare.com/news/trustnodes/fR$01Y0vE3M.png", title: "Ethereum Ranking as the Most Actively Developed Blockchain", …}
// 25: {id: "435135", guid: "http://www.livebitcoinnews.com/?p=47067", published_on: 1538566223, imageurl: "https://images.cryptocompare.com/news/livebitcoinnews/d30wN20M000.jpeg", title: "Tether’s Bank Noble Deemed ‘Desperate For Cash’", …}
// 26: {id: "435102", guid: "https://www.ccn.com/?p=148068", published_on: 1538565855, imageurl: "https://images.cryptocompare.com/news/ccn/c2Ux6dsw580.jpeg", title: "Brazil Watchdog Tells Crypto Exchanges to Answer Questionnaire or Face a Fine", …}
// 27: {id: "435001", guid: "https://www.newsbtc.com/?p=352532", published_on: 1538564435, imageurl: "https://images.cryptocompare.com/news/newsbtc/c8cw2om4e02.jpeg", title: "US Bitcoin Investment Trust Drops to Lowest Levels in a Year", …}
// 28: {id: "434999", guid: "https://bitcoinist.com/?p=88505", published_on: 1538564428, imageurl: "https://images.cryptocompare.com/news/bitcoinist/fOgwgh2iEwE.jpeg", title: "EOS Developer Responds to Collusion and Voting Manipulation Claims", …}
// 29: {id: "435506", guid: "https://www.coindesk.com/?p=357436", published_on: 1538564407, imageurl: "https://images.cryptocompare.com/news/coindesk/a5YgFmOH7Bq.jpeg", title: "Coinbase Rolls Out System to Free Up Stuck Bitcoin Payments", …}
// 30: {id: "434987", guid: "https://nulltx.com/?p=69566", published_on: 1538564320, imageurl: "https://images.cryptocompare.com/news/themerkle/8nee3f7OcE9.jpeg", title: "Binance Coin Gains on BTC and ETH to Reach $10 Again", …}
// 31: {id: "435000", guid: "https://cointelegraph.com/news/bitcoin-wobbles-on-2-percent-drop-as-altcoins-fall-harder", published_on: 1538564040, imageurl: "https://images.cryptocompare.com/news/cointelegraph/cnwq2Ms63cj.jpeg", title: "Bitcoin Wobbles on 2 Percent Drop as Altcoins Fall Harder", …}
// 32: {id: "434907", guid: "https://www.cryptoglobe.com/latest/2018/10/8-billi…ay-soon-be-the-highest-valued-startups-in-the-us/", published_on: 1538563500, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/8JAG9cA002o.jpeg", title: "$8 Billion: Coinbase May Soon Be Among the 'Highest-Valued' Startups in the US", …}
// 33: {id: "434895", guid: "https://blokt.com/?p=22836", published_on: 1538563187, imageurl: "https://images.cryptocompare.com/news/blokt/84pMaj413wx.jpeg", title: "Some Crypto Exchanges Might Be Reporting Inflated Transaction Volumes", …}
// 34: {id: "434883", guid: "https://www.trustnodes.com/?p=17867", published_on: 1538563098, imageurl: "https://images.cryptocompare.com/news/trustnodes/chMx7yza4m8.png", title: "CFTC’s Chairman Says Cryptos Useful for “2/3rd of Currencies Not Worth the Paper They’re Written On”", …}
// 35: {id: "434860", guid: "http://cryptonewsreview.com/?p=5846", published_on: 1538562834, imageurl: "https://images.cryptocompare.com/news/cryptonewsreview/86wBwbgac10.jpeg", title: "John McAfee identifies the man to run his US Presidential campaign", …}
// 36: {id: "434771", guid: "https://www.cryptoglobe.com/latest/2018/10/nobel-b…ter-losing-bitfinex-and-tether-as-clients-report/", published_on: 1538561717, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/c0MSe8y0o80.jpeg", title: "Nobel Bank Looking for Buyer After Losing Bitfinex and Tether as Clients: Report", …}
// 37: {id: "434748", guid: "https://www.ccn.com/?p=148114", published_on: 1538561485, imageurl: "https://images.cryptocompare.com/news/ccn/c09z4wN48e1.jpeg", title: "$2.5 Million: Binance Invests in Aussie Crypto Payments Startup to Push Adoption", …}
// 38: {id: "434759", guid: "https://www.coinspeaker.com/?p=57879", published_on: 1538561416, imageurl: "https://images.cryptocompare.com/news/coinspeaker/c3EGsM6c3oM.jpeg", title: "Monero (XMR) Price Analysis: Trends of October 3–9, 2018", …}
// 39: {id: "434942", guid: "https://www.coindesk.com/?p=357362", published_on: 1538560820, imageurl: "https://images.cryptocompare.com/news/coindesk/c3CXc0w6sb0.jpeg", title: "Ubisoft Backs New Blockchain Group to Spur Adoption in Gaming", …}
// 40: {id: "434713", guid: "https://www.newsbtc.com/?p=352530", published_on: 1538560807, imageurl: "https://images.cryptocompare.com/news/newsbtc/fyIUp03w10w.jpeg", title: "World’s First Blockchain University to Open Doors Next Year", …}
// 41: {id: "434690", guid: "https://cointelegraph.com/news/security-report-pai…picture-of-protection-at-biggest-crypto-exchanges", published_on: 1538560380, imageurl: "https://images.cryptocompare.com/news/cointelegraph/fko82wa0010.jpeg", title: "Security Report Paints Mixed Picture of Protection at Biggest Crypto Exchanges", …}
// 42: {id: "434667", guid: "https://news.bitcoin.com/?p=224435", published_on: 1538560250, imageurl: "https://images.cryptocompare.com/news/bitcoin.com/d4p2j5c21O0.jpeg", title: "Exchanges Roundup: Tether, Bitfinex Drop Noble Bank, Bitmex Hires COO", …}
// 43: {id: "434643", guid: "https://www.coinspeaker.com/?p=58138", published_on: 1538560025, imageurl: "https://images.cryptocompare.com/news/coinspeaker/aK1139Mw0g6.jpeg", title: "There is Future for Cryptocurrencies, Believes CFTC Chairman J. Christopher Giancarlo", …}
// 44: {id: "434631", guid: "https://www.cryptoglobe.com/latest/2018/10/ethereum-eth-price-analysis-october-3/", published_on: 1538559900, imageurl: "https://images.cryptocompare.com/news/cryptoglobe/c0000000000.jpeg", title: "Ethereum (ETH) Price Analysis – October 3", …}
// 45: {id: "434655", guid: "https://cointelegraph.com/news/japans-prime-minist…-blockchain-figure-as-minister-of-science-tech-it", published_on: 1538559840, imageurl: "https://images.cryptocompare.com/news/cointelegraph/dMoi001424h.jpeg", title: "Japan’s Prime Minister Appoints Pro-Blockchain Figure as Minister of Science, Tech, IT", …}
// 46: {id: "434586", guid: "https://coinnounce.com/?p=4235", published_on: 1538559270, imageurl: "https://images.cryptocompare.com/news/coinnounce/eEA0020wg00.jpeg", title: "Custom Software Development Platform to offer Bloc…ment assistance, competes with Freelancer, Upwork", …}
// 47: {id: "434574", guid: "https://www.ccn.com/?p=148111", published_on: 1538559147, imageurl: "https://images.cryptocompare.com/news/ccn/9c8q9a0A00B.jpeg", title: "Regulation for Legitimacy: South Korea Nears ICO Legalization", …}
// 48: {id: "434572", guid: "https://coinnounce.com/?p=4234", published_on: 1538559055, imageurl: "https://images.cryptocompare.com/news/coinnounce/cV4e3dU6918.jpeg", title: "Cryptonex Review. Should you buy CNX token?", …}
// 49: {id: "434571", guid: "http://www.livebitcoinnews.com/?p=47034", published_on: 1538559033, imageurl: "https://images.cryptocompare.com/news/livebitcoinnews/ciL6Sh8AgMi.jpeg", title: "Bitcoin ‘Does Not and Will Not Challenge Gold’ Says Morningstar Investment Analyst", …}
// length: 50
// __proto__: Array(0)
// Message: "News list successfully returned"
// Promoted: [{…}]
// Type: 100
// __proto__: Object
