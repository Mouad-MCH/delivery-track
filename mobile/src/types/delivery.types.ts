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