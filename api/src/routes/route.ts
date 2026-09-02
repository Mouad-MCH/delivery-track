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

export const deliveryRouter = Router();

deliveryRouter.get("/", getDeliveries);

deliveryRouter.get("/:id", validateDeliveryId, getDeliveryById);

deliveryRouter.post("/", validateCreateDelivery, createDelivery);
