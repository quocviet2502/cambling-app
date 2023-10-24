import { StyleSheet, View, Text, ImageBackground,Image,Pressable, Alert  } from 'react-native'
import React, { useState,useEffect } from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../firebaseConfig';
import { Constants, Facebook } from 'expo';
const Signup = ({ navigation }) => {
    const [isPasswordShow,setIsPasswordShow] = useState(false);
    const [isCheckbox,setIsCheckbox]         = useState(false);
    const [email,setEmail]                   = useState('');
    const [password,setPassword]             = useState('');
    const auth = FIREBASE_AUTH;
    const handleSignUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    };
  return (
    <ImageBackground style={styles.container} source={require('../assets/image/register.png')}>
        <View style={styles.content}>
            <View style={styles.item}>
                <Text style={styles.titleInput}>Email address</Text>
                <View style={styles.input}>
                    <TextInput 
                        placeholder="Enter your email address"
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{
                            width:"100%"
                        }}
                    />
                </View>
            </View>
            {/* <View style={styles.item}>
                <Text style={styles.titleInput}>Phone</Text>
                <View style={[styles.input,{flexDirection:"row",justifyContent:"space-between"}]}>
                    <TextInput 
                        placeholder="+84"
                        placeholderTextColor={COLORS.black}
                        keyboardType="numeric"
                        style={{
                            width:"12%",
                            height:"100%",
                            borderRightWidth:1,
                            borderLeftColor:COLORS.black,
                        }}
                    />
                    <TextInput 
                        placeholder="Enter your phone"
                        placeholderTextColor={COLORS.black}
                        keyboardType="numeric"
                        style={{
                            width:"80%",
                        }}
                    />
                </View>
            </View> */}
            <View style={styles.item}>
                <Text style={styles.titleInput}>Password</Text>
                <View style={styles.input}>
                    <TextInput 
                        placeholder="Enter your password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={isPasswordShow}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={{
                            width:"100%"
                        }}
                    />
                    <TouchableOpacity
                        onPress={()=>setIsPasswordShow(!isPasswordShow)}
                        style={{
                            position:"absolute",
                            right:12,
                            top:8,
                            
                        }}
                    >
                        {
                            isPasswordShow === true ? (
                                <Ionicons name="eye-off" size={20} />
                            ) : (
                                <Ionicons name="eye" size={20} />
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.item}>
                <View style={{
                    flexDirection:"row",
                    marginVertical: 6
                }}>
                    <Checkbox 
                        style={{
                            marginRight:8
                        }}
                        value={isCheckbox}
                        onValueChange={setIsCheckbox}
                        color={isCheckbox ? COLORS.black : undefined}
                    />
                    <Text>I aggree to the terms and conditions</Text>
                </View>
            </View>
            <Button 
                title="Sign Up"
                filled
                style={{
                    marginTop:30,
                }}
                onPress ={handleSignUp}
            />
            <View style={styles.loginWith}>
                <View style={styles.line} />
                <Text>Or Sign up with</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.itemSocial} onPress={() => console.log("Press")}>
                    <Image 
                        style={styles.imageSocial}
                        source={require('../assets/image/facebook.png')}
                        resizeMode="contain"
                    />
                    <Text>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemSocial} onPress={() => console.log("Press")}>
                    <Image 
                        style={styles.imageSocial}
                        source={require('../assets/image/gmail.png')}
                        resizeMode="contain"
                    />
                    <Text>Google</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection:'row',
                marginTop:15,
                justifyContent:'center',
            }}>
                <Text style={styles.qaAccount}>Already have an account? </Text>
                <Pressable onPress={()=>navigation.navigate("Login")}>
                    <Text style={styles.checkLogin}>Login</Text>
                </Pressable>
            </View>
            
        </View>
    </ImageBackground>
  )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content:{
        top:350,
        marginHorizontal:30,
        textAlign:'right',
    },
    input:{
        marginTop:10,
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:10,
        borderColor:COLORS.black,
        borderRadius:20,
        borderWidth:1,
        backgroundColor:COLORS.while,
    },
    titleInput:{
        fontSize:20,
        color:COLORS.while,
    },
    item:{
        marginBottom:20,
    },
    loginWith:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:20,
    },
    line:{
        flex:1,
        height:1,
        backgroundColor:COLORS.black,
        marginHorizontal: 10
    },
    socialIcons:{
        flexDirection:'row',
        justifyContent:'center'
    },
    itemSocial:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        height:50,
        borderWidth:1,
        borderColor:COLORS.grey,
        marginRight:4,
        borderRadius: 10,
    },
    imageSocial:{
        height:40,
        width:40,
        marginRight:8
    },
    qaAccount:{
        fontSize:15,
        color:COLORS.while,
    },
    checkLogin:{
        fontSize:15,
        color:COLORS.while,
        fontWeight:'bold',
    }

})