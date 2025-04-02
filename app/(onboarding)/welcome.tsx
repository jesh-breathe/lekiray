import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SignOutButton } from "@/components/SignOutButton";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

const welcome = () => {
  const { user } = useUser();
  return (
    <View>
      <Text>welcome</Text>
      <Link href="/(auth)/sign-in">Go to sign up</Link>
      <SignOutButton />
    </View>
  );
};

export default welcome;

const styles = StyleSheet.create({});
