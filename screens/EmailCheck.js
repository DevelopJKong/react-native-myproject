import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRecoilValue } from "recoil";
import { emailCheckState } from "../atoms";
import { fetchEmailCheck } from "../requestMethod";

const EmailCheck = () => {
  const emailCheckValue = useRecoilValue(emailCheckState);
  const [email, setEmail] = useState("");
  const [codeNum, setCodeNum] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    setEmail(emailCheckValue);
  }, []);

  const onPressCheck = async () => {
    try {
      const data = await fetchEmailCheck(email,codeNum);

      if (data.status) {
        const { status } = data;
        switch (status) {
          case "notExistUser":
            throw new Error("notExistUser");
          case "notVerified":
            throw new Error("notVerified");
          default:
            throw new Error("extraServerError");
        }
      }
      navigation.navigate("Stack", { screen: "Login" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View styles={styles.titleBox}>
        <Text style={styles.title}>Cafe Small House</Text>
      </View>
      <View style={styles.titleContentBox}>
        <Text> 이메일로 받으신 확인 코드를 입력해주세요</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.inputInfoBox}>이메일:</Text>
        <View style={styles.shadowBox}>
          <TextInput value={email} editable={false} placeholder="Email" style={styles.input} />
        </View>
        <View style={styles.marginTop} />
        <Text style={styles.inputInfoBox}>확인 코드:</Text>
        <View style={styles.shadowBox}>
          <TextInput
            onChangeText={(payload) => setCodeNum(payload)}
            placeholder="Code Number..."
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.buttonMargin} />
      <View style={styles.button}>
        <Button title="Check" onPress={onPressCheck} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleBox: {
    flex: 0.5,
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "700",
    color: "#FEC789",
  },

  titleContentBox: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    flex: 0.5,
    width: "80%",
    height: "80%",
    paddingTop: 80,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadowBox: {
    width: "100%",
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
  inputInfoBox: {
    alignSelf: "flex-start",
    marginHorizontal: "3%",
    marginTop: 15,
  },
  input: {
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  marginTop: {
    marginTop: 50,
  },
  buttonMargin: {
    marginTop: 30,
  },
  button: {
    width: "80%",
    marginBottom: 50,
  },
});

export default EmailCheck;
