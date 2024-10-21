import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footerContainer}> 
        
            <View style={styles.sideContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Text>Icon 1</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Text>Icon 2</Text> 
                </TouchableOpacity>
            </View>

     
            <View style={styles.centerContainer}>
                <TouchableOpacity style={styles.centralButton}>
                    <Text style={styles.plusIcon}>+</Text> 
                </TouchableOpacity>
            </View>

          
            <View style={styles.sideContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Text>Icon 3</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Text>Icon 4</Text> 
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',          // Organiza os itens em linha
        justifyContent: 'space-between', // Distribui o espaço entre os itens
        alignItems: 'center',          // Alinha os itens verticalmente no centro
        padding: 10,                   // Espaço interno do footer
        backgroundColor: '#f8f8f8',    // Cor de fundo do footer
        borderTopWidth: 1,             // Adiciona uma borda na parte superior
        borderTopColor: '#ddd',        // Cor da borda superior
    },
    sideContainer: {
        flexDirection: 'row',          // Organiza os ícones em linha
    },
    iconContainer: {
        marginHorizontal: 10,          // Espaçamento horizontal entre os ícones
    },
    centerContainer: {
        position: 'relative',           // Permite o posicionamento do botão central
    },
    centralButton: {
        backgroundColor: 'tomato',     // Cor de fundo do botão central
        width: 60,                     // Largura do botão
        height: 60,                    // Altura do botão
        borderRadius: 30,              // Faz o botão ser circular
        justifyContent: 'center',       // Centraliza o conteúdo no eixo vertical
        alignItems: 'center',           // Centraliza o conteúdo no eixo horizontal
        position: 'absolute',           // Permite que o botão flutue sobre a barra
        top: -30,                       // Eleva o botão para parte acima da barra
    },
    plusIcon: {
        fontSize: 30,                  // Tamanho do ícone "+"
        color: '#fff',                 // Cor do ícone
    },
});

// Exportando o componente Footer
export default Footer;
