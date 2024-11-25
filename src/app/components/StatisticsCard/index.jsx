import React from 'react';
import { View, Text } from 'react-native';
import { Card, StatCircle, StatText, StatValue } from './style'; // Vamos criar os estilos no próximo passo

const StatisticCard = ({ total, noMes, noDia }) => {
  return (
    <Card>
      <StatCircle>
        <StatText>Total de Treinos</StatText>
        <StatValue>{total}</StatValue>
      </StatCircle>

      <StatCircle>
        <StatText>Treinos no Mês</StatText>
        <StatValue>{noMes}</StatValue>
      </StatCircle>

      <StatCircle>
        <StatText>Treinos no Dia</StatText>
        <StatValue>{noDia}</StatValue>
      </StatCircle>       
    </Card>
    
  );
};

export default StatisticCard;
