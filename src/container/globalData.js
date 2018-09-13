import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Header from '../components/header.js';

class globaData extends Component {
    render ()  {
        console.log(this.props.navigation)
        return (
            <View> 
                <Header />
            </View>
            
        )
        }

}

export default globaData