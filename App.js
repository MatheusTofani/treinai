import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Footer from './src/app/containers/Footer';
import CalendarScreen from './src/app/containers/CalendarScreen';
import StatsScreen from './src/app/containers/StatsScreen';
import RankingScreen from './src/app/containers/RankingScreen';
import WorkoutScreen from './src/app/containers/WorkoutScreen';
import DefinirObjetivos from './src/app/containers/DefinirObjetivos';
import NotasEReflexoes from './src/app/containers/NotasEReflexoes';
import RegistrarTreino from './src/app/containers/RegistrarTreino';
import TreinoSugeridoPorIA from './src/app/containers/TreinoSugeridoPorIA';
import Login from './src/app/Screen/LoginTela';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showFooter, setShowFooter] = useState(false);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = navigationRef?.addListener('state', () => {
      const routeName = navigationRef.getCurrentRoute()?.name;
      setShowFooter(routeName !== 'Login'); // Mostra o Footer apenas se a rota não for Login
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="DefinirObjetivos" component={DefinirObjetivos} />
            <Stack.Screen name="NotasEReflexoes" component={NotasEReflexoes} />
            <Stack.Screen name="RegistrarTreino" component={RegistrarTreino} />
            <Stack.Screen name="TreinoSugeridoPorIA" component={TreinoSugeridoPorIA} />
          </Stack.Navigator>
          {showFooter && <Footer />}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
