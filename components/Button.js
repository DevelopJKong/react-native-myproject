import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

export const RegisterButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Stack", { screen: "Register" })} style={styles.button}>
      <Text>RegisterButton</Text>
    </TouchableOpacity>
  );
};

export const LoginButton = () => {
  return (
    <View>
      <Text>LoginButton</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    backgroundColor: "blue",
  },
});
