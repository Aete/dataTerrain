export interface SDotData {
  temp_celsius: number;
  humidity: number;
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
  LATITUDE = "latitude",
  LONGITUDE = "longitude",
}

export type LayerState = {
  colorColumn: Column;
  heightColumn: Column;
};
