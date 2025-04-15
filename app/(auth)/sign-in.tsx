import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import React, { useCallback, useEffect } from "react";
import { useSSO } from "@clerk/clerk-expo";
import { FontAwesome6 } from "@expo/vector-icons";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View style={styles.imageContainer}>
        <Image source={require("@/assets/images/2.jpg")} style={styles.image} />
      </View>
      <Text
        style={{
          padding: 5,
          textTransform: "uppercase",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        find your dream home with <Text style={{ color: "red" }}>ease!</Text>
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={{ fontSize: 19, color: "white" }}>
          Sign in with Google
        </Text>
        <FontAwesome6 name="google" size={18} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 40,
  },
  imageContainer: {
    width: "100%",
    height: 500,
    padding: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    height: 50,
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    gap: 10,
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
