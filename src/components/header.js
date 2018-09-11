import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Header = () => {
  return (
  <View style={headerContainer}>
    <Text style={header}> Knicx   
     <Text style={headerSecondary}> Crypto Ticker </Text> 
     </Text>
  </View>
  )
}

const styles = StyleSheet.create({
  headerContainer : {
    display: "flex",
    alignItems: 'center',
    backgroundColor: "#4A708B",
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
    color: "#63B8FF",
  }
})

const { headerContainer, header, headerSecondary } = styles;



export default Header;

//Styles
