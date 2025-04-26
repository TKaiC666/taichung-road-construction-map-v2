import { z } from "zod";
import { GeoJSON } from "geojson";
import { TaichungDistrict } from "@/constant/taichungDistrict";

/**
 * open data 回傳的 JSON 是以繁體中文為 key，不確定副作用加上 converter 已經實作。
 * 所以 GovDate 暫時不定義 schema
 */

/**
 * ClientRoadConstruction - 前後端通用格式（駝峰式命名）
 */
export const ClientRoadConstructionSchema = z.object({
  applicationId: z.string(),
  permitId: z.string(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  applicantUnit: z.string(),
  projectName: z.string(),
  caseType: z.string(),
  pipeType: z.string(),
  district: z.enum(TaichungDistrict),
  location: z.string(),
  isStarted: z.boolean(),
  contactName: z.string(),
  contactPhone: z.string(),
  contractorName: z.string(),
  contractorPhone: z.string(),
  lng: z.number(),
  lat: z.number(),
  geometry: z.unknown() as z.ZodType<GeoJSON, any, GeoJSON>, // 這邊不確定要怎麼定義
});

/**
 * DbRoadConstruction - 資料庫使用格式（加強型別，例如 date 轉換成 Date）
 */
const DbTimestampSchema = z.string().datetime();
export const DbRoadConstructionSchema = z.object({
  application_id: z.string(),
  permit_id: z.string(),
  start_date: DbTimestampSchema,
  end_date: DbTimestampSchema,
  applicant_unit: z.string(),
  project_name: z.string(),
  case_type: z.string(),
  pipe_type: z.string(),
  district: z.string(),
  location: z.string(),
  is_started: z.boolean(),
  contact_name: z.string(),
  contact_phone: z.string(),
  contractor_name: z.string(),
  contractor_phone: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  geometry: z.string(), // GEOJson string
});
