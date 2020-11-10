
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const AddItem = ({item}) => {
  return (
    <View style={styles.listItemView}>
        <TextInput placeholder="Add item..." style= {styles.input} />
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}><Icon name="plus" size={15} /> Add item</Text>
        </TouchableOpacity>
    </View>

  );
};


const styles = StyleSheet.create({
    input: {
      height: 60,
      padding: 8,
      fontSize:16,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
      },
  });

export default AddItem;