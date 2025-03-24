import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CategoryButton from "@/components/CategoryButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{ display: "flex", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: "80%",
            margin: 20,
            padding: 20,
            paddingHorizontal: 30,
            gap: 40,
            borderRadius: 20,
            borderColor: "#0B4F6C",
            shadowColor: "#0B4F6C",
            elevation: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FontAwesome5 name="search" size={24} color="black" />
          <Text style={{ fontSize: 18 }}>Search anywhere</Text>
        </TouchableOpacity>
      </View>
      <Text>Categories</Text>
      <View style={styles.buttonsContainer}>
        <CategoryButton title="studio" />
        <CategoryButton title="cabin" />
        <CategoryButton title="condo" />
        <CategoryButton title="villa" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
});
