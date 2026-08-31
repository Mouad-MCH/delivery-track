export type DeliveryStatus = "pending" | "delivered";

export interface Delivery {
  _id: string;
  recipientName: string;
  address: string;
  status: DeliveryStatus;
  confirmedAt: string | null; // ISO date string, null tant que pending
  createdAt: string;
  updatedAt: string;
}

// Payload bach ndiro POST (create) - pas besoin d _id, status, dates
export interface CreateDeliveryPayload {
  recipientName: string;
  address: string;
  status?: DeliveryStatus; // optional, "pending" par défaut côté backend
}

// Payload bach ndiro PUT (edit)
export interface UpdateDeliveryPayload {
  recipientName?: string;
  address?: string;
}

// Type dyal navigation params (Expo Router)
export type DeliveryListFilter = "all" | "pending" | "delivered";