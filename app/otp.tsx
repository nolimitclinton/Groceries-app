import { useRouter } from "expo-router";
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

  return (
    <BackgroundScreen onBack={() => router.back()} onNext={() => router.push("/location")}>
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

          <View style={styles.resendContainer}>
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
    bottom: height * 0.23,
  },
  resendText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,  
    color: COLORS.primary,
    textAlign: "left",
  },
});

export default OtpScreen;