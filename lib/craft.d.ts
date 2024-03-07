import { Data } from "react-native-vis-network";
import { Doc } from "../convex/_generated/dataModel";

declare module 'lib/craft' {
  export function createElement(
    first: Doc<"items">,
    second: Doc<"items">
  ): Promise<Doc<"items">>;

  export function checkConvexCache(
    parent_one: Doc<"items">,
    parent_two: Doc<"items">
  ): Doc<"items"> | null;

  export function craftRandomNode(
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>,
    nodeMap: Map<string, any>,
    setNodeMap: React.Dispatch<React.SetStateAction<Map<string, any>>>
  ): void;
}