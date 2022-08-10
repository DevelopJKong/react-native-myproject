import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginSuccessState } from "../atoms";
import { View, Text, Button, StyleSheet } from "react-native";
const STORAGE_KEY = "@toDos";
const Main = () => {
  const [login, setLogin] = useRecoilState(loginSuccessState);

  useEffect(() => {
    loadInfo();
  }, []);

  const clearLogin = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    loadInfo();
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
      <Text>Main</Text>
      <Button title="Logout" onPress={clearLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Main;
