import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="explore"
        options={{ title: "Explore", headerShown: false }}
      />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="wishlist" options={{ title: "Wishlist" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
