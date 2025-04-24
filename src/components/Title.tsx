import styled from "styled-components";
import { textColor } from "../utils/colors";

const Header = styled.h1`
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

export default function Title() {
  return <Header>DataTerrain</Header>;
}
