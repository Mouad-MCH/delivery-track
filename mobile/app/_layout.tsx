import { Stack } from "expo-router";
import "@/global.css"

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0E1A" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: "#0B0E1A" }, 
      }}
    >
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
        name="delivery/new"
        options={{
          title: "Nouvelle livraison",
          presentation: "modal", 
        }}
      />
    </Stack>
  );
}