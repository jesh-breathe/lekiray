import { View, Text, Button } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useClerk } from "@clerk/clerk-expo";
export default function ProfileTab() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  console.log(user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>👤 Profile Tab</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

{
  /* <View>
        <SignedIn>
          <Text>Hello {user?.firstName}</Text>
        </SignedIn>
        {/* TODO: What the Fuck this code is doing down there?*/
}
{
  /* <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut> */
}
{
  /* TODO: Fuck, I hate myself*/
}

// </View>
// <View style={styles.header}>
//   <View style={styles.labelContainer}>
//     <View>
//       <Text>Welcome</Text>
//       <Text>{user?.fullName}</Text>
//     </View>
//     <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
//   </View>
//   <View>
//     <Ionicons name="notifications-sharp" color="black" size={24} />
//   </View>
// </View> */}
