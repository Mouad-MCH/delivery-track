import { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Bell,
  Package,
  Clock,
  CheckCircle2,
  Plus,
  Truck,
  History,
  User,
} from "lucide-react-native";
import DeliveryCard from "../src/components/DeliveryCard";
import SearchBar from "../src/components/SearchBar";
import { useDeliveries } from "../src/hooks/useDeliveries";
import type { DeliveryListFilter } from "../src/types/delivery.types";

const DRIVER_NAME = "MCH";

export default function HomeScreen() {
  const router = useRouter();
  const { deliveries, loading, refreshing, error, refetch } = useDeliveries();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DeliveryListFilter>("all");

  const stats = useMemo(
    () => ({
      total: deliveries.length,
      pending: deliveries.filter((d) => d.status === "pending").length,
      delivered: deliveries.filter((d) => d.status === "delivered").length,
    }),
    [deliveries]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return deliveries.filter((d) => {
      const matchesFilter = filter === "all" || d.status === filter;
      const matchesSearch =
        d.recipientName.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [deliveries, search, filter]);

  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <View style={styles.root} className="bg-background">
        <SafeAreaView style={[styles.flex, styles.centered]} edges={["top"]}>
          <ActivityIndicator size="large" color="#1C1C1C" />
          <Text
            className="text-neutral-foreground text-sm mt-3"
            style={{ fontFamily: "Poppins_400Regular" }}
          >
            Chargement des livraisons...
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.root} className="bg-background">
      <SafeAreaView style={styles.flex} edges={["top"]}>
        <FlatList
          style={styles.flex}
          data={filtered}
          keyExtractor={(item) => item._id}
          contentContainerClassName="px-5 pb-32"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} tintColor="#1C1C1C" />
          }
          ListHeaderComponent={
            <>
              <View className="flex-row items-center justify-between mt-2 mb-5">
                <View className="flex-row items-center gap-3">
                  <View className="w-11 h-11 rounded-full bg-accent-soft items-center justify-center">
                    <Text
                      className="text-accent-foreground text-sm"
                      style={{ fontFamily: "Poppins_600SemiBold" }}
                    >
                      {DRIVER_NAME.slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text
                      className="text-neutral-foreground text-xs"
                      style={{ fontFamily: "Poppins_400Regular" }}
                    >
                      Bonjour,
                    </Text>
                    <Text
                      className="text-primary text-lg"
                      style={{ fontFamily: "Poppins_600SemiBold" }}
                    >
                      {DRIVER_NAME}
                    </Text>
                  </View>
                </View>

                <Pressable className="w-11 h-11 rounded-full bg-surface border border-border items-center justify-center">
                  <Bell size={18} color="#1C1C1C" />
                </Pressable>
              </View>

              {error && (
                <View className="bg-warning-soft rounded-xl px-4 py-3 mb-4">
                  <Text
                    className="text-xs"
                    style={{ fontFamily: "Poppins_400Regular", color: "#8A4A12" }}
                  >
                    {error}
                  </Text>
                </View>
              )}

              <SearchBar value={search} onChangeText={setSearch} />

              <View className="flex-row bg-neutral-soft rounded-full p-1 mt-4">
                <FilterChip
                  label="Toutes"
                  active={filter === "all"}
                  onPress={() => setFilter("all")}
                />
                <FilterChip
                  label="En attente"
                  active={filter === "pending"}
                  onPress={() => setFilter("pending")}
                />
                <FilterChip
                  label="Livré"
                  active={filter === "delivered"}
                  onPress={() => setFilter("delivered")}
                />
              </View>

              <Text
                className="text-primary text-base mt-6 mb-3"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Aperçu du jour
              </Text>

              <View className="flex-row gap-3 mb-6">
                <StatCard
                  icon={<Package size={16} color="#1C1C1C" />}
                  iconBgClass="bg-neutral-soft"
                  value={stats.total}
                  label="Total"
                />
                <StatCard
                  icon={<Clock size={16} color="#8A4A12" />}
                  iconBgClass="bg-warning-soft"
                  value={stats.pending}
                  label="En attente"
                />
                <StatCard
                  icon={<CheckCircle2 size={16} color="#2C5C22" />}
                  iconBgClass="bg-success-soft"
                  value={stats.delivered}
                  label="Livré"
                />
              </View>

              <Text
                className="text-primary text-base mb-3"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Livraisons du jour
              </Text>
            </>
          }
          renderItem={({ item }) => <DeliveryCard delivery={item} />}
          ListEmptyComponent={
            <Text
              className="text-neutral-foreground text-center mt-10"
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              Aucune livraison trouvée.
            </Text>
          }
        />
      </SafeAreaView>

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 84 }]}
        className="bg-accent shadow-lg"
        onPress={() => router.push("/delivery/new")}
        accessibilityRole="button"
        accessibilityLabel="Ajouter une livraison"
      >
        <Plus size={24} color="#1C1C1C" />
      </Pressable>

      <BottomTabBar bottomInset={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  centered: { alignItems: "center", justifyContent: "center" },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={`flex-1 items-center py-2 rounded-full ${
        active ? "bg-surface" : ""
      }`}
      onPress={onPress}
    >
      <Text
        className={active ? "text-primary text-xs" : "text-neutral-foreground text-xs"}
        style={{ fontFamily: active ? "Poppins_600SemiBold" : "Poppins_400Regular" }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function StatCard({
  icon,
  iconBgClass,
  value,
  label,
}: {
  icon: React.ReactNode;
  iconBgClass: string;
  value: number;
  label: string;
}) {
  return (
    <View className="flex-1 bg-surface border border-border rounded-2xl p-3 items-center">
      <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 ${iconBgClass}`}>
        {icon}
      </View>
      <Text className="text-primary text-lg" style={{ fontFamily: "Poppins_600SemiBold" }}>
        {value}
      </Text>
      <Text
        className="text-neutral-foreground text-[11px] mt-0.5"
        style={{ fontFamily: "Poppins_400Regular" }}
      >
        {label}
      </Text>
    </View>
  );
}

function BottomTabBar({ bottomInset }: { bottomInset: number }) {
  return (
    <View
      style={[tabBarStyles.bar, { paddingBottom: bottomInset + 10 }]}
      className="flex-row bg-surface border-t border-border pt-2 px-6"
    >
      <TabBarItem icon={Truck} label="Livraisons" active />
      <TabBarItem icon={History} label="Historique" />
      <TabBarItem icon={User} label="Profil" />
    </View>
  );
}

const tabBarStyles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

function TabBarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof Truck;
  label: string;
  active?: boolean;
}) {
  const color = active ? "#1C1C1C" : "#9C9686";
  return (
    <View className="flex-1 items-center gap-1">
      <Icon size={20} color={color} />
      <Text
        className="text-[11px]"
        style={{
          fontFamily: active ? "Poppins_600SemiBold" : "Poppins_400Regular",
          color,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
