export interface SDotData {
  temp_celsius: number;
  humidity: number;
  defacto_pop: number;
  latitude: number;
  longitude: number;
}

export interface PointData {
  heightData: number;
  colorData: number;
  longitude: number;
  latitude: number;
}

export enum Column {
  TEMPERATURE = "temp_celsius",
  HUMIDITY = "humidity",
  DEFACTO = "defacto_pop",
  LATITUDE = "latitude",
  LONGITUDE = "longitude",
}

export type LayerState = {
  colorColumn: Column;
  heightColumn: Column;
};
