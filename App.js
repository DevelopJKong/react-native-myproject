import React, { useCallback, useMemo, useState, useEffect } from "react";
import Root from "./navigation/Root";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { Animated, Platform, View, StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
  console.log("error");
});

export default function App() {
  return (
    <RecoilRoot>
      <AnimatedAppLoader image={{ uri: "http://172.30.1.43:19000/assets/logo-unscreen.gif" }}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </AnimatedAppLoader>
    </RecoilRoot>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Load stuff
      //await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "white",
              opacity: 1,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}
