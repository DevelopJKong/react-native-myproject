import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import { useRecoilState } from "recoil";
import { loginSuccessState } from "../atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@toDos";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [login, setLogin] = useRecoilState(loginSuccessState);

    useEffect(() => {
        loadInfo();
    }, []);

    const saveInfo = async (email, password) => {
        try {
            const { user } = await (
                await fetch(`http://192.168.0.90:5000/api/users/postUsers`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                })
            ).json();

            if (user.email === email) {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ email, password }));
                loadInfo();
            }
            
        } catch (error) {
            setError("일치하지 않습니다");
        }
    };

    const loadInfo = async () => {
        try {
            const s = await AsyncStorage.getItem(STORAGE_KEY);
            setLogin(JSON.parse(s));
        } catch (error) {
            console.log(error);
        }
    };
    console.log(error);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image
                style={styles.image}
                source={{
                    uri: "https://www.cafesmallhouse.com/img/cafe_logo_5.png",
                }}
            />
            <Text style={styles.title}>Cafe Small House</Text>
            <TextInput onChangeText={(payload) => setEmail(payload)} placeholder="Email" style={styles.input} />
            <TextInput onChangeText={(payload) => setPassword(payload)} secureTextEntry={true} placeholder="Password" style={styles.input} />
            <View style={styles.buttonBox}>
                <Button title="Login" onPress={() => saveInfo(email, password)} />
            </View>
            <View>
                <Text>{error}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 25,
        marginTop: 25,
        marginBottom: 10,
    },
    input: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        width: 270,
        paddingHorizontal: 20,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    buttonBox: {
        marginTop: 20,
        width: 270,
    },
});

export default Login;