import styled from "styled-components";
import { bgColor } from "../../../utils/colors";

const PanelContainer = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
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

const Panel = () => {
  return <PanelContainer>Panel</PanelContainer>;
};

export default Panel;
