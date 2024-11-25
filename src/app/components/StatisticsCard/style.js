import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: #f5f5f5; 
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0; 
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  height:150px;
 
`;

export const StatText = styled.Text`
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;
  text-align:center;
  padding-top:10px;
`;

export const StatValue = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 12px;
  text-align:center;
`;

export const StatCircle = styled.View`
border-width: 0.3px;
border-radius: 50px;
width: 32%;

`;
