import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";

const { width, height } = Dimensions.get("window");

const IntroScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={IMAGES.groceries} style={styles.image} />
        <Image source={IMAGES.logo} style={styles.logo} />
      </View>

      <Text style={styles.header}>Get your groceries with nectar</Text>

      <TouchableOpacity style={styles.phoneButton} onPress={() => router.push("/phone")}>
        <Image source={IMAGES.flag} style={styles.flagIcon} />
        <Text style={styles.phoneText}>+880</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <Text style={styles.dividerText}>Or connect with social media</Text>

      <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={() => console.log("Google Login")}>
        <Image source={IMAGES.googleIcon} style={styles.icon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={() => console.log("Facebook Login")}>
        <Image source={IMAGES.facebookIcon} style={[styles.icon, styles.fbIcon]} />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bright,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: width * 1.2,
    alignItems: "center",
  },
  image: {
    width: 413.37,
    height: 374.15,
    resizeMode: "cover",
  },
  logo: {
    position: "absolute",
    top: "3%",
    right: "15%",
    width: width * 0.18,
    height: width * 0.18,
    resizeMode: "contain",
  },
  header: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.semiBold,  
    color: COLORS.dark,
    textAlign: "left",
    width: "60%",
    marginBottom: height * 0.03,
    marginTop: width * 1.1,
    marginRight: width * 0.25,
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bright,
    paddingVertical: height * 0.015,
    width: "85%",
    justifyContent: "flex-start",
  },
  flagIcon: {
    width: width * 0.1,
    height: height * 0.03,
    marginRight: width * 0.03,
  },
  phoneText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    width: "85%",
    backgroundColor: COLORS.border,
    marginBottom: height * 0.03,  
  },
  dividerText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.semiBold,  
    color: COLORS.gray,
    marginBottom: height * 0.05,  
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
    borderRadius: 19,
    width: "85%",
    justifyContent: "center",
    marginBottom: height * 0.03,
  },
  googleButton: {
    backgroundColor: COLORS.google,
  },
  facebookButton: {
    backgroundColor: COLORS.facebook,
    marginBottom: height * 0.18,
  },
  icon: {
    width: 22.95,
    height: 24.06,
    marginRight: width * 0.035,  
  },
  fbIcon: {
    width: 11.71,
    height: 24.06,
    marginRight: width * 0.035,  
  },
  socialText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.semiBold,  
    color: COLORS.light,
  },
});

export default IntroScreen;