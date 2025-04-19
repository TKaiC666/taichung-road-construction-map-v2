import { fetchGovData } from "@/lib/sync/fetchGovData";

async function syncRoadData() {
  const rawGovData = await fetchGovData();
  console.log(rawGovData);
}

syncRoadData().catch((error) => {
  console.error("[script] 發生錯誤：", error);
  process.exit(1);
});
