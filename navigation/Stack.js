import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Main from "../screens/Main";
import { useRecoilState } from "recoil";
import { loginSuccessState } from "../atoms";
import { STORAGE_KEY } from "../requestMethod";
import EmailCheck from "../screens/EmailCheck";

const NativeStack = createNativeStackNavigator();

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
      initialRouteName="Login"
    >
      <NativeStack.Screen name="Login" component={login?.currentUser ? Main : Login} />
      <NativeStack.Screen name="Register" component={Register} />
      <NativeStack.Screen name="EmailCheck" component={EmailCheck} />
    </NativeStack.Navigator>
  );
};

export default Stack;
