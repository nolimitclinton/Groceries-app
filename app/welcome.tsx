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
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground source={IMAGES.onboarding} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Image source={IMAGES.carrotlogo} style={styles.logo} />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>to our store</Text>
          <Text style={styles.description}>
            Get your groceries in as fast as one hour
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

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
    fontSize: SIZES.big,
    fontFamily: FONTS.semiBold,  
    textAlign: "center",
    color: COLORS.bright,
  },
  subtitle: {
    fontSize: SIZES.big,
    fontFamily: FONTS.semiBold,  
    color: COLORS.bright,
  },
  description: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.border,
    textAlign: "center",
    width: "80%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: height * 0.02,
  },
  button: {
    backgroundColor: COLORS.primary, 
    borderRadius: width * 0.05,
    height: height * 0.08,
    width: width * 0.85,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.bright,
    fontSize: SIZES.h2,
    fontFamily: FONTS.normal,  
  },
});

export default WelcomeScreen;