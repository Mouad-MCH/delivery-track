export type DeliveryStatus = "pending" | "delivered";

export interface Delivery {
  _id: string;
  recipientName: string;
  address: string;
  status: DeliveryStatus;
  confirmedAt: string | null; 
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeliveryPayload {
  recipientName: string;
  address: string;
  status?: DeliveryStatus;
}

export interface UpdateDeliveryPayload {
  recipientName?: string;
  address?: string;
}

export type DeliveryListFilter = "all" | "pending" | "delivered";