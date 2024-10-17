import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components'

export default function App() {
  return (
    <View >
      <Teste>Ola <Logo>TreinAi</Logo></Teste>
      <StatusBar style="auto" />
    </View>
  );
}

const Teste = styled.Text `

font-size: 50px;
`

const Logo = styled.Text `
font-weight: bold;
color: #E16517;
`