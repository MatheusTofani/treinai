import styled from "styled-components";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
    background-color: #FBFBFB;
`;

export const LoginTitle = styled.Text`
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
    color:  #F5310A;
`;

export const LoginInput = styled.TextInput`
    height: 48px;
    border-color: #ddd;
    border-width: 1px;
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 12px;
    padding: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
    height: 48px;
    border-radius: 8px;
    background-color: #F5310A;
    justify-content: center;
    align-items: center;
`;

export const LoginButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`;

export const RegisterText = styled.Text`
    margin-top: 24px;
    text-align: center;
    color: #666;
`;

export const RegisterLink = styled.Text`
    color:  #F5310A; 
    font-weight: bold;
`;  