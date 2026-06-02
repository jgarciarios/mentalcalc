import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from '../constants/COLORS';

import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/SetupScreen';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: 'bold' },
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cálculo Mental' }} />
        <Stack.Screen name="Setup" component={SetupScreen} options={{ title: 'Nueva Partida' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Resultados', headerLeft: () => null }}
        />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
