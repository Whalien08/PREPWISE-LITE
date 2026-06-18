import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    // 1. Extract the data sent from the frontend form
    const body = await req.json();
    const { subject, topics, examDate } = body;

    // 2. Grab our secret API key from the vault
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is missing from .env.local" },
        { status: 500 }
      );
    }

    // 3. Craft a highly structured prompt for the AI
    const systemPrompt = `You are an expert academic study planner. 
    Your job is to take a subject, specific topics, and a target exam date, and generate a highly structured, realistic, day-by-day study schedule. 
    Break the topics down logically across the available days. Be encouraging but precise.`;

    const userPrompt = `I need a study plan for the subject: "${subject}".
    The specific topics I must cover are: "${topics}".
    My exam is on: ${examDate}. 
    Please generate a day-by-day roadmap leading up to this date.`;

    // 4. Fire the request directly to Groq's official API endpoint
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // A fast, high-quality model available on Groq
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.5, // Keeps the response structured and focused
      }),
    });

    // 5. Parse the raw response data from Groq
    const data = await response.json();
    
    // Extract the actual text response written by the AI model
    const aiPlanText = data.choices[0].message.content;

    // 6. Send the plan text back to our frontend form
    return NextResponse.json({ plan: aiPlanText });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating the plan." },
      { status: 500 }
    );
  }
}