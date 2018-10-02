import React, {PureComponent} from 'react';
import { 
    StyleSheet,  
    View, 
    Text,
    TouchableOpacity
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
        this.socket
    }
    

    activeTab = (activeTab) => {
    
        //Note keep the activeTab name same as that of screen
        this.props.navbarState(activeTab)
            console.log(this.props.navbarActive)
            console.log(this.props.navbarActive1)
        this.props.navigation.navigate(activeTab)
    }

    render () {
        console.log(this.props.navbarActive)
        console.log(this.props.navbarActive)
        console.log(this.props.navbarActive1)
        return (
     
                <View style={styles.NavBarBottom}>

                    <TouchableOpacity
                    onPress={() => this.activeTab("Home")}>
                        <Text> <Icon name="bitcoin" size={30} color={ this.props.navbarActive == "Home" ? "#fbc02d" : "white"} /></Text>
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
                    onPress={() => this.activeTab("about")}>
                        <Text> <Icons2 name="user" size={30} color={this.props.navbarActive == "about" ? "#fbc02d" : "white"} /> </Text>
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
    //   borderTopColor: '#fbc02d',
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 5,
      bottom: 0, 
      marginTop: 5
    }
  })


//   <TouchableOpacity
//   onPress={() => this.changeHistoryChart(30)}
//   style={button}>
//   <Text style={[buttonT, this.state.activeButton == 30 ? {color: "#3F51B5"} : {color: "#9E9E9E"} ]}>1M </Text>
// </TouchableOpacity>