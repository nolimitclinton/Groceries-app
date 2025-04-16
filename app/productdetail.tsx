import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import { Ionicons } from "@expo/vector-icons";
import BackgroundScreen from "~/components/BackgroundScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./authentication/store";
import { addToCart } from "./authentication/cartSlice";
import { AppDispatch } from "./authentication/store";

const { width, height } = Dimensions.get("window");

const ProductDetailScreen = () => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  
  const products = useSelector((state: RootState) => state.products.items);
  
  const product = products.find(p => p.id === Number(productId));
  
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product?.price || 0);
  const [showDetails, setShowDetails] = useState(true);
  const [showNutrition, setShowNutrition] = useState(true);
  const [showReview, setShowReview] = useState(true);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity(prev => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    dispatch(addToCart({
      id: Date.now().toString(), 
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity,
      image: product.image,
      description: product.description,
    }));
    
    router.replace("/tabs/cart");
  };

  if (!product) {
    return (
      <BackgroundScreen
        useImageBackground={false}
        onBack={() => router.back()}
      >
        <View style={styles.container}>
          <Text>Product not found</Text>
        </View>
      </BackgroundScreen>
    );
  }

  return (
    <BackgroundScreen
      useImageBackground={false}
      buttonText="Add to Basket"
      onButtonPress={handleAddToCart}
      buttonPosition={0.0}
      onBack={() => router.back()}
      headerButtonImage={IMAGES.share}
      onHeaderButtonPress={() => console.log("Share Clicked")}
    >
      <View style={styles.imageContainer}>
      <Image
  source={
    typeof product.image === "string"
      ? { uri: product.image }
      : product.image
  }
  style={styles.productImage}
/>
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{product.title}</Text>
          <TouchableOpacity style={styles.favoriteIcon}>
            <Ionicons name="heart-outline" size={28} color={COLORS.textGray} />
          </TouchableOpacity>
        </View>
        <Text style={styles.productDescription}>{product.category}</Text>

        <View style={styles.quantityPriceContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => handleQuantityChange("decrease")}
            >
              <Ionicons name="remove-outline" size={25} color={COLORS.textGray} />
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => handleQuantityChange("increase")}
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
        {showDetails && <Text style={styles.productdetail}>{product.description}</Text>}

        <View style={styles.divider} />
        <TouchableOpacity style={styles.sectionHeader} onPress={() => setShowNutrition(!showNutrition)}>
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
        <TouchableOpacity style={styles.sectionHeader} onPress={() => setShowReview(!showReview)}>
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
    paddingBottom: height * 0.15, 
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.bright,
    marginTop: height * 0.40,
    //paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.1,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width: width,
    height: height * 0.4, 
    backgroundColor: COLORS.lightgray, 
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  productImage: {
    width: width * 0.8,
    height: height * 0.35,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bright,
    marginTop: height * 0.38,
    paddingHorizontal: width * 0.01,
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
  productDescription: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    textAlign: "left",
    width: "100%",
    color: COLORS.textGray,
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