import { Stack } from 'expo-router';
import {SafeAreaView} from 'react-native';

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Accueil" }} />
        <Stack.Screen name="[username]" options={{title: 'Profil'}} />
      </Stack>
  );
}
