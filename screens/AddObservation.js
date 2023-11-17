import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert, Pressable, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import DataTimePicker from '@react-native-community/datetimepicker';
import Database from "../Database";
import React, { useState } from 'react'

const AddObservation = ({ navigation,route }) => {
  const { userId } = route.params;
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [comments, setComments] = useState("");

  const showAlert = () =>
    Alert.alert('Confirmation', `Observation: ${name}\nDate: ${dateOfBirth}\Comments: ${comments}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => handleAddObservation() },
    ]);
  const handleAddObservation = async () => {
    try {
      await Database.addObservation(userId,name,dateOfBirth, comments);
      navigation.goBack();
    } catch (error) {
      console.error("Error: " + error);
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
        <Text style={styles.textEdit}>Add New Observation</Text>
      </View>
      <ScrollView style={styles.content}>
        <KeyboardAvoidingView
          behavior="padding"
        >
          <View style={styles.itemInput}>
            <Text style={styles.titleInput}>Observation *</Text>
            <TextInput style={styles.input}
              onChangeText={text => setName(text)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.itemInput}>
          <Text style={styles.titleInput}>Time of observation *</Text>
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
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }} // Đảm bảo nội dung điều chỉnh kích thước màn hình
        >
          <View style={styles.itemInput}>
            <Text style={styles.titleInput}>Comments</Text>
            <TextInput style={styles.description}
              textAlignVertical="top"
              multiline={true}
              onChangeText={text => setComments(text)}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={showAlert} style={styles.buttonUpdate}>
          <Text style={styles.textUpdate}>Add Observation</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.item}>
          <Text style={styles.textItem}>Hikes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Observation")} style={styles.item}>
          <Text style={styles.textItem}>Observation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.textItem}>Search</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default AddObservation
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