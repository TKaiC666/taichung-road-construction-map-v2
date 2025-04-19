import dotenv from "dotenv";
import path from "path";
import { fetchGovData } from "../lib/sync/fetchGovData";

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(
  process.cwd(),
  `.env.${env === "development" ? "local" : env}`
);

dotenv.config({ path: envPath }); // Load environment variables from .env file

async function syncRoadData() {
  const rawGovData = await fetchGovData();
  console.log(rawGovData);
}

syncRoadData().catch((error) => {
  console.error("[script] 發生錯誤：", error);
  process.exit(1);
});
