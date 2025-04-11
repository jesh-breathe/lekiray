import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import CustomButton from "@/components/CustomButton";
import * as AuthSession from "expo-auth-session";
import { useSSO, useUser } from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

// import { FlipInEasyX } from "react-native-reanimated";
import { SignOutButton } from "@/components/SignOutButton";
import {Link, router} from "expo-router";
export const useWarmUpBrowser = () => {
  const router = useRouter();
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
WebBrowser.maybeCompleteAuthSession();
const welcome = () => {
  const { user } = useUser();
  useWarmUpBrowser();

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
        router.push("/(tabs)/explore");
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
  console.log(user);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#0A3D62",
        gap: 40,
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/welcome.jpg")}
          style={styles.image}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.welcomeTxt}>
          Unlock Your Dream Home With Ease !
        </Text>
      </View>

      <CustomButton
        onPress={onPress}

        label="Sign in with"
        name="logo-google"
        size={20}
        iconColor="#0A3D62"
        texColor="#0A3D62"
      />
      <SignOutButton />
      <Link href={"/(tabs)/explore"}><Text>Go to home</Text></Link>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>

    </SafeAreaView>
  );
};

export default welcome;

const styles = StyleSheet.create({
  image: {
    objectFit: "cover",
    height: "100%",
    width: "auto",
  },
  imageContainer: {
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    width: "auto",
    height: "60%",

    overflow: "hidden",
  },
  welcomeTxt: {
    margin: 3,
    alignSelf: "center",
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
