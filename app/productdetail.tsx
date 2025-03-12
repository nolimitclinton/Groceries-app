import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import { Ionicons } from "@expo/vector-icons";
import BackgroundScreen from "~/components/BackgroundScreen";
import { useCart } from "./cartContext";

const { width, height } = Dimensions.get("window");

const product = {
  id: "10",
  name: "Natural Red Apple",
  description:"1kg, Price",
  price: 4.99,
  image: IMAGES.apple,
  productdetail: "Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.",
};

const ProductDetailScreen = () => {
  const router = useRouter();
  const { addToCart, updateQuantity } = useCart(); 

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const [showDetails, setShowDetails] = useState(true);
  const [showNutrition, setShowNutrition] = useState(true);
  const [showReview, setShowReview] = useState(true);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
      setTotalPrice((prev) => prev + product.price);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
    }
  };

  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      description: product.description,
    });
    router.replace("/tabs/cart");
  };
  return (
    <BackgroundScreen useImageBackground={false} buttonText="Add to Basket" onButtonPress={handleAddToCart} buttonPosition={0.05} onBack={() => router.back()} headerButtonImage={IMAGES.share} onHeaderButtonPress={() => console.log("Share Clicked")}
    >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      <Image source={product.image} style={styles.productImage} />

      <View style={styles.productHeader}>
        <Text style={styles.productName}>{product.name}</Text>
        <TouchableOpacity style={styles.favoriteIcon}>
          <Ionicons name="heart-outline" size={28} color={COLORS.textGray} />
        </TouchableOpacity>
      </View>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.quantityPriceContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange("decrease")}>
            <Ionicons name="remove-outline" size={25} color={COLORS.textGray} />
          </TouchableOpacity>
          <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
          <TouchableOpacity style={styles.quantityButton}onPress={() => handleQuantityChange("increase")}
              >
            <Ionicons name="add-outline" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>${totalPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowDetails(!showDetails)}
      >
        <Text style={styles.sectionTitle}>Product Detail</Text>
        <Ionicons
          name={showDetails ? "chevron-down-outline" : "chevron-forward-outline"}
          size={20}
          color={COLORS.textDark}
        />
      </TouchableOpacity>
      {showDetails && <Text style={styles.productdetail}>{product.productdetail}</Text>}
      
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowNutrition(!showNutrition)}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.sectionTitle}>Nutritions</Text>
          <View style={styles.nutritionBox}>
            <Text style={styles.nutritionText}>100gr</Text>
          </View>
          <Ionicons
            name={showNutrition ? "chevron-forward-outline" : "chevron-down-outline"}
            size={20}
            color={COLORS.textDark}
          />
        </View>
      </TouchableOpacity>
      

       <View style={styles.divider} />
       <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowReview(!showReview)}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.sectionTitle}>Review</Text>
          <View style={styles.starContainer}>
            {[...Array(5)].map((_, index) => (
              <Ionicons key={index} name="star" size={20} color={COLORS.star} />
            ))}
          </View>
          <Ionicons
            name={showReview ? "chevron-forward-outline" : "chevron-down-outline"}
            size={20}
            color={COLORS.textDark}
          />
        </View>
      </TouchableOpacity>

      
    </View>
    </ScrollView>
  </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bright,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    //marginTop: height * 0.05,
  },
  iconButton: {
    marginLeft: height * 0.36,
    //marginBottom: height * 0,
  },
  productImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
    //marginTop: height * 0.02,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  productName: {
    fontSize: SIZES.h4,
    fontFamily: FONTS.bold,
    flex: 1,
  },
  favoriteIcon: {
    padding: 10,
  },
  quantityPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityBox: {
    width: height * 0.052,
    height: height * 0.05,
    backgroundColor: COLORS.bright,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.buttonborder,
  },
  quantityButton: {
    borderRadius: 5,
    padding: 1,
  },
  quantityText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
  },
  productPrice: {
    fontSize: SIZES.h4,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  divider: {
    width: "100%",
    height: height * 0.0008,
    backgroundColor: COLORS.border,
    marginVertical: height * 0.014,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: height * 0.02,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: SIZES.body,
    fontFamily: FONTS.semiBold,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  productDescription: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    textAlign: "left",
    width: "100%",
    color: COLORS.textGray,
  },
  productdetail: {
    fontSize: SIZES.h5,
    fontFamily: FONTS.medium,
    textAlign: "left",
    width: "100%",
    color: COLORS.textGray,
    marginTop: height * 0.01,
  },
  nutritionBox: {
    width: height * 0.04,
    height: height * 0.02,
    backgroundColor: COLORS.lightgray,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.buttonborder,
    marginLeft: height * 0.24,
  },
  nutritionText: {
    fontSize: SIZES.extrasmall,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
  },
  starContainer: {
    flexDirection: "row",
    marginLeft: 170,
  },
 
});

export default ProductDetailScreen;