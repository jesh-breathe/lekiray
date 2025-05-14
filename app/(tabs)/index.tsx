import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useState, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import properties from '@/data/item.json';
import { imageMap } from '@/utils/image';

export default function Index() {
  const [value, setValue] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const router = useRouter();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCategoryPress = (category: string) => {
    const isAll = category.toLowerCase() === 'all';
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
    { label: 'All', icon: 'search' },
    { label: 'Home-stays', icon: 'home-outline' },
    { label: 'Guest-house', icon: 'bed-outline' },
    { label: 'Hotels', icon: 'business-outline' },
    { label: 'Renovation', icon: 'construct-outline' },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.main}>
        <View style={styles.searchFileldContainer}>
          <TextInput
            placeholder='Try Kolfe'
            style={styles.searchField}
            placeholderTextColor='black'
            value={value}
            onChangeText={setValue}
          />
          <Ionicons name='search-outline' size={20} color='black' />
        </View>

        <View style={styles.categoryButtonScrollViewContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => {
              const isSelected =
                (selectedCategory === null && category.label === 'All') ||
                selectedCategory?.toLowerCase() ===
                  category.label.toLowerCase();
              return (
                <TouchableOpacity
                  key={category.label}
                  onPress={() => handleCategoryPress(category.label)}
                  style={[
                    styles.categoryButton,
                    isSelected ? styles.selectedCategory : null,
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={24}
                    color={isSelected ? 'white' : 'black'}
                    style={{ marginBottom: 5 }}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected ? styles.selectedCategoryText : null,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

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
          topInset={200}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['20%', '60%', '80%']}
          index={3}
          enablePanDownToClose={false}
          enableHandlePanningGesture={true}
          enableContentPanningGesture={true}
          enableOverDrag={true}
          activeOffsetY={[-10, 10]}
          overDragResistanceFactor={0}
          animateOnMount={true}
        >
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            nestedScrollEnabled={true}
          >
            {filteredProperties.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() =>
                  router.push({
                    pathname: '/details/[id]',
                    params: {
                      id: item.id,
                      data: JSON.stringify(item),
                    },
                  })
                }
                style={styles.propertyCard}
              >
                <Image style={styles.image} source={imageMap[item.image]} />

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
    backgroundColor: '#FFF',
    paddingHorizontal: 4,
  },
  searchFileldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  searchField: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  categoryButtonScrollViewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  selectedCategory: {
    backgroundColor: 'black',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  propertyInfo: {
    padding: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#757575',
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
