import { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import DeliveryCard from "../src/components/DeliveryCard";
import type { Delivery } from "../src/types/delivery.types";

// 🔧 Mock data mo2aqata — ghadi nbdlouha b l'API mn ba3d
const MOCK_DELIVERIES: Delivery[] = [
  {
    _id: "1",
    recipientName: "Élodie Martin",
    address: "28 Avenue Jean Jaurès, 69007 Lyon",
    status: "pending",
    confirmedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    recipientName: "Alexandre Moreau",
    address: "12 Rue de la République, 69002 Lyon",
    status: "delivered",
    confirmedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function DeliveryListScreen() {
  const [deliveries] = useState<Delivery[]>(MOCK_DELIVERIES);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livraisons du jour</Text>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DeliveryCard delivery={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune livraison trouvée.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0E1A", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 16 },
  empty: { color: "#6B7280", textAlign: "center", marginTop: 40 },
});