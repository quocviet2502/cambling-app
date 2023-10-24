import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert, Pressable, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import DataTimePicker from '@react-native-community/datetimepicker';
import Database from "../Database";
import React, { useState } from 'react'

const Add = ({ navigation }) => {
  const [isCheckbox, setIsCheckbox] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [packing, setPacking] = useState(true);
  const [lenght, setLength] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  const handleCheckboxChange = (value) => {
    setIsCheckbox(value);
    setPacking(value); // Lưu giá trị vào biến packing
  };
  const showAlert = () =>
    Alert.alert('Confirmation', `Name: ${name}\nLocation: ${location}\nDate: ${dateOfBirth}\nLength:${lenght}\n Packing:${packing ? 'Yes' : 'No'}\n Difficulty level: ${level}\nDescription: ${description}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => handleAddHike() },
    ]);
  const handleAddHike = async () => {
    try {
      await Database.addHikes(name, location, dateOfBirth, packing, lenght, level, description);
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi thêm hike: " + error);
      // Xử lý lỗi ở đây nếu cần thiết
    }
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
        <Text style={styles.textEdit}>Add New Hike</Text>
      </View>
      <ScrollView style={styles.content}>
        <KeyboardAvoidingView
          behavior="padding"
        >
          <View style={styles.itemInput}>
            <Text style={styles.titleInput}>Name of the hike *</Text>
            <TextInput style={styles.input}
              onChangeText={text => setName(text)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.itemInput}>
          <Text style={styles.titleInput}>Location *</Text>
          <TextInput style={styles.input}
            onChangeText={text => setLocation(text)}
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
                  placeholder='Sat Aug 21 2004'
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
          />
        </View>
        <View style={[styles.itemInput, styles.itemCheckbox]}>
          <Text style={styles.titleInput}>Difficulty level *</Text>
          <TextInput style={styles.inputTwo}
            onChangeText={text => setLevel(text)}
          />
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }} // Đảm bảo nội dung điều chỉnh kích thước màn hình
        >
          <View style={styles.itemInput}>
            <Text style={styles.titleInput}>Description</Text>
            <TextInput style={styles.description}
              textAlignVertical="top"
              multiline={true}
              onChangeText={text => setDescription(text)}
            />
          </View>
        </KeyboardAvoidingView>
        {/* <Button title="Show alert" onPress={showAlert} /> */}
        {/* <AddHike name={name} location={location} dateOfBirth={dateOfBirth} packing={packing} lenght={lenght} level={level} description={description} /> */}
        <TouchableOpacity onPress={showAlert} style={styles.buttonUpdate}>
          <Text style={styles.textUpdate}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.textItem}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.item}>
          <Text style={styles.textItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.textItem}>Search</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Add
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#CC66CC',
  },
  textItem: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  buttonUpdate: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#CC00FF',
  },
  textUpdate: {
    fontSize: 20,
    color: COLORS.while,
  },
})