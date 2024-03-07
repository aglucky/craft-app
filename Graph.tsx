import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useQuery } from "convex/react";
import { api } from './convex/_generated/api';
import { Doc } from './convex/_generated/dataModel';
import { Heap } from 'heap-js';
import VisNetwork, { Data, VisNetworkRef, Node } from 'react-native-vis-network';
import { ITEM_SIZE, craftRandomNode, createElement } from 'craft';



export default function Graph() {
    const [data, setData] = useState<Data>({
        nodes: [],
        edges: [],
    });

    const [nodeMap, setNodeMap] = useState<Map<string, Doc<"items">>>(new Map());
    const [selectedNode, setSelectedNode] = useState<string>("N/A");
    const visNetworkRef = useRef<VisNetworkRef | null>(null);

    const handleSelect = (params) => {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const node = nodeMap.get(nodeId);
            setSelectedNode(node?.name || "N/A");
        } else {
            setSelectedNode("N/A");
        }
    };
    visNetworkRef.current?.addEventListener("select", handleSelect);



    const starters = useQuery(api.graph.getInitialItems, { desc: "default" });
    useEffect(() => {
        if (starters) {
            setNodeMap(new Map(starters.map(starter => [starter._id, starter])));
            const startNodes = starters.map((node) => ({
                id: node._id,
                label: node.name,
                value: ITEM_SIZE,
                shape: "box",
            }));
            setData({ nodes: startNodes, edges: [] });
        }
    }, [starters]);

    const options = {
        autoResize: false,
        layout: {
            // hierarchical: true
        },
        edges: {
            color: "#000000"
        },
        height: "1700px",
        scaling: {
            min: 1,
            mac: 1000,
            label: true
        }
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Crafty</Text>
                    <Text>Current Element: {selectedNode}</Text>
                    <Button title="Combine Random"
                        onPress={() => craftRandomNode(data, setData, nodeMap, setNodeMap)}
                    />
                    <StatusBar style="auto" />
                    <Button title="Test"
                        onPress={() => visNetworkRef.current?.getSelectedNodes().then(console.log)}
                    />
                    <StatusBar style="auto" />
                </View>
                <VisNetwork
                    data={data}
                    ref={visNetworkRef}
                    options={options}
                    style={styles.network}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        paddingBottom: 10,
    },
    network: {
        flex: 1, // This makes the VisNetwork take up the rest of the space
    },
});