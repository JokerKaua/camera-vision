import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="MediaPage" options={{
                headerShown: true,
                title: 'Medias'
            }} />
        </Stack>
    )
}