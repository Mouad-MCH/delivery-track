import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Delivery } from "../types/delivery.types";

const CACHE_KEY = "deliveries_cache";

export async function getCachedDeliveries(): Promise<Delivery[] | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Delivery[];
  } catch {
    return null;
  }
}

export async function setCachedDeliveries(deliveries: Delivery[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(deliveries));
  } catch {
    // ignore write failures (e.g. storage quota) — cache is a best-effort fallback
  }
}
