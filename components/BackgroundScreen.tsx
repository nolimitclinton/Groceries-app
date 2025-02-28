import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
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
  return (
    <ImageBackground
      source={require("assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {/* Back Button */}
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back-outline" size={width * 0.06} color="black" />
          </TouchableOpacity>
        )}

        {/* Injecting the screen content */}
        {children}

        {/* Next Button */}
        {onNext && (
          <TouchableOpacity
            style={styles.nextButton}
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
    top: height * 0.07,
    left: width * 0.03,
    zIndex: 10,
  },
  nextButton: {
    position: "absolute",
    right: width * 0.06,
    bottom: height * 0.36,
    backgroundColor: "#53B175",
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackgroundScreen;