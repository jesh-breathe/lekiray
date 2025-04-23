import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export const properties = [
  {
    id: 1,
    title: "El Naranjo, Guatemala",
    location: "Addis Ababa, Ethiopia",
    category: "guest-house",
    image: require("@/assets/images/1.jpg"),
    price: "$484 night",
  },
  {
    id: 2,
    title: "Ethiopia",
    location: "Addis Ababa, Ethiopia",
    category: "hotels",
    image: require("@/assets/images/2.jpg"),
    price: "$59.00 night",
  },
  {
    id: 3,
    title: "Kenya",
    location: "Addis Ababa, Ethiopia",
    category: "home-stays",
    image: require("@/assets/images/3.jpg"),
    price: "$39.00 night",
  },
  {
    id: 4,
    title: "Nigeria",
    location: "Addis Ababa, Ethiopia",
    category: "renovation",
    image: require("@/assets/images/4.jpg"),
    price: "$29.00 night",
  },
  {
    id: 5,
    title: "South Africa",
    location: "Addis Ababa, Ethiopia",
    category: "home-stays",
    image: require("@/assets/images/5.jpg"),
    price: "$69.00 night",
  },
];
export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const router = useRouter();

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleCategoryPress = (category: string) => {
    const isAll = category.toLowerCase() === "all";
    const isSelected =
      selectedCategory?.toLowerCase() === category.toLowerCase();

    if (isAll || isSelected) {
      setSelectedCategory(null);
      setFilteredProperties(properties);
    } else {
      setSelectedCategory(category);
      const filtered = properties.filter(
        (property) => property.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProperties(filtered);
    }
  };

  const categories = [
    "All",
    "Home-stays",
    "Guest-house",
    "Hotels",
    "Renovation",
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.main}>
        {/* categories buttons */}
        <View style={styles.categoryButtonScrollViewContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryPress(category)}
                style={[
                  styles.categoryButton,
                  (selectedCategory === null && category === "All") ||
                  selectedCategory?.toLowerCase() === category.toLowerCase()
                    ? styles.selectedCategory
                    : null,
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    (selectedCategory === null && category === "All") ||
                    selectedCategory?.toLowerCase() === category.toLowerCase()
                      ? styles.selectedCategoryText
                      : null,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/**Map view */}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 9.03,
            longitude: 38.74,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />

        <BottomSheet
          topInset={100}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["25%", "50%", "75%"]}
          index={1} // Start at middle position
          enablePanDownToClose={false}
          enableHandlePanningGesture={true}
          enableContentPanningGesture={true}
          enableOverDrag={true}
          activeOffsetY={[-10, 10]}
          // Add these props to improve behavior
          overDragResistanceFactor={0}
          animateOnMount={true}>
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            // Important for nested scrolling
            nestedScrollEnabled={true}>
            {filteredProperties.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() =>
                  router.push({
                    pathname: `/(details)/[id]`,
                    params: {
                      id: item.id,
                      data: JSON.stringify(item),
                    },
                  })
                }
                style={styles.propertyCard}>
                <Image style={styles.image} source={item.image} />
                <Ionicons
                  name="heart-outline"
                  size={24}
                  color="white"
                  style={styles.heartIcon}
                />
                <View style={styles.propertyInfo}>
                  <Text style={styles.propertyTitle}>{item.title}</Text>
                  <Text style={styles.propertyLocation}>{item.location}</Text>
                  <Text style={styles.propertyPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </BottomSheetScrollView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  categoryButtonScrollViewContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#EEE",
  },
  selectedCategory: {
    backgroundColor: "black",
  },
  categoryText: {
    color: "black",
    fontSize: 16,
  },
  selectedCategoryText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    // Important for proper scrolling
    flexGrow: 1,
  },
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  propertyInfo: {
    padding: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  propertyLocation: {
    fontSize: 14,
    color: "#757575",
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
