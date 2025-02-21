import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const IntroScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
      
        <Image source={require("assets/images/groceries.png")} style={styles.image} />
     
        <Image source={require("assets/images/logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.header}>Get your groceries with nectar</Text>

      <TouchableOpacity style={styles.phoneButton} onPress={() => router.push("/phone")}>
        <Image source={require("assets/images/flag.png")} style={styles.flagIcon} />
        <Text style={styles.phoneText}>+880</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <Text style={styles.dividerText}>Or connect with social media</Text>


      <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={() => console.log("Google Login")}>
        <Image source={require("assets/images/google-icon.png")} style={styles.icon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={() => console.log("Facebook Login")}>
        <Image source={require("assets/images/facebook-icon.png")} style={[styles.icon, styles.fbIcon]} />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: width * 1.2, 
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    position: "absolute",
    top: "5%", 
    right: "7%",
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  header: {
    fontSize: 26,
    fontFamily: "Gilroy-Bold",
    textAlign: "left",
    width: "80%",
    marginBottom: 20,
    marginTop: width * 1.1, 
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "85%",
    justifyContent: "flex-start",
  },
  flagIcon: {
    width: 34,
    height: 24,
    marginRight: 10,
  },
  phoneText: {
    fontSize: 18,
    fontFamily: "Gilroy-Medium",
  },
  divider: {
    height: 1,
    width: "85%",
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  dividerText: {
    fontSize: 14,
    fontFamily: "Gilroy-Regular",
    color: "#777",
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    width: "85%",
    justifyContent: "center",
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: "#5383EC",
  },
  facebookButton: {
    backgroundColor: "#4A66AC",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  fbIcon: {
    width: 15, 
    height: 28,
  },
  socialText: {
    fontSize: 18,
    fontFamily: "Gilroy-Regular",
    color: "#fff",
  },
});

export default IntroScreen;