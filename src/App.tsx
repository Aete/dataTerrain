import styled from "styled-components";
import { bgColor } from "./utils/colors";
import Title from "./components/Title";
import Viz from "./components/Viz";
import Description from "./components/Description";

const AppContainer = styled.div`
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

export default function App() {
  return (
    <AppContainer>
      <Title />
      <Description />
      <Viz />
    </AppContainer>
  );
}
