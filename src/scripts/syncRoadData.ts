import dotenv from "dotenv";
import path from "path";
import { fetchGovData } from "@/features/services/fetchGovData";
import { mapGovToClientList, mapClientToDbList } from "@/features/utils";
import { upsertDataToDb } from "@/features/services/dbService";

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(
  process.cwd(),
  `.env.${env === "development" ? "local" : env}`
);

dotenv.config({ path: envPath });

const isDryRun = process.argv.includes("--dry-run"); // 🧹 支援 dry-run 模式

fetchGovData()
  .then((govData) => {
    console.log("[script] start convert data from gov to client");
    return govData;
  })
  .then(mapGovToClientList)
  .then((clientData) => {
    console.log("[script] start convert data from client to db");
    return clientData;
  })
  .then(mapClientToDbList)
  .then(async (dbData) => {
    console.log(`[script] 共轉換 ${dbData.length} 筆資料`);

    if (isDryRun) {
      console.log("[script] --dry-run 模式啟動，資料未寫入 DB");
      return;
    }

    console.log("[script] start sync data to db");
    const { success, failed } = await upsertDataToDb(dbData);

    console.log(`[script] ✅ 成功寫入 ${success} 筆資料`);
    if (failed > 0) {
      console.warn(`[script] ⚠️ 寫入失敗 ${failed} 筆資料`);
    }
  })
  .then(() => {
    console.log("[script] ✅ 資料同步流程完成");
    process.exit(0);
  })
  .catch((error) => {
    console.error("[script] ❌ 發生錯誤：", error);
    process.exit(1);
  });
