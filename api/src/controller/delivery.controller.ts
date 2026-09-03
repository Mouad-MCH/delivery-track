import { NextFunction, Request, Response } from "express";
import { DeliveryModel, DeliveryStatus } from "../models/delivery.model";

interface ValidatedCreateDeliveryBody {
  recipientName: string;
  address: string;
  status: DeliveryStatus;
}

interface ConfirmDeliveryBody {
  address?: string;
}

export async function getDeliveries(
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const deliveries = await DeliveryModel.find();

    response.status(200).json(deliveries);
  } catch (error: unknown) {
    next(error);
  }
}

export async function getDeliveryById(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = request.params;

    const delivery = await DeliveryModel.findById(id);

    if (!delivery) {
      response.status(404).json({
        message: "Delivery not found",
      });
      return;
    }

    response.status(200).json(delivery);
  } catch (error: unknown) {
    next(error);
  }
}

export async function createDelivery(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = request.body as ValidatedCreateDeliveryBody;
    const { recipientName, address, status } = body;

    const delivery = await DeliveryModel.create({
      recipientName,
      address,
      status,
      confirmedAt: null,
    });

    response.status(201).json(delivery);
  } catch (error: unknown) {
    next(error);
  }
}

export async function putDelivery(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find delivery
    const findDelivery = await DeliveryModel.findById(id);

    if (!findDelivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    // Update delivery
    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Delivery updated successfully",
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function deletDelivery(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const findDelivery = await DeliveryModel.findById(id);
    if (!findDelivery) {
      return res.status(400).json({
        message: "not find",
      });
    }
    const deletDelivery = await DeliveryModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Delivery deleted successfully",
      delivery: deletDelivery,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
export async function confirmDelivery(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = request.params;
    const body = request.body as ConfirmDeliveryBody;

    const delivery = await DeliveryModel.findById(id);

    if (!delivery) {
      response.status(404).json({
        message: "Delivery not found",
      });
      return;
    }

    if (delivery.status === "delivered") {
      response.status(400).json({
        message: "Delivery is already confirmed",
      });
      return;
    }

    if (body.address !== undefined) {
      delivery.address = body.address;
    }

    delivery.status = "delivered";
    delivery.confirmedAt = new Date();

    await delivery.save();

    response.status(200).json(delivery);
  } catch (error: unknown) {
    next(error);
  }
}
