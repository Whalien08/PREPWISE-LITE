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
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, topics, examDate }),
      });

      const data = await res.json();
      
      if (data.plan) {
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

  const inputStyles = "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600";

  return (
    <div className="w-full">
      <form onSubmit={generateStudyPlan} className="space-y-6 mb-8">
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-400 mb-2 px-1">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Database Management"
            className={inputStyles}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-400 mb-2 px-1">Core Topics</label>
          <textarea
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="e.g., SQL, Normalization, Transactions"
            className={inputStyles}
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-400 mb-2 px-1">Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className={inputStyles}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing & Generating Protocol..." : "Generate Study Protocol"}
        </button>
        
      </form>

      {/* Renders the plan below the form once generated */}
      {studyPlan && (
        <div className="mt-8 pt-8 border-t border-slate-800">
          <PlanCard planText={studyPlan} subject={subject} topics={topics} />
        </div>
      )}
    </div>
  );
}