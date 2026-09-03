import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { getById, confirm, update } from "@/src/services/deliveries";
import { Delivery } from "@/src/types/delivery.types";
import ConfirmModal from "@/src/components/ConfirmModal";

export default function DeliveryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    const loadDelivery = async () => {
      if (!id) {
        setError("Identifiant de livraison manquant.");
        setLoading(false);
        return;
      }

      try {
        const data = await getById(id);
        setDelivery(data);
      } catch {
        setError("Impossible de récupérer la livraison.");
      } finally {
        setLoading(false);
      }
    };

    loadDelivery();
  }, [id]);

  const openConfirmModal = () => {
    setConfirmError("");
    setConfirmVisible(true);
  };

  const closeConfirmModal = () => {
    setConfirmVisible(false);
    setConfirmError("");
  };

  const handleConfirm = async (correctedAddress: string) => {
    if (!id || !delivery) {
      return;
    }

    setConfirmLoading(true);
    setConfirmError("");

    try {
      const trimmedAddress = correctedAddress.trim();

      if (trimmedAddress !== delivery.address) {
        await update(id, { address: trimmedAddress });
      }

      const updatedDelivery = await confirm(id);
      setDelivery(updatedDelivery);

      setConfirmVisible(false);
      Alert.alert("Succès", "Livraison confirmée.");
    } catch {
      setConfirmError(
        "Impossible de confirmer la livraison. Veuillez réessayer."
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Chargement...</Text>
      </View>
    );
  }

  if (error || !delivery) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          {error || "Livraison introuvable."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détail de la livraison</Text>

      <Text style={styles.label}>Destinataire</Text>
      <Text style={styles.text}>{delivery.recipientName}</Text>

      <Text style={styles.label}>Adresse</Text>
      <Text style={styles.text}>{delivery.address}</Text>

      <Text style={styles.label}>Statut</Text>
      <Text style={styles.text}>
        {delivery.status === "pending" ? "En attente" : "Livré"}
      </Text>

      <Text style={styles.label}>Date de création</Text>
      <Text style={styles.text}>
        {new Date(delivery.createdAt).toLocaleDateString()}
      </Text>

      {delivery.status === "pending" && (
        <View style={styles.button}>
          <Button
            title="Confirmer la livraison"
            onPress={openConfirmModal}
          />
        </View>
      )}

      {delivery.status === "pending" && (
        <View style={styles.button}>
          <Button
            title="Modifier"
            onPress={() => router.push(`/delivery/edit/${delivery._id}`)}
          />
        </View>
      )}

      <ConfirmModal
        visible={confirmVisible}
        address={delivery.address}
        loading={confirmLoading}
        error={confirmError}
        onConfirm={handleConfirm}
        onCancel={closeConfirmModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E1A",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 15,
  },

  text: {
    color: "#fff",
    fontSize: 17,
    marginTop: 5,
  },

  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },

  button: {
    marginTop: 20,
  },
});