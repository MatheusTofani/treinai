import styled from "styled-components";

export const HeaderContainer = styled.SafeAreaView`
  height: 60px;
  width: 100%;
  background-color: #f5310a;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 20px;
`;

export const HeaderLogo = styled.Text`
  color: white;
  font-size: 40px;
`;

export const HeaderMenuContainer = styled.View`
height: 30px;
width: 30px;
align-items: center;
justify-content: center;
`

export const HeaderMenu = styled.Text`
height: 3px;
width: 100%;
background-color: white;
margin: 3px 0;
`