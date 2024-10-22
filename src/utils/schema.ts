import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const User = pgTable("user", {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerkId").notNull(),
    email: varchar("email").notNull(),
    username: varchar("username").notNull(),
    firstName: varchar("firstName").notNull(),
    lastName: varchar("lastName").notNull(),
    photo: varchar("photo").notNull(),
    createdAt: timestamp('createdAt', { mode: "date" }).defaultNow(),
})

export const usersRelations = relations(User, ({ many }) => ({
    forms: many(Forms),
}));

export const Forms = pgTable("forms", {
    id: serial("id").primaryKey(),
    jsonFormResp: text("jsonFormResp").notNull(), 
    theme:varchar('theme'),
    background:varchar('background'),
    style:varchar('style'),
    user_id: integer('user_id'),
    createdAt: varchar("createdAt"),
    formID: varchar("mockID").notNull(),
    enabledSignIn:boolean('enabledSignIn').default(false),
})

export const FormRelations = relations(Forms, ({ one }) => ({
    user: one(User, {
        fields: [Forms.user_id],
        references: [User.id],
    }),
}));