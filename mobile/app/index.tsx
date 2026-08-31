import { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Truck } from "lucide-react-native";
import DeliveryCard from "../src/components/DeliveryCard";
import type { Delivery } from "../src/types/delivery.types";

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

  const stats = useMemo(
    () => ({
      total: deliveries.length,
      pending: deliveries.filter((d) => d.status === "pending").length,
      delivered: deliveries.filter((d) => d.status === "delivered").length,
    }),
    [deliveries]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.logo}>
          <Truck size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.title}>Livraisons du jour</Text>
          <Text style={styles.subtitle}>Tournée de distribution active</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL</Text>
          <Text style={styles.statValue}>{stats.total}</Text>
        </View>
        <View style={[styles.statCard, styles.statPending]}>
          <Text style={[styles.statLabel, { color: "#F59E0B" }]}>EN ATTENTE</Text>
          <Text style={[styles.statValue, { color: "#F59E0B" }]}>{stats.pending}</Text>
        </View>
        <View style={[styles.statCard, styles.statDelivered]}>
          <Text style={[styles.statLabel, { color: "#22C55E" }]}>LIVRÉES</Text>
          <Text style={[styles.statValue, { color: "#22C55E" }]}>{stats.delivered}</Text>
        </View>
      </View>

      {/* List */}
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
  headerRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "700" },
  subtitle: { color: "#6B7280", fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: "#151928", borderRadius: 12, padding: 10, alignItems: "center" },
  statPending: { backgroundColor: "rgba(245,158,11,0.08)" },
  statDelivered: { backgroundColor: "rgba(34,197,94,0.08)" },
  statLabel: { color: "#6B7280", fontSize: 10, fontWeight: "600", marginBottom: 4 },
  statValue: { color: "#fff", fontSize: 20, fontWeight: "700" },
  empty: { color: "#6B7280", textAlign: "center", marginTop: 40 },
});