import {Stack} from "expo-router"

export default function DetailsLayout()
{
    return <Stack>
        <Stack.Screen name="[id]" options={{headerShown: false}} />
    </Stack>
}