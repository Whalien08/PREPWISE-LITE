"use client";

import { useState } from "react";
import { saveStudyPlan } from "../app/actions";

export default function PlanCard({ planText, subject, topics }: any) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!planText) return null;

  async function handleSave() {
    setIsSaving(true);
    const result = await saveStudyPlan(subject, topics, planText);
    
    if (result?.success) {
      setSaved(true);
    } else {
      alert("Failed to save to database. Check terminal.");
    }
    setIsSaving(false);
  }

  return (
    <div className="border border-slate-800 p-6 md:p-8 rounded-2xl bg-slate-900/50 shadow-xl backdrop-blur-sm">
      
      <h2 className="font-poppins text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 border-b border-slate-800/50 pb-4">
        Your Personalized Study Protocol
      </h2>
      
      <div className="text-slate-300 whitespace-pre-line leading-relaxed text-sm md:text-base">
        {planText}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving || saved}
          className={`px-6 py-3 rounded-xl transition-all font-poppins font-semibold text-sm w-full sm:w-auto flex justify-center items-center gap-2 active:scale-[0.98]
            ${saved 
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-default" 
              : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-lg hover:shadow-xl"}`}
        >
          {isSaving ? "Saving..." : saved ? "✓ Protocol Secured" : "💾 Save to Dashboard"}
        </button>
      </div>
      
    </div>
  );
}