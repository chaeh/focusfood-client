import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Spacer from './Spacer';
import {withNavigation} from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) =>{
return ( 
<TouchableOpacity> 
            <Text style = {styles.link} onPress={()=>navigation.navigate(routeName)}>{text}</Text>
            </TouchableOpacity>
        )
};

const styles = StyleSheet.create({
    link:{
        color: 'blue',
        marginLeft: 10,
    },
});

export default withNavigation(NavLink)