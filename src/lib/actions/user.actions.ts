"use server";

import { revalidatePath } from "next/cache";

import { User } from "@/utils/schema";
import { db } from "@/utils/db";
import { handleError } from "../utils";
import { eq } from "drizzle-orm";

// CREATE
export async function createUser(user: CreateUserParams) {
    try {

        const newUser = await db.insert(User)
        .values(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

// READ
export async function getUserById(userId: string) {
    try {

        const user = await db.select()
        .from(User)
        .where(eq(User.clerkId, userId));

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user[0]));
    } catch (error) {
        handleError(error);
    }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {

        const updatedUser = await db.update(User)
        .set(user)
        .where(eq(User.clerkId, clerkId))
        .returning();

        if (!updatedUser) throw new Error("User update failed");

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

// DELETE
export async function deleteUser(clerkId: string) {
    try {

        // Find user to delete
        const userToDelete = await db.select()
        .from(User)
        .where(eq(User.clerkId, clerkId));

        if (!userToDelete) {
            throw new Error("User not found");
        }

        // Delete user
        const deletedUser = await db.delete(User)
        .where(eq(User.id, userToDelete[0].id))
        .returning();

        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}