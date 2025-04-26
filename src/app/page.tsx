import { createClient } from "@/lib/supabase";
import { wktToGeoJSON } from "@terraformer/wkt";
import { fetchGovData } from "@/features/services/fetchGovData";

export default async function HomePage() {
  // const supabase = await createClient();
  // const { data } = await supabase.from("dev_road_constructions").select();
  // console.log(process.env.SUPABASE_URL);
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
  const WKT =
    "POLYGON  (( 120.67941779 24.15962154, 120.67942375 24.15961972, 120.67942375 24.15961610, 120.67942375 24.15960522, 120.67946547 24.15960522, 120.67946547 24.15955899, 120.67948931 24.15955899, 120.67948931 24.15961882, 120.67942401 24.15962130, 120.67942375 24.15962154, 120.67942375 24.15962131, 120.67941779 24.15962154))";
  // await fetchGovData().then((data) => {
  // console.log("[script] 同步資料成功：", data, "\n");
  // 將資料轉換成 Client 格式
  // const clientData = mapGovToClient(data[0]);
  // console.log("page");
  // console.log("[script] 轉換成 Client 格式：", clientData.geometry);
  // console.log(wktToGeoJSON(data[0]["施工範圍坐標"]));
  // });
  return <></>;
}
