import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Id } from "../convex/_generated/dataModel";

export default defineSchema({

    items: defineTable({
        name: v.string(),
        emoji: v.string(),
        isNew: v.boolean(),
    }),

    //Department Table
    combos: defineTable({
        parent_one: v.id("items"),
        parent_two: v.id("items"),
        child: v.id("items"),
    }).index("parents", ["parent_one", "parent_two"])

},
    {
        strictTableNameTypes: true,
    }
);
