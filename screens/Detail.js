import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Alert, Pressable } from 'react-native';
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react'
import DataTimePicker from '@react-native-community/datetimepicker';
import Database from "../Database";
const Detail = ({ navigation, route }) => {

  const { hikes } = route.params;
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isCheckbox, setIsCheckbox] = useState(hikes.hike_packing);
  const [name, setName] = useState(hikes.hike_name);
  const [location, setLocation] = useState(hikes.hike_location);
  const [dateOfBirth, setDateOfBirth] = useState(hikes.hike_dateOfBirth);
  const [packing, setPacking] = useState(hikes.hike_packing);
  const [lenght, setLength] = useState(hikes.hike_length);
  const [level, setLevel] = useState(hikes.hike_level);
  const [description, setDescription] = useState(hikes.hike_description);
  const showAlert = () =>
    Alert.alert('Confirmation', `Name: ${name}\nLocation: ${location}\nDate: ${dateOfBirth}\nLength: ${lenght}\n Packing:${packing ? 'Yes' : 'No'}\nDifficulty level: ${level}\nDescription: ${description}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => handleUpdateHike() },
    ]);
  const handleUpdateHike = async () => {
    try {
      await Database.updateHikes(hikes.id, name, location, dateOfBirth, packing, lenght, level, description);
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi thêm hike: " + error);
      // Xử lý lỗi ở đây nếu cần thiết
    }
  };
  const handleCheckboxChange = (value) => {
    setIsCheckbox(value);
    setPacking(value); // Lưu giá trị vào biến packing
  };
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  }
  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatepicker();
  };
  return (
    <ImageBackground source={require('../assets/image/bgr.png')} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBack}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.textEdit}>Edit Hike</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.itemInput}>
          <Text style={styles.titleInput}>Name of the hike *</Text>
          <TextInput style={styles.input}
            onChangeText={text => setName(text)}
            value={name}

          />
        </View>
        <View style={styles.itemInput}>
          <Text style={styles.titleInput}>Location *</Text>
          <TextInput style={styles.input}
            onChangeText={text => setLocation(text)}
            value={location}
          />
        </View>
        <View style={styles.itemInput}>
          <Text style={styles.titleInput}>Date of the hike *</Text>
          {showPicker && (
            <DataTimePicker
              display="spinner"
              mode='date'
              value={date}
              onChange={onChange}
              style={styles.datePicker}
              maximumDate={new Date()}
            />
          )}
          {showPicker && Platform.OS === 'ios' && (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <TouchableOpacity style={[
                styles.buttonCanleCalendar, styles.pickerButtonCalendar
              ]}
                onPress={toggleDatepicker}
              >
                <Text style={{ fontSize: 20, color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[
                styles.buttonCanleCalendar, styles.pickerButtonCalendar
              ]}
                onPress={confirmIOSDate}
              >
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Confirmation</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput style={styles.input}
                  onChangeText={setDateOfBirth}
                  value={dateOfBirth}
                  onPressIn={toggleDatepicker}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View style={[styles.itemInput, styles.itemCheckbox]}>
          <Text style={styles.titleInput}>Parking available *</Text>
          <View style={styles.qaCheckbox}>
            <Checkbox
              value={isCheckbox}
              onValueChange={(value) => handleCheckboxChange(value)}
              color={isCheckbox ? COLORS.black : undefined}
            />
            <Text style={styles.titleInput}>Yes</Text>
          </View>
          <View style={styles.qaCheckbox}>
            <Checkbox
              value={!isCheckbox}
              onValueChange={(value) => handleCheckboxChange(!value)}
              color={!isCheckbox ? COLORS.black : undefined}
            />
            <Text style={styles.titleInput}>No</Text>
          </View>
        </View>
        <View style={[styles.itemInput, styles.itemCheckbox]}>
          <Text style={styles.titleInput}>Lenght of the hike *</Text>
          <TextInput style={styles.inputTwo}
            onChangeText={text => setLength(text)}
            value={lenght}
          />
        </View>
        <View style={[styles.itemInput, styles.itemCheckbox]}>
          <Text style={styles.titleInput}>Difficulty level *</Text>
          <TextInput style={styles.inputTwo}
            onChangeText={text => setLevel(text)}
            value={level}
          />
        </View>
        <View style={styles.itemInput}>
          <Text style={styles.titleInput}>Description</Text>
          <TextInput style={styles.description}
            textAlignVertical="top"
            multiline={true}
            onChangeText={text => setDescription(text)}
            value={description}
          />
        </View>
        <TouchableOpacity onPress={showAlert} style={styles.buttonUpdate}>
          <Text style={styles.textUpdate}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.textItem}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Add")} style={styles.item}>
          <Text style={styles.textItem}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.textItem}>Search</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Detail
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  buttonBack: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  textEdit: {
    marginLeft: 70,
    fontSize: 30,
    color: COLORS.while,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  itemInput: {
    marginBottom: 20,
  },
  itemCheckbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qaCheckbox: {
    flexDirection: 'row',
  },
  inputTwo: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#CC00FF',
    width: '50%',
    backgroundColor: COLORS.while,
    borderRadius: 20,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E8E8E8',
  },
  input: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#CC00FF',
    width: '100%',
    backgroundColor: COLORS.while,
    borderRadius: 20,
  },
  description: {
    paddingHorizontal: 10,
    height: 100,
    marginTop: 5,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#CC00FF',
    width: '100%',
    backgroundColor: COLORS.while,
    borderRadius: 20,
  },
  bottom: {
    backgroundColor: '#CC00FF',
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
  buttonUpdate: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#CC66CC',
  },
  textUpdate: {
    fontSize: 20,
    color: COLORS.while,
  },
})