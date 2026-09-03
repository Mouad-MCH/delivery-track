import { Router } from "express";
import {
  confirmDelivery,
  createDelivery,
  getDeliveries,
  getDeliveryById,
} from "../controller/delivery.controller";

import {
  validateConfirmDelivery,
  validateCreateDelivery,
  validateDeliveryId,
} from "../middleware/deliveryValidation.middleware";

export const deliveryRouter = Router();

deliveryRouter.get("/", getDeliveries);

deliveryRouter.get("/:id", validateDeliveryId, getDeliveryById);

deliveryRouter.post("/", validateCreateDelivery, createDelivery);

deliveryRouter.patch(
  "/:id/confirm",
  validateDeliveryId,
  validateConfirmDelivery,
  confirmDelivery,
);
