import { z } from "zod";
import { Doc } from "../convex/_generated/dataModel";
import { CraftResponseType } from "./types";

declare module 'lib/neal_api' {
  export function fetchCraft(first: Doc<"items">, second: Doc<"items">): Promise<CraftResponseType>;
  }