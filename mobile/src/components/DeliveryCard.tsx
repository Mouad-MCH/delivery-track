import {
  Ionicons,
} from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Delivery } from "../types/delivery.types";

interface DeliveryCardProps {
  delivery: Delivery;
  onPress: () => void;
  onConfirm?: () => void;
}

export default function DeliveryCard({
  delivery,
  onPress,
  onConfirm,
}: DeliveryCardProps) {
  const isDelivered = delivery.status === "delivered";

  const createdDate = new Date(delivery.createdAt);

  const formattedDate = createdDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const formattedTime = createdDate.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      {/* Header de la carte */}
      <View style={styles.header}>
        {/* Avatar */}
        <View
          style={[
            styles.avatar,
            isDelivered ? styles.avatarDelivered : styles.avatarPending,
          ]}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={isDelivered ? "#00E5B0" : "#8B7CFF"}
          />
        </View>

        {/* Informations destinataire */}
        <View style={styles.recipientContainer}>
          <Text style={styles.recipientName} numberOfLines={1}>
            {delivery.recipientName}
          </Text>

          <View style={styles.dateContainer}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color="#8490A8"
            />

            <Text style={styles.dateText}>
              Créé {formattedDate}, {formattedTime}
            </Text>
          </View>
        </View>

        {/* Status */}
        <View
          style={[
            styles.statusBadge,
            isDelivered
              ? styles.statusDelivered
              : styles.statusPending,
          ]}
        >
          <Ionicons
            name={
              isDelivered
                ? "checkmark-circle-outline"
                : "time-outline"
            }
            size={14}
            color={isDelivered ? "#00E5B0" : "#FFD21F"}
          />

          <Text
            style={[
              styles.statusText,
              isDelivered
                ? styles.statusTextDelivered
                : styles.statusTextPending,
            ]}
          >
            {isDelivered ? "Livré" : "En attente"}
          </Text>
        </View>

        {/* Chevron */}
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#71809A"
          style={styles.chevron}
        />
      </View>

      {/* Adresse */}
      <View style={styles.addressContainer}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#FF4F81"
        />

        <Text style={styles.address} numberOfLines={2}>
          {delivery.address}
        </Text>
      </View>

      {/* Ligne séparatrice */}
      <View style={styles.separator} />

      {/* Bouton confirmation */}
      {!isDelivered && onConfirm && (
        <View style={styles.actionContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.confirmButtonPressed,
            ]}
            onPress={(event) => {
              event.stopPropagation();
              onConfirm();
            }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={16}
              color="#AFA8FF"
            />

            <Text style={styles.confirmText}>
              Valider adresse
            </Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginVertical: 7,

    padding: 18,

    borderRadius: 14,

    backgroundColor: "#10192D",

    borderWidth: 1,
    borderColor: "#1D2A43",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 4,
  },

  cardPressed: {
    opacity: 0.85,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 41,
    height: 41,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    borderWidth: 1,
  },

  avatarPending: {
    backgroundColor: "#17163D",
    borderColor: "#38318B",
  },

  avatarDelivered: {
    backgroundColor: "#092D2C",
    borderColor: "#007C69",
  },

  recipientContainer: {
    flex: 1,
    marginRight: 8,
  },

  recipientName: {
    color: "#F1F3FA",

    fontSize: 17,
    fontWeight: "700",

    marginBottom: 4,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    color: "#8995AC",

    fontSize: 12,

    marginLeft: 5,
  },

  /* =========================
     STATUS
  ========================= */

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 20,

    borderWidth: 1,
  },

  statusPending: {
    backgroundColor: "#201C25",
    borderColor: "#7D4F00",
  },

  statusDelivered: {
    backgroundColor: "#092725",
    borderColor: "#006C5D",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",

    marginLeft: 4,
  },

  statusTextPending: {
    color: "#FFD21F",
  },

  statusTextDelivered: {
    color: "#00E5B0",
  },

  chevron: {
    marginLeft: 7,
  },

  /* =========================
     ADRESSE
  ========================= */

  addressContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 14,

    paddingHorizontal: 13,
    paddingVertical: 12,

    borderRadius: 10,

    backgroundColor: "#080F20",

    borderWidth: 1,
    borderColor: "#1B2740",
  },

  address: {
    flex: 1,

    color: "#D8DDEA",

    fontSize: 13,

    lineHeight: 20,

    marginLeft: 9,
  },

  /* =========================
     SEPARATOR
  ========================= */

  separator: {
    height: 1,

    backgroundColor: "#1D2941",

    marginTop: 12,
  },

  /* =========================
     CONFIRM BUTTON
  ========================= */

  actionContainer: {
    alignItems: "flex-end",

    marginTop: 10,
  },

  confirmButton: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 11,
    paddingVertical: 8,

    borderRadius: 5,

    backgroundColor: "#24204F",

    borderWidth: 1,
    borderColor: "#493EA3",
  },

  confirmButtonPressed: {
    opacity: 0.7,
  },

  confirmText: {
    color: "#AFA8FF",

    fontSize: 13,
    fontWeight: "600",

    marginLeft: 5,
  },
});