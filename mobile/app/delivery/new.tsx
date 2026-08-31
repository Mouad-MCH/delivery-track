import { View, Text, StyleSheet } from "react-native";

export default function NewDeliveryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Formulaire nouvelle livraison (à venir)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0E1A", alignItems: "center", justifyContent: "center" },
  text: { color: "#fff" },
});