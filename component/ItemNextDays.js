import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, LayoutAnimation} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const ItemNextDays = ({symbolName, nextDay, temperature}) => {
  return (
    <View style={styles.item}>
        
        <Icon name={symbolName} size={60} style={styles.names} />
        <Text style={styles.names}>{nextDay}</Text>    
        <Text style={styles.names}>{Number(temperature).toFixed(1)+"°"}</Text> 
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
        fontFamily: 'Montserrat-Light',
    },
  });

export default ItemNextDays;