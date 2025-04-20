import { css } from "goober";
import sampledata from "../utils/data/sample_coord.json";
import Terrain from "../Terrain";

const containerStyle = css`
  display: flex;
  width: 900px;
  height: 600px;

  align-items: center;
  justify-content: center;
`;

export default function Viz(): Element {
  const $container = document.createElement("div");
  $container.className = containerStyle;

  const terrain = new Terrain(
    $container,
    sampledata.map((d) => {
      return {
        value: d.temp_celsius,
        latitude: d.latitude,
        longitude: d.longitude,
      };
    })
  );
  terrain.render();

  return $container;
}
