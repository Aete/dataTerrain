import styled from "styled-components";
import { useState, useCallback } from "react";

import DeckGL from "@deck.gl/react";
import {
  FlyToInterpolator,
  GeoJsonLayer,
  LineLayer,
  MapViewState,
  ScatterplotLayer,
} from "deck.gl";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// types
import { PointData, SDotData, Column } from "../../types";
import { FeatureCollection } from "geojson";

// custom layers
import ThreeTerrainLayer from "../../Terrain/layers/ThreeTerrainLayer";

// datasets
import seoulBoundary from "../../utils/data/seoul_simplified.json";
import sampleData from "../../utils/data/sample_coord.json";
import { useRecoilValue } from "recoil";
import { LayerOneState, LayerTwoState } from "../../atoms";

const Container = styled.div`
  position: sticky;
  width: 50%;
  min-height: 100vh;
  top: 0;
  right: 0;

  // prevent overscroll-wheel drags from bubbling to the page
  overscroll-behavior: contain;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const Viz: React.FC = () => {
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 0 = left, 1 = middle, 2 = right
    if (e.button === 1) {
      e.preventDefault();
    }
  }, []);

  const layerOneSetting = useRecoilValue(LayerOneState);
  const layerTwoSetting = useRecoilValue(LayerTwoState);

  const layerOnePoints = (sampleData as SDotData[]).map(
    (d: SDotData): PointData => ({
      colorData: d[layerOneSetting.colorColumn],
      heightData: d[layerOneSetting.heightColumn],
      latitude: d[Column.LATITUDE],
      longitude: d[Column.LONGITUDE],
    })
  );

  const layerTwoPoints = (sampleData as SDotData[]).map(
    (d: SDotData): PointData => ({
      colorData: d[layerTwoSetting.colorColumn],
      heightData: d[layerTwoSetting.heightColumn],
      latitude: d[Column.LATITUDE],
      longitude: d[Column.LONGITUDE],
    })
  );

  const [viewState, setViewState] = useState({
    latitude: 37.74133260423905,
    longitude: 126.84686531067668,
    bearing: -35.629453681710224,
    pitch: 47.25535026658767,
    zoom: 9,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  } as MapViewState);

  const SeoulGeoJsonLayer = new GeoJsonLayer({
    id: "seoul-geojson",
    data: seoulBoundary as FeatureCollection,
    pickable: true,
    getLineColor: [255, 255, 255],
    getLineWidth: 100,
    filled: false,
  });

  const TerrainLayer = new ThreeTerrainLayer({
    id: "my-custom-terrain",
    data: layerOnePoints,
    height: 600,
  });

  const TerrainLayerTest = new ThreeTerrainLayer({
    id: "my-custom-terrain-2",
    data: layerTwoPoints,
    height: 1200,
  });

  // handing hovering as a circle on the map
  const [hoverPos, setHoverPos] = useState<[number, number] | null>(null);
  const handleHover = useCallback(
    (info: any) => {
      const coord = info.coordinate || null;
      if (
        !hoverPos ||
        coord === null ||
        coord[0] !== hoverPos[0] ||
        coord[1] !== hoverPos[1]
      ) {
        setHoverPos(coord);
      }
    },
    [hoverPos]
  );
  const HoverCircleLayer = new ScatterplotLayer({
    id: "hover-circle",
    data: hoverPos ? [hoverPos] : [],
    getPosition: (d) => d,
    getRadius: 10,
    radiusMinPixels: 10,
    radiusMaxPixels: 10,
    getFillColor: [255, 255, 255, 100],
    pickable: false,
  });

  const HoverLineLayer = new LineLayer({
    id: "hover-line",
    data: hoverPos ? [hoverPos] : [],
    getSourcePosition: (d) => [d[0], d[1], 0],
    getTargetPosition: (d) => [d[0], d[1], 100000],
    getColor: [255, 255, 255, 180],
    getWidth: 2,
    pickable: false,
    parameters: {
      cullMode: "none",
    },
  });

  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

  const layers = [
    SeoulGeoJsonLayer,
    HoverCircleLayer,
    HoverLineLayer,
    TerrainLayer,
    TerrainLayerTest,
  ];

  return (
    <Container onMouseDown={handleMouseDown}>
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={({ viewState }) =>
          setViewState(viewState as MapViewState)
        }
        onHover={handleHover}
      >
        <Map
          mapboxAccessToken={
            "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA"
          }
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
    </Container>
  );
};

export default Viz;
