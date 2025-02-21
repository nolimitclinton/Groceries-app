import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("window");

const OtpScreen = () => {
  const router = useRouter();
  const [resendOffset, setResendOffset] = useState(height * 0.5); 

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(showEvent, (event) => {
      setResendOffset(
        Platform.OS === "android"
          ? height * 0.05 
          : event.endCoordinates.height + height * 0.05
      );
    });

    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => {
      setResendOffset(height * 0.32); 
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <BackgroundScreen onBack={() => router.back()} onNext={() => router.push("/location")}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.header}>Enter your 4-digit code</Text>
            <Text style={styles.subText}>Code</Text>
           

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              autoFocus={true}
              maxLength={4}
              placeholder="- - - -"
              placeholderTextColor="#999"
              textAlign="left"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

     
      <View style={[styles.resendContainer, { bottom: resendOffset }]}>
        <Text style={styles.resendText}>Resend Code</Text>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputSection: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    fontSize: width * 0.06,
    fontFamily: "Gilroy-Bold",
    textAlign: "left",
    marginBottom: height * 0.03,
  },
  subText: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Regular",
    color: "#7C7C7C",
    marginBottom: height * 0.02,
  },
  input: {
    fontSize: width * 0.06,
    fontFamily: "Gilroy-Regular",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: height * 0.02,
    marginBottom: height * 0.02,
    width: "100%",
    textAlign: "left",
  },
  resendContainer: {
    position: "absolute",
    left: width * 0.05,
  },
  resendText: {
    fontSize: width * 0.045,
    fontFamily: "Gilroy-Medium",
    color: "#53B175",
    textAlign: "left",
  },
});

export default OtpScreen;