import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { fetchTreinos } from '../../services/fetchTreinos';
import StatisticCard from '../../components/StatisticsCard'; 
import { useUser } from '../../contexts/UserContext'; 
import { Container, Card, Nome, Peso, Data, TreinoText, ModalContainer, DeleteButton } from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

const StatsScreen = () => {
  const { userId } = useUser(); 
  const [userData, setUserData] = useState(null);
  const [treinos, setTreinos] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [stats, setStats] = useState({ total: 0, noMes: 0, noDia: 0 });

  const handleCardClick = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id)); 
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTreinos(userId); // Chama a função fetchTreinos
      setStats(data); // Atualiza o estado com os dados retornados
    };

    fetchData();
  }, [userId]);

  const deleteTreino = async (treinoId) => {
    const treinoDocRef = doc(firestore, 'users', userId, 'treinos', treinoId);
    try {
      
      await deleteDoc(treinoDocRef);
      console.log(`Treino ${treinoId} excluído com sucesso.`);
      
      const data = await fetchTreinos(userId); // Chama a função fetchTreinos novamente
      setStats(data);
      
      setTreinos((prevTreinos) => prevTreinos.filter((treino) => treino.id !== treinoId));
      } catch (error) {
        console.error("Erro ao excluir treino:", error.message);
      }
  };

  const handleDelete = (treinoId) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir este treino?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => deleteTreino(treinoId) },
      ]
    );
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

        
        const treinosRef = collection(firestore, 'users', userId, 'treinos');
        const treinosSnapshot = await getDocs(treinosRef);
        const treinosData = treinosSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());   
        
        const treinosOrdenados = treinosData.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        const data = await fetchTreinos(userId); // Chama a função fetchTreinos novamente
        setStats(data);
  
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
    
    const createdAtDate = item.createdAt ? item.createdAt.toDate() : null;
    const formattedDate = createdAtDate ? createdAtDate.toLocaleDateString('pt-BR') : 'N/A';
    const isActive = activeCardId === item.id;
  
    return (
      <View>
        
        <TouchableOpacity onPress={() => handleCardClick(item.id)}>
          <Card>
            <View>
              <Nome>{item.nome || 'Sem nome'}</Nome>
              <Peso>Peso: {item.peso || 'N/A'} kg</Peso>
              <Data>Criado Em: {formattedDate}</Data>
            </View>
            <DeleteButton onPress={() => handleDelete(item.id)}>
              <Icon name="close" size={20} color="#721c24" /> 
            </DeleteButton>
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

      <View style={{ padding: 10 }}>
        <StatisticCard total={stats.total} noMes={stats.noMes} noDia={stats.noDia} />
      </View>
    </SafeAreaView>
  );
  
};

export default StatsScreen;
