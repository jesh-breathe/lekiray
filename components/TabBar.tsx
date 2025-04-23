import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const primary = "red";
  const grey = "#000";

  const icons: Record<
    "index" | "wishlist" | "profile",
    (props: any) => JSX.Element
  > = {
    index: (props) => (
      <Ionicons name="home-outline" size={26} color={grey} {...props} />
    ),
    wishlist: (props) => (
      <Ionicons name="heart-outline" size={26} color={grey} {...props} />
    ),
    profile: (props) => (
      <Ionicons name="person-outline" size={26} color={grey} {...props} />
    ),
  };

  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={{
        shadowColor: "grey",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FBFBFF",
        padding: 8,
        elevation: 3,
      }}>
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
              }}>
              <IconComponent color={isFocused ? primary : grey} />
              <Text
                style={{
                  color: isFocused ? primary : colors.text,
                  fontSize: 14,
                  fontWeight: 700,
                }}>
                {label}
              </Text>
            </PlatformPressable>
          );
        }
      )}
    </View>
  );
};

export default TabBar;
