import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { User, MapPin, ChevronRight } from "lucide-react-native";
import StatusBadge from "./StatusBadge";
import type { Delivery } from "../types/delivery.types";

interface DeliveryCardProps {
  delivery: Delivery;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long" }) +
    ", " +
    date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function DeliveryCard({ delivery }: DeliveryCardProps) {
  const router = useRouter();
  const isPending = delivery.status === "pending";

  return (
    <Pressable
      style={styles.card}
onPress={() =>
  router.push({
    pathname: "/delivery/[id]",
    params: { id: delivery._id },
  })
}    >
      <View style={styles.header}>
        <View style={styles.identity}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: isPending ? "#3B2E1A" : "#1A3B2A" },
            ]}
          >
            <User size={16} color={isPending ? "#F59E0B" : "#22C55E"} />
          </View>
          <Text style={styles.name}>{delivery.recipientName}</Text>
        </View>

        <View style={styles.headerRight}>
          <StatusBadge status={delivery.status} />
          <ChevronRight size={18} color="#6B7280" />
        </View>
      </View>

      <Text style={styles.date}>Créé {formatDate(delivery.createdAt)}</Text>

      <View style={styles.addressRow}>
        <MapPin size={15} color="#818CF8" />
        <Text style={styles.address} numberOfLines={1}>
          {delivery.address}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151928",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#232838",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  identity: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: "#fff", fontSize: 15, fontWeight: "600" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  date: { color: "#6B7280", fontSize: 12, marginBottom: 10 },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0F1220",
    padding: 10,
    borderRadius: 10,
  },
  address: { color: "#C5CAD9", fontSize: 13, flex: 1 },
});