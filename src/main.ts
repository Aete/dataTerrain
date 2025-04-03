import { css } from "goober";
import { bgColor } from "./utils/colors";
import Title from "./components/Title";
import Viz from "./components/Viz";
import Description from "./components/Description";

const appStyle = css`
  width: 960px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 80px 10px;
  display: flex;
  flex-direction: column;
  background-color: ${bgColor};
  position: relative;

  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;

  @media (max-width: 960px) {
    width: 100%;
    padding: 50px 50px;
  }
`;

function initApp(app: Element): void {
  app.innerHTML = "";
  app.className = appStyle;

  const $title = Title();
  const $description = Description();
  const $viz = Viz();

  app.appendChild($title);
  app.appendChild($description);
  app.appendChild($viz);
}

initApp(document.getElementById("app") as Element);
