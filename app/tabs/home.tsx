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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../authentication/productSlice"; 
import { Product } from "../authentication/productSlice";
import { RootState } from "../authentication/store";
import { AppDispatch } from "../authentication/store"; 
import { addToCart } from "../authentication/cartSlice"; 

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const generateUniqueId = (prefix = 'item') => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const exclusiveOffers = products.slice(0, 5);
  const bestSelling = products.slice(5, 10);
  const groceries = products.slice(10, 15);

  const groceryCategories = [
    { id: "7", name: "Pulses", image: IMAGES.pulses, backgroundColor: "#FCEFD3" },
    { id: "8", name: "Rice", image: IMAGES.rice, backgroundColor: "#E6F4E6" },
  ];

  const renderProduct = ({ item }: { item: Product }) => {
    const imageSource = typeof item.image === 'string' 
      ? { uri: item.image } 
      : item.image;
    
    return (
      <View style={styles.productContainer}>
        <TouchableOpacity 
          onPress={() => router.push({ pathname: "/productdetail", params: { productId: item.id }})}  
          activeOpacity={0.8}
        >
          <Image 
            source={imageSource}
            style={styles.productImage}
            defaultSource={IMAGES.flag} 
          />
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.productWeight} numberOfLines={1} ellipsizeMode="tail">
            {item.category}
          </Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.plusButton}
          activeOpacity={0.8}
          onPress={() => dispatch(addToCart({
            id: generateUniqueId("cart"),
            productId: item.id,
            name: item.title,
            description: item.description,
            price: item.price,
            image: typeof item.image === "string" ? item.image : Image.resolveAssetSource(item.image).uri,
            quantity: 1,
          }))}
        >
          <Image source={IMAGES.addButton} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategory = ({ item }: { item: { id: string; name: string; image: any; backgroundColor: string } }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}
      activeOpacity={0.8}
    >
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
          keyExtractor={(item) => item.id.toString()}
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
          keyExtractor={(item) => item.id.toString()}
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
          keyExtractor={(item) => item.id.toString()}
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