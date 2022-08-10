import React from "react";
import Root from "./navigation/Root";
import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@toDos";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </RecoilRoot>
  );
}
