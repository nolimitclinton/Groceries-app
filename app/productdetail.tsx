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

const { width, height } = Dimensions.get("window");

const product = {
  name: "Natural Red Apple",
  price: "$4.99",
  image: IMAGES.apple,
  description: "Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.",
};

const ProductDetailScreen = () => {
  const router = useRouter();

  const [showDetails, setShowDetails] = useState(true);
  const [showNutrition, setShowNutrition] = useState(true);
  const [showReview, setShowReview] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="share-outline" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <Image source={product.image} style={styles.productImage} />

      <View style={styles.productHeader}>
        <Text style={styles.productName}>{product.name}</Text>
        <TouchableOpacity style={styles.favoriteIcon}>
          <Ionicons name="heart-outline" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.quantityPriceContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Ionicons name="remove-outline" size={25} color={COLORS.textGray} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>1</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Ionicons name="add-outline" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>{product.price}</Text>
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
      {showDetails && <Text style={styles.productDescription}>{product.description}</Text>}
      
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setShowNutrition(!showNutrition)}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.sectionTitle}>Nutritions</Text>
          <Ionicons
            name={showNutrition ? "chevron-forward-outline" : "chevron-down-outline"}
            size={20}
            color={COLORS.textDark}
          />
        </View>
      </TouchableOpacity>
      {showNutrition && (
        <View style={styles.nutritionContainer}>
          <Text style={styles.nutritionText}>100gr</Text>
        </View>
      )}

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

      <TouchableOpacity 
  style={styles.addToBasketButton} 
  onPress={() => router.replace("/tabs/explore")} 
>
  <Text style={styles.buttonText}>Add To Basket</Text>
</TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bright,
    paddingHorizontal: width * 0.05,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: height * 0.05,
  },
  iconButton: {
    padding: 10,
  },
  productImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
    marginTop: height * 0.02,
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
  quantityButton: {
    borderRadius: 5,
    padding: 10,
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
    height: 0.5,
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
    fontSize: SIZES.h5,
    fontFamily: FONTS.medium,
    textAlign: "left",
    width: "100%",
    color: COLORS.textGray,
    marginTop: height * 0.01,
  },
  nutritionContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  nutritionText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  starContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  addToBasketButton: {
    marginTop: height * 0.09,
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: SIZES.h3,
    color: COLORS.bright,
    fontFamily: FONTS.semiBold,
  },
});

export default ProductDetailScreen;