import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";

const { width, height } = Dimensions.get("window");

const OtpScreen = () => {
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <BackgroundScreen useImageBackground={true} onBack={() => router.back()} onNext={() => router.push("/location")}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.inputSection}>
            <Text style={styles.header}>Enter your 4-digit code</Text>
            <Text style={styles.subText}>Code</Text>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              autoFocus={true}
              maxLength={4}
              placeholder="- - - -"
              placeholderTextColor={COLORS.textDark}
              textAlign="left"
            />
          </View>

          <View style={[styles.resendContainer, { bottom: keyboardVisible ? height * 0.24 : height * 0 }]}>
            <Text style={styles.resendText}>Resend Code</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: height * 0.15,
  },
  inputSection: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.semiBold,
    color: COLORS.textDark,
    textAlign: "left",
    marginBottom: height * 0.01,
    paddingBottom: height * 0.02,
  },
  subText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginBottom: height * 0.02,
  },
  input: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: height * 0.02,
    marginBottom: height * 0.55,
    width: "100%",
    textAlign: "left",
  },
  resendContainer: {
    position: "absolute",
    alignSelf: "flex-start",
  },
  resendText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    textAlign: "left",
  },
});

export default OtpScreen;