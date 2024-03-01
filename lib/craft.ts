import { Doc } from "../convex/_generated/dataModel";
import { ConvexClient, ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";
import { fetchCraft } from "neal_api";

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

