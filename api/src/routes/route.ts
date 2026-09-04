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
import { deletDelivery, putDelivery } from "../controller/delivery.controller.js";
import { validation } from "../utils/server-side validation.js";

export const deliveryRouter = Router();

deliveryRouter.get("/", getDeliveries);

deliveryRouter.get("/:id", validateDeliveryId, getDeliveryById);

deliveryRouter.post("/", validateCreateDelivery, createDelivery);

deliveryRouter.put("/deliveries/:id", validation, putDelivery);

deliveryRouter.delete("/deliveries/:id", deletDelivery);
deliveryRouter.patch(
  "/:id/confirm",
  validateDeliveryId,
  validateConfirmDelivery,
  confirmDelivery,
);
