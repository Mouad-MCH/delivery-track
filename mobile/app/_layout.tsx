import { useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import "@/global.css"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      initialRouteName="onboarding"
      screenOptions={{
        headerStyle: { backgroundColor: "#F5F6F6" },
        headerTintColor: "#1C1C1C",
        headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
        contentStyle: { backgroundColor: "#F5F6F6" },
      }}
    >
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          title: "Livraisons",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="delivery/[id]"
        options={{
          title: "Détail de la livraison",
        }}
      />

      <Stack.Screen
        name="delivery/edit/[id]"
        options={{
          title: "Modifier la livraison",
        }}
      />

      <Stack.Screen
        name="delivery/new"
        options={{
          title: "Nouvelle livraison",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}