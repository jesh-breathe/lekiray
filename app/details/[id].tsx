import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageMap } from '@/utils/image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const PropertyDetails = () => {
  const [wishlist, setWishlist] = useState<Boolean>();
  const { data } = useLocalSearchParams();
  const property = JSON.parse(data as string);
  console.log(property);

  const saveWishlist = async (item: string) => {
    setWishlist(true);
    await AsyncStorage.getItem('wishlist').then((token) => {
      const res = token ? JSON.parse(token) : null;
      if (res != null) {
        let data = res.find((val: string) => val === item);
        if (data == null) {
          res.push(item);
          AsyncStorage.setItem('wishlist', JSON.stringify(res));
          alert('Item saved');
        }
      } else {
        let wishlist = [];
        wishlist.push(item);
      }
    });
  };

  // TODO: remove the wishlist from the async storage

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name='arrow-back'
                size={24}
                color='grey'
                onPress={() => router.back()}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name='heart-outline' size={24} color='' />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <Image
            source={imageMap[property.image]}
            style={{ width: '100%', height: 300 }}
          />
          <Text>{property.title}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({ container: {} });
export default PropertyDetails;
