import { css } from "goober";
import { textColor } from "../utils/colors";

const headerStyle = css`
  font-size: 48px;
  font-weight: 500;
  color: ${textColor};
  margin-bottom: 66px;

  @media (max-width: 960px) {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 33px;
  }
`;

export default function Title(): Element {
  const $title = document.createElement("h1");
  $title.className = headerStyle;
  $title.textContent = "DataTerrain";

  return $title;
}
