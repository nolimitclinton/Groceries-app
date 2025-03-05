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
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <ImageBackground
      source={require("assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require("assets/images/carrotlogo.png")} style={styles.logo} />

        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subText}>Enter your credentials to continue</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#888"
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
              placeholder="********"
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

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={[styles.loginContainer, isKeyboardVisible && styles.loginContainerActive]}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLink} onPress={() => router.push("/login")}>
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
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
    fontSize: width * 0.065,
    fontFamily: "Gilroy-Bold",
    color: "#000",
    marginBottom: height * 0.005,
    paddingBottom: height * 0.01,
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
  termsText: {
    fontSize: width * 0.035,
    fontFamily: "Gilroy-Medium",
    color: "#777",
    textAlign: "left",
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
  },
  termsLink: {
    color: "#53B175",
    fontFamily: "Gilroy-Bold",
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
  loginContainer: {
    marginTop: height * 0.02,
    width: "100%",
    alignItems: "center",
  },
  loginContainerActive: {
    marginBottom: height * 0.02, 
  },
  loginText: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Regular",
    color: "#555",
    textAlign: "center",
  },
  loginLink: {
    color: "#53B175",
    fontFamily: "Gilroy-Bold",
  },
});

export default SignupScreen;