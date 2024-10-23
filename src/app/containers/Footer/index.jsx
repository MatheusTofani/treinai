import React from 'react';
import { FooterContainer, FooterContainerIcon, FooterIcon, FooterItem, FooterText } from "./style";
import calendario from '../../../assets/calendario.png';
import grafico from '../../../assets/grafico.png';
import trofeu from '../../../assets/trofeu.png';
import user from '../../../assets/user.png';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const Footer = () => {
    const navigation = useNavigation(); // Hook de navegação

    return (
       <FooterContainer>
            {/* Ícone de Calendário */}
            <FooterItem>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Calendar'); // Navega para Calendário
                }}>
                    <FooterText source={calendario} />
                </TouchableOpacity>
            </FooterItem>

            {/* Ícone de Estatísticas */}
            <FooterItem>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Stats'); // Navega para Estatísticas
                }}>
                    <FooterText source={grafico} />
                </TouchableOpacity>
            </FooterItem>

            {/* Botão Central */}
            <FooterItem>
                <FooterContainerIcon>
                    <FooterIcon>+</FooterIcon>
                </FooterContainerIcon>
            </FooterItem>

            {/* Ícone de Troféu */}
            <FooterItem>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Ranking');
                }}>
                    <FooterText source={trofeu} />
                </TouchableOpacity>
            </FooterItem>

            {/* Ícone de Usuário */}
            <FooterItem>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Workout');
                }}>
                    <FooterText source={user} />
                </TouchableOpacity>
            </FooterItem>
        </FooterContainer>
    );
}

export default Footer;
