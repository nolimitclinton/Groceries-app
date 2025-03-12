import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Dimensions, 
  Modal,
  SafeAreaView
} from "react-native";
import { useCart } from "../cartContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { useRouter } from "expo-router";
import { IMAGES } from "~/assets/images";
const { width, height } = Dimensions.get("window");

const CartScreen = () => {
  const { cart, totalCost, updateQuantity, removeFromCart } = useCart();
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        extraData={cart}
        renderItem={({ item }) => (
          <>
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.productImage} />

              <View style={styles.productDetailsContainer}>
                <View style={styles.productNameContainer}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Ionicons name="close" size={20} color={COLORS.textGray} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.productDescription}>{item.description}</Text>

                <View style={styles.quantityPriceContainer}>
                  <View style={styles.quantityControls}>
                    <View style={styles.quantityButtonContainer}>  
                      <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, item.quantity - 1)} 
                        style={styles.quantityButton}
                      >
                        <Ionicons name="remove-outline" size={20} color={COLORS.textDark} />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.quantityText}>{item.quantity} </Text>
                    
                    <View style={styles.quantityButtonContainer}>  
                      <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, item.quantity + 1)} 
                        style={styles.quantityButton} 
                      >
                        <Ionicons name="add-outline" size={20} color={COLORS.primary} />
                      </TouchableOpacity> 
                    </View> 
                  </View>

                  <Text style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />
          </>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.checkoutButtonContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => setCheckoutVisible(true)}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalCostBadge}>
            <Text style={styles.checkoutPrice}>${totalCost.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={isCheckoutVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setCheckoutVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Delivery</Text>
              <View style={styles.modalOptionRight}>
                <Text style={styles.modalOptionSubText}>Select Method</Text>
                <Image source={IMAGES.forward} style={styles.forwardArrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Payment</Text>
              <View style={styles.modalOptionRight}>
                <Image source={IMAGES.cardImage} style={styles.cardImage} />
                <Image source={IMAGES.forward} style={styles.forwardArrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Promo Code</Text>
              <View style={styles.modalOptionRight}>
                <Text style={styles.modalOptionSubText}>Pick discount</Text>
                <Image source={IMAGES.forward} style={styles.forwardArrow} />
              </View>
            </TouchableOpacity>

            <View style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Total Cost</Text>
              <View style={styles.modalOptionRight}>
                <Text style={[styles.modalOptionSubText, styles.boldText]}>
                  ${totalCost.toFixed(2)}
                </Text>
                <Image source={IMAGES.forward} style={styles.forwardArrow} />
              </View>
            </View>

            <Text style={styles.termsText}>
              By placing an order you agree to our <Text style={styles.termsBold}>Terms And Conditions</Text>
            </Text>
            <TouchableOpacity 
              style={styles.placeOrderButton} 
              onPress={() => {
                setCheckoutVisible(false); 
                router.push("/placeorder"); 
              }}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { 
    fontSize: SIZES.h2, 
    fontFamily: FONTS.bold, 
    color: COLORS.textDark,
  },
  listContainer: {
    paddingBottom: height * 0.15,
  },
  cartItem: {
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
  productDetailsContainer: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  productNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  productDescription: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginTop: 5,
  },
  quantityPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButtonContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.light,
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    paddingHorizontal: 5,
  },
  quantityText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
    marginLeft: 15,
  },
  productPrice: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: width * 0.05,
  },
  checkoutButtonContainer: {
    position: "absolute",
    bottom: height * 0.02,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9,
  },
  checkoutText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
    color: COLORS.bright,
  },
  totalCostBadge: {
    backgroundColor: COLORS.checkoutprice,
    borderRadius: 4,
    paddingHorizontal: width * 0.03,
    paddingVertical: 5,
  },
  checkoutPrice: {
    fontSize: SIZES.h6,
    color: COLORS.light,
    fontFamily: FONTS.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.bright,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalOptionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
  },
  modalOptionSubText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
    marginRight: width * 0.02,
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h3,
  },
  termsText: { 
    textAlign: "center", 
    marginTop: 10,
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textGray,
  },
  termsBold: { 
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  placeOrderButton: { 
    backgroundColor: COLORS.primary, 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center",
    marginTop: 20,
  },
  placeOrderText: { 
    color: COLORS.bright, 
    fontSize: SIZES.h3, 
    fontFamily: FONTS.bold,
  },
  forwardArrow: {
    width: width * 0.03,
    height: width * 0.03,
    resizeMode: "contain",
  },
  cardImage: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: "contain",
  },
});

export default CartScreen;