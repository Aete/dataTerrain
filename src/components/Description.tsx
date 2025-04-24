import styled from "styled-components";

const DescriptionText = styled.p`
  margin: 0 0 15px 0;
  font-size: 20px;
  line-height: 1.6;
  font-weight: 300;
  color: #ccc;

  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 5px 0;
  }
`;

export default function Description() {
  return (
    <DescriptionText>
      이 프로젝트는 서울의 물리적 환경과 도시 활동 등에 관한 데이터를 직관적으로
      표현하고자 하는 시각화 실험입니다.
    </DescriptionText>
  );
}
