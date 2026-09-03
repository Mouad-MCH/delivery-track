import { useCallback, useEffect, useState } from "react";
import { getAll } from "../services/deliveries";
import { getCachedDeliveries, setCachedDeliveries } from "../storage/deliveryCache";
import type { Delivery } from "../types/delivery.types";

interface UseDeliveriesResult {
  deliveries: Delivery[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  isFromCache: boolean;
  refetch: () => Promise<void>;
}

export function useDeliveries(): UseDeliveriesResult {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const load = useCallback(async (isRefresh: boolean) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await getAll();
      setDeliveries(data);
      setIsFromCache(false);
      setError(null);
      await setCachedDeliveries(data);
    } catch {
      const cached = await getCachedDeliveries();
      if (cached) {
        setDeliveries(cached);
        setIsFromCache(true);
        setError("Impossible de contacter le serveur. Données hors ligne affichées.");
      } else {
        setError("Impossible de récupérer les livraisons.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return { deliveries, loading, refreshing, error, isFromCache, refetch };
}
