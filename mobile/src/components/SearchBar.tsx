import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Rechercher un destinataire ou une adresse",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2 bg-surface border border-border rounded-full px-4 py-3">
      <Search size={18} color="#9C9686" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9C9686"
        className="flex-1 text-primary text-sm"
        style={{ fontFamily: "Poppins_400Regular" }}
      />
    </View>
  );
}
