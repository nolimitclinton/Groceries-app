import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./authentication/store";

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        await Font.loadAsync({
          "Gilroy-Regular": require("../assets/styles/Gilroy-Regular.ttf"),
          "Gilroy-SemiBold": require("../assets/styles/Gilroy-semiBold.ttf"),
          "Gilroy-Medium": require("../assets/styles/Gilroy-Medium.ttf"),
          "Gilroy-Heavy": require("../assets/styles/Gilroy-Heavy.ttf"),
          "Gilroy-Bold": require("../assets/styles/Gilroy-Bold.ttf"),
          "Gilroy-Normal": require("../assets/styles/Gilroy.ttf"),
        });

        await persistor.persist();
        
        setFontsLoaded(true);
        setIsReady(true);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }

    initializeApp();
  }, []);

  if (!fontsLoaded || !isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        } 
        persistor={persistor}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="placeorder" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}