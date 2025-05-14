import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { user, isLoaded } = useUser(); // Use Clerk's user hook
  const { signOut } = useClerk(); // Clerk sign-out function

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.imageUrl) {
      setProfileImage(user.imageUrl);
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profileImage || "https://via.placeholder.com/150" }}
          style={styles.profilePic}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user?.fullName}</Text>
          <Text style={styles.email}>
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    paddingTop: 50,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginTop: 30,
  },
  signOutText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
});
