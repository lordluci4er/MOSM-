import app from "./app";
import env from "./config/env";
import "./config/firebase"; // Firebase Admin initialize
import prisma from "./config/prisma";

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database Connected");

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database");
    console.error(error);
    process.exit(1);
  }
}

startServer();