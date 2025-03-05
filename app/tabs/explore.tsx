import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router"; 
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";
import { IMAGES } from "assets/images";

const { width, height } = Dimensions.get("window");

const categories = [
  { id: "1", name: "Fresh Fruits & Vegetables", image: IMAGES.fruits, backgroundColor: "#53B1751A", borderColor: "#53B175" },
  { id: "2", name: "Cooking Oil & Ghee", image: IMAGES.oil, backgroundColor: "#F8A44C1A", borderColor: "#F8A44C" },
  { id: "3", name: "Meat & Fish", image: IMAGES.meat, backgroundColor: "#F7A59340", borderColor: "#F7A593" },
  { id: "4", name: "Bakery & Snacks", image: IMAGES.bakery, backgroundColor: "#D3B0E040", borderColor: "#D3B0E0" },
  { id: "5", name: "Dairy & Eggs", image: IMAGES.dairy, backgroundColor: "#FDE59840", borderColor: "#FDE598" },
  { id: "6", name: "Beverages", image: IMAGES.beverages, backgroundColor: "#B7DFF540", borderColor: "#B7DFF5" },
  { id: "7", name: "Frozen Foods", image: IMAGES.fruits, backgroundColor: "#836AF626", borderColor: "#836AF6" },
  { id: "8", name: "Organic Produce", image: IMAGES.fruits, backgroundColor: "#D73B7726", borderColor: "#D73B77" },
];

const ExploreScreen = () => {
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    router.push(`/beveragescreen?category=${encodeURIComponent(category)}`); 
  };
  const renderCategory = ({ item }: { item: { id: string; name: string; image: any; backgroundColor: string; borderColor: string } }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.backgroundColor, borderColor: item.borderColor }]}
      onPress={() => handleCategoryPress(item.name)} 
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Find Products</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={COLORS.textGray} />
          <TextInput style={styles.searchBox} placeholder="Search Store" />
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bright,
  },
  scrollContainer: {
    paddingBottom: height * 0.1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  header: {
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightgray,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: height * 0.06,
    marginBottom: height * 0.03,
  },
  searchBox: {
    flex: 1,
    fontSize: SIZES.body,
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: height * 0.1,
  },
  row: {
    justifyContent: "space-between",
  },
  categoryCard: {
    width: width * 0.43,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: height * 0.02,
    borderWidth: 1.5,
  },
  categoryImage: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: "contain",
    marginBottom: 10,
  },
  categoryName: {
    fontSize: SIZES.body,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
});

export default ExploreScreen;