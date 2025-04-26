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
import { PointData, SDotData } from "../types";
import { FeatureCollection } from "geojson";

// custom layers
import ThreeTerrainLayer from "../Terrain/layers/ThreeTerrainLayer";

// datasets
import sampledata from "../utils/data/sample_coord.json";
import seoulBoundary from "../utils/data/seoul_simplified.json";

const Container = styled.div`
  width: 900px;
  height: 600px;
`;

const Viz: React.FC = () => {
  const points: PointData[] = sampledata.map((d: SDotData) => ({
    colorData: d.humidity,
    heightData: d.temp_celsius,
    latitude: d.latitude,
    longitude: d.longitude,
  }));

  const [viewState, setViewState] = useState({
    latitude: 37.5663,
    longitude: 126.98,
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
    data: points,
  });

  // handing hovering as a circle on the map
  const [hoverPos, setHoverPos] = useState<[number, number] | null>(null);
  const handleHover = useCallback(
    (info: any) => {
      if (info.coordinate) {
        setHoverPos(info.coordinate);
      } else {
        setHoverPos(null);
      }
    },
    [setHoverPos]
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
  ];

  return (
    <Container>
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
