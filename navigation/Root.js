import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Main from "../screens/Main";

const NativeStack = createNativeStackNavigator();
const STORAGE_KEY = "@toDos";

const Stack = () => {
    const [login, setLogin] = useState({});
    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem(STORAGE_KEY);
            setLogin(user);
        })();
    }, []);
    console.log(login);
    return (
        <NativeStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: false,
            }}
        >
            <NativeStack.Screen name="Detail" component={login ? Main : Detail} />
        </NativeStack.Navigator>
    );
};

export default Stack;
