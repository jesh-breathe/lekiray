import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

export const properties = [
  {
    id: 1,
    title: "El Naranjo, Guatemala",
    description: "Added 11 weeks ago",
    date: "Apr 1 – 6",
    price: "$484 night",
    category: "guest-house",
    image: require("@/assets/images/1.jpg"),
    rating: 4,
    location: "Addis Ababa, Ethiopia",
    latitude: 9.01,
    longitude: 38.76,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    host: {
      name: "Michelle",
      image: "https://via.placeholder.com/50",
      hostingDuration: "1 month hosting",
    },
    reviews: 6,
    rareFind: true,
  },
  {
    id: 2,
    title: "Ethiopia",
    description: "Added 5 weeks ago",
    date: "May 1 – 6",
    price: "$59.00 night",
    image: require("@/assets/images/2.jpg"),
    rating: 5,
    category: "hotels",
    location: "Addis Ababa, Ethiopia",
    latitude: 9.02,
    longitude: 38.72,
    guests: 3,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    host: {
      name: "John",
      image: "https://via.placeholder.com/50",
      hostingDuration: "2 months hosting",
    },
    reviews: 10,
    rareFind: false,
  },
  {
    id: 3,
    title: "Kenya",
    description: "Added 3 weeks ago",
    date: "Jun 1 – 6",
    category: "home-stays",
    price: "$39.00 night",
    image: require("@/assets/images/3.jpg"),
    rating: 3,
    location: "Addis Ababa, Ethiopia",
    latitude: 9.04,
    longitude: 38.78,
    guests: 4,
    bedrooms: 3,
    beds: 3,
    baths: 2,
    host: {
      name: "Alice",
      image: "https://via.placeholder.com/50",
      hostingDuration: "3 months hosting",
    },
    reviews: 8,
    rareFind: false,
  },
  {
    id: 4,
    title: "Nigeria",
    description: "Added 2 weeks ago",
    date: "Jul 1 – 6",
    category: "renovation",
    price: "$29.00 night",
    image: require("@/assets/images/4.jpg"),
    rating: 4,
    location: "Addis Ababa, Ethiopia",
    latitude: 9.05,
    longitude: 38.7,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    host: {
      name: "David",
      image: "https://via.placeholder.com/50",
      hostingDuration: "4 months hosting",
    },
    reviews: 5,
    rareFind: true,
  },
  {
    id: 5,
    title: "South Africa",
    description: "Added 1 week ago",
    date: "Aug 1 – 6",
    price: "$69.00 night",
    category: "home-stays",
    image: require("@/assets/images/5.jpg"),
    rating: 5,
    location: "Addis Ababa, Ethiopia",
    latitude: 9.06,
    longitude: 38.75,
    guests: 5,
    bedrooms: 4,
    beds: 4,
    baths: 3,
    host: {
      name: "Emma",
      image: "https://via.placeholder.com/50",
      hostingDuration: "5 months hosting",
    },
    reviews: 12,
    rareFind: false,
  },
];

export default function Index() {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const handleCategoryPress = (category: string) => {
    const isAll = category.toLowerCase() === "all";
    const newCategory = isAll ? null : category;

    setSelectedCategory(newCategory);
    console.log(newCategory);

    if (isAll) {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(
        (property) =>
          property.category.toLowerCase() === newCategory?.toLowerCase()
      );
      setFilteredProperties(filtered);
    }
  };

  console.log(user?.fullName);
  console.log(user?.imageUrl);
  const router = useRouter();

  const categories = [
    "All",
    "Home-stays",
    "Guest-house",
    "Hotels",
    "Renovation",
  ];

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <SignedIn>
          <Text>Hello {user?.firstName}</Text>
        </SignedIn>
        {/* TODO: What the Fuck this code is doing down there?*/}
        {/* <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut> */}
        {/* TODO: Fuck, I hate myself*/}
      </View>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <View>
            <Text>Welcome</Text>
            <Text>{user?.fullName}</Text>
          </View>
          <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        </View>
        <View>
          <Ionicons name="notifications-sharp" color="black" size={24} />
        </View>
      </View>
      <View></View>
      <View style={styles.categoryButtonScrollViewContainer}>
        <ScrollView
          style={styles.categoryContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
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
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  (selectedCategory === null && category === "All") ||
                  selectedCategory?.toLowerCase() === category.toLowerCase()
                    ? styles.selectedCategoryText
                    : null,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={{ marginVertical: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {filteredProperties.map((property) => (
            <TouchableOpacity
              key={property.id}
              onPress={() =>
                router.push({
                  pathname: `/(details)/${property.id}`,
                  params: { property: JSON.stringify(property) },
                })
              }
              style={styles.propertyCard}
            >
              <Image style={styles.image} source={property.image} />
              <Ionicons
                name="heart-outline"
                size={24}
                color="white"
                style={styles.heartIcon}
                onPress={() => console.log(property)}
              />
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyTitle}>{property.title}</Text>
                <Text style={styles.propertyLocation}>{property.location}</Text>
                <Text style={styles.propertyPrice}>{property.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    margin: 0,
    flex: 1,
    backgroundColor: "#0A3D62",
  },
  header: {},
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonScrollViewContainer: {
    display: "flex",
    flexDirection: "row",
  },
  labelContainer: {
    display: "flex",
  },
  welcomeText: {
    color: "white",
    fontSize: 16,
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B4F72",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoryContainer: {
    marginVertical: 20,
    height: 40,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedCategory: {
    backgroundColor: "#1B4F72",
  },
  categoryText: {
    color: "white",
    fontSize: 16,
  },
  selectedCategoryText: {
    fontWeight: "bold",
  },
  imageContainer: {
    gap: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  propertyCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
