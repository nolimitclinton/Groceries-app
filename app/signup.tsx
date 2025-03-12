import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import BackgroundScreen from "~/components/BackgroundScreen";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    console.log("Signed Up:", form);
    router.push("./login");
  };

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
    <BackgroundScreen useImageBackground={true} buttonText="Sign Up" onButtonPress={handleSignup} buttonPosition={0.173}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={IMAGES.clogo}style={styles.logo} />

        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subText}>Enter your credentials to continue</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.textGray}
            value={form.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <View style={styles.divider} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.textGray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <View style={styles.divider} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="********"
              placeholderTextColor={COLORS.textGray}
              secureTextEntry={!passwordVisible}
              value={form.password}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
              <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>


        <View style={[styles.loginContainer, isKeyboardVisible && styles.loginContainerActive]}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLink} onPress={() => router.push("/login")}>
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  
  scrollContainer: {
    flexGrow: 1,
    paddingTop: height * 0.07,
    paddingBottom: height * 0.1, 
  },
  logo: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: height * 0.08,
  },
  title: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.bold,
    color: COLORS.dark,
    marginBottom: height * 0.005,
    paddingBottom: height * 0.01,
    textAlign: "left",
  },
  subText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginBottom: height * 0.03,
    textAlign: "left",
  },
  inputWrapper: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: SIZES.body,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginBottom: height * 0.005,
  },
  input: {
    width: "100%",
    height: height * 0.06,
    fontSize: width * 0.045,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.border,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: height * 0.06,
    fontSize: SIZES.h3,
  },
  eyeIcon: {
    padding: 1,
  },
  termsText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textLight,
    textAlign: "left",
    marginBottom: height * 0.03,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
 
  loginContainer: {
    marginTop: height * 0.12,
    width: "100%",
    alignItems: "center",
  },
  loginContainerActive: {
    marginBottom: height * 0.02, 
  },
  loginText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    textAlign: "center",
  },
  loginLink: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
});

export default SignupScreen;