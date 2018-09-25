import React, {PureComponent} from 'react';
import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class BottomNavigation extends PureComponent {

    state = {
        home: true, 
        News: false, 
        Exchanges: false, 
        about: false
    }
    

    render () {
        return (
            <View styles={headerContainer}> 
                <Text style={header}> This is Bottom Navigation</Text>
            </View>
        )
    }
}

export default BottomNavigation;

const styles = StyleSheet.create({
headerContainer : {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  header: {
    marginTop: 20,
    padding: 10,
    fontSize: 16,
    color: "black",
  },
})

const {
    headerContainer,
    header
} = styles