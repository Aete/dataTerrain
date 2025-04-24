import React from "react";
import styled from "styled-components";
import sampledata from "../utils/data/sample_coord.json";
import Terrain from "../Terrain";

interface SDotData {
  temp_celsius: number;
  humidity: number;
  latitude: number;
  longitude: number;
}

interface PointData {
  value: number;
  value2: number;
  longitude: number;
  latitude: number;
}

const Container = styled.div`
  display: flex;
  width: 900px;
  height: 600px;
  align-items: center;
  justify-content: center;
`;

const Viz: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const terrain = new Terrain(
        containerRef.current,
        sampledata.map(
          (d: SDotData): PointData => ({
            value: d.temp_celsius,
            value2: d.humidity,
            latitude: d.latitude,
            longitude: d.longitude,
          })
        )
      );
      terrain.render();
    }
  }, []);

  return <Container ref={containerRef} />;
};

export default Viz;
