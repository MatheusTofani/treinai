import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig'; 
import { useUser } from '../../contexts/UserContext'; 
import { Container, Card, Nome, Peso, Data, TreinoText, ModalContainer } from './style';

const StatsScreen = () => {
  const { userId } = useUser(); // Pega o userId do contexto
  const [userData, setUserData] = useState(null);
  const [treinos, setTreinos] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardClick = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id)); // Alterna entre abrir e fechar
  };

  const fetchUserData = useCallback(async () => {
    if (userId) {
      try {
        const userDocRef = doc(firestore, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log('Nenhum dado encontrado para este usuário');
        }

        // Buscar e ordenar os treinos por data
        const treinosRef = collection(firestore, 'users', userId, 'treinos');
        const treinosSnapshot = await getDocs(treinosRef);
        const treinosData = treinosSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()); // Ordena por data, do mais novo para o mais antigo

   
  
        // Ordena os treinos por data de criação (mais recente primeiro)
        const treinosOrdenados = treinosData.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
  
        setTreinos(treinosOrdenados);
      } catch (error) {
        console.log('Erro ao buscar dados:', error.message);
      }
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const renderTreino = ({ item }) => {
    // Lógica para formatação de data e qualquer outro processamento
    const createdAtDate = item.createdAt ? item.createdAt.toDate() : null;
    const formattedDate = createdAtDate ? createdAtDate.toLocaleDateString('pt-BR') : 'N/A';
    const isActive = activeCardId === item.id;
  
    // Retorna o JSX para cada treino
    return (
      <View>
        <TouchableOpacity onPress={() => handleCardClick(item.id)}>
          <Card>
            <Nome>{item.nome || 'Sem nome'}</Nome>
            <Peso>Peso: {item.peso || 'N/A'} kg</Peso>
            <Data>Criado Em: {formattedDate}</Data>
          </Card>
        </TouchableOpacity>  
          {isActive && (
            <ModalContainer>
              <Text>Séries: </Text>
              {item.series && item.series.length > 0 ? (
                item.series.map((serie) => (
                  <View key={serie.id}>
                    <Text>Tempo de Descanso: {serie.tempoDescanso || 'N/A'} Seg</Text>
                    <Text>Repetições: {serie.repeticoes || 'N/A'}</Text>
                    <Text>Peso: {serie.peso || 'N/A'} kg</Text>
                    <Text>Nota: {serie.nota || 'N/A'}</Text>
                  </View>
                ))
              ) : (
                <Text>Sem séries registradas para este treino.</Text>
              )}
            </ModalContainer>
          )}
      </View>
    );
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {treinos.length > 0 ? (
          <FlatList
            data={treinos}
            keyExtractor={(item) => item.id}
            renderItem={renderTreino}
          />
        ) : (
          <TreinoText>Nenhum treino encontrado!</TreinoText>
        )}
      </Container>
    </SafeAreaView>
  );
  
};

export default StatsScreen;
