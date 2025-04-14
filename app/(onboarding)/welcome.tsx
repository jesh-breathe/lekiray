import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const welcome = () => {
  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View style={styles.imageContainer}>
        <Image source={require("@/assets/images/2.jpg")} style={styles.image} />
      </View>
      <Text
        style={{
          padding: 5,
          textTransform: "uppercase",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        find your dream home with <Text style={{ color: "red" }}>ease!</Text>
      </Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={{ fontSize: 19, color: "white" }}>
          Sign in with Google
        </Text>
        <FontAwesome6 name="google" size={18} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default welcome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 40,
  },
  imageContainer: {
    width: "100%",
    height: 500,
    padding: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    height: 50,
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    gap: 10,
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
