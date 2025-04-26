import styled from "styled-components";
import Viz from "./Viz";
import Panel from "./Panel/Panel";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  position: relative;
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
