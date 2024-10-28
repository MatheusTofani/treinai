// Footer.js
import React, { useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { FooterContainer, FooterContainerIcon, FooterIcon, FooterItem, FooterText } from "./style";
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
                        <Text style={{ fontSize: 18 }}>Conteúdo do Bottom Sheet Modal</Text>
                        <TouchableOpacity onPress={() => modalRef.current?.dismiss()} style={{ marginTop: 20 }}>
                            <Text style={{ color: 'blue' }}>Fechar Modal</Text>
                        </TouchableOpacity>
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
