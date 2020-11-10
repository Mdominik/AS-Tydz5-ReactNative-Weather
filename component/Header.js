import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, LayoutAnimation} from 'react-native';

const Header = (props) => {
    const images = [
         { 
          type: 'c',
          uri: require('../assets/weather-icons/c.png')
         },
        { 
        type: 'h',
          uri: require('../assets/weather-icons/h.png')
       },
       { 
        type: 'hc',
          uri: require('../assets/weather-icons/hc.png')
       },
        { 
        type: 'hr',
          uri: require('../assets/weather-icons/hr.png')
       },
        { 
        type: 'lc',
          uri: require('../assets/weather-icons/lc.png')
       },
        { 
        type: 'lr',
          uri: require('../assets/weather-icons/lr.png')
       },
       { 
        type: 's',
          uri: require('../assets/weather-icons/s.png')
       },
       { 
        type: 'sl',
          uri: require('../assets/weather-icons/sl.png')
       },
        { 
        type: 'sn',
          uri: require('../assets/weather-icons/sn.png')
       },
       { 
        type: 't',
          uri: require('../assets/weather-icons/t.png')
       },
       { 
        type: 'Moon',
          uri: require('../assets/weather-icons/Moon.png')
       },
    ]
    let iconX = require('../assets/weather-icons/Flower.png');
    if(props.weather_state_abbr != null) {
        images.forEach(icon => {
            if( iconX == require('../assets/weather-icons/Flower.png')) {
                iconX = icon.type.normalize() == props.weather_state_abbr.normalize() ? icon.uri : require('../assets/weather-icons/Flower.png');
            }
        })
    }
  return (
    <View style={styles.header}>
        
      <ImageBackground source={iconX}
            style={styles.imgBackground}>
            <Text></Text>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      height: 250, 
      margin: 50,
      marginBottom: 70,
      justifyContent: 'center',
    },

    imgBackground: {

        aspectRatio: 1.0,
        flexDirection: 'column',
        alignItems: 'center',
        resizeMode: 'contain',
    
},
  });

export default Header;