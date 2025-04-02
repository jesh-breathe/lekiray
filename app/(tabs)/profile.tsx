import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        />
        <Text style={styles.joinedText}>Joined 1 year ago</Text>
        <Text style={styles.nameText}>David</Text>
        <Text style={styles.surnameText}>Robinson</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <View style={styles.sectionIcon}>
            <Ionicons name="person-circle-outline" size={24} color="#FF6347" />
          </View>
          <Text style={styles.sectionText}>Manage user</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <View style={styles.sectionIcon}>
            <Ionicons name="notifications-outline" size={24} color="#8A2BE2" />
          </View>
          <Text style={styles.sectionText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <View style={styles.sectionIcon}>
            <Ionicons name="moon-outline" size={24} color="#1E90FF" />
          </View>
          <Text style={styles.sectionText}>Dark Mode</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  joinedText: {
    color: "gray",
    marginTop: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  surnameText: {
    fontSize: 24,
    color: "gray",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginRight: 10,
  },
  sectionText: {
    flex: 1,
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 20,
    alignItems: "center",
  },
  signOutText: {
    color: "#1E90FF",
    fontSize: 16,
  },
});

export default Profile;
