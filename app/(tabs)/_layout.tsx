import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import TabBar from "@/components/TabBar";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return;
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator />
  </View>;
  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: "Explore", headerShown: false }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{ title: "Wishlist", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
}
