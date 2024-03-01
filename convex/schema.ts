import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Id } from "../convex/_generated/dataModel";

export default defineSchema({

    items: defineTable({
        name: v.string(),
        emoji: v.string(),
        isNew: v.boolean(),
    }).index("title", ["name", "emoji"]),

    combos: defineTable({
        parent_one: v.id("items"),
        parent_two: v.id("items"),
        child: v.id("items"),
    }).index("parents", ["parent_one", "parent_two"]),

    starters: defineTable({
        item_ids: v.array(v.id("items")),
        desc: v.string()
    })

},
    {
        strictTableNameTypes: true,
    }
);
