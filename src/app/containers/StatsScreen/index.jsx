import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig'; // Importa o Firestore
import { useUser } from '../../contexts/UserContext'; // Importa o contexto para pegar o userId

const StatsScreen = () => {
  const { userId } = useUser(); // Pega o userId do contexto
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          // Ref para o documento do usuário no Firestore
          const userDocRef = doc(firestore, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Atualiza o estado com os dados do usuário
            setUserData(userDocSnap.data());
          } else {
            console.log('Nenhum dado encontrado para este usuário');
          }
        } catch (error) {
          console.log('Erro ao buscar dados:', error.message);
        }
      };

      fetchUserData();
    }
  }, [userId]); // Recarrega os dados sempre que o userId mudar

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userData ? (
        <>
          <Text>Nome: {userData.name}</Text>
          <Text>E-mail: {userData.email}</Text>
          <Text>Id: {userId}</Text>
        </>
      ) : (
        <Text>Carregando dados...</Text>
      )}
    </View>
  );
};

export default StatsScreen;
