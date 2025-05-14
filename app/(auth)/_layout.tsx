import { Redirect, Stack } from "expo-router";
import { useAuth, ClerkLoading } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load
  if (!isLoaded) return <ClerkLoading />;

  // If user is signed in, redirect to home
  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  // Show auth screens if not signed in
  return <Stack screenOptions={{ headerShown: false }} />;
}
