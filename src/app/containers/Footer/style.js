import styled from "styled-components/native";

export const FooterContainer = styled.SafeAreaView`
  right: 0;
  position: absolute;
  bottom: 0;
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

export const Button = styled.TouchableOpacity`
  background-color: transparent;
  padding: 24px 12px;
  border-radius: 8px;
  margin: 0px 10px;
  align-items: center;
  width: 90%;
  border-top-width: 1px;
  border-top-color: #00000034;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
`;

export const ModalButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
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
