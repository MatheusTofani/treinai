import * as React from 'react';
import { FooterContainer, FooterContainerIcon, FooterIcon, FooterItem, FooterText } from "./style";
import calendario from '../../../assets/calendario.png';
import grafico from '../../../assets/grafico.png';
import trofeu from '../../../assets/trofeu.png';
import user from '../../../assets/user.png';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button } from 'react-native';


const Footer = () => {
    const navigation = useNavigation(); // Hook de navegação

    return (


       <FooterContainer>

            {/* Ícone de Calendário */}
            <FooterItem>
                <FooterText 
                  source={calendario} 
                  
                />
            </FooterItem>

            {/* Ícone de Estatísticas */}
            <FooterItem>
                <FooterText 
                  source={grafico} 
                  onPress={() => {
                      Alert.alert('Estatísticas clicado!'); // Teste de clique
                      navigation.navigate('Stats'); // Navegar para a tela de Estatísticas
                  }} 
                />
            </FooterItem>

            {/* Botão Central */}
            <FooterItem>
                <FooterContainerIcon>
                    <FooterIcon>+</FooterIcon>
                </FooterContainerIcon>
            </FooterItem>

            {/* Ícone de Troféu */}
            <FooterItem>
                <FooterText 
                  source={trofeu} 
                  onPress={() => {
                      Alert.alert('Troféu clicado!'); // Teste de clique
                  }} 
                />
            </FooterItem>

            {/* Ícone de Usuário */}
            <FooterItem>
                <FooterText 
                  source={user} 
                  onPress={() => {
                      Alert.alert('Usuário clicado!'); // Teste de clique
                  }} 
                />
            </FooterItem>
        </FooterContainer>

    );
}

export default Footer;
