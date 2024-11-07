import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper'; // Importação do RadioButton

const RegistrarTreino = () => {
  const [exercicios, setExercicios] = useState([]);
  const [mostrarFormularioExercicio, setMostrarFormularioExercicio] = useState(false);
  const [novoExercicio, setNovoExercicio] = useState('');

  const adicionarExercicio = () => {
    const exercicio = {
      id: Date.now().toString(),
      nome: novoExercicio || 'Exercício Sem Nome',
      data: new Date().toLocaleDateString(),
      series: [],
      isOpen: false,
      mostrarFormularioSerie: false,
      mostrarSeries: false,
    };
    setExercicios([...exercicios, exercicio]);
    setNovoExercicio('');
    setMostrarFormularioExercicio(false);
  };

  const adicionarSerie = (exercicioId, novaSerie) => {
    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) => {
        if (exercicio.id === exercicioId) {
          // Adiciona a nova série ao array de séries do exercício
          const seriesAtualizadas = [...exercicio.series, novaSerie];
  
          // Calcula as médias das séries atualizadas
          const mediasCalculadas = calcularMedias(seriesAtualizadas);
  
          // Retorna o exercício atualizado com a nova série e as médias
          return {
            ...exercicio,
            series: seriesAtualizadas,
            medias: mediasCalculadas, // Atualiza o exercício com as médias calculadas
            mostrarFormularioSerie: false, // Fecha o formulário ao salvar
          };
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

  const calcularMedias = (series) =>
  {
    if (series.length === 0) return { peso: 0, repeticoes: 0, nota: 0, tempoDescanso: 0 };

     // 1. Inicialize variáveis para somar os valores
    let somaPeso = 0;
    let somaRepeticoes = 0;
    let somaTempoDescanso = 0;
    let somaNota = 0;

    // 2. Percorra cada série para somar os valores
    series.forEach(serie => {
      somaPeso += parseFloat(serie.peso);
      somaRepeticoes += parseInt(serie.repeticoes);
      somaTempoDescanso += parseInt(serie.tempoDescanso);
      somaNota +=  parseInt(serie.nota);
    });

    // 3. Divida pela quantidade de séries para obter a média
    const mediaPeso = somaPeso / series.length;
    const mediaRepeticoes = somaRepeticoes / series.length;
    const mediaTempoDescanso = somaTempoDescanso / series.length;
    const mediaNota = somaNota / series.length;

    // 4. Retorne um objeto com as médias
    return {
      peso: mediaPeso.toFixed(1),
      repeticoes: mediaRepeticoes.toFixed(1),
      tempoDescanso: mediaTempoDescanso.toFixed(1),
      nota: mediaNota.toFixed(1),
    };

  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Registrar Treino</Text>

      <Button
        title={mostrarFormularioExercicio ? "Cancelar" : "Adicionar Treino (Exercício)"}
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
          <View style={{
            marginVertical: 8,
            padding: 12,
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
          }}>
            <TouchableOpacity
              onPress={() => toggleAccordion(item.id)}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 18 }}>{item.nome}</Text>
              <Icon
                name={item.isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={24}
                color="grey"
              />
            </TouchableOpacity>

            <Collapsible collapsed={!item.isOpen}>
              <Text style={{ marginTop: 8 }}>Data: {item.data}</Text>
              {item.medias && (
              <View style={{ marginTop: 8 }}>
                <Text>Média Peso: {item.medias.peso} kg</Text>
                <Text>Média Repetições: {item.medias.repeticoes}</Text>
                <Text>Média Tempo Descanso: {item.medias.tempoDescanso} seg</Text>
                <Text>Média Nota: {item.medias.nota}</Text>
              </View>
            )}

              <Button
                title={item.mostrarFormularioSerie ? "Cancelar" : "Adicionar Série"}
                onPress={() => toggleFormularioSerie(item.id)}
              />

              {item.mostrarFormularioSerie && (
                <NovaSerieForm exercicioId={item.id} adicionarSerie={adicionarSerie} />
              )}

              <TouchableOpacity
                onPress={() => toggleSeries(item.id)}
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
              >
                <Text style={{ color: 'blue' }}>Ver Séries</Text>
                <Icon
                  name={item.mostrarSeries ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={20}
                  color="blue"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>

              <Collapsible collapsed={!item.mostrarSeries}>
                <FlatList
                  data={item.series}
                  keyExtractor={(serie) => serie.id}
                  renderItem={({ item: serie }) => (
                    <View style={{ paddingLeft: 16, marginVertical: 4 }}>
                      <Text>Peso: {serie.peso} kg</Text>
                      <Text>Repetições: {serie.repeticoes}</Text>
                      <Text>Nota: {serie.nota}</Text>
                      <Text>Tempo de Descanso: {serie.tempoDescanso} seg</Text>
                    </View>
                  )}
                />
              </Collapsible>
            </Collapsible>
          </View>
        )}
      />
    </View>
  );
};

// NovaSerieForm com Botões de Opção Personalizados
const NovaSerieForm = ({ exercicioId, adicionarSerie }) => {
  const [peso, setPeso] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [nota, setNota] = useState('3'); // Define um valor padrão para a nota
  const [tempoDescanso, setTempoDescanso] = useState('');

  const handleAddSerie = () => {
    const novaSerie = { peso, repeticoes, nota, tempoDescanso };
    adicionarSerie(exercicioId, novaSerie);
    setPeso('');
    setRepeticoes('');
    setNota('3'); // Reinicia a nota para o valor padrão após salvar
    setTempoDescanso('');
  };

  return (
    <View style={{ padding: 8, marginTop: 8, borderTopWidth: 1 }}>
      <Text>Peso (kg):</Text>
      <TextInput
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 8, padding: 8, borderRadius: 4 }}
      />

      <Text>Repetições:</Text>
      <TextInput
        value={repeticoes}
        onChangeText={setRepeticoes}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 8, padding: 8, borderRadius: 4 }}
      />

      <Text>Nota da Série:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setNota(value.toString())}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: nota === value.toString() ? 'blue' : 'grey',
              backgroundColor: nota === value.toString() ? '#cce5ff' : '#fff',
              borderRadius: 5,
              margin: 4,
            }}
          >
            <Text style={{ color: nota === value.toString() ? 'blue' : 'black' }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>Tempo de Descanso (segundos):</Text>
      <TextInput
        value={tempoDescanso}
        onChangeText={setTempoDescanso}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 16, padding: 8, borderRadius: 4 }}
      />

      <Button title="Salvar Série" onPress={handleAddSerie} />
    </View>
  );
};


export default RegistrarTreino;
