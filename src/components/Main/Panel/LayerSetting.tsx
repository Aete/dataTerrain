import styled from "styled-components";
import { Column, LayerState } from "../../../types";
import { SetterOrUpdater } from "recoil";

const LayerSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 200px;
  box-sizing: border-box;

  & h2 {
    font-size: 16px;
    font-weight: 500;
    color: #ccc;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #ccc;
`;

const Select = styled.select`
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #000;
  color: #ccc;
  margin-bottom: 16px;
  width: 150px;

  & option {
    background-color: #000;
    color: #ccc;
  }

  &:focus {
    background-color: #000;
    color: #ccc;
  }
`;

export default function LayerSetting({
  layer,
  layerRecoilState,
  height,
}: {
  layer: string;
  layerRecoilState: [LayerState, SetterOrUpdater<LayerState>];
  height: boolean;
}) {
  const [layerState, setLayerState] = layerRecoilState;
  return (
    <LayerSettingContainer>
      <h2>{layer}</h2>
      <Label>Color by:</Label>
      <Select
        id="layer1-color"
        value={layerState.colorColumn}
        onChange={(e) => {
          setLayerState((prev) => ({
            ...prev,
            colorColumn: e.target.value as Column,
          }));
        }}
      >
        <option value={Column.TEMPERATURE}>Temperature(℃)</option>
        <option value={Column.HUMIDITY}>Humidity</option>
        <option value={Column.DEFACTO}>De facto Pop</option>
      </Select>
      {height && (
        <>
          <Label>Height by:</Label>
          <Select
            id="layer1-height"
            value={layerState.heightColumn}
            onChange={(e) => {
              setLayerState((prev) => ({
                ...prev,
                heightColumn: e.target.value as Column,
              }));
            }}
          >
            <option value={Column.TEMPERATURE}>Temperature (℃)</option>
            <option value={Column.HUMIDITY}>Humidity</option>
            <option value={Column.DEFACTO}>De facto Pop</option>
          </Select>
        </>
      )}
    </LayerSettingContainer>
  );
}
