import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Please enter both email and password");
      return;
    }
    console.log("Logged In:", form);
    router.push("/signup");
  };

  return (
    <ImageBackground source={IMAGES.background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
          <Image source={IMAGES.clogo} style={styles.logo} />

          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subText}>Enter your email and password</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.textLight}
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
                placeholder=""
                placeholderTextColor={COLORS.textLight}
                secureTextEntry={!passwordVisible}
                value={form.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink} onPress={() => router.push("/signup")}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
  },
  logo: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: height * 0.085,
  },
  title: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: height * 0.005,
    paddingBottom: height * 0.01,
    textAlign: "left",
  },
  subText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.regular,
    color: COLORS.textGray,
    marginBottom: height * 0.03,
    textAlign: "left",
  },
  inputWrapper: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginBottom: height * 0.005,
  },
  input: {
    width: "100%",
    height: height * 0.06,
    fontSize: SIZES.body,
    backgroundColor: "transparent",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.border,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  passwordInput: {
    flex: 1,
    height: height * 0.06,
    fontSize: SIZES.body,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
    textAlign: "right",
    marginBottom: height * 0.03,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    color: COLORS.bright,
  },
  signupContainer: {
    position: "absolute",
    bottom: height * 0.30,
    width: "100%",
    alignItems: "center",
  },
  signupText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.regular,
    color: COLORS.textDark,
    textAlign: "center",
  },
  signupLink: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
});

export default LoginScreen;