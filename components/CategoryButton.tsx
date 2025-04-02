import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CategoryButton = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: selected ? "red" : "#2D2D2D" }]}
    >
      <Text style={[styles.buttonText, { color: "white" }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CategoryButton;
