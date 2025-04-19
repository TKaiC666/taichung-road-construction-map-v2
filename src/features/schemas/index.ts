import { z } from "zod";

/**
 * TODO: 完成 schema 和 type 定義
 */

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
  startDate: z.string(),
  endDate: z.string(),
  applicantUnit: z.string(),
  caseType: z.string(),
  pipeType: z.string(),
  district: z.string(),
});
export type ClientRoadConstruction = z.infer<
  typeof ClientRoadConstructionSchema
>;

/**
 * DbRoadConstruction - 資料庫使用格式（加強型別，例如 date 轉換成 Date）
 */
export const DbRoadConstructionSchema = z.object({
  applicationId: z.string(),
  permitId: z.string(),
  startDate: z.coerce.date(), // 自動轉換 ISO string 為 Date
  endDate: z.coerce.date(),
  applicantUnit: z.string(),
  caseType: z.string(),
  pipeType: z.string(),
  district: z.string(),
});
export type DbRoadConstruction = z.infer<typeof DbRoadConstructionSchema>;
