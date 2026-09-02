import { api } from "../api/client";
import type {
  CreateDeliveryPayload,
  Delivery,
  UpdateDeliveryPayload,
} from "../types/delivery.types";

export async function getAll(): Promise<Delivery[]> {
  const { data } = await api.get<Delivery[]>("/deliveries");
  return data;
}

export async function getById(id: string): Promise<Delivery> {
  const { data } = await api.get<Delivery>(`/deliveries/${id}`);
  return data;
}

export async function create(payload: CreateDeliveryPayload): Promise<Delivery> {
  const { data } = await api.post<Delivery>("/deliveries", payload);
  return data;
}

export async function update(
  id: string,
  payload: UpdateDeliveryPayload
): Promise<Delivery> {
  const { data } = await api.put<Delivery>(`/deliveries/${id}`, payload);
  return data;
}

export async function confirm(id: string): Promise<Delivery> {
  const { data } = await api.patch<Delivery>(`/deliveries/${id}/confirm`);
  return data;
}

export async function remove(id: string): Promise<void> {
  await api.delete(`/deliveries/${id}`);
}
