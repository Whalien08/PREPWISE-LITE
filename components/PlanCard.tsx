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
    <div className="border border-zinc-700 p-6 rounded-lg bg-zinc-900 mt-8 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-400 border-b border-zinc-700 pb-2">
        Your Personalized Study Schedule
      </h2>
      
      <div className="text-white whitespace-pre-line leading-relaxed">
        {planText}
      </div>

      <button 
        onClick={handleSave}
        disabled={isSaving || saved}
        className={`mt-6 px-4 py-2 rounded border transition-colors w-full sm:w-auto font-bold
          ${saved 
            ? "bg-green-600 border-green-500 text-white" 
            : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600"}`}
      >
        {isSaving ? "Saving..." : saved ? "✅ Saved to Supabase!" : "💾 Save Plan"}
      </button>
    </div>
  );
}