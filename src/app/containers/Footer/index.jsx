// Footer.js
import React, { useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, FooterContainer, FooterContainerIcon,FooterIcons, FooterIcon, FooterItem, FooterText, ModalButtonText } from "./style";
import calendario from '../../../assets/calendario.png';
import grafico from '../../../assets/grafico.png';
import trofeu from '../../../assets/trofeu.png';
import user from '../../../assets/user.png';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();
    const modalRef = useRef(null);

    // Define o ponto de ancoragem do Bottom Sheet Modal
    const snapPoints = useMemo(() => ['50%'], []);

    // Função para abrir o modal
    const handleOpenModal = () => {
        modalRef.current?.present();
    };

    const navigateAndCloseModal = (ScreenName) => {
        navigation.navigate(ScreenName);
        modalRef.current?.close();
    };

    return (
        
        <BottomSheetModalProvider>
            <SafeAreaView>
            <FooterContainer>
                {/* Bottom Sheet Modal */}
                <BottomSheetModal
                    ref={modalRef}
                    snapPoints={snapPoints}
                    index={0} // Posição inicial do Bottom Sheet
                    backgroundStyle={{ backgroundColor: 'white', borderRadius: 50 }}
                    handleIndicatorStyle={{ backgroundColor: '#ccc' }}
                >
                    <BottomSheetView style={{ flex: 1, alignItems: 'center', padding: 16 }}>
                        <Button
                            
                            onPress={() => navigateAndCloseModal('RegistrarTreino')}
                        >
                            <ModalButtonText>Registrar Treino</ModalButtonText>
                            <ModalButtonText>&gt;</ModalButtonText>
                        </Button>

                        <Button
                            
                            onPress={() => navigateAndCloseModal('TreinoSugeridoPorIA')}
                        >
                            <ModalButtonText>Treino Sugerido por IA</ModalButtonText>
                            <ModalButtonText>&gt;</ModalButtonText>
                        </Button>

                        <Button
                            
                            onPress={() => navigateAndCloseModal('DefinirObjetivos')}
                        >
                            <ModalButtonText>Definir Objetivos</ModalButtonText>
                            <ModalButtonText>&gt;</ModalButtonText>
                        </Button>

                        <Button
                       
                            onPress={() => navigateAndCloseModal('NotasEReflexoes')}
                        >
                            <ModalButtonText>Notas e Reflexões</ModalButtonText>
                            <ModalButtonText>&gt;</ModalButtonText>
                        </Button>
                    </BottomSheetView>
                </BottomSheetModal>

                {/* Ícones do Footer */}
              
                    <FooterItem onPress={() => navigation.navigate('Calendar')}>
                        <FooterIcons source={calendario} />
                        <FooterText>Calendario</FooterText>
                    </FooterItem>
               

            
                    <FooterItem onPress={() => navigation.navigate('Stats')}>
                        <FooterIcons source={grafico} />
                        <FooterText>Estatisticas</FooterText>
                    </FooterItem>
                

                {/* Botão Central para Abrir o Bottom Sheet Modal */}
            
                    <FooterItem onPress={handleOpenModal}>
                        <FooterContainerIcon>
                            <FooterIcon>+</FooterIcon>
                        </FooterContainerIcon>
                    </FooterItem>

                
                    <FooterItem onPress={() => navigation.navigate('Ranking')}>
                    <FooterIcons source={trofeu} />
                    <FooterText>Ranking</FooterText>
                    </FooterItem>
              

                
                    <FooterItem onPress={() => navigation.navigate('Workout')}>
                        <FooterIcons source={user} />
                        <FooterText>Usuario</FooterText>
                    </FooterItem>
        
            </FooterContainer>
            </SafeAreaView >
        </BottomSheetModalProvider>
       
    );
};

export default Footer;
