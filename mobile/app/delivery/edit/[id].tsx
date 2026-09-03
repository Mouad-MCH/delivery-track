import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import DeliveryForm from "../../../src/components/DeliveryForm";
import {
  getById,
  update,
} from "../../../src/services/deliveries";

import { Delivery } from "../../../src/types/delivery.types";

export default function EditDeliveryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDelivery = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getById(id);
        setDelivery(data);
      } catch {
        Alert.alert(
          "Erreur",
          "Impossible de récupérer la livraison."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDelivery();
  }, [id]);

  const handleSubmit = async (name: string, address: string) => {
    if (!id) {
      return;
    }

    try {
      await update(id, {
        recipientName: name,
        address,
      });

      Alert.alert(
        "Succès",
        "Livraison modifiée avec succès."
      );

      router.back();
    } catch {
      Alert.alert(
        "Erreur",
        "Impossible de modifier la livraison."
      );
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

  if (!delivery) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Livraison introuvable.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier la livraison</Text>

      <DeliveryForm
        initialName={delivery.recipientName}
        initialAddress={delivery.address}
        buttonText="Modifier"
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E1A",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 20,
  },

  text: {
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});