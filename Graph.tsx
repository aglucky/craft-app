import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useQuery } from "convex/react";
import { api } from './convex/_generated/api';
import { Heap } from 'heap-js';
import VisNetwork, { Data, VisNetworkRef } from 'react-native-vis-network';
import { createElement } from 'craft';

const ITEM_SIZE = 300;
const MED_NODE_SIZE = 5;

const addRandomNode = (data, setData, nodeMap, setNodeMap) => {
    console.log(data.edges)
    if (nodeMap.size > 1) {
        const keys = Array.from(nodeMap.keys());
        const parent_one_key = keys[Math.floor(Math.random() * keys.length)];
        const parent_two_key = keys[Math.floor(Math.random() * keys.length)];
        const parent_one = nodeMap.get(parent_one_key);
        const parent_two = nodeMap.get(parent_two_key);

        createElement(parent_one, parent_two).then(newElement => {
            if (newElement) {
                const newNode = {
                    id: newElement._id,
                    label: newElement.name,
                    value: ITEM_SIZE,
                    shape: "box",
                }
                const medNodeId = parent_one._id + parent_two._id
                const newEdges = [
                    { from: medNodeId, to: parent_one._id },
                    { from: medNodeId, to: parent_two._id },
                    { from: medNodeId, to: newElement._id },
                ]
                setNodeMap(nodeMap => new Map(nodeMap).set(newElement._id, newElement));
                setData({
                    nodes: [...data.nodes,
                        newNode, {
                        id: medNodeId,
                        size: MED_NODE_SIZE,
                        color: "black",
                        shape: "dot",
                    }],
                    edges: [...data.edges, ...newEdges]
                })
            }
        }).catch(error => {
            console.error("Failed to add random node:", error);
        });
    } else {
        console.warn("Not enough nodes to select 2 random nodes.");
    }
}

export default function Graph() {
    const [data, setData] = useState<Data>({
        nodes: [],
        edges: [],
    });

    const [nodeMap, setNodeMap] = useState(new Map());


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

    const visNetworkRef = useRef<VisNetworkRef>(null);
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
                    <Button title="Combine Random"
                            onPress={() => addRandomNode(data, setData, nodeMap, setNodeMap)}
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