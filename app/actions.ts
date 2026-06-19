"use server";

// 1. Import our safe, single connection from the lib folder
import { prisma } from "../lib/prisma"; 
import { revalidatePath } from "next/cache";

// 2. Our adapted function for saving the AI's plan
export async function saveStudyPlan(subject: string, topics: string, planText: string) {
  try {
    await prisma.studyPlan.create({
      data: {
        subject: subject,
        topics: topics,
        planText: planText,
      },
    });

    // Refresh the page data invisibly in the background
    revalidatePath("/"); 
    return { success: true };
    
  } catch (error) {
    console.error("Failed to save to Supabase:", error);
    return { success: false };
  }
}