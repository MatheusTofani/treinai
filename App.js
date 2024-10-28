import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import Footer from './src/app/containers/Footer';
import CalendarScreen from './src/app/containers/CalendarScreen';
import StatsScreen from './src/app/containers/StatsScreen';
import RankingScreen from './src/app/containers/RankingScreen';
import WorkoutScreen from './src/app/containers/WorkoutScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './src/app/containers/Header';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Header />
          <Stack.Navigator screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Calendar" component={CalendarScreen} /> 
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} /> 
          </Stack.Navigator>
          <Footer />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
