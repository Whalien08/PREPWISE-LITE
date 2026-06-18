// components/PlanCard.tsx

export default function PlanCard({ planText }: any) {
  // If there is no plan text yet, don't show the card at all.
  if (!planText) return null;

  return (
    <div className="border border-zinc-700 p-6 rounded-lg bg-zinc-900 mt-8 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-400 border-b border-zinc-700 pb-2">
        Your Personalized Study Schedule
      </h2>
      
      {/* whitespace-pre-line ensures the formatting/line-breaks from the AI are kept */}
      <div className="text-white whitespace-pre-line leading-relaxed">
        {planText}
      </div>

      {/* Day 3 Task: We will make this button actually save to Supabase later! */}
      <button 
        className="mt-6 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded border border-zinc-600 transition-colors w-full sm:w-auto"
        onClick={() => alert("This will save to Supabase in Day 3!")}
      >
        💾 Save Plan
      </button>
    </div>
  );
}