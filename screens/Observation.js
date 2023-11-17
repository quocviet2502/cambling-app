import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet,Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import ButtonDeleteAll from '../components/ButtonDeleteAll';
import Database from '../Database';
// import Items from '../components/Items';

const Observation = ({ navigation, route}) => {
    const [observation, setObservation] = useState([]);
    const isFocused = useIsFocused();
    const { userId } = route.params;
    const showAlert = (id,name) =>
    Alert.alert('Confirmation', `You want delete?: ${name}?`, [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => handleDeleteObservation(id) },
    ]);
    useEffect(() => {
        const fetchData = async (userId) => {
            try {
                const data = await Database.getObservation(userId);
                setObservation(data);
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchData(userId);
    }, [isFocused]);

    const handleDeleteObservation = async (id) => {
        await Database.deleteObservation(id);
        const data = await Database.getObservation();
        setObservation(data);
    };

    const handleDeleteAll = async () => {
        Database.clearAllObservation();
        setObservation([]); // Xóa tất cả hike khỏi danh sách
    }
    const renderTodoItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity
                style={styles.name} onPress={() => navigation.navigate("DetailObservation", { observation: item })}>
                <Text style={styles.textName}>{item.observation_name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => showAlert(item.id,item.observation_name)}
            >
                <Text style={styles.textDelete}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground source={require('../assets/image/bgr.png')} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonHome}>
                    <Ionicons name="home" size={30} color="white" />
                    <Text style={styles.textHome}>Observation</Text>
                </TouchableOpacity>
                <ButtonDeleteAll handleDeleteAll={handleDeleteAll} />
            </View>
            <FlatList 
                style={styles.content}
                data={observation}
                renderItem={renderTodoItem}
                keyExtractor={(item) => item.id.toString()}>
            </FlatList>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.textItem}>Hikes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("DetailObservation",{userId:userId})} style={styles.item}>
                    <Text style={styles.textItem}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.textItem}>Search</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    );
}

export default Observation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    buttonHome: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        flexDirection: 'row',
    },
    textHome: {
        fontSize: 30,
        color: COLORS.while,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    // Content
    content: {
        paddingHorizontal: 20,
        marginTop: 20,
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    name: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
        width: '65%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    textName: {
        fontWeight: 'bold',
        color: '#49007F',
        overflow: 'hidden',
        fontSize: 20,
    },
    buttonDelete: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 20,
        width: '30%',
        backgroundColor: '#666666',
        paddingHorizontal: 20,
    },
    textDelete: {
        fontWeight: 'bold',
        color: 'white',
        overflow: 'hidden',
        fontSize: 20,
    },
    // Bottom
    bottom: {
        borderTopColor: '#666666',
        borderTopWidth: 3, // Không nên sử dụng chuỗi
        paddingHorizontal: 30,
        paddingVertical: 20,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textItem: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
});