import { StyleSheet, View, Text, ImageBackground,Pressable  } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';


export default function Welcome( {navigation} ) {
  return (
    <ImageBackground style={styles.container} source={require('../assets/image/welcome.png')}>
        <View style={styles.content}>
            {/* Content */}
            <Text style={styles.title}>Let's Get Started</Text>
            <Text style={styles.detail}>Climb Higher, Explore Further: Your Mountain Adventure Awaits!</Text>
            <View style={{
                top:230,
                marginLeft:20,
            }}>
                <Button
                    title="Join Now"
                    onPress={()=>navigation.navigate("Signup")}
                    style={{
                        marginTop:40,
                        width:'100%',
                    }}
                />
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
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content:{
        top:450,
        marginHorizontal:30,
        textAlign:'right',
    },
    title:{
        fontSize:40,
        color:COLORS.while,
    },
    detail:{
        marginTop:20,
        fontSize:20,
        color:COLORS.while,
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
