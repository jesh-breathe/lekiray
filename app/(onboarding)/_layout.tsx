import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
const Layout = () => {
  // const { isSignedIn } = useAuth();
  // if (isSignedIn) {
  //   return <Redirect href={"/"} />;
  // }
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
