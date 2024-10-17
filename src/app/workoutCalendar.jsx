import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Importando o calendário
import WeekView from 'react-native-week-view';

const workoutCalendar = () => {

    const [selectedDate, setSelectedDate] = useState('');  
  return (
    <SafeAreaView style={styles.safeContainer}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendário de Treinos</Text>
      </View>

      {/* Semana */}
      <View style={styles.weekContainer}>
        <WeekView
          events={[]}
          selectedDate={new Date()}
          numberOfDays={7}
          headerStyle={styles.weekHeader}
          formatDateHeader="ddd"
          hoursInDisplay={8}
          startHour={6}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00adf5',
    },
    headerText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
    },
    weekContainer: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    weekHeader: {
      backgroundColor: '#00adf5',
      color: '#fff',
    },
});

export default workoutCalendar;
