import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";

// https://visjs.github.io/vis-network/examples/
import VisNetwork, { Data } from 'react-native-vis-network';
import { fetchCraft } from 'neal_api';

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  const handlePress = () => {
    alert('Button was pressed');
  };

  const [data, setData] = useState<Data>({
    edges: [
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 },
    ],
    nodes: [
      { id: 1, label: 'Node 1', color: "yellow" },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ],
  });

  const test = fetchCraft("Fire", "Water").then((t)=>console.log(t));


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
      <VisNetwork data={data} />
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