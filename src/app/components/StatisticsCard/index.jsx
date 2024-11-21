import React from 'react';
import { View, Text } from 'react-native';
import { Card, StatText, StatValue } from './style'; // Vamos criar os estilos no próximo passo

const StatisticCard = ({ total, noMes, noDia }) => {
  return (
    <Card>
      <StatText>Total de Treinos:</StatText>
      <StatValue>{total}</StatValue>

      <StatText>Treinos no Mês:</StatText>
      <StatValue>{noMes}</StatValue>

      <StatText>Treinos no Dia:</StatText>
      <StatValue>{noDia}</StatValue>
    </Card>
  );
};

export default StatisticCard;
