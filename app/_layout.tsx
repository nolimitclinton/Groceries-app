import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import * as Font from "expo-font";

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Gilroy-Regular": require("../assets/styles/Gilroy-Regular.ttf"),
        "Gilroy-Medium": require("../assets/styles/Gilroy-Medium.ttf"),
        "Gilroy-Heavy": require("../assets/styles/Gilroy-Heavy.ttf"),
        "Gilroy-Bold": require("../assets/styles/Gilroy-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}