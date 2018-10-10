import React, {PureComponent} from 'react';
import { 
    StyleSheet,  
    View, 
    Text,
    TouchableOpacity,

  } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import Icons2 from "react-native-vector-icons/Feather";
import { navbarState }  from "../actions/bottomNavigation"


//user
class BottomNavigation extends PureComponent {

    constructor() {
        super() 
        this.home = (<Icon name="bitcoin" size={30} color="#fbc02d" />);
        this.News = (<Icons name="news" size={30} color="white" />);
        this.Exchange = (<Icons2 name="bar-chart-2" size={30} color="white" />);
        this.about = (<Icons2 name="user" size={30} color="white" />)
    }
    

    activeTab = (activeTab) => {


        //Note keep the activeTab name same as that of screen
        this.props.navbarState(activeTab)
        this.props.navigation.navigate(activeTab)
    }

    render () {
        
        return (
     
                <View style={styles.NavBarBottom}>

                    <TouchableOpacity
                    onPress={() => this.activeTab("home")}>
                        <Text> <Icon name="bitcoin" size={30} color={ this.props.navbarActive == "home" ? "#fbc02d" : "white"} /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.activeTab("News")}>
                        <Text> <Icons name="news" size={30} color={this.props.navbarActive == "News" ? "#fbc02d" : "white"} /> </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.activeTab("Exchange")}>
                        <Text> <Icons2 name="bar-chart-2" size={30} color={this.props.navbarActive== "Exchange" ? "#fbc02d" : "white"} /> </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.activeTab("About")}>
                        <Text> <Icons2 name="user" size={30} color={this.props.navbarActive == "About" ? "#fbc02d" : "white"} /> </Text>
                    </TouchableOpacity>

                </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        navbarActive: state.navBar.activeTab,
        navbarActive1: state.navBar
    }
}

export default connect(mapStateToProps,
    { navbarState
    })(BottomNavigation);

const styles = StyleSheet.create({
    NavBarBottom : {
      paddingTop: 8,
      borderTopWidth: 2,
      backgroundColor: "#3b5998",
      position: "absolute",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 5,
      bottom: 0, 
      marginTop: 5
    }
  })

