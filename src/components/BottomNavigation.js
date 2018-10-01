import React, {PureComponent} from 'react';
import { 
    StyleSheet,  
    View, 
    Text,
    TouchableOpacity
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import Icons2 from "react-native-vector-icons/Feather";

//user
class BottomNavigation extends PureComponent {

    constructor() {
        super() 
        this.home = (<Icon name="bitcoin" size={30} color="#fbc02d" />);
        this.News = (<Icons name="news" size={30} color="white" />);
        this.Exchange = (<Icons2 name="bar-chart-2" size={30} color="white" />);
        this.about = (<Icons2 name="user" size={30} color="white" />)
    }

    state = {
        activeTab: "home"
    }
    

    activeTab = (activeTab) => {
        this.setState({activeTab: activeTab})
        this.props.navigation.navigate('Home')

    }

    render () {
        return (
     
                <View style={styles.NavBarBottom}>

                    <TouchableOpacity
                    onPress={() => this.activeTab("home")}>
                        <Text> <Icon name="bitcoin" size={30} color={ this.state.activeTab == "home" ? "#fbc02d" : "white"} /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.activeTab("News")}>
                        <Text> <Icons name="news" size={30} color={this.state.activeTab == "News" ? "#fbc02d" : "white"} /> </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.activeTab("Exchange")}>
                        <Text> <Icons2 name="bar-chart-2" size={30} color={this.state.activeTab == "Exchange" ? "#fbc02d" : "white"} /> </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => this.activeTab("about")}>
                        <Text> <Icons2 name="user" size={30} color={this.state.activeTab == "about" ? "#fbc02d" : "white"} /> </Text>
                    </TouchableOpacity>

                </View>
        )
    }
}

export default BottomNavigation;

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