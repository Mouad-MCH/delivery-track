import { Router } from "express";
import {
  createDelivery,
  getDeliveries,
  getDeliveryById,
} from "../controller/delivery.controller";

import {
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

deliveryRouter.delete("/deliveries/:id", validation, deletDelivery);
