import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  address: string;
  loading: boolean;
  error: string;
  onConfirm: (correctedAddress: string) => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  address,
  loading,
  error,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [correctedAddress, setCorrectedAddress] = useState(address);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{"Vérifiez l'adresse avant de confirmer"}</Text>

          <Text style={styles.label}>Adresse de livraison</Text>

          <TextInput
            style={styles.input}
            value={correctedAddress}
            onChangeText={setCorrectedAddress}
            placeholder="Adresse de livraison"
            placeholderTextColor="#888"
            editable={!loading}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={onCancel}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirm]}
              onPress={() => onConfirm(correctedAddress)}
              disabled={loading || !correctedAddress.trim()}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmText}>Confirmer la livraison</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#0B0E1A",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#333",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "600",
  },
  confirm: {
    backgroundColor: "#76C768",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});