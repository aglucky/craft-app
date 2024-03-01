import { Doc } from "../convex/_generated/dataModel";

declare module 'lib/craft' {
  export function createElement(first: Doc<"items">, second: Doc<"items">): Promise<Doc<"items">>;  
  export function checkConvexCache(parent_one: Doc<"items">, parent_two: Doc<"items">): Doc<"items"> | null;
  }