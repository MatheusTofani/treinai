import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import { firestore } from '../../../firebaseConfig'; // Importando a instância do Firestore
import { useUser } from '../../contexts/UserContext'; // Obtendo o userId do contexto

import { addDoc, collection, doc, setDoc } from 'firebase/firestore'; // Funções do Firestore
import { scheduleLocalNotification } from '../../services/notifications';

const RegistrarTreino = () => {
  const { userId } = useUser(); // Obtém o userId do contexto
  const [exercicios, setExercicios] = useState([]);
  const [mostrarFormularioExercicio, setMostrarFormularioExercicio] = useState(false);
  const [novoExercicio, setNovoExercicio] = useState('');

  const [novaSerie, setNovaSerie] = useState({
    peso: '',
    repeticoes: '',
    tempoDescanso: '',
    nota: '',
  });

  const handleScheduleNotification = () => {
    scheduleLocalNotification('Lembrete de Treino!', 'Treino Adicionado com Sucesso', 15);
  };

  

  // Função para adicionar um exercício (treino)
  const adicionarExercicio = async () => {  // Marca a função como async
    const exercicio = {
      id: Date.now().toString(),
      nome: novoExercicio || 'Exercício Sem Nome',
      data: new Date().toLocaleDateString(),
      series: [],
      isOpen: false,
      mostrarFormularioSerie: false,
      mostrarSeries: false,
    };

    // Salvar exercício no Firestore
    try {
      const treinosRef = collection(firestore, 'users', userId, 'treinos');
      const treinoDocRef = await addDoc(treinosRef, {
        nome: exercicio.nome,
        data: exercicio.data,
        createdAt: new Date(),
      });

      // Atualiza o estado local
      setExercicios([...exercicios, { ...exercicio, treinoId: treinoDocRef.id }]);
      setNovoExercicio('');
      handleScheduleNotification()
      setMostrarFormularioExercicio(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // Função para adicionar uma série a um exercício
  const adicionarSerie = (exercicioId, novaSerie) => {  // Marca a função como async
    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) => {
        if (exercicio.id === exercicioId) {
          const seriesAtualizadas = [...exercicio.series, novaSerie];
          const mediasCalculadas = calcularMedias(seriesAtualizadas);

          // Salva a série no Firestore
          try {
            const treinoDocRef = doc(firestore, 'users', userId, 'treinos', exercicio.treinoId);
            setDoc(treinoDocRef, { series: seriesAtualizadas }, { merge: true });

            return {
              ...exercicio,
              series: seriesAtualizadas,
              medias: mediasCalculadas,
              mostrarFormularioSerie: false,
            };
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a série.');
          }
        }
        return exercicio;
      })
    );
  };

  const toggleAccordion = (exercicioId) => {
    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) =>
        exercicio.id === exercicioId
          ? { ...exercicio, isOpen: !exercicio.isOpen }
          : exercicio
      )
    );
  };

  const toggleFormularioSerie = (exercicioId) => {
    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) =>
        exercicio.id === exercicioId
          ? { ...exercicio, mostrarFormularioSerie: !exercicio.mostrarFormularioSerie }
          : exercicio
      )
    );
  };

  const toggleSeries = (exercicioId) => {
    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) =>
        exercicio.id === exercicioId
          ? { ...exercicio, mostrarSeries: !exercicio.mostrarSeries }
          : exercicio
      )
    );
  };

  const calcularMedias = (series) => {
    if (series.length === 0) return { peso: 0, repeticoes: 0, nota: 0, tempoDescanso: 0 };

    let somaPeso = 0;
    let somaRepeticoes = 0;
    let somaTempoDescanso = 0;
    let somaNota = 0;

    series.forEach((serie) => {
      somaPeso += parseFloat(serie.peso);
      somaRepeticoes += parseInt(serie.repeticoes);
      somaTempoDescanso += parseInt(serie.tempoDescanso);
      somaNota += parseInt(serie.nota);
    });

    const mediaPeso = somaPeso / series.length;
    const mediaRepeticoes = somaRepeticoes / series.length;
    const mediaTempoDescanso = somaTempoDescanso / series.length;
    const mediaNota = somaNota / series.length;

    return {
      peso: mediaPeso.toFixed(1),
      repeticoes: mediaRepeticoes.toFixed(1),
      tempoDescanso: mediaTempoDescanso.toFixed(1),
      nota: mediaNota.toFixed(1),
    };
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Registrar Treino</Text>

      <Button
        title={mostrarFormularioExercicio ? 'Cancelar' : 'Adicionar Treino (Exercício)'}
        onPress={() => setMostrarFormularioExercicio(!mostrarFormularioExercicio)}
      />

      {mostrarFormularioExercicio && (
        <View style={{ marginVertical: 8, padding: 8, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
          <Text>Nome do Exercício:</Text>
          <TextInput
            placeholder="Ex: Supino com Halteres"
            value={novoExercicio}
            onChangeText={setNovoExercicio}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 }}
          />
          <Button title="Salvar Exercício" onPress={adicionarExercicio} />
        </View>
      )}

    <FlatList
      data={exercicios}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ marginVertical: 8, padding: 12, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 2 }}>
          <TouchableOpacity onPress={() => toggleAccordion(item.id)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18 }}>{item.nome}</Text>
            <Icon name={item.isOpen ? 'chevron-up-outline' : 'chevron-down-outline'} size={24} color="grey" />
          </TouchableOpacity>

          <Collapsible collapsed={!item.isOpen}>
            <Text style={{ marginTop: 8 }}>Data: {item.data}</Text>
            {item.medias && (
              <View style={{ marginTop: 8 }}>
                <Text>Média Peso: {item.medias.peso} kg</Text>
                <Text>Média Repetições: {item.medias.repeticoes}</Text>
                <Text>Média Tempo Descanso: {item.medias.tempoDescanso}</Text>
                <Text>Média Nota: {item.medias.nota}</Text>
              </View>
            )}

            {/* Botão de Adicionar Série */}
            <Button title="Adicionar Série" onPress={() => toggleFormularioSerie(item.id)} />

            {/* Formulário de Série */}
            {item.mostrarFormularioSerie && (
              <View style={{ marginTop: 8 }}>
                {/* Campos do formulário de série */}
                <TextInput
                  placeholder="Peso (kg)"
                  value={novaSerie.peso}
                  onChangeText={(text) => setNovaSerie((prev) => ({ ...prev, peso: text }))}
                  style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 }}
                />
                <TextInput
                  placeholder="Repetições"
                  value={novaSerie.repeticoes}
                  onChangeText={(text) => setNovaSerie((prev) => ({ ...prev, repeticoes: text }))}
                  style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 }}
                />
                <TextInput
                  placeholder="Tempo de Descanso (s)"
                  value={novaSerie.tempoDescanso}
                  onChangeText={(text) => setNovaSerie((prev) => ({ ...prev, tempoDescanso: text }))}
                  style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 }}
                />
                <TextInput
                  placeholder="Nota (1-10)"
                  value={novaSerie.nota}
                  onChangeText={(text) => setNovaSerie((prev) => ({ ...prev, nota: text }))}
                  style={{ borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 }}
                />
                <Button title="Salvar Série" onPress={() => adicionarSerie(item.id, novaSerie)} />
              </View>
            )}

            {/* Accordion para listar as séries */}
            <Button title={item.mostrarSeries ? 'Esconder Séries' : 'Ver Séries'} onPress={() => toggleSeries(item.id)} />
            <Collapsible collapsed={!item.mostrarSeries}>
              {item.series.length > 0 ? (
                item.series.map((serie, index) => (
                  <View key={index} style={{ marginTop: 8, padding: 8, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
                    <Text>Série {index + 1}</Text>
                    <Text>Peso: {serie.peso} kg</Text>
                    <Text>Repetições: {serie.repeticoes}</Text>
                    <Text>Tempo de Descanso: {serie.tempoDescanso} s</Text>
                    <Text>Nota: {serie.nota}</Text>
                  </View>
                ))
              ) : (
                <Text style={{ marginTop: 8 }}>Nenhuma série registrada.</Text>
              )}
            </Collapsible>
          </Collapsible>
        </View>
      )}
    />


    </View>
  );
};

export default RegistrarTreino;
