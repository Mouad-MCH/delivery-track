import { model, Schema } from "mongoose";

export type DeliveryStatus = "pending" | "delivered";

export interface Delivery {
  recipientName: string;
  address: string;
  status: DeliveryStatus;
  confirmedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const deliverySchema = new Schema<Delivery>(
  {
    recipientName: {
      type: String,
      required: [true, "Recipient name is required"],
      minlength: [3, "Recipient name must contain at least 3 characters"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [5, "Address must contain at least 5 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "delivered"],
        message: "Status must be either pending or delivered",
      },
      default: "pending",
    },
    confirmedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const DeliveryModel = model<Delivery>("Delivery", deliverySchema);
