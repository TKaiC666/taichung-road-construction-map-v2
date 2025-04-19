import {
  GovChineseKeys,
  DbRoadConstruction,
  ClientRoadConstruction,
} from "@/types/api";

export type GovKeyEntry = {
  zh: GovChineseKeys; // 繁中 key
  dbKey: keyof DbRoadConstruction; // DB key
  field: keyof ClientRoadConstruction; // Client key
};

export const govKeyArr: GovKeyEntry[] = [
  { zh: "申請書編號", dbKey: "application_id", field: "applicationId" },
  { zh: "許可證編號", dbKey: "permit_id", field: "permitId" },
  { zh: "核准起日期", dbKey: "start_date", field: "startDate" },
  { zh: "核准迄日期", dbKey: "end_date", field: "endDate" },
  { zh: "申請單位", dbKey: "applicant_unit", field: "applicantUnit" },
  { zh: "工程名稱", dbKey: "project_name", field: "projectName" },
  { zh: "案件類別", dbKey: "case_type", field: "caseType" },
  { zh: "管線工程類別", dbKey: "pipe_type", field: "pipeType" },
  { zh: "區域名稱", dbKey: "district", field: "district" },
  { zh: "地點", dbKey: "location", field: "location" },
  { zh: "是否開工", dbKey: "is_started", field: "isStarted" },
  { zh: "承辦人", dbKey: "contact_name", field: "contactName" },
  { zh: "承辦人電話", dbKey: "contact_phone", field: "contactPhone" },
  { zh: "廠商名稱", dbKey: "contractor_name", field: "contractorName" },
  { zh: "廠商電話", dbKey: "contractor_phone", field: "contractorPhone" },
  { zh: "經度", dbKey: "longitude", field: "lng" },
  { zh: "緯度", dbKey: "latitude", field: "lat" },
  { zh: "施工範圍坐標", dbKey: "geometry", field: "geometry" },
] as const;
