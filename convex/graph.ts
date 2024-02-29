import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getItem = query({
    args: { id: v.id("items") },
    handler: async (ctx, { id }) => {
        return await ctx.db.get(id);
    },
});

export const createItem = mutation({
    args: { name: v.string(), emoji: v.string(), isNew: v.boolean() },
    handler: async (ctx, { name, emoji, isNew }) => {
        const newItemId = await ctx.db.insert("items", {
            name: name,
            emoji: emoji,
            isNew: isNew
        });

        return newItemId;
    },
});

function sortParents(parent_one: Id<"items">, parent_two: Id<"items">) {
    let smallPar = parent_one;
    let bigPar = parent_two;
    if (parent_one > parent_two) {
        bigPar = parent_one;
        smallPar = parent_two;
    }
    return { smallPar, bigPar };
}


export const searchCombo = mutation({
    args: { parent_one: v.id("items"), parent_two: v.id("items") },
    handler: async (ctx, { parent_one, parent_two }) => {

        const { smallPar, bigPar } = sortParents(parent_one, parent_two);

        const res = await ctx.db
        .query("combos")
        .withIndex("parents", (q) =>
            q
            .eq("parent_one", smallPar)
            .eq("parent_two", bigPar)
        )
        .first();

        return res;
    },
});

export const createCombo = mutation({
    args: { parent_one: v.id("items"), parent_two: v.id("items"), child: v.id("items") },
    handler: async (ctx, { parent_one, parent_two, child }) => {
        const { smallPar, bigPar } = sortParents(parent_one, parent_two);

        const newComboId = await ctx.db.insert("combos", {
            parent_one: smallPar,
            parent_two: bigPar,
            child: child
        });

        return newComboId;
    },
});