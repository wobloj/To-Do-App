import app from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 4000;

(async () => {
  await connectDB(process.env.MONGO_URI as string);
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})();