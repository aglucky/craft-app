import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { CONVEX_URL } from "@env";
import Graph from './Graph';

const Stack = createNativeStackNavigator();

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Graph" component={Graph} />
      </Stack.Navigator>
    </NavigationContainer>
    </ConvexProvider>
  );
}
