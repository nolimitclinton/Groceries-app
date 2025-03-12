import { Tabs } from "expo-router";
import { Image } from "react-native";
import { COLORS } from "assets/styles/theme";
import { IMAGES } from "assets/images"; 

export default function BottomTabs() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const icons: { [key: string]: any } = {
            home: focused ? IMAGES.shopActive : IMAGES.shopInactive,
            explore: focused ? IMAGES.exploreActive : IMAGES.exploreInactive,
            cart: focused ? IMAGES.cartActive : IMAGES.cartInactive,
            favorites: focused ? IMAGES.favoriteActive : IMAGES.favoriteInactive,
            account: focused ? IMAGES.accountActive : IMAGES.accountInactive,
          };

          return <Image source={icons[route.name]} style={{ width: 24, height: 24, resizeMode: "contain" }} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textGray,
        tabBarStyle: { backgroundColor: COLORS.bright, height: 60, paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Shop" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
}