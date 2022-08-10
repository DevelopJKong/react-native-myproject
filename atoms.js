import { atom } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const loginSuccessState = atom({
  key: "Login",
  default: {},
});

export const loginFailureState = atom({
  key: "Fail",
  default: { currentUser: "", token: "", isFetching: false, error: true, expire: Date.now() },
});

export const logOutState = atom({
  key: "Logout",
  default: {},
});
