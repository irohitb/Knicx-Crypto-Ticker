import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  StatusBar
} from 'react-native';
import Display from 'react-native-display';


const Header = (props) => {
  return (
  <View style={headerContainer}>
     <View>
   <StatusBar backgroundColor="white" 
         barStyle="light-content"/>
   </View>
    <Display style={GoBack} enable={props.enable == "true"}>
      <Button onPress={() => props.navigation.navigate('Home')} 
        title="Go Back"
        color='white'/> 
    </Display>
    <Text style={header}> Knicx   
     <Text style={headerSecondary}> Crypto Ticker </Text> 
     </Text>
  </View>
  )
}

const styles = StyleSheet.create({
  headerContainer : {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "#2979ff",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  header: {
    marginTop: 20,
    padding: 10,
    fontSize: 16,
    color: "white",
  }, 
  headerSecondary: {
    color: "white",
  },
  GoBack: {
    color: "white",
    marginTop: 20,
    marginRight: 50
  }
})

const { 
  headerContainer, 
  header, 
  headerSecondary, 
  GoBack 
} = styles;



export default Header;

//Styles
