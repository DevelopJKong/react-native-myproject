import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Main from "../screens/Main";
import { useRecoilState } from "recoil";
import { loginSuccessState } from "../atoms";

const NativeStack = createNativeStackNavigator();
const STORAGE_KEY = "@toDos";

const Stack = () => {
  const [login, setLogin] = useRecoilState(loginSuccessState);
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      setLogin(user);
    })();
  }, []);
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="Login" component={login?.email ? Main : Login} />
    </NativeStack.Navigator>
  );
};

export default Stack;
