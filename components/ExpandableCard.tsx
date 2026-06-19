"use client";

import { useState } from "react";
import { deleteStudyPlan } from "../app/actions";
// 1. Import the type here too
import { StudyPlan } from "@prisma/client";

// 2. Replace the 'any' with the proper StudyPlan type
export default function ExpandableCard({ plan }: { plan: StudyPlan }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    // 1. Stop the card from expanding/collapsing when we click the button
    e.stopPropagation(); 
    
    // 2. Add a safety check so they don't accidentally delete it
    if (!confirm("Are you sure you want to delete this study plan?")) return;

    // 3. Trigger the deletion
    setIsDeleting(true);
    await deleteStudyPlan(plan.id);
    
    // Note: We don't need to set isDeleting back to false because the card will vanish!
  }

  return (
    <div className="border border-zinc-700 rounded-lg bg-zinc-900 shadow-lg overflow-hidden transition-all">
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex justify-between items-center hover:bg-zinc-800 transition-colors"
      >
        <div>
          <h2 className="text-xl font-bold text-purple-400">{plan.subject}</h2>
          <p className="text-sm text-zinc-400 font-semibold mt-1">
            Topics: {plan.topics}
          </p>
        </div>
        
        {/* We wrap the icons in a div so they sit side-by-side */}
        <div className="flex items-center gap-6">
          
          {/* The Delete Button */}
          <span 
            onClick={handleDelete}
            className={`text-xl p-2 rounded transition-colors ${
              isDeleting ? "text-zinc-500 cursor-not-allowed" : "text-red-500 hover:bg-red-500/20"
            }`}
          >
            {isDeleting ? "⏳" : "🗑️"}
          </span>

          {/* The Expand/Collapse Icon */}
          <span className="text-3xl text-zinc-500 font-light w-4 text-center">
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 border-t border-zinc-800 bg-zinc-950">
          <div className="text-white whitespace-pre-line leading-relaxed text-sm mt-4">
            {plan.planText}
          </div>
        </div>
      )}
      
    </div>
  );
}