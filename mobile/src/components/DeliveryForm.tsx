import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface DeliveryFormProps {
  initialName?: string;
  initialAddress?: string;
  buttonText: string;
  onSubmit: (name: string, address: string) => void;
}

export default function DeliveryForm({
  initialName = "",
  initialAddress = "",
  buttonText,
  onSubmit,
}: DeliveryFormProps) {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);

  const handleSubmit = () => {
    if (!name.trim() || !address.trim()) {
      return;
    }

    onSubmit(name, address);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient name</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter recipient name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Address</Text>

      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        placeholderTextColor="#888"
      />

      <Button title={buttonText} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});