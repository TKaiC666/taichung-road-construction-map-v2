import { GovChineseKeys } from "@/types/api";

export const govKeyMap: Record<string, GovChineseKeys> = {
  application_id: "申請書編號",
  permit_id: "許可證編號",
  start_date: "核准起日期",
  end_date: "核准迄日期",
  applicant_unit: "申請單位",
  project_name: "工程名稱",
  case_type: "案件類別",
  pipe_type: "管線工程類別",
  district: "區域名稱",
  location: "地點",
  is_started: "是否開工",
  contact_name: "承辦人",
  contact_phone: "承辦人電話",
  contractor_name: "廠商名稱",
  contractor_phone: "廠商電話",
  longitude: "經度",
  latitude: "緯度",
  geometry: "施工範圍坐標",
} as const;
