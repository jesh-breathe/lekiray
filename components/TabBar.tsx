import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const primary = "#FF7700";
  const grey = "#FFF";

  const icons: Record<
    "explore" | "map" | "wishlist" | "profile",
    (props: any) => JSX.Element
  > = {
    explore: (props) => (
      <Ionicons name="home" size={26} color={grey} {...props} />
    ),
    map: (props) => (
      <FontAwesome5 name="map-marker-alt" size={26} color={grey} {...props} />
    ),
    wishlist: (props) => (
      <FontAwesome6 name="list" size={26} color={grey} {...props} />
    ),
    profile: (props) => (
      <FontAwesome5 name="user-alt" size={26} color={grey} {...props} />
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
        backgroundColor: "#333",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 10,
        shadowColor: "black",
        elevation: 3,
      }}
    >
      {state.routes.map(
        (
          route: {
            key: string | number;
            name: string;
            params: object | undefined;
          },
          index: React.Key | null | undefined
        ) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

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

          const IconComponent = (
            Object.keys(icons) as Array<keyof typeof icons>
          ).includes(route.name as keyof typeof icons)
            ? icons[route.name as keyof typeof icons]
            : null;
          if (!IconComponent) return null;

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
              <IconComponent color={isFocused ? primary : grey} />
              {/* <Text
                style={{
                  color: isFocused ? primary : colors.text,
                  fontSize: 12,
                }}
              >
                {label}
              </Text> */}

              <View
                style={{
                  display: isFocused ? "flex" : "none",
                  width: 5,
                  height: 5,
                  backgroundColor: "#FF7700",
                  borderRadius: "50%",
                }}
              ></View>
            </PlatformPressable>
          );
        }
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabBar;
