"use server";

import { prisma } from "../lib/prisma"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveStudyPlan(subject: string, topics: string, planText: string) {
  let isSuccess = false;

  try {
    await prisma.studyPlan.create({
      data: {
        subject: subject,
        topics: topics,
        planText: planText,
      },
    });
    
    isSuccess = true; // Mark it as successful
    
  } catch (error) {
    console.error("Prisma Save Error:", error);
    return { success: false };
  }
  if (isSuccess) {
    revalidatePath("/saved"); 
    redirect("/saved"); 
  }
}

export async function deleteStudyPlan(id: string) {
  try {
    await prisma.studyPlan.delete({
      where: { id: id },
    });

    revalidatePath("/saved"); 
    return { success: true };
    
  } catch (error) {
    console.error("Prisma Delete Error:", error);
    return { success: false };
  }
}