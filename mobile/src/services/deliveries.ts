import { api } from "../api/client";
import {
  Delivery,
  CreateDeliveryPayload,
  UpdateDeliveryPayload,
} from "../types/delivery.types";

// Get one delivery
export const getDelivery = async (id: string): Promise<Delivery> => {
  const response = await api.get(`/deliveries/${id}`);
  return response.data;
};

// Create a delivery
export const createDelivery = async (
  data: CreateDeliveryPayload
): Promise<Delivery> => {
  const response = await api.post("/deliveries", data);
  return response.data;
};

// Update a delivery
export const updateDelivery = async (
  id: string,
  data: UpdateDeliveryPayload
): Promise<Delivery> => {
  const response = await api.put(`/deliveries/${id}`, data);
  return response.data;
};

// Delete a delivery
export const deleteDelivery = async (id: string): Promise<void> => {
  await api.delete(`/deliveries/${id}`);
};

// Confirm a delivery
export const confirmDelivery = async (id: string): Promise<Delivery> => {
  const response = await api.patch(`/deliveries/${id}/confirm`);
  return response.data;
};