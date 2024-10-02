import { Stack, Tabs } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: true, title: 'Home'}}/>
            <Stack.Screen name="(Stack)"/>
        </Stack>
    )
}