import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@toDos";

export default function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState({});
  useEffect(() => {
    loadInfo();
  }, []);

  const saveInfo = async (id, password) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ id, password }));
  };

  const loadInfo = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      setLogin(JSON.parse(s));
    } catch (error) {
      console.log(error);
    }
  };

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
      <TextInput
        onChangeText={(payload) => setId(payload)}
        placeholder="ID"
        style={styles.input}
      />
      <TextInput
        onChangeText={(payload) => setPassword(payload)}
        secureTextEntry={true}
        placeholder="Password"
        style={styles.input}
      />
      <View style={styles.buttonBox}>
        <Button title="Login" onPress={() => saveInfo(id, password)} />
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
