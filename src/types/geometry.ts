export type Geometry = {
  type: "Polygon" | "MultiPolygon";
  crs: {
    type: "name";
    properties: {
      name: string; // e.g. "EPSG:4326"
    };
  };
  coordinates: number[][][] | number[][][][];
};
