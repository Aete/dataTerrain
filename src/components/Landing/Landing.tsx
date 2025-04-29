import styled from "styled-components";
import Title from "./Title";
import Description from "./Description";

const LandingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Landing = () => {
  return (
    <LandingContainer>
      <Title />
      <Description />
    </LandingContainer>
  );
};

export default Landing;
