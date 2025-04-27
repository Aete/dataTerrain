import { atom, selector } from "recoil";
import { Column, LayerState } from "../types";
import sampledata from "../utils/data/sample_coord.json";
import type { SDotData, PointData } from "../types";

export const LayerOneState = atom<LayerState>({
  key: "layerOneState",
  default: {
    colorColumn: Column.TEMPERATURE,
    heightColumn: Column.HUMIDITY,
  },
});

export const LayerTwoState = atom<LayerState>({
  key: "layerTwoState",
  default: {
    colorColumn: Column.HUMIDITY,
    heightColumn: Column.TEMPERATURE,
  },
});

export const LayerOneDataState = selector<PointData[]>({
  key: "layerOneDataState",
  get: ({ get }) => {
    const { colorColumn, heightColumn } = get(LayerOneState);
    return (sampledata as SDotData[]).map((d: SDotData) => ({
      colorData: d[colorColumn],
      heightData: d[heightColumn],
      latitude: d[Column.LATITUDE],
      longitude: d[Column.LONGITUDE],
    }));
  },
});

export const LayerTwoDataState = selector<PointData[]>({
  key: "layerTwoDataState",
  get: ({ get }) => {
    const { colorColumn, heightColumn } = get(LayerTwoState);
    return (sampledata as SDotData[]).map((d: SDotData) => ({
      colorData: d[colorColumn],
      heightData: d[heightColumn],
      latitude: d[Column.LATITUDE],
      longitude: d[Column.LONGITUDE],
    }));
  },
});
