import React, {PureComponent} from 'react';
import { 
    StyleSheet,  
    View, 
    Text
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import Icons1 from "react-native-vector-icons/EvilIcons";
import Icons2 from "react-native-vector-icons/Feather";

//user
class BottomNavigation extends PureComponent {

    constructor() {
        super() 
        this.home = (<Icon name="bitcoin" size={35} color="#005cb2" />);
        this.News = (<Icons name="news" size={35} color="#005cb2" />);
        this.Exchange = (<Icons2 name="bar-chart-2" size={35} color="#005cb2" />);
        this.about = (<Icons2 name="user" size={35} color="#005cb2" />)
    }

    state = {
        home: true, 
        News: false, 
        Exchanges: false, 
        about: false
    }
    

    render () {
        return (
     
                <View style={styles.NavBarBottom}>
                    <Text>{this.home}</Text>
                    <Text> {this.News}</Text>
                    <Text> {this.Exchange}</Text>
                    <Text> {this.about}</Text>
                 </View>
        )
    }
}

export default BottomNavigation;

const styles = StyleSheet.create({
    NavBarBottom : {
      borderTopWidth: 2,
      borderTopColor: '#fbc02d',
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 5
    }
  })