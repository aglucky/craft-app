import { ZodType } from "zod";

export declare const CraftResponse: ZodType<{
    isNew: boolean;
    emoji: string;
    result: string;
} | null>;

export type CraftResponseType = {
    isNew: boolean;
    emoji: string;
    result: string;
} | null;

export type CreationResult = {
    newItem: Doc<"items">;
    newEdge: Doc<"combos">;
  };