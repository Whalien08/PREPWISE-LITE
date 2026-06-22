"use client";

import { useState } from "react";
import { deleteStudyPlan } from "../app/actions";
import { StudyPlan } from "@prisma/client";

export default function ExpandableCard({ plan }: { plan: StudyPlan }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation(); 
    
    if (!confirm("Are you sure you want to delete this study plan?")) return;

    setIsDeleting(true);
    await deleteStudyPlan(plan.id);
  }

  return (
    <div className="w-full transition-all">
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-800/30 transition-colors group"
      >
        <div>
          <h2 className="font-poppins text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
            {plan.subject}
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">
            Topics: <span className="text-slate-300">{plan.topics}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          
          {/* Subtle Delete Button (only turns red on hover) */}
          <span 
            onClick={handleDelete}
            className={`text-xl p-2 rounded-lg transition-all ${
              isDeleting 
                ? "text-slate-600 cursor-not-allowed" 
                : "text-slate-500 hover:text-red-400 hover:bg-red-400/10"
            }`}
            title="Delete Plan"
          >
            {isDeleting ? "⏳" : "🗑️"}
          </span>

          {/* Expand/Collapse Icon */}
          <span className="text-3xl text-slate-600 font-light w-4 text-center group-hover:text-blue-500 transition-colors">
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* Expanded Content Area */}
      {isOpen && (
        <div className="p-6 pt-0 border-t border-slate-800/50 bg-slate-900/20">
          <div className="text-slate-300 whitespace-pre-line leading-relaxed text-sm mt-4">
            {plan.planText}
          </div>
        </div>
      )}
      
    </div>
  );
}