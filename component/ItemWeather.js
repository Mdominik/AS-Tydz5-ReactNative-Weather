import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, LayoutAnimation} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const ItemWeather = ({symbolName, propertyValue, type}) => {
  return (
    <View style={styles.item}>
        
        <Icon name={symbolName} size={35} style={styles.names} />
        <Text style={styles.names} >{Number(propertyValue).toFixed(1)}{type}</Text>    
    </View>
  );
};

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        color: '#ffffff'
    },
    names: {
        margin: 0,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Montserrat-Light',
    },
  });

export default ItemWeather;