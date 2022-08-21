import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import { useRecoilState } from "recoil";
import { loginSuccessState } from "../atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { fetchLogin, STORAGE_KEY } from "../requestMethod";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useRecoilState(loginSuccessState);
  const navigation = useNavigation();

  useEffect(() => {
    loadInfo();
  }, []);

  const saveInfo = async (email, password) => {
    try {
      const data = await fetchLogin(email, password);

      if (data.status) {
        const { status } = data;
        switch (status) {
          case "notExistEmail":
            throw new Error("notExistEmail");
          case "wrongPassword":
            throw new Error("wrongPassword");
          case "notVerified":
            throw new Error("notVerified");
          default:
            throw new Error("extraServerError");
        }
      }

      if (data.email === email) {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            currentUser: data.email,
            token: data.token,
            isFetching: false,
            error: false,
            expire: Date.now(),
          })
        );
        loadInfo();
      }
    } catch (error) {
      const { message } = error;

      switch (message) {
        case "notExistEmail":
          setError("존재하는 계정이 없거나 이메일이 잘못 되었습니다");
          break;
        case "wrongPassword":
          setError("비밀번호가 일치하지 않습니다");
          break;
        case "notVerified":
          setError("이메일 인증이 필요합니다");
          break;
        default:
          setError("잠시후에 다시 시도해주세요");
          break;
      }
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={{
          uri: "http://172.30.1.43:19000/assets/cafe.png",
        }}
      />
      <Text style={styles.title}>Cafe Small House</Text>
      <View>
        <Text>{error}</Text>
      </View>
      <View style={styles.shadowBox}>
        <TextInput onChangeText={(payload) => setEmail(payload)} placeholder="Email" style={styles.input} />
      </View>
      <View style={styles.shadowBox}>
        <TextInput
          onChangeText={(payload) => setPassword(payload)}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonBox}>
        <Button title="Login" onPress={() => saveInfo(email, password)} />
        <View style={styles.buttonMargin} />
        <Button title="Register" onPress={() => navigation.navigate("Stack", { screen: "Register" })} />
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
    fontStyle: "italic",
    fontWeight: "700",
    color: "#FEC789",
  },
  shadowBox: {
    width: "70%",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.7)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  input: {
    borderRadius: 10,
    width: "100%",
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
    width: "70%",
  },
  buttonMargin: {
    marginBottom: 10,
  },
});

export default Login;
