import { Doc } from "../convex/_generated/dataModel";
import { z, ZodSchema } from "zod";

export const CraftResponse= z.object({
    isNew: z.boolean(),
    emoji: z.string(),
    result: z.string(),
}).nullable();

export type CraftResponseType = z.infer<typeof CraftResponse>;

export type CreationResult = {
    newItem: Doc<"items">;
    newEdge: Doc<"combos">;
  };
  