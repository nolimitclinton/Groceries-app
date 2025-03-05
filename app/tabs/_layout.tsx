
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "assets/styles/theme";
import{Tabs} from "expo-router"

export default function BottomTabs() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
            home: "storefront-outline",
            explore: "search-outline",
            cart: "cart-outline",
            favorites: "heart-outline",
            account: "person-outline",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textGray,
        tabBarStyle: { backgroundColor: COLORS.bright, height: 60, paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options = {{title: "Shop"}}/>
      <Tabs.Screen name="explore"options = {{title: "Explore"}}/>
      <Tabs.Screen name="cart" options = {{title: "Cart"}}/>
      <Tabs.Screen name="favorites" options = {{title: "Favorites"}} />
      <Tabs.Screen name="account" options = {{title: "Account"}}/>
    </Tabs>
  );
}