import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const LocationScreen = () => {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState("Lagos");
  const [selectedArea, setSelectedArea] = useState("");

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
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedZone}
              onValueChange={(itemValue) => setSelectedZone(itemValue)}
              style={styles.picker}
              mode={Platform.OS === "ios" ? "dropdown" : "dialog"} 
            >
              <Picker.Item label="Lagos" value="Lagos" />
              <Picker.Item label="Port Harcourt" value="Port Harcourt" />
              <Picker.Item label="Abuja" value="Abuja" />
              <Picker.Item label="Kaduna" value="Kaduna" />
            </Picker>
          </View>
        </View>

  
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Your Area</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedArea}
              onValueChange={(itemValue) => setSelectedArea(itemValue)}
              style={styles.picker}
              mode={Platform.OS === "ios" ? "dropdown" : "dialog"}
            >
              <Picker.Item label="Types of your area" value="" />
              <Picker.Item label="South West" value="South West" />
              <Picker.Item label="South South" value="South South" />
              <Picker.Item label="North Central" value="North Central" />
              <Picker.Item label="North East" value="North East" />
            </Picker>
          </View>
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
    paddingHorizontal: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
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
    marginBottom: height * 0.04,
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: height * 0.06,
    width: "100%",
  },
  button: {
    backgroundColor: "#53B175",
    paddingVertical: height * 0.02,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "#fff",
    fontFamily: "Gilroy-Medium",
  },
});

export default LocationScreen;