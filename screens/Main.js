import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Main = () => {
    const [login, setLogin] = useState({});

    const clearLogin = async () => {
        await AsyncStorage.setItem("@toDos", {});
        setLogin({});
    };

    return (
        <View>
            <Text>Main</Text>
            <Button title="Logout" onPress={clearLogin} />
        </View>
    );
};

export default Main;
