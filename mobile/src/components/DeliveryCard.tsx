import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import StatusBadge from "./StatusBadge";
import type { Delivery } from "../types/delivery.types";

interface DeliveryCardProps {
  delivery: Delivery;
}

const AVATAR_STYLES = [
  { bg: "bg-accent-soft", text: "text-accent-foreground" },
  { bg: "bg-warning-soft", text: "text-warning-foreground" },
  { bg: "bg-success-soft", text: "text-success-foreground" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

function getAvatarStyle(name: string) {
  const index = name.charCodeAt(0) % AVATAR_STYLES.length;
  return AVATAR_STYLES[index];
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DeliveryCard({ delivery }: DeliveryCardProps) {
  const router = useRouter();
  const avatarStyle = getAvatarStyle(delivery.recipientName);

  return (
    <Pressable
      className="flex-row items-center gap-3 bg-surface border border-border rounded-2xl p-3 mb-3"
      onPress={() =>
        router.push({
          pathname: "/delivery/[id]",
          params: { id: delivery._id },
        })
      }
    >
      <View
        className={`w-11 h-11 rounded-full items-center justify-center ${avatarStyle.bg}`}
      >
        <Text
          className={`text-sm ${avatarStyle.text}`}
          style={{ fontFamily: "Poppins_600SemiBold" }}
        >
          {getInitials(delivery.recipientName)}
        </Text>
      </View>

      <View className="flex-1">
        <Text
          className="text-primary text-sm"
          style={{ fontFamily: "Poppins_500Medium" }}
          numberOfLines={1}
        >
          {delivery.recipientName}
        </Text>
        <Text
          className="text-neutral-foreground text-xs mt-0.5"
          style={{ fontFamily: "Poppins_400Regular" }}
          numberOfLines={1}
        >
          {delivery.address}
        </Text>
      </View>

      <View className="items-end gap-1.5">
        <StatusBadge status={delivery.status} />
        <Text
          className="text-neutral-foreground text-[11px]"
          style={{ fontFamily: "Poppins_400Regular" }}
        >
          {formatTime(delivery.createdAt)}
        </Text>
      </View>
    </Pressable>
  );
}
