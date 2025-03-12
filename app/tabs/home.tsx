import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";
import { useCart } from "../cartContext"; 

const { width, height } = Dimensions.get("window");
const generateUniqueId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random()}`;

const bestSelling = [
  { id: "1", name: "Red Pepper", price: 4.99, image: IMAGES.redpepper },
  { id: "2", name: "Ginger", price: 4.99, image: IMAGES.ginger },
];

const groceries = [
  { id: "3", name: "Beef Bone", price: 4.99, image: IMAGES.beef },
  { id: "4", name: "Broiler Chicken", price: 4.99, image: IMAGES.chicken },
];

const exclusiveOffers = [
  { id: "5", name: "Organic Bananas", price: 4.99, image: IMAGES.banana },
  { id: "6", name: "Red Apple", price: 4.99, image: IMAGES.apple },
];

const groceryCategories = [
  { id: "7", name: "Pulses", image: IMAGES.pulses, backgroundColor: "#FCEFD3" },
  { id: "8", name: "Rice", image: IMAGES.rice, backgroundColor: "#E6F4E6" },
];

const HomeScreen = () => {
  const router = useRouter();
  const { addToCart } = useCart(); 

  const renderProduct = ({ item }: { item: { id: string; name: string; price: number; image: any } }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={() => router.push(`/productdetail`)}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productWeight}>1kg, Price</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => addToCart({
          id: generateUniqueId(item.name),
          name: item.name,
          description: "1kg, Price", 
          price: item.price, 
          image: item.image,
          quantity: 1,
        })}>
        <Image source={IMAGES.addButton} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderCategory = ({ item }: { item: { id: string; name: string; image: any; backgroundColor: string } }) => (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Image source={IMAGES.clogo} style={styles.logo} />

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={25} color={COLORS.textDark} />
          <Text style={styles.locationText}>Lagos, South West</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={COLORS.textGray} />
          <TextInput style={styles.searchBox} placeholder="Search Store" />
        </View>

        <Image source={IMAGES.banner} style={styles.featuredImage} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={exclusiveOffers}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={bestSelling}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={groceryCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        <FlatList
          data={groceries}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bright,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.1,
    paddingHorizontal: width * 0.05,
  },
  logo: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: height * 0.01,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.02,
  },
  locationText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightgray,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: height * 0.06,
  },
  searchBox: {
    flex: 1,
    fontSize: SIZES.body,
    marginLeft: 10,
  },
  featuredImage: {
    width: "100%",
    height: height * 0.19,
    resizeMode: "contain",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontFamily: FONTS.semiBold,
  },
  seeAll: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  categoryList: {
    marginBottom: height * 0.02,
  },
  categoryCard: {
    flexDirection: "row", 
    alignItems: "center",
    width: width * 0.6,
    padding: 15,
    borderRadius: 10,
    justifyContent: "flex-start",
    marginRight: 10,
  },
  categoryImage: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: "contain",
    marginRight: 10, 
  },
  categoryName: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
  },
  productContainer: {
    width: width * 0.43,
    backgroundColor: COLORS.light,
    borderRadius: 18,
    padding: 15,
    marginRight: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  productImage: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "contain",
  },
  productName: {
    fontSize: SIZES.body,
    fontFamily: FONTS.medium,
    marginTop: 5,
    textAlign: "left",
  },
  productWeight: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
  },
  productPrice: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.semiBold,
    marginTop: 25,
    color: COLORS.dark,
    textAlign: "left",
    marginRight: 70,
  },
  plusButton: {
    position: "absolute",
    right: 12,
    bottom: 7,
    width: 40,
    height: 40,
  },
  plusIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default HomeScreen;