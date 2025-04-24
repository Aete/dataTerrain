import styled from "styled-components";
import { useState } from "react";
import sampledata from "../utils/data/sample_coord.json";
import { PointData, SDotData } from "../types";
import ThreeTerrainLayer from "../Terrain/layers/ThreeTerrainLayer";
import DeckGL from "@deck.gl/react";
import { FlyToInterpolator } from "deck.gl";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

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
  });

  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

  const layers = [new ThreeTerrainLayer({ data: points })];

  return (
    <Container>
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
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
