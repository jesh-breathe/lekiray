import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { properties } from "@/app/(tabs)/index";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.03,
          longitude: 38.74,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            title={property.title}
            description={property.location}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;

// export const properties = [
//   {
//     id: 1,
//     title: "El Naranjo, Guatemala",
//     description: "Added 11 weeks ago",
//     date: "Apr 1 – 6",
//     price: "$484 night",
//     image: require("@/assets/images/1.jpg"),
//     rating: 4,
//     location: "Addis Ababa, Ethiopia",
//     latitude: 9.03,
//     longitude: 38.74,
//     guests: 2,
//     bedrooms: 1,
//     beds: 1,
//     baths: 1,
//     host: {
//       name: "Michelle",
//       image: "https://via.placeholder.com/50",
//       hostingDuration: "1 month hosting",
//     },
//     reviews: 6,
//     rareFind: true,
//   },
//   {
//     id: 2,
//     title: "Ethiopia",
//     description: "Added 5 weeks ago",
//     date: "May 1 – 6",
//     price: "$59.00 night",
//     image: require("@/assets/images/2.jpg"),
//     rating: 5,
//     location: "Addis Ababa, Ethiopia",
//     latitude: 9.03,
//     longitude: 38.74,
//     guests: 3,
//     bedrooms: 2,
//     beds: 2,
//     baths: 1,
//     host: {
//       name: "John",
//       image: "https://via.placeholder.com/50",
//       hostingDuration: "2 months hosting",
//     },
//     reviews: 10,
//     rareFind: false,
//   },
//   {
//     id: 3,
//     title: "Kenya",
//     description: "Added 3 weeks ago",
//     date: "Jun 1 – 6",
//     price: "$39.00 night",
//     image: require("@/assets/images/3.jpg"),
//     rating: 3,
//     location: "Addis Ababa, Ethiopia",
//     latitude: 9.03,
//     longitude: 38.74,
//     guests: 4,
//     bedrooms: 3,
//     beds: 3,
//     baths: 2,
//     host: {
//       name: "Alice",
//       image: "https://via.placeholder.com/50",
//       hostingDuration: "3 months hosting",
//     },
//     reviews: 8,
//     rareFind: false,
//   },
//   {
//     id: 4,
//     title: "Nigeria",
//     description: "Added 2 weeks ago",
//     date: "Jul 1 – 6",
//     price: "$29.00 night",
//     image: require("@/assets/images/4.jpg"),
//     rating: 4,
//     location: "Addis Ababa, Ethiopia",
//     latitude: 9.03,
//     longitude: 38.74,
//     guests: 2,
//     bedrooms: 1,
//     beds: 1,
//     baths: 1,
//     host: {
//       name: "David",
//       image: "https://via.placeholder.com/50",
//       hostingDuration: "4 months hosting",
//     },
//     reviews: 5,
//     rareFind: true,
//   },
//   {
//     id: 5,
//     title: "South Africa",
//     description: "Added 1 week ago",
//     date: "Aug 1 – 6",
//     price: "$69.00 night",
//     image: require("@/assets/images/5.jpg"),
//     rating: 5,
//     location: "Addis Ababa, Ethiopia",
//     latitude: 9.03,
//     longitude: 38.74,
//     guests: 5,
//     bedrooms: 4,
//     beds: 4,
//     baths: 3,
//     host: {
//       name: "Emma",
//       image: "https://via.placeholder.com/50",
//       hostingDuration: "5 months hosting",
//     },
//     reviews: 12,
//     rareFind: false,
//   },
// ];
