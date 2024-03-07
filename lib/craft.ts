import { Doc } from "../convex/_generated/dataModel";
import { ConvexClient, ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";
import { fetchCraft } from "neal_api";
import { Data } from "react-native-vis-network";

export const ITEM_SIZE = 300;
const MED_NODE_SIZE = 5;


export async function checkConvexCache(parent_one: Doc<"items">, parent_two: Doc<"items">): Promise<Doc<"items"> | null> {
  const client = new ConvexClient(process.env.CONVEX_URL!);
  const item = client.query(api.graph.searchCombo, {
    parent_one: parent_one._id,
    parent_two: parent_two._id,
  });

  return item;
}

export async function createElement(parent_one: Doc<"items">, parent_two: Doc<"items">): Promise<Doc<"items"> | null> {

  const item_response = await fetchCraft(parent_one, parent_two);
  if (!item_response || item_response.result == "Nothing") {
    return null;
  }

  const existing_item = await checkConvexCache(parent_one, parent_two);
  console.log(existing_item);

  if (existing_item){
    return existing_item;
  }
  

  const client = new ConvexClient(process.env.CONVEX_URL!);
  const newItem = await client.mutation(api.graph.createItem, {
    name: item_response.result,
    emoji: item_response.emoji,
    isNew: item_response.isNew
  });
  // Client is in charge of tracking edges
  const newEdge = await client.mutation(api.graph.createCombo, {
    parent_one: parent_one._id,
    parent_two: parent_two._id,
    child: newItem._id
  });

  return newItem;
}

export function craftRandomNode(
  data: Data, 
  setData: React.Dispatch<React.SetStateAction<Data>>, 
  nodeMap: Map<string, any>, 
  setNodeMap: React.Dispatch<React.SetStateAction<Map<string, Doc<"items">>>>
) {
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