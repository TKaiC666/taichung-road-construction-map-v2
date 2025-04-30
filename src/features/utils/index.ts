import { createHash } from "crypto";
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
    const rawValue = gov[zh];
    const isUnavailableValue =
      rawValue === undefined || rawValue === null || rawValue === "";

    // 如果有無效值，則設為 null
    if (isUnavailableValue) {
      (result as any)[field] = null;
      return; // skip
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
    const isUnavailableValue =
      value === undefined || value === null || value === "";
    const isGeometryCoordinatesEmpty =
      field === "geometry" &&
      !!value &&
      (value as GeoJSON.Polygon | GeoJSON.MultiPolygon).coordinates.length ===
        0;

    // 如果有無效值或 geometry 的 coordinate array 沒有座標，則設為 null
    if (isUnavailableValue || isGeometryCoordinatesEmpty) {
      (dbData as any)[dbKey] = null;
      return; // skip
    }

    switch (field) {
      case "startDate":
      case "endDate":
        (dbData as any)[dbKey] = value
          ? (value as Date).toISOString()
          : new Date(0).toISOString(); // 預設值可依情境調整
        break;
      case "geometry":
        (dbData as any)[dbKey] = JSON.stringify(value);
        break;
      default:
        (dbData as any)[dbKey] = value;
        break;
    }
  });

  const parsedData = DbRoadConstructionSchema.parse(dbData);
  return parsedData;
}

export function mapClientToDbList(
  clientList: ClientRoadConstruction[]
): DbRoadConstruction[] {
  return clientList.map((client) => mapClientToDb(client));
}

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

export function generateFingerprintV1(
  data: Pick<ClientRoadConstruction, "applicantUnit" | "permitId">
): string {
  if (!data.applicantUnit || !data.permitId) {
    throw new Error("Missing required fields for fingerprint generation");
  }
  const VERSION = "v1";
  const secret = [VERSION, data.applicantUnit, data.permitId].join("|");
  const hash = createHash("sha256").update(secret).digest("hex");

  return hash;
}
