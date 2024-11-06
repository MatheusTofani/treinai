// Footer.js
import React, { useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, FooterContainer, FooterContainerIcon, FooterIcon, FooterItem, FooterText, ModalButtonText } from "./style";
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
                <FooterItem>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                        <FooterText source={calendario} />
                    </TouchableOpacity>
                </FooterItem>

                <FooterItem>
                    <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                        <FooterText source={grafico} />
                    </TouchableOpacity>
                </FooterItem>

                {/* Botão Central para Abrir o Bottom Sheet Modal */}
                <FooterItem>
                    <TouchableOpacity onPress={handleOpenModal}>
                        <FooterContainerIcon>
                            <FooterIcon>+</FooterIcon>
                        </FooterContainerIcon>
                    </TouchableOpacity>
                </FooterItem>

                <FooterItem>
                    <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
                        <FooterText source={trofeu} />
                    </TouchableOpacity>
                </FooterItem>

                <FooterItem>
                    <TouchableOpacity onPress={() => navigation.navigate('Workout')}>
                        <FooterText source={user} />
                    </TouchableOpacity>
                </FooterItem>
            </FooterContainer>
        </BottomSheetModalProvider>
    );
};

export default Footer;
