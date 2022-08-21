import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, TextInput, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { fetchRegister } from "../requestMethod";
import { useRecoilState } from "recoil";
import { emailCheckState } from "../atoms";

const Register = () => {
  const [emailCheck,setEmailCheck] = useRecoilState(emailCheckState);

  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthNumber, setBirthNumber] = useState("");
  const [recommendCode, setRecommendCode] = useState("");

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigation = useNavigation();

  const onPressJoin = async () => {
    try {
      const data = await fetchRegister(
        country,
        email,
        password,
        confirmPass,
        name,
        lastName,
        firstName,
        birthNumber,
        recommendCode
      );

      if (data.status) {
        const { status } = data;
        switch (status) {
          case "diffPassword":
            throw new Error("diffPassword");
          case "notExistEmail":
            throw new Error("notExistEmail");
          default:
            throw new Error("extraServerError");
        }
      }
      setEmailCheck(data.user.email);
      navigation.navigate("Stack", { screen: "EmailCheck" });
    } catch (error) {
      const { message } = error;
      switch (message) {
        case "diffPassword":
          setPasswordError("비밀번호가 일치하지 않습니다");
          setError("모든 값을 알맞게 입력해주세요");
          break;
        case "notExistEmail":
          setEmailError("이미 존재하는 이메일입니다");
          setError("모든 값을 알맞게 입력해주세요");
          break;
        default:
          setError("모든 값을 알맞게 입력해주세요");
          break;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.viewBox}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollbox} bounces={false}>
          <Image
            style={styles.image}
            source={{
              uri: "http://172.30.1.43:19000/assets/cafe.png",
            }}
          />
          <Text style={styles.title}>Cafe Small House</Text>

          <View style={styles.shadowBox}>
            <RNPickerSelect
              onValueChange={(payload) => setCountry(payload)}
              placeholder={{
                label: "국가를 선택해주세요",
              }}
              items={[
                { label: "한국", value: "KR" },
                { label: "미국", value: "US" },
                { label: "일본", value: "JP" },
              ]}
            />
          </View>
          <Text style={styles.inputInfoBox}>이메일 :</Text>
          <View style={styles.shadowBox}>
            <TextInput
              onChangeText={(payload) => {
                setEmail(payload);
                setEmailError("");
                setError("");
              }}
              placeholder="Email"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.inputValueError}>{emailError}</Text>
          </View>

          <Text style={styles.inputInfoBox}>비밀번호 :</Text>
          <View style={styles.shadowBox}>
            <TextInput
              onChangeText={(payload) => {
                setPassword(payload);
                setPasswordError("");
                setError("");
              }}
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
            />
          </View>

          <Text style={styles.inputInfoBox}>비밀번호 확인:</Text>
          <View style={styles.shadowBox}>
            <TextInput
              onChangeText={(payload) => {
                setConfirmPass(payload);
                setPasswordError("");
                setError("");
              }}
              secureTextEntry={true}
              placeholder="Confirmation Password"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.inputValueError}>{passwordError}</Text>
          </View>

          <Text style={styles.inputInfoBox}>이름 확인:</Text>
          <View style={styles.shadowBox}>
            <TextInput onChangeText={(payload) => setName(payload)} placeholder="Name" style={styles.input} />
          </View>
          <Text style={styles.inputInfoBox}>영문명[성] 확인:</Text>
          <View style={styles.shadowBox}>
            <TextInput onChangeText={(payload) => setLastName(payload)} placeholder="Last Name" style={styles.input} />
          </View>

          <Text style={styles.inputInfoBox}>영문명[이름] 확인:</Text>
          <View style={styles.shadowBox}>
            <TextInput
              onChangeText={(payload) => setFirstName(payload)}
              placeholder="First Name"
              style={styles.input}
            />
          </View>
          <Text style={styles.inputInfoBox}>생년월일 확인:</Text>
          <View style={styles.shadowBox}>
            <TextInput
              onChangeText={(payload) => setBirthNumber(payload)}
              placeholder="BirthNumber"
              style={styles.input}
            />
          </View>

          <Text style={styles.inputInfoBox}>추천 코드 확인:</Text>
          <View style={styles.shadowBox}>
            <TextInput
              onChangeText={(payload) => setRecommendCode(payload)}
              placeholder="추천인 코드"
              style={styles.input}
            />
          </View>
          <View style={styles.buttonMargin} />
          <View>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
          <View style={styles.button}>
            <View style={styles.buttonMargin} />
            <Button title="Sign in" onPress={onPressJoin} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  viewBox: {
    flex: 1,
    width: "100%",
  },
  scrollbox: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
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
    width: "85%",
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
  inputInfoBox: {
    alignSelf: "flex-start",
    marginHorizontal: "7%",
    marginTop: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonMargin: {
    marginTop: 15,
  },
  button: {
    width: "85%",
    marginBottom: 50,
  },
  inputValueError: {
    marginTop: 15,
    color: "red",
  },
  errorMessage: {
    color: "red",
  },
});

export default Register;
