import { useRouter, useLocalSearchParams } from "expo-router"; 
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images"; 

const { width, height } = Dimensions.get("window");

const products = [
  { id: "1", name: "Diet Coke", description: "355ml, Price", price: "$1.99", image: IMAGES.dietcoke },
  { id: "2", name: "Sprite Can", description: "325ml, Price", price: "$1.50", image: IMAGES.sprite },
  { id: "3", name: "Apple & Grape Juice", description: "2L, Price", price: "$15.99", image: IMAGES.applegrape },
  { id: "4", name: "Orange Juice", description: "2L, Price", price: "$15.99", image: IMAGES.orangejuice },
  { id: "5", name: "Coca Cola Can", description: "325ml, Price", price: "$4.99", image: IMAGES.cocacola },
  { id: "6", name: "Pepsi Can", description: "330ml, Price", price: "$4.99", image: IMAGES.pepsi },
];

const BeveragesScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const category = params.category ? decodeURIComponent(params.category as string) : "Beverages";

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="options-outline" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.productsWrapper}>
        {products.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>

            <TouchableOpacity style={styles.plusButton}>
              <Image source={IMAGES.addButton} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: height * 0.1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    paddingBottom: height * 0.02,
  },
  headerTitle: { 
    fontSize: SIZES.h2, 
    fontFamily: FONTS.bold, 
    color: COLORS.textDark,
  },
  iconButton: {
    padding: 10,
  },
  productsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productContainer: {
    width: width * 0.43,
    backgroundColor: COLORS.light,
    borderRadius: 15,
    padding: 19,
    marginBottom: height * 0.02,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative", 
  },
  productImage: { 
    width: width * 0.3, 
    height: width * 0.3, 
    resizeMode: "contain" 
  },
  productName: { 
    fontSize: SIZES.body, 
    fontFamily: FONTS.bold, 
    textAlign: "left",
    marginTop: 10, 
  },
  productDescription: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    textAlign: "left",
    marginTop: 5,
  },
  productPrice: { 
    fontSize: SIZES.h3, 
    fontFamily: FONTS.semiBold, 
    color: COLORS.dark, 
    marginTop: 5, 
  },
  plusButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 40,
    height: 40,
  },
  plusIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default BeveragesScreen;