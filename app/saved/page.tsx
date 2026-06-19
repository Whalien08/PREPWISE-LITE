import { prisma } from "../../lib/prisma";
import Link from "next/link";
import ExpandableCard from "../../components/ExpandableCard";
// 1. Import the generated type from Prisma
import { StudyPlan } from "@prisma/client"; 

export default async function SavedPlansPage() {
  
  const plans = await prisma.studyPlan.findMany({
    orderBy: {
      createdAt: 'desc' 
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      
      <div className="flex justify-between items-center mb-8 border-b border-zinc-700 pb-4">
        <h1 className="text-3xl font-bold text-white">My Saved Plans</h1>
        <Link 
          href="/" 
          className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded text-white font-bold"
        >
          + Create New Plan
        </Link>
      </div>

      {plans.length === 0 ? (
        <p className="text-zinc-400 text-center mt-10">No plans saved yet. Go make one!</p>
      ) : (
        <div className="space-y-4">
          {/* 2. Explicitly tell TypeScript that 'plan' is a StudyPlan! */}
          {plans.map((plan: StudyPlan) => (
            <ExpandableCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
      
    </div>
  );
}