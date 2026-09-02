import { Alert, StyleSheet, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import DeliveryForm from "../../src/components/DeliveryForm";
import {
  createDelivery,
  updateDelivery,
} from "../../src/services/deliveries";

export default function NewDeliveryScreen() {
  const router = useRouter();

  const { id, name, address } = useLocalSearchParams<{
    id?: string;
    name?: string;
    address?: string;
  }>();

  const isEdit = !!id;

  const handleSubmit = async (recipientName: string, deliveryAddress: string) => {
    try {
      if (isEdit && id) {
        await updateDelivery(id, {
          recipientName,
          address: deliveryAddress,
        });

        Alert.alert("Success", "Delivery updated");
      } else {
        await createDelivery({
          recipientName,
          address: deliveryAddress,
        });

        Alert.alert("Success", "Delivery created");
      }

      router.back();
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <DeliveryForm
        initialName={name}
        initialAddress={address}
        buttonText={isEdit ? "Update delivery" : "Create delivery"}
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
});