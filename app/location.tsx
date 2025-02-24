import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

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
        
        <Image source={require("assets/images/location.png")} style={styles.image} />

        <Text style={styles.header}>Select Your Location</Text>
        <Text style={styles.description}>
          Switch on your location to stay in tune with what’s happening in your area
        </Text>

        <View style={styles.dropdownContainer}>
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

        <View style={styles.dropdownContainer}>
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
    fontSize: width * 0.06,
    fontFamily: "Gilroy-Bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Regular",
    textAlign: "center",
    color: "#777",
    marginBottom: height * 0.03,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: height * 0.03,
    
  },
  label: {
    fontSize: width * 0.045,
    fontFamily: "Gilroy-Medium",
    color: "#777",
    marginBottom: height * 0.005,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: height * 0.06,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  dropDownText: {
    fontSize: width * 0.04,
    fontFamily: "Gilroy-Medium",
    color: "#000",
  },
  button: {
    backgroundColor: "#53B175",
    paddingVertical: height * 0.02,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "#fff",
    fontFamily: "Gilroy-Medium",
  },
});

export default LocationScreen;