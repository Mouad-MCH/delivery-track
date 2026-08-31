import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Livraisons",
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
        }}
      />
    </Stack>
  );
}