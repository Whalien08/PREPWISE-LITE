"use client";

import { useState } from "react";
import PlanCard from "./PlanCard";

export default function StudyForm() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");
  
  const [studyPlan, setStudyPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateStudyPlan(e: any) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Hit our new backend endpoint and send our state variables
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, topics, examDate }),
      });

      const data = await res.json();
      
      if (data.plan) {
        // Save the AI text into our state box to display it on the PlanCard!
        setStudyPlan(data.plan);
      } else {
        alert("Failed to generate plan: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while talking to the backend.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={generateStudyPlan} className="space-y-4 mb-6">
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject (e.g., Database Management)"
        className="border border-zinc-700 p-3 w-full rounded text-white bg-zinc-900 focus:outline-none focus:border-purple-500"
        required
      />

      <textarea
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        placeholder="Topics to cover (e.g., SQL, Normalization, Transactions)"
        className="border border-zinc-700 p-3 w-full rounded text-white bg-zinc-900 focus:outline-none focus:border-purple-500"
        rows={4}
        required
      />

      <div className="flex flex-col">
        <label className="text-sm text-zinc-400 mb-1">Exam Date</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="border border-zinc-700 p-3 w-full rounded text-white bg-zinc-900 focus:outline-none focus:border-purple-500"
          required
        />
      </div>

      <button 
        type="submit" 
        className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-3 rounded w-full font-bold"
        disabled={isLoading}
      >
        {isLoading ? "Generating Schedule..." : "Generate AI Study Plan"}
      </button>
      <PlanCard planText={studyPlan} subject={subject} topics={topics} />
    </form>
  );
}