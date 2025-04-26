import { createClient } from "@supabase/supabase-js";
import { DbRoadConstruction } from "@/types";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

const TABLE_NAME = "dev_road_constructions";
const BATCH_SIZE = 500;

/**
 * 批次 upsert 路工程資料到 Supabase
 * @param data - 要寫入的 DbRoadConstruction 資料陣列
 */
export async function upsertDataToDb(data: DbRoadConstruction[]) {
  if (data.length === 0) {
    console.warn("[dbService] 沒有資料需要同步，略過 upsert");
    return { success: 0, failed: 0 };
  }

  console.log(`[dbService] 開始 upsert ${data.length} 筆資料`);

  let successCount = 0;
  let failedCount = 0;

  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);

    console.log(
      `[dbService] Upserting batch ${i / BATCH_SIZE + 1}, ${batch.length} 筆`
    );

    const { error } = await supabase
      .from("road_construction") // <-- 改成你的表名
      .upsert(batch, {
        onConflict: "application_id",
        ignoreDuplicates: false,
      });

    if (error) {
      console.error(
        `[dbService] Batch ${i / BATCH_SIZE + 1} upsert 失敗：`,
        error.message
      );
      failedCount += batch.length;
    } else {
      successCount += batch.length;
    }
  }

  return { success: successCount, failed: failedCount };
}
