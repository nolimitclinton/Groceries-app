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
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
    <ImageBackground
      source={require("assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
          <Image source={require("assets/images/carrotlogo.png")} style={styles.logo} />

          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subText}>Enter your email and password</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
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
                placeholder="Enter your password"
                placeholderTextColor="#888"
                secureTextEntry={!passwordVisible}
                value={form.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="#888" />
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

        <View style={[styles.signupContainer, isKeyboardVisible && styles.signupContainerActive]}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink} onPress={() => router.push("/signup")}>
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.065,
    fontFamily: "Gilroy-Bold",
    color: "#000",
    marginBottom: height * 0.005,
    textAlign: "left",
  },
  subText: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Regular",
    color: "#777",
    marginBottom: height * 0.03,
    textAlign: "left",
  },
  inputWrapper: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Medium",
    color: "#777",
    marginBottom: height * 0.005,
  },
  input: {
    width: "100%",
    height: height * 0.06,
    fontSize: width * 0.045,
    backgroundColor: "transparent",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  passwordInput: {
    flex: 1,
    height: height * 0.06,
    fontSize: width * 0.045,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Medium",
    color: "#53B175",
    textAlign: "right",
    marginBottom: height * 0.03,
  },
  button: {
    backgroundColor: "#53B175",
    width: "100%",
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: width * 0.05,
    fontFamily: "Gilroy-Medium",
    color: "#fff",
  },
  signupContainer: {
    position: "absolute",
    bottom: height * 0.05,
    width: "100%",
    alignItems: "center",
  },
  signupContainerActive: {
    bottom: height * 0.39, 
  },
  signupText: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Regular",
    color: "#555",
    textAlign: "center",
  },
  signupLink: {
    color: "#53B175",
    fontFamily: "Gilroy-Bold",
  },
});

export default LoginScreen;