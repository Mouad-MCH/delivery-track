import express from "express";
import { deliveryRouter } from "./routes/route";
import { errorHandler } from "./middleware/error.middleware";
export const app = express();

app.use(express.json());
app.use("/api/deliveries", deliveryRouter);
app.use(errorHandler);
