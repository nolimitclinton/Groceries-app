import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "~/assets/images";
import BackgroundScreen from "~/components/BackgroundScreen";
const { width, height } = Dimensions.get("window");

const PlaceOrder = () => {
  const router = useRouter();

  return (
    <BackgroundScreen
      useImageBackground={true} >
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={IMAGES.orderAccepted} style={styles.orderAcceptedImage} />
        <Text style={styles.title}>Your Order has been accepted</Text>
        <Text style={styles.subtitle}>
          Your items have been placed and are on their way to being processed
        </Text>

        <TouchableOpacity style={styles.trackOrderButton} >
          <Text style={styles.trackOrderText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backToHomeButton} onPress={() => router.push("/tabs/home")}>
          <Text style={styles.backToHomeText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  orderAcceptedImage: {
    width: width * 0.55,
    height: width * 0.55,
    resizeMode: "contain",
    marginBottom: height * 0.08,
  },
  title: {
    fontSize: SIZES.h0,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    textAlign: "center",
    marginBottom: height * 0.05,
  },
  trackOrderButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.25,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  trackOrderText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
    color: COLORS.bright,
  },
  backToHomeButton: {
    //borderWidth: 1,
    //borderColor: COLORS.primary,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    //borderRadius: 10,
  },
  backToHomeText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
});

export default PlaceOrder;