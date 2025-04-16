import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "~/assets/images";
import { logout } from "../authentication/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router"; 
import { persistor } from "../authentication/store";

const { width, height } = Dimensions.get("window");

const AccountScreen = () => {
  const profileImageUri = "https://pbs.twimg.com/profile_images/1719429222320443393/I41tGdR8_400x400.jpg";
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await persistor.purge();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const options = [
    { id: "orders", label: "Orders", image: IMAGES.orders },
    { id: "details", label: "My Details", image: IMAGES.detailsicon },
    { id: "address", label: "Delivery Address", image: IMAGES.deliveryicon },
    { id: "payment", label: "Payment Methods", image: IMAGES.payment },
    { id: "promo", label: "Promo Code", image: IMAGES.promo },
    { id: "notifications", label: "Notifications", image: IMAGES.bell },
    { id: "help", label: "Help", image: IMAGES.helpicon },
    { id: "about", label: "About", image: IMAGES.about },
  ];

  return (
    <View style={styles.container}>
     
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Clinton Onuoha</Text>
          <Text style={styles.userEmail}>onuohaclinton7@gmail.com</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.optionsContainer}>
        {options.map((option) => (
          <View key={option.id} style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Image source={option.image} style={styles.optionIcon} resizeMode="contain" />
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
            <Image source={IMAGES.forward} style={styles.forwardIcon} resizeMode="contain" />
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
          <Image source={IMAGES.logout} style={styles.optionIcon} resizeMode="contain" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bright,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: height * 0.02,
    paddingTop: height * 0.08, 
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileImage: {
    width: height * 0.07,
    height: height * 0.07,
    borderRadius: height * 0.035, 
    marginRight: width * 0.04, 
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  userEmail: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginTop: height * 0.005,
  },
  optionsContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height * 0.02, 
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: height * 0.03, 
    height: height * 0.03, 
    marginRight: width * 0.04, 
  },
  optionText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  forwardIcon: {
    width: height * 0.02, 
    height: height * 0.02, 
    tintColor: COLORS.textGray,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    backgroundColor: COLORS.lightgray, 
    paddingVertical: height * 0.02, 
    marginTop: height * 0.04, 
    borderRadius: height * 0.01, 
    marginHorizontal: width * 0.01, 
  },
  logoutText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginLeft: width * 0.28, 
  },
});

export default AccountScreen;