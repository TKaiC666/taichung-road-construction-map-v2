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
