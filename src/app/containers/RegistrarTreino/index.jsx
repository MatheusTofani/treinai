import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

const RegistrarTreino = () => {
  // Estado para armazenar a lista de exercícios
  const [exercicios, setExercicios] = useState([]);

  // Função para adicionar um novo exercíci
  const adicionarExercicio = () => {
    // Exemplo básico de exercício
    const novoExercicio = {
      id: Date.now().toString(), // Gerar um ID único
      nome: 'Nome do Exercício', // Isso será editado em um próximo passo
      series: [], // Lista de séries do exercício
    };

    // Atualizar o estado com o novo exercício
    setExercicios([...exercicios, novoExercicio]);
  };

  // Função para adicionar série a um exercício específico
  const adicionarSerie = (id) => {
    // Lógica para abrir a página de adicionar série (será implementada na próxima etapa)
    console.log('Adicionar série ao exercício com ID:', id);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Registrar Treino</Text>
      
      {/* Botão para adicionar novo exercício */}
      <Button title="Adicionar Treino (Exercício)" onPress={adicionarExercicio} />

      {/* Lista de Exercícios */}
      <FlatList
        data={exercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.nome}</Text>
            <TouchableOpacity onPress={() => adicionarSerie(item.id)}>
              <Text style={{ color: 'blue' }}>Adicionar Série</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default RegistrarTreino;