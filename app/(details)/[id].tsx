import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const PropertyDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const property = searchParams.get("property");
  const propertyData = property ? JSON.parse(property) : null;
  console.log(id);
  if (!propertyData) {
    return (
      <View style={styles.container}>
        <Text>Property not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={propertyData.image} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{propertyData.title}</Text>
        <Text style={styles.subtitle}>
          Entire home in {propertyData.location}
        </Text>
        <Text style={styles.info}>
          {propertyData.guests} guests · {propertyData.bedrooms} bedroom ·{" "}
          {propertyData.beds} bed · {propertyData.baths} bath
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{propertyData.rating}</Text>
          <Ionicons name="star" size={15} color="yellow" />
          <Text style={styles.ratingText}>Guest favorite</Text>
          <Text style={styles.reviews}>{propertyData.reviews} Reviews</Text>
        </View>
        {propertyData.rareFind && (
          <View style={styles.rareFindContainer}>
            <FontAwesome5 name="gem" size={24} color="pink" />
            <Text style={styles.rareFindText}>This is a rare find</Text>
            <Text style={styles.rareFindSubText}>
              {propertyData.host.name}'s place is usually fully booked.
            </Text>
          </View>
        )}
        <View style={styles.hostContainer}>
          <Image
            style={styles.hostImage}
            source={{ uri: propertyData.host.image }}
          />
          <View>
            <Text style={styles.hostName}>
              Hosted by {propertyData.host.name}
            </Text>
            <Text style={styles.hostDuration}>
              {propertyData.host.hostingDuration}
            </Text>
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: propertyData.latitude,
            longitude: propertyData.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: propertyData.latitude,
              longitude: propertyData.longitude,
            }}
            title={propertyData.title}
            description={propertyData.location}
          />
        </MapView>
      </View>
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{propertyData.price}</Text>
          <Text style={styles.cancellation}>Free cancellation</Text>
        </View>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginVertical: 5,
  },
  info: {
    fontSize: 14,
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  reviews: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  rareFindContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rareFindText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  rareFindSubText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  hostImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  hostName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hostDuration: {
    fontSize: 14,
    color: "gray",
  },
  map: {
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  priceContainer: {
    flexDirection: "column",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancellation: {
    fontSize: 14,
    color: "gray",
  },
  reserveButton: {
    backgroundColor: "#FF5A5F",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PropertyDetails;
