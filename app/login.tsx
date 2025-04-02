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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loginSuccess, restoreSession } from "./authentication/authSlice";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(restoreSession(token));
        router.replace("/tabs/home");
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
  
      if (data.token) {
        console.log("Token received:", data.token);
        await AsyncStorage.setItem("token", data.token);
        dispatch(loginSuccess(data.token));
        router.replace("/tabs/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
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
    <BackgroundScreen useImageBackground={true} buttonText="Log In" buttonPosition={0.24} onButtonPress={handleLogin}>
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

        <View style={[styles.signupContainer, isKeyboardVisible && styles.signupContainerActive]}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink} onPress={() => router.push("/signup")}>
              Sign Up
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
    marginBottom: height * 0.05,
  },

  signupContainer: {
    marginTop: height * 0.09,
    width: "100%",
    alignItems: "center",
  },
  signupContainerActive: {
    marginBottom: height * 0.02, 
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