import { db } from "./db";
import { users } from "@shared/schema";

async function seed() {
  try {
    // Create the three users
    const usersToCreate = [
      {
        email: "researcher@gmail.com",
        password: "123",
        firstName: "Research",
        lastName: "User",
        role: "researcher",
      },
      {
        email: "knowledgeseeker@gmail.com",
        password: "123",
        firstName: "Knowledge",
        lastName: "Seeker",
        role: "customer",
      },
      {
        email: "admin@gmail.com",
        password: "123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      },
    ];

    for (const userData of usersToCreate) {
      await db
        .insert(users)
        .values(userData)
        .onConflictDoNothing();
      console.log(`Created user: ${userData.email}`);
    }

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
