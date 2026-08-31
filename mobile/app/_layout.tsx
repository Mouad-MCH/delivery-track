import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0E1A" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: "#0B0E1A" }, // bach l fond ykun dark m3a transitions
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Livraisons",
          headerShown: false, // 7it 3andk header custom dyalk f index.tsx (logo + stats)
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
          presentation: "modal", // optionnel: kaydir effet modal li slide mn taht, zwina l forms
        }}
      />
    </Stack>
  );
}