import { Geometry } from "./geometry";
import { TaichungDistrict } from "@/constant/TaichungDistrict";

export type GovChineseKeys =
  | "申請書編號"
  | "許可證編號"
  | "核准起日期"
  | "核准迄日期"
  | "申請單位"
  | "工程名稱"
  | "案件類別"
  | "管線工程類別"
  | "區域名稱"
  | "地點"
  | "是否開工"
  | "承辦人"
  | "承辦人電話"
  | "廠商名稱"
  | "廠商電話"
  | "經度"
  | "緯度"
  | "施工範圍坐標";
export type GovRoadConstruction = Record<GovChineseKeys, string>;

export type DbRoadConstruction = {
  id?: string; // UUID, server generated
  imported_at?: number; // Unix timestamp, server generated
  application_id: string;
  permit_id: string;
  start_date: string;
  end_date: string;
  applicant_unit: string;
  project_name: string;
  case_type: string;
  pipe_type: string;
  district: TaichungDistrict;
  location: string;
  is_started: boolean;
  contact_name: string;
  contact_phone: string;
  contractor_name: string;
  contractor_phone: string;
  longitude: number;
  latitude: number;
  geometry: string;
};

export type ClientRoadConstruction = {
  applicationId: string;
  permitId: string;
  startDate: Date | null;
  endDate: Date | null;
  applicantUnit: string;
  projectName: string;
  caseType: string;
  pipeType: string;
  district: TaichungDistrict;
  location: string;
  isStarted: boolean;
  contactName: string;
  contactPhone: string;
  contractorName: string;
  contractorPhone: string;
  lng: number;
  lat: number;
  geometry: Geometry;
};
