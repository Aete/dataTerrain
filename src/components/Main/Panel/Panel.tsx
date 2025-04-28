import styled from "styled-components";
import { bgColor } from "../../../utils/colors";
import { LayerOneState, LayerTwoState } from "../../../atoms";
import { Column } from "../../../types";
import { useRecoilState } from "recoil";
import ControlPanel from "./ControlPanel";

const PanelContainer = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

const RightPanel = styled.div`
  width: 210px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  margin-right: 10px;
`;

export default function Panel() {
  const layerOneRecoilState = useRecoilState(LayerOneState);
  const layerTwoRecoilState = useRecoilState(LayerTwoState);
  return (
    <PanelContainer>
      <RightPanel>
        <ControlPanel
          layer={"Layer 1"}
          layerRecoilState={layerOneRecoilState}
          height={true}
        />
        <ControlPanel
          layer={"Layer 2"}
          layerRecoilState={layerTwoRecoilState}
          height={true}
        />
        <ControlPanel
          layer={"Layer 3"}
          layerRecoilState={layerTwoRecoilState}
          height={false}
        />
      </RightPanel>
    </PanelContainer>
  );
}
