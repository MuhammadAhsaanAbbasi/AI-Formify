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
    limit: serial("limit").$default(() => 3),
    createdAt: timestamp('createdAt', { mode: "date" }).defaultNow(),
});

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
    mockID: varchar("mockID").notNull(),
    enabledSignIn:boolean('enabledSignIn').default(false),
})

export const FormRelations = relations(Forms, ({ one, many }) => ({
    user: one(User, {
        fields: [Forms.user_id],
        references: [User.id],
    }),
    responses: many(userResponses),
}));

export const userResponses = pgTable('userResponses', {
    id:serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    createdBy:varchar('createdBy').default('anonymus'),
    createdAt:varchar('createdAt').notNull(),
    form_id: integer('form_id'),
})

export const UserResponseRelations = relations(userResponses, ({ one }) => ({
    form: one(Forms, {
        fields: [userResponses.form_id],
        references: [Forms.id],
    }),
}))

export const Transactions = pgTable('transactions', {
    id:serial('id').primaryKey(),
    stripeId:varchar('stripeId').notNull(),
    amount:integer('amount').notNull(),
    limit:integer('limit').notNull(),
    plan:varchar('plan').notNull(),
    buyerId:integer('buyerId').notNull(),
    createdAt:varchar('createdAt').notNull(),
})  

export const TransactionRelations = relations(Transactions, ({ one }) => ({
    user: one(User, {
        fields: [Transactions.buyerId],
        references: [User.id],
    }),
}))