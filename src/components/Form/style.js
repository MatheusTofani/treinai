import styled from "styled-components";


export const Input = styled.TextInput `
 border: solid 1px ${props => (props.isFocused ? 'orange' : '#707070')};
margin-bottom: 10px;
width: 200px;
height: 50px;
border-radius: 5px;
padding-left: 10px;
font-size: 16px;
`