import { View, Text } from "react-native";
import type { DeliveryStatus } from "../types/delivery.types";

interface StatusBadgeProps {
  status: DeliveryStatus;
}

const STATUS_CONFIG: Record<
  DeliveryStatus,
  { label: string; badgeClass: string; dotClass: string; textClass: string; animation?: string }
> = {
  pending: {
    label: "En attente",
    badgeClass: "badge-pending",
    dotClass: "bg-warning",
    textClass: "text-warning-foreground",
  },
  delivered: {
    label: "Livré",
    badgeClass: "badge-delivered",
    dotClass: "bg-success",
    textClass: "text-success-foreground",
    animation: "animate-ping animate-ping-slow",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View className={config.badgeClass}>
      <View className={`badge-dot ${config.dotClass} ${config.animation || ""}`} />
      <Text
        className={`text-xs ${config.textClass}`}
        style={{ fontFamily: "Poppins_500Medium" }}
      >
        {config.label}
      </Text>
    </View>
  );
}
