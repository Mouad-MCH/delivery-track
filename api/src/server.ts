import "dotenv/config";
import { app } from "./app";
import { connectToDatabase } from "./config/database";

const port = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`API server is running on port ${port}`);
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown startup error";

    console.error(`Failed to start the API: ${message}`);
    process.exit(1);
  }
}

void startServer();
