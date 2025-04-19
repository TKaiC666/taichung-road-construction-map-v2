import { wktToGeoJSON } from "@terraformer/wkt";
import {
  GovRoadConstruction,
  DbRoadConstruction,
  ClientRoadConstruction,
} from "@/types/api";
import { TaichungDistrict } from "@/constant/taichungDistrict";
import { parseROCDate, parseBoolean } from "@/utils";

// Gov → Client
function mapGovToClient(gov: GovRoadConstruction): ClientRoadConstruction {
  const rawStartDate = parseROCDate(gov["核准起日期"]);
  const rawEndDate = parseROCDate(gov["核准迄日期"]);

  if (!rawStartDate || !rawEndDate) {
    console.warn("[mapGovToClient] 缺少日期資料", gov);
  }

  return {
    applicationId: gov["申請書編號"],
    permitId: gov["許可證編號"],
    startDate: rawStartDate,
    endDate: rawEndDate,
    applicantUnit: gov["申請單位"],
    caseType: gov["案件類別"],
    pipeType: gov["管線工程類別"],
    district: gov["區域名稱"] as TaichungDistrict,
    projectName: gov["工程名稱"],
    location: gov["地點"],
    isStarted: parseBoolean(gov["是否開工"]),
    contactName: gov["承辦人"],
    contactPhone: gov["承辦人電話"],
    contractorName: gov["廠商名稱"],
    contractorPhone: gov["廠商電話"],
    lng: Number(gov["經度"]),
    lat: Number(gov["緯度"]),
    geometry: wktToGeoJSON(gov["施工範圍坐標"]),
  };
}

// Client → DB
function mapClientToDb(client: ClientRoadConstruction): DbRoadConstruction {
  return DbRoadConstructionSchema.parse({
    ...client,
    // 確保日期轉成 JS Date 型別
    startDate: client.startDate,
    endDate: client.endDate,
  });
}

// DB → Client
function mapDbToClient(db: DbRoadConstruction): ClientRoadConstruction {
  return {
    ...db,
    startDate: db.startDate.toISOString().slice(0, 10),
    endDate: db.endDate.toISOString().slice(0, 10),
  };
}
