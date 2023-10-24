import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'

const Items = (props) => {
  return (
    <ScrollView style={styles.content}>
        <View style={styles.item}>
            <TouchableOpacity style={styles.name}>
                <Text style={styles.textName}>{props.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete}>
                <Text style={styles.textDelete}>Delete</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default Items

const styles = StyleSheet.create({
    content:{
        paddingHorizontal:20,
        marginTop:20,
        flex:1,
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    name:{
        justifyContent: 'center', // Canh giữa theo chiều ngang
        height:50,
        borderRadius:20,
        width:'65%',
        backgroundColor:'white',
        paddingHorizontal:20,
    },
    textName:{
        fontWeight:'bold',
        color:'#49007F',
        overflow: 'hidden', // Ẩn nội dung vượt quá kích thước của khung
        fontSize:20,
    },
    buttonDelete:{
        justifyContent: 'center', // Canh giữa theo chiều ngang
        alignItems:'center',
        height:50,
        borderRadius:20,
        width:'30%',
        backgroundColor:'#666666',
        paddingHorizontal:20,
    },
    textDelete:{
        fontWeight:'bold',
        color:'white',
        overflow: 'hidden', // Ẩn nội dung vượt quá kích thước của khung
        fontSize:20,
    }
})