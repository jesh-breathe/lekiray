import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const TabBar = ({ state, descriptors, navigation }) => {
  const primary = "#CD2427";
  const grey = "#757575";

  const icons = {
    index: (props) => (
      <FontAwesome5 name="compass" size={28} color={grey} {...props} />
    ),
    map: (props) => (
      <FontAwesome5 name="map-marker-alt" size={28} color={grey} {...props} />
    ),
    wishlist: (props) => (
      <AntDesign name="heart" size={28} color={grey} {...props} />
    ),
    profile: (props) => (
      <FontAwesome5 name="user-alt" size={28} color={grey} {...props} />
    ),
  };
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 20,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 40,
        shadowColor: "black",
        elevation: 3,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        console.log(route.name);
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            pressColor="white"
            pressOpacity={1}
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            {icons[route.name]({
              color: isFocused ? primary : grey,
            })}
            <Text
              style={{ color: isFocused ? primary : colors.text, fontSize: 12 }}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabBar;
