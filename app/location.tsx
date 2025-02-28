import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";

const { width, height } = Dimensions.get("window");

const LocationScreen = () => {
  const router = useRouter();

  const [openZone, setOpenZone] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [zones, setZones] = useState([
    { label: "Lagos", value: "Lagos" },
    { label: "Port Harcourt", value: "Port Harcourt" },
    { label: "Abuja", value: "Abuja" },
    { label: "Kaduna", value: "Kaduna" },
  ]);

  const [openArea, setOpenArea] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [areas, setAreas] = useState([
    { label: "South West", value: "South West" },
    { label: "South South", value: "South South" },
    { label: "North Central", value: "North Central" },
    { label: "North East", value: "North East" },
  ]);

  return (
    <BackgroundScreen onBack={() => router.back()}>
      <View style={styles.container}>
        
        <Image source={IMAGES.location} style={styles.image} />

        <Text style={styles.header}>Select Your Location</Text>
        <Text style={styles.description}>
          Switch on your location to stay in tune with what’s happening in your area
        </Text>

        <View style={[styles.dropdownWrapper, { zIndex: openZone ? 2000 : 1 }]}>
          <Text style={styles.label}>Your Zone</Text>
          <DropDownPicker
            open={openZone}
            value={selectedZone}
            items={zones}
            setOpen={setOpenZone}
            setValue={setSelectedZone}
            setItems={setZones}
            placeholder="Select your zone"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropDownText}
          />
        </View>

        <View style={[styles.dropdownWrapper, { zIndex: openArea ? 2000 : 1 }]}>
          <Text style={styles.label}>Your Area</Text>
          <DropDownPicker
            open={openArea}
            value={selectedArea}
            items={areas}
            setOpen={setOpenArea}
            setValue={setSelectedArea}
            setItems={setAreas}
            placeholder="Select your area"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropDownText}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
  image: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: "contain",
    marginBottom: height * 0.03,
  },
  header: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.bold,
    textAlign: "center",
    color: COLORS.textDark,
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    textAlign: "center",
    color: COLORS.textGray,
    marginBottom: height * 0.03,
  },
  dropdownWrapper: {
    width: "100%",
    marginBottom: height * 0.03,
    overflow: "visible", 
  },
  label: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: height * 0.005,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.bright,
    height: height * 0.06,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.bright,
  },
  dropDownText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  buttonText: {
    fontSize: SIZES.h3,
    color: COLORS.bright,
    fontFamily: FONTS.semiBold,
  },
});

export default LocationScreen;