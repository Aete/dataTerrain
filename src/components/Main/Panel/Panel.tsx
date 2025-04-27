import styled from "styled-components";
import { bgColor } from "../../../utils/colors";
import { LayerOneState, LayerTwoState } from "../../../atoms";
import { Column } from "../../../types";
import { useRecoilState } from "recoil";

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

export default function Panel() {
  return (
    <PanelContainer>
      <TestSelection />
    </PanelContainer>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  & h2 {
    font-size: 24px;
    color: #fff;
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

const Select = styled.select`
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-bottom: 16px;
  width: 150px;
`;

function TestSelection() {
  const [layerOneState, setLayerOneState] = useRecoilState(LayerOneState);
  const [layerTwoState, setLayerTwoState] = useRecoilState(LayerTwoState);

  return (
    <>
      <Section>
        <h2>Layer 1</h2>
        <Label>Color by:</Label>
        <Select
          id="layer1-color"
          value={layerOneState.colorColumn}
          onChange={(e) => {
            setLayerOneState((prev) => ({
              ...prev,
              colorColumn: e.target.value as Column,
            }));
          }}
        >
          <option value={Column.TEMPERATURE}>Temperature(℃)</option>
          <option value={Column.HUMIDITY}>Humidity</option>
        </Select>
        <Label>Height by:</Label>
        <Select
          id="layer1-height"
          value={layerOneState.heightColumn}
          onChange={(e) => {
            setLayerOneState((prev) => ({
              ...prev,
              heightColumn: e.target.value as Column,
            }));
          }}
        >
          <option value={Column.TEMPERATURE}>Temperature (℃)</option>
          <option value={Column.HUMIDITY}>Humidity</option>
        </Select>
      </Section>
      <Section>
        <h2>Layer 2</h2>
        <Label>Color by:</Label>
        <Select
          id="layer2-color"
          value={layerTwoState.colorColumn}
          onChange={(e) => {
            setLayerTwoState((prev) => ({
              ...prev,
              colorColumn: e.target.value as Column,
            }));
          }}
        >
          <option value={Column.TEMPERATURE}>Temperature(℃)</option>
          <option value={Column.HUMIDITY}>Humidity</option>
        </Select>
        <Label>Height by:</Label>
        <Select
          id="layer2-height"
          value={layerTwoState.heightColumn}
          onChange={(e) => {
            setLayerTwoState((prev) => ({
              ...prev,
              heightColumn: e.target.value as Column,
            }));
          }}
        >
          <option value={Column.TEMPERATURE}>Temperature (℃)</option>
          <option value={Column.HUMIDITY}>Humidity</option>
        </Select>
      </Section>
    </>
  );
}
