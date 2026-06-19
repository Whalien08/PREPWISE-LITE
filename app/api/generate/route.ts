import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// 1. Initialize the Groq SDK using our hidden API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: any) {
  try {
    // 2. Extract our specific form data
    const body = await req.json();
    const { subject, topics, examDate } = body;

    // 3. Craft our Study Planner prompts
    const systemPrompt = `You are an expert academic study planner. 
    Your job is to take a subject, specific topics, and a target exam date, and generate a highly structured, realistic, day-by-day study schedule. 
    Break the topics down logically across the available days. Be encouraging but precise.`;

    // Get exactly what today's date is
    const today = new Date().toLocaleDateString();

    const userPrompt = `Today's date is ${today}. 
    I need a study plan for the subject: "${subject}".
    The specific topics I must cover are: "${topics}".
    My exam is on: ${examDate}. 
    Please calculate the exact number of days between today and the exam date, and generate a day-by-day roadmap leading up to this date packed into that specific timeframe.`;

    // 4. Use the SDK to call the AI
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Fast and efficient model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5,
    });

    // 5. Return the data to the frontend (Notice we use 'plan' to match our frontend code)
    return NextResponse.json({
      plan: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("SDK Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating the plan." },
      { status: 500 }
    );
  }
}