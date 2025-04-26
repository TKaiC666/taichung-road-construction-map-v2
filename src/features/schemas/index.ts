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
  applicationId: z.string().nullable(),
  permitId: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  applicantUnit: z.string().nullable(),
  projectName: z.string().nullable(),
  caseType: z.string().nullable(),
  pipeType: z.string().nullable(),
  district: z.enum(TaichungDistrict).nullable(),
  location: z.string().nullable(),
  isStarted: z.boolean().nullable(),
  contactName: z.string().nullable(),
  contactPhone: z.string().nullable(),
  contractorName: z.string().nullable(),
  contractorPhone: z.string().nullable(),
  lng: z.number().nullable(),
  lat: z.number().nullable(),
  geometry: z.unknown().nullable() as z.ZodType<GeoJSON, any, GeoJSON>, // 這邊不確定要怎麼定義
});

/**
 * DbRoadConstruction - 資料庫使用格式（加強型別，例如 date 轉換成 Date）
 */
const DbTimestampSchema = z.string().datetime().nullable();
export const DbRoadConstructionSchema = z.object({
  application_id: z.string().nullable(),
  permit_id: z.string().nullable(),
  start_date: DbTimestampSchema,
  end_date: DbTimestampSchema,
  applicant_unit: z.string().nullable(),
  project_name: z.string().nullable(),
  case_type: z.string().nullable(),
  pipe_type: z.string().nullable(),
  district: z.string().nullable(),
  location: z.string().nullable(),
  is_started: z.boolean().nullable(),
  contact_name: z.string().nullable(),
  contact_phone: z.string().nullable(),
  contractor_name: z.string().nullable(),
  contractor_phone: z.string().nullable(),
  longitude: z.number().nullable(),
  latitude: z.number().nullable(),
  geometry: z.string().nullable(), // GEOJson string
});
