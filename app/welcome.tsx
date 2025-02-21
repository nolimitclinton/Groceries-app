import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const WelcomeScreen= () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("assets/images/onboarding.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
       
        <View style={styles.textContainer}>
          <Image source={require("assets/images/carrot-logo.png")} style={styles.logo} />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>to our store</Text>
          <Text style={styles.description}>
            Get your groceries in as fast as one hour
          </Text>
        </View>

        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/intro")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.08, 
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.46, 
  },
  logo: {
    width: width * 0.12, 
    height: height * 0.07,
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: width * 0.12,
    fontFamily: "Gilroy-Bold",
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: width * 0.12,
    fontFamily: "Gilroy-Bold",
    color: "#fff",
  },
  description: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Medium",
    color: "#ddd",
    textAlign: "center",
    marginTop: height * 0.01,
    width: "80%",
    lineHeight: width * 0.05,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: height * 0.05,
  },
  button: {
    backgroundColor: "#53B175",
    borderRadius: width * 0.05,
    height: height * 0.08,
    width: width * 0.85,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Gilroy-Regular",
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;