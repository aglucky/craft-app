import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import { toFile } from 'adapter/node/index.cjs';

const dot = `
  digraph example {
    node1 [
      label = "My Node",
    ]
  }
`;


const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  const handlePress = () => {
    alert('Button was pressed');
  };


  toFile(dot, './result.svg', { format: 'svg' });


  return (
    <ConvexProvider client={convex}>
      <View style={styles.container}>
        <Text>Hello World</Text>

        <Button
          onPress={handlePress}
          title="Press Me"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <StatusBar style="auto" />
      </View>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});