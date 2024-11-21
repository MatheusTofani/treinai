import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

export const Card = styled.View`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  elevation: 3;
  justify-content:space-between;
  flex-direction: row;
  align-items:center;
`;

export const ModalContainer = styled.View`
  background-color: #f0f0f0;
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  elevation: 0;
`;

export const Nome = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Peso = styled.Text`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: #f8d7da; 
  border-radius: 50px;      
  width: 40px;              
  height: 40px;             
  align-items: center;      
  justify-content: center;  
  margin-right: 10px;       
`;

export const Data = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

export const TreinoText = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`