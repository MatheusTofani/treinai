
import { Container } from './style';
import Footer from './src/app/containers/Footer'; 
import CalendarScreen from './src/app/containers/CalendarScreen';
import StatsScreen from './src/app/containers/StatsScreen';
import RankingScreen from './src/app/containers/RankingScreen';
import WorkoutScreen from './src/app/containers/WorkoutScreen';
import { NavigationContainer } from '@react-navigation/native'; // Para a navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Navegação de Stack 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Container>
        <Stack.Navigator screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="Calendar" component={CalendarScreen} /> 
          <Stack.Screen name="Stats" component={StatsScreen} />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen name="Workout" component={WorkoutScreen} /> 
        </Stack.Navigator>

        </Container>
        <Footer /> 
      
    </NavigationContainer>
  );
}

