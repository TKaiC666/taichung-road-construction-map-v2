import { wktToGeoJSON } from "@terraformer/wkt";
import {
  GovRoadConstruction,
  ClientRoadConstruction,
  DbRoadConstruction,
} from "@/types";
import {
  ClientRoadConstructionSchema,
  DbRoadConstructionSchema,
} from "@/features/schemas";
import { govKeyArr } from "@/constant/govKeyArr";
import { parseBoolean, parseROCDate } from "@/utils";
import { TaichungDistrict } from "@/constant/taichungDistrict";

function mapGovToClient(gov: GovRoadConstruction): ClientRoadConstruction {
  const result: Partial<ClientRoadConstruction> = {};
  govKeyArr.forEach(({ zh, field }) => {
    const rawValue = gov[zh]; // 依照 gov 型別，key 為中文
    if (rawValue === undefined || rawValue === null || rawValue === "") {
      (result as any)[field] = null; // 將未找到的 key 設為 null
      return; // 如果沒有值，則跳過這個欄位
    }

    if (field === "geometry") {
      try {
        (result as any)[field] = wktToGeoJSON(rawValue);
      } catch (e) {
        throw new Error(`Invalid WKT format for field [${zh}]: ${rawValue}`);
      }
    }
    // 根據欄位名稱做特殊處理
    switch (field) {
      case "startDate":
      case "endDate":
        (result as any)[field] = parseROCDate(rawValue);
        break;
      case "isStarted":
        (result as any)[field] = parseBoolean(rawValue);
        break;
      case "lng":
      case "lat":
        (result as any)[field] = Number(rawValue);
        break;
      case "geometry":
        break; // geometry 已經在上面處理過了
      default:
        (result as any)[field] = rawValue;
        break;
    }
  });

  // 驗證轉換結果並拋出錯誤（若格式錯誤）
  const parsedData = ClientRoadConstructionSchema.parse(result);
  return parsedData;
}

export function mapGovToClientList(
  govList: GovRoadConstruction[]
): ClientRoadConstruction[] {
  return govList.map((gov) => mapGovToClient(gov));
}

function mapClientToDb(client: ClientRoadConstruction): DbRoadConstruction {
  const dbData: Partial<DbRoadConstruction> = {};

  govKeyArr.forEach(({ dbKey, field }) => {
    const value = client[field as keyof ClientRoadConstruction];
    if (value !== undefined) {
      // 處理日期：如果存在，轉成 ISO 字串；否則用預設值（可依情境調整）
      if (field === "startDate" || field === "endDate") {
        (dbData as any)[dbKey] = value
          ? (value as Date).toISOString()
          : new Date(0).toISOString();
      }
      // 處理 geometry：將物件 JSON.stringify 後儲存
      else if (field === "geometry") {
        (dbData as any)[dbKey] = JSON.stringify(value);
      }
      // 其他欄位直接賦值（包含 number、boolean、string 等）
      else {
        (dbData as any)[dbKey] = value;
      }
    } else {
      console.warn(`Client value not found for field: ${field}`);
    }
  });

  // 驗證 DB 格式資料，確保格式正確
  const parsed = DbRoadConstructionSchema.parse(dbData);
  return parsed;
}

export function mapClientToDbList(
  clientList: ClientRoadConstruction[]
): DbRoadConstruction[] {
  return clientList.map((client) => mapClientToDb(client));
}

/**
 * (選用) 如果有需要把 DB 轉回 Client 格式，可使用此 function
 */
export function mapDbToClient(db: DbRoadConstruction): ClientRoadConstruction {
  return {
    applicationId: db.application_id,
    permitId: db.permit_id,
    startDate: !!db.start_date ? new Date(db.start_date) : null,
    endDate: !!db.end_date ? new Date(db.end_date) : null,
    applicantUnit: db.applicant_unit,
    projectName: db.project_name,
    caseType: db.case_type,
    pipeType: db.pipe_type,
    district: db.district as (typeof TaichungDistrict)[number],
    location: db.location,
    isStarted: db.is_started,
    contactName: db.contact_name,
    contactPhone: db.contact_phone,
    contractorName: db.contractor_name,
    contractorPhone: db.contractor_phone,
    lng: db.longitude,
    lat: db.latitude,
    geometry: !!db.geometry ? JSON.parse(db.geometry) : null,
  };
}
