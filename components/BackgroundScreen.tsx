import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface BackgroundScreenProps {
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
}

const BackgroundScreen: React.FC<BackgroundScreenProps> = ({ children, onBack, onNext }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(height * 0.3); 

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(showEvent, (event) => {
      setKeyboardOffset(
        Platform.OS === "android" 
          ? height * 0.03
          : event.endCoordinates.height + height * 0.03
      ); 
    });

    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardOffset(height * 0.3); 
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={require("assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back-outline" size={width * 0.06} color="black" />
          </TouchableOpacity>
        )}

        {/* Content */}
        {children}
        

        {onNext && (
          <TouchableOpacity
            style={[styles.nextButton, { bottom: keyboardOffset }]}
            onPress={onNext}
          >
            <Ionicons name="chevron-forward-outline" size={width * 0.08} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: height * 0.1,
    left: width * 0.03,
    zIndex: 10,
  },
  nextButton: {
    position: "absolute",
    right: width * 0.08,
    backgroundColor: "#53B175",
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackgroundScreen;