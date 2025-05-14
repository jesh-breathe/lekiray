import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import TabBar from "@/components/TabBar";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading indicator if not loaded
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  // Render tabs if signed in
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
