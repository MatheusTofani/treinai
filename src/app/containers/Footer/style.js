import styled from "styled-components/native";

export const FooterContainer = styled.View`
  right: 0;
  position: absolute;
  bottom: 50px;
  flex-direction: row;
  height: 50px;
  width: 100%;
  background-color: #fafafa;
`;

export const FooterItem = styled.View`
  width: 20%;
  justify-content: center;
  align-items: center;
`;

export const FooterText = styled.Image`
  color: #f5310a;
  font-size: 30px;
  font-weight: bold;
`;

export const FooterContainerIcon = styled.View`
  height: 60px;
  width: 60px;
  background-color: #f5310a;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: -20px;
`;

export const FooterIcon = styled.Text`
  font-size: 40px;
  color: white;
`;
