import { useEffect, useRef } from "react";
import { Deck, MapView } from "@deck.gl/core";
import ThreeTerrainLayer from "../Terrain/layers/ThreeTerrainLayer";
import type { PointData } from "../types";

export default function useDeckTerrain(data: PointData[]) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const layer = new ThreeTerrainLayer({ data });
    const mapView = new MapView({ id: "main", repeat: true });
    const deck = new Deck({
      container: ref.current,
      width: "100%",
      height: "100%",
      views: [mapView],
      // 뷰 id인 "main"을 키로 써야 합니다
      initialViewState: {
        main: {
          longitude: 126.978,
          latitude: 37.5665,
          zoom: 8,
          pitch: 45,
          bearing: 0,
        },
      },
      controller: true,
      layers: [layer],
    });
    return () => deck.finalize();
  }, [data]);

  return ref;
}
