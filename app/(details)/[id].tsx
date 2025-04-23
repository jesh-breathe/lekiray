import React from "react";
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const PropertyDetails = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const property = JSON.parse(data as string);
  console.log(property);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=> router.back()}/>
        </TouchableOpacity>
        <Image source={property.image} style={{width:'100%', height: 300}}/>
        <Text>{property.title}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ container: {} });
export default PropertyDetails;
