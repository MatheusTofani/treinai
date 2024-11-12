import styled from "styled-components/native";

export const FooterContainer = styled.SafeAreaView`
  right: 0;
  position: absolute;
  bottom: 0;
  flex-direction: row;
  height: 60px;
  width: 100%;
  background-color: #FBFBFB;
  border-top-width: 1px;
  border-top-color: #00000034;
`;

export const FooterItem = styled.TouchableOpacity`
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

export const FooterIcons = styled.Image`
 height: 30px;
`;

export const FooterText = styled.Text`
  color: #f5310a;
  font-size: 10px;
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
