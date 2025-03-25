import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import BackgroundScreen from "~/components/BackgroundScreen";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import { useCart } from "./cartContext";

const { width, height } = Dimensions.get("window");
const generateUniqueId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random()}`;

const products = [
  { id: "1", name: "Diet Coke", description: "355ml, Price", price: 1.99, image: IMAGES.dietcoke },
  { id: "2", name: "Sprite Can", description: "325ml, Price", price: 1.5, image: IMAGES.sprite },
  { id: "3", name: "Apple & Grape Juice", description: "2L, Price", price: 15.99, image: IMAGES.applegrape },
  { id: "4", name: "Orange Juice", description: "2L, Price", price: 15.99, image: IMAGES.orangejuice },
  { id: "5", name: "Coca Cola Can", description: "325ml, Price", price: 4.99, image: IMAGES.cocacola },
  { id: "6", name: "Pepsi Can", description: "330ml, Price", price: 4.99, image: IMAGES.pepsi },
];

const BeveragesScreen = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const params = useLocalSearchParams();
  const category = params.category ? decodeURIComponent(params.category as string) : "Beverages";

  return (
    <BackgroundScreen
      onBack={() => router.back()}
      headerButtonImage={IMAGES.filter}
      onHeaderButtonPress={() => console.log("Filter Clicked")}
      headerText={category}
    >
      <View style={styles.productsWrapper}>
        {products.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.textContainer}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <View style={styles.priceButtonContainer}>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => addToCart({ ...item, id: generateUniqueId(item.name), quantity: 1 })}
              >
                <Image source={IMAGES.addButton} style={styles.plusIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  productsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.02,
    paddingTop: height * 0.12, 
  },
  productContainer: {
    width: width * 0.42,
    backgroundColor: COLORS.bright,
    borderRadius: 15,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: "contain",
    alignSelf: "center",
  },
  textContainer: {
    height: height * 0.08, 
    justifyContent: "center",
    marginTop: 10,
  },
  productName: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    color: COLORS.dark,
    //marginBottom: 5,
  },
  productDescription: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginTop: 5,
  },
  priceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  productPrice: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.semiBold,
    color: COLORS.dark,
  },
  plusButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default BeveragesScreen;