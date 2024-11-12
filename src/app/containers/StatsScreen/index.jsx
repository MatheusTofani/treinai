import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig'; 
import { useUser } from '../../contexts/UserContext'; 
import { Container, Card, Nome, Peso, Data, TreinoText } from './style';

const StatsScreen = () => {
  const { userId } = useUser(); // Pega o userId do contexto
  const [userData, setUserData] = useState(null);
  const [treinos, setTreinos] = useState([]);

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

        setTreinos(treinosData);
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
  
    // Retorna o JSX para cada treino
    return (
      <Card>
        <Nome>{item.nome || 'Sem nome'}</Nome>
        <Peso>Peso: {item.peso || 'N/A'} kg</Peso>
        <Data>Criado Em: {formattedDate}</Data>
    </Card>
    );
  };
  

  return (
    <Container>
      {treinos.length > 0 ? (
        <FlatList
          data={treinos}
          keyExtractor={(item) => item.id}
          renderItem={renderTreino}
        />
      ) : (
        <TreinoText>Carregando treinos...</TreinoText>
      )}
    </Container>
  );
  
};

export default StatsScreen;
