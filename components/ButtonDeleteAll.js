import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import COLORS from '../constants/colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react'

const ButtonDeleteAll = ({ handleDeleteAll }) => {
    const showAlert = () =>
        Alert.alert('Confirmation', 'Delete all?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => handleDeleteAll() },
        ]);
    return (
        <TouchableOpacity style={styles.buttonDeleteAll} onPress={showAlert}>
            <MaterialIcons name="delete-outline" size={40} color="white" />
            <Text style={styles.textDeleteAll}>Delete All</Text>
        </TouchableOpacity>
    );
}

export default ButtonDeleteAll

const styles = StyleSheet.create({
    buttonDeleteAll: {
        alignItems: 'center', // Canh giữa theo chiều dọc
        justifyContent: 'center', // Canh giữa theo chiều ngang
        borderRadius: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#0074E4'
    },
    textDeleteAll: {
        fontSize: 20,
        color: COLORS.while,
        fontWeight: 'bold',
    },
})