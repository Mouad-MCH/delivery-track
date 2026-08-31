import { useState, useMemo } from "react";
import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Truck, Search } from "lucide-react-native";
import DeliveryCard from "../src/components/DeliveryCard";
import type { Delivery, DeliveryListFilter } from "../src/types/delivery.types";

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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DeliveryListFilter>("all");

  const stats = useMemo(
    () => ({
      total: deliveries.length,
      pending: deliveries.filter((d) => d.status === "pending").length,
      delivered: deliveries.filter((d) => d.status === "delivered").length,
    }),
    [deliveries]
  );

  const filtered = useMemo(() => {
    return deliveries.filter((d) => {
      const matchesFilter = filter === "all" || d.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        d.recipientName.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [deliveries, search, filter]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerRow}>
        <View style={styles.logo}>
          <Truck size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.title}>Livraisons du jour</Text>
          <Text style={styles.subtitle}>Tournée de distribution active</Text>
        </View>
      </View>

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

      <View style={styles.searchBar}>
        <Search size={16} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par destinataire ou adresse..."
          placeholderTextColor="#6B7280"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterRow}>
        <FilterChip label={`Tous (${stats.total})`} active={filter === "all"} onPress={() => setFilter("all")} />
        <FilterChip label={`En attente (${stats.pending})`} active={filter === "pending"} onPress={() => setFilter("pending")} />
        <FilterChip label={`Livrés (${stats.delivered})`} active={filter === "delivered"} onPress={() => setFilter("delivered")} />
      </View>

     
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DeliveryCard delivery={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune livraison trouvée.</Text>
        }
      />
    </SafeAreaView>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E1A",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 },
  logo: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#4F46E5", alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontSize: 16, fontWeight: "700" },
  subtitle: { color: "#6B7280", fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: "#151928", borderRadius: 12, padding: 10, alignItems: "center" },
  statPending: { backgroundColor: "rgba(245,158,11,0.08)" },
  statDelivered: { backgroundColor: "rgba(34,197,94,0.08)" },
  statLabel: { color: "#6B7280", fontSize: 10, fontWeight: "600", marginBottom: 4 },
  statValue: { color: "#fff", fontSize: 20, fontWeight: "700" },
  searchBar: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#151928", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  searchInput: { flex: 1, color: "#fff", fontSize: 13 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: "#151928" },
  chipActive: { backgroundColor: "#4F46E5" },
  chipText: { color: "#9CA3AF", fontSize: 12, fontWeight: "500" },
  chipTextActive: { color: "#fff" },
  empty: { color: "#6B7280", textAlign: "center", marginTop: 40 },
});