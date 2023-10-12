import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';
import { TouchableOpacity } from 'react-native';
const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.textButton}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        marginHorizontal:30,
        backgroundColor:COLORS.while,
        paddingHorizontal:50,
        paddingVertical:10,
        borderRadius:20,
        borderColor:COLORS.primary,
        alignItems:'center',
        justifyContent:'center'

    },
    textButton:{
        color:COLORS.purple,
        fontSize:20,
        fontWeight:'bold'
    }
    
})