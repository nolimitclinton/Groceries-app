import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import BackgroundScreen from "../components/BackgroundScreen";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const zones = ["Lagos", "Port Harcourt", "Abuja", "Kaduna"];
const areas = ["South West", "South South", "North Central", "North East"];

const LocationScreen = () => {
  const router = useRouter();

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string[]>([]);
  const [modalType, setModalType] = useState<"zone" | "area">("zone");

  const openModal = (type: "zone" | "area") => {
    setModalData(type === "zone" ? zones : areas);
    setModalType(type);
    setModalVisible(true);
  };

  const selectItem = (item: string) => {
    if (modalType === "zone") {
      setSelectedZone(item);
    } else {
      setSelectedArea(item);
    }
    setModalVisible(false);
  };

  return (
    <BackgroundScreen
      useImageBackground={true}
      buttonText="Submit"
      buttonPosition={0.0}
      onButtonPress={() => router.push("/signup")}
      onBack={() => router.back()}
    >
      <View style={styles.container}>
        <Image source={IMAGES.location} style={styles.image} />

        <Text style={styles.header}>Select Your Location</Text>
        <Text style={styles.description}>
          Switch on your location to stay in tune with what’s happening in your area
        </Text>

        <View style={styles.inputContainer}>
     
          <Text style={styles.label}>Your Zone</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => openModal("zone")}>
            <Text style={styles.dropdownText}>
              {selectedZone ? selectedZone : "Select your zone"}
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color={COLORS.textDark} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={{ marginTop: height * 0.015 }} />

          <Text style={styles.label}>Your Area</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => openModal("area")}>
            <Text style={styles.dropdownText}>
              {selectedArea ? selectedArea : "Types of your area"}
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color={COLORS.textDark} />
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === "zone" ? "Select Your Zone" : "Select Your Area"}
            </Text>
            <FlatList
              data={modalData}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.45,
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
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginBottom: height * 0.005,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: height * 0.02,
  },
  dropdownText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.border,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: COLORS.bright,
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: height * 0.02,
  },
  modalItem: {
    width: "100%",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  modalItemText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  modalClose: {
    marginTop: height * 0.02,
    padding: height * 0.015,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    color: COLORS.bright,
  },
});

export default LocationScreen;