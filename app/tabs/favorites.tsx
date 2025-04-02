import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import { useCart } from "../cartContext"; 

const { width, height } = Dimensions.get("window");
const generateUniqueId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random()}`;

const favorites = [
  { id: "1", name: "Sprite Can", description: "325ml, Price", price: 1.50, image: IMAGES.sprite },
  { id: "2", name: "Diet Coke", description: "355ml, Price", price: 1.99, image: IMAGES.dietcoke },
  { id: "3", name: "Apple & Grape Juice", description: "2L, Price", price: 15.50, image: IMAGES.applegrape },
  { id: "4", name: "Coca Cola Can", description: "325ml, Price", price: 4.99, image: IMAGES.cocacola },
  { id: "5", name: "Pepsi Can", description: "330ml, Price", price: 4.99, image: IMAGES.pepsi },
];

const FavoritesScreen = () => {
  const router = useRouter();
  const { addToCart } = useCart(); 

  const handleAddAllToCart = () => {
    favorites.forEach((item) => {
      addToCart({ ...item, id: generateUniqueId(item.name),quantity: 1 }); 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text> 
      </View>

      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity style={styles.favoriteItem} activeOpacity={0.8}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
              </View>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <Ionicons name="chevron-forward-outline" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
            <View style={styles.divider} />
          </>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8} onPress={handleAddAllToCart}>
        <Text style={styles.buttonText}>Add All To Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.bright 
  },
  header: { 
    alignItems: "center",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { 
    fontSize: SIZES.h2, 
    fontFamily: FONTS.bold, 
    color: COLORS.textDark,
  },
  iconButton: {
    padding: 10,
  },
  listContainer: {
    paddingBottom: height * 0.15,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  productImage: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  productName: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    paddingVertical: height * 0.015,
  },
  productDescription: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
  },
  productPrice: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    marginRight: width * 0.03,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: width * 0.05,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: height * 0.02,
    left: 0,
    right: 0,
  },
  buttonText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
    color: COLORS.bright,
  },
});

export default FavoritesScreen;