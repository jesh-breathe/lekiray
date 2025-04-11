import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type ButtonProps = {
  label: string;
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  iconColor: string;
  texColor: string;
  onPress: () => void;
};
const CustomButton = (props: ButtonProps) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
        <Text
          style={{
            color: props.texColor,
            fontSize: 20,
            fontFamily: "poppins",
            letterSpacing: 1,
          }}
        >
          {props.label}
        </Text>
        <Ionicons name={props.name} size={props.size} color={props.iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    display: "flex",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    elevation: 10,
    boxShadow: "10",
    borderRadius: 9,
    gap: 15,
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
