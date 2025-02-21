import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";

const { width, height } = Dimensions.get("window");

const PhoneScreen = () => {
  const router = useRouter();

  return (
    <BackgroundScreen onBack={() => router.back()} onNext={() => router.push("/otp")}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.header}>Enter your mobile number</Text>
            <Text style={styles.subText}>Mobile Number</Text>

            <View style={styles.inputContainer}>
              <Image source={require("assets/images/flag.png")} style={styles.flagIcon} />
              <Text style={styles.countryCode}>+880</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                autoFocus={true}
                placeholder="Enter your number"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    bottom: height * 0.1,
  },
  subText: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Medium",
    color: "#777",
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: height * 0.02,
    width: "100%",
  },
  flagIcon: {
    width: width * 0.07,
    height: height * 0.03,
    marginRight: width * 0.02,
  },
  countryCode: {
    fontSize: width * 0.05,
    fontFamily: "Gilroy-Medium",
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.05,
    fontFamily: "Gilroy-Regular",
  },
});

export default PhoneScreen;