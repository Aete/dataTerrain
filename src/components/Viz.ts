import { css } from "goober";
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

  const terrain = new Terrain($container);
  terrain.render();

  return $container;
}
