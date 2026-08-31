import { View, Text, StyleSheet } from "react-native";

interface StatusBadgeProps {
  status: "pending" | "delivered";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isPending = status === "pending";

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: isPending ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)" },
      ]}
    >
      <Text style={[styles.text, { color: isPending ? "#F59E0B" : "#22C55E" }]}>
        {isPending ? "En attente" : "Livré"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});