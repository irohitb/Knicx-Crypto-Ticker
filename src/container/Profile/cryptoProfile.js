import React, {PureComponent} from "react"
import {
    View, 
    Text, 
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking
} from 'react-native'
import BottomNavigation from '../../components/BottomNavigation.js'
import Icon from "react-native-vector-icons/FontAwesome"



class cryptoProfile extends PureComponent {
    constructor() {
        super()
        // this.Profileimage
        // this.fbImage
        // this.insta
        // this.twitter
        // this.angel
        this.Profileimage = (<Image source={require('./../../images/About.png')}  style={img} />) 
        this.spaceyfiLogo = (<Image source={require('./../../images/spaceyfi.png')}  style={imgS} />) 
        // this.fbImage = (<Image source={require('./../../images/facebook.png')}  style={imgSocial} />)
        // this.insta = (<Image source={require('./../../images/instagram.png')}  style={imgSocial} />)
        // this.twitter = (<Image source={require('./../../images/twitter.jpg')}  style={imgSocial} />)
        // this.angel = (<Image source={require('./../../images/angel.jpg')}  style={imgSocial} />)
    }

    componentWillMount() {
     
    }
    
    render () {
        return (
            <View style={cryptoProfileMain}> 
               <View>
                    <StatusBar hidden={true}  />
                 </View>
                 <ScrollView>
                    <View style={mainprofileView}> 
                        {  this.Profileimage}
                    </View>
                    <View style={connectHeading}>
                        <Text style={textconnectHeading}> Connect with me on..</Text>
                            <View style={tab}>
                                <TouchableOpacity style={[socialTouchableText, {backgroundColor: "#2196F3"}]}
                                  onPress={() => {
                                    const FANPAGE_ID = '100005194685296'
                                    const FANPAGE_URL_FOR_APP = `fb://${FANPAGE_ID}`
                                    const FANPAGE_URL_FOR_BROWSER = `https://fb.com/${FANPAGE_ID}`
                                    Linking.canOpenURL(FANPAGE_URL_FOR_APP)
                                      .then((supported) => {
                                        if (!supported) {
                                          Linking.openURL(FANPAGE_URL_FOR_BROWSER)
                                        } else {
                                          Linking.openURL(FANPAGE_URL_FOR_APP)
                                        }
                                    })
                                      .catch(err => console.error('An error occurred', err))
                                    }}>
                                    <Text style={socialText}>  <Icon name="facebook" size={20} /> Facebook </Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity style={[socialTouchableText, {backgroundColor: "#E91E63"}]}
                                 onPress={() => {
                                    const FANPAGE_ID = 'irohitb'
                                    const FANPAGE_URL_FOR_APP = `instagram://user?username=johndoe`
                                    const FANPAGE_URL_FOR_BROWSER = `https://instagram.com/${FANPAGE_ID}`
                                    Linking.canOpenURL(FANPAGE_URL_FOR_APP)
                                      .then((supported) => {
                                        if (!supported) {
                                          Linking.openURL(FANPAGE_URL_FOR_BROWSER)
                                        } else {
                                          Linking.openURL(FANPAGE_URL_FOR_APP)
                                        }
                                    })
                                      .catch(err => console.error('An error occurred', err))
                                    }}>
                                    <Text style={socialText}><Icon name="instagram" size={20} />  Instagram </Text>
                                </TouchableOpacity>
                             </View>
                             <View style={tab}>
                                <TouchableOpacity style={[socialTouchableText, {backgroundColor: "#4CAF50"}]}
                                   onPress={() => {
                                    const FANPAGE_ID = '752830092'
                                    const FANPAGE_USERNAME = "@ibhatiarohit"
                                    const FANPAGE_URL_FOR_APP = `twitter://user?id=${FANPAGE_ID}`
                                    const FANPAGE_URL_FOR_BROWSER = `https://twitter.com/${FANPAGE_USERNAME}`
                                    Linking.canOpenURL(FANPAGE_URL_FOR_APP)
                                      .then((supported) => {
                                        if (!supported) {
                                          Linking.openURL(FANPAGE_URL_FOR_BROWSER)
                                        } else {
                                          Linking.openURL(FANPAGE_URL_FOR_APP)
                                        }
                                    })
                                      .catch(err => console.error('An error occurred', err))
                                    }} >  
                                    <Text style={socialText}><Icon name="twitter" size={20} />  Twitter </Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={[socialTouchableText, {backgroundColor: "black"}]}
                                onPress={() => {Linking.openURL("https://angel.co/rohit-bhatia-7796")}}>
                                    <Text style={socialText}>  <Icon name="angellist" size={20} />  AngelList </Text>
                                </TouchableOpacity>
                             </View>
                    </View>
                    <View style={coffee}>
                        <Text style={coffeeHeading}><Icon name="coffee" size={40} color="brown" /> Ahh Coffee?</Text>
                        <Text style={coffeText}> I am always excited to meet with crazy entrepreneurs building interesting stuff to people having some crazy stories to share. 
                            If you live around Capital of India (Delhi) and want to grab a cup coffee on weekend then you can already count me in. Also, We are connecting on any of the above networking site?    </Text>

                    </View>
                    <View style={loveSpaceyfiFotter}> 
                         { this.spaceyfiLogo }
                        <Text style={spaceyfiText}>Spaceyfi.com</Text>
                    </View>
                  
                </ScrollView>
            
                <BottomNavigation navigation={this.props.navigation}/>
            </View>
        )
    }
}


export default cryptoProfile

const styles = StyleSheet.create({  
    cryptoProfileMain: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#f3f3f3"
    },
    mainprofileView: {
        marginTop: "5%",
        justifyContent: "center",
        flexDirection: "row"
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    socialIconsConnect: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    backgroundColoral: {
        height: 32, 
        width: 3,
        borderRadius: 16

    },
    connectHeading: {
        display: "flex",
        flexDirection: "column"
    },
    socialTouchableText: {
        marginLeft: "2.5%",
        marginRight: "2.5%",
        width: "45%",
        padding: 10,
        height: 50 
    }, 
    tab: {

    },
    socialText: {
        textAlign: "left",
        marginLeft: 5,
        color: "white",
        fontSize: 18

    },
    textconnectHeading: {
        marginTop: 20,
        fontSize: 20,
        textAlign: "center",
    }, 
    tab: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
    },
    tab1: {
        width: "100%",
        marginTop: 20,
        backgroundColor: "red"
    },
    coffeeHeading: {
        color: "black",
        textAlign: "center",
        fontSize: 23

    },
    coffee: {
        marginTop: 20,
        backgroundColor: "white",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 15,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    coffeText: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20.5
    },
    loveSpaceyfiFotter: {
        marginTop: 40,
        width: "100%",
        display: "flex",
        bottom: 0,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    spaceyfiText: {
        fontSize: 18,
        textAlign: "center"
    },
    imgS: {
        height: 40, 
        width: 40,
    
    }
})


const {
    cryptoProfileMain,
    mainprofileView,
    img,
    socialIconsConnect,
    connectHeading,
    socialTouchableText,
    tab,
    socialText,
    textconnectHeading,
    tab1,
    coffeeHeading,
    coffee,
    coffeText,
    loveSpaceyfiFotter,
    spaceyfiText, 
    imgS
} = styles