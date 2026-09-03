import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

interface CreateDeliveryBody {
  recipientName?: unknown;
  address?: unknown;
  status?: unknown;
}

  interface ConfirmDeliveryBody {
    address?: unknown;
  }

export function validateCreateDelivery(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const body = request.body as CreateDeliveryBody;
  const { recipientName, address, status } = body;

  if (typeof recipientName !== "string" || recipientName.trim().length < 3) {
    response.status(400).json({
      message: "Recipient name must contain at least 3 characters",
    });
    return;
  }

  if (typeof address !== "string" || address.trim().length < 5) {
    response.status(400).json({
      message: "Address must contain at least 5 characters",
    });
    return;
  }

  if (status !== undefined && status !== "pending" && status !== "delivered") {
    response.status(400).json({
      message: "Status must be either pending or delivered",
    });
    return;
  }

  // Save clean, validated values for the controller.
  request.body = {
    recipientName: recipientName.trim(),
    address: address.trim(),
    status: status ?? "pending",
  };

  next();
}

export function validateDeliveryId(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { id } = request.params;

  if (!mongoose.isValidObjectId(id)) {
    response.status(400).json({
      message: "Invalid delivery ID",
    });
    return;
  }

  next();
}

  export function validateConfirmDelivery(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const body = request.body as ConfirmDeliveryBody;
    const { address } = body;

    if (
      address !== undefined &&
      (typeof address !== "string" || address.trim().length < 5)
    ) {
      response.status(400).json({
        message: "Address must contain at least 5 characters",
      });
      return;
    }

    request.body = {
      address: typeof address === "string" ? address.trim() : undefined,
    };

    next();
  }
