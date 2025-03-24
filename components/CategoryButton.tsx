import React from "react";
import {
  StyleSheet,
  View,
  Button,
  GestureResponderEvent,
  Alert,
} from "react-native";

const CategoryButton = ({ title }) => {
  function alert() {}

  return (
    <View style={styles.button}>
      <Button
        onPress={alert}
        title={title}
        color="#2D2D2D"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
  },
});

export default CategoryButton;
