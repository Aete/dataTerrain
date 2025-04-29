import styled from "styled-components";
import Viz from "./Viz";
import Panel from "./Panel/Panel";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100vw;
  min-height: 100vh;

  position: relative;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Panel />
      <Viz />
    </DashboardContainer>
  );
};

export default Dashboard;
