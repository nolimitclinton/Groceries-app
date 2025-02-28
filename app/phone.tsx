import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";

const { width, height } = Dimensions.get("window");

const PhoneScreen = () => {
  const router = useRouter();

  return (
    <BackgroundScreen onBack={() => router.back()} onNext={() => router.push("/otp")}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.inputSection}>
            <Text style={styles.header}>Enter your mobile number</Text>
            <Text style={styles.subText}>Mobile Number</Text>

            <View style={styles.inputContainer}>
              <Image source={IMAGES.flag} style={styles.flagIcon} />
              <Text style={styles.countryCode}>+880</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
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
    width: "100%",
    marginBottom: height * 0.47,
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
    color: COLORS.textLight,
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: height * 0.1,
    paddingBottom: height * 0.01,
    width: "100%",
  },
  flagIcon: {
    width: width * 0.09,
    height: height * 0.03,
    marginRight: width * 0.02,
  },
  countryCode: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    marginRight: width * 0.02,
    color: COLORS.textDark,
  },
  input: {
    flex: 1,
    fontSize: SIZES.h3,
    fontFamily: FONTS.regular,
    color: COLORS.textDark,
  
  },
});

export default PhoneScreen;