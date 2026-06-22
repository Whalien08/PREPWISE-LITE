import { prisma } from "../../lib/prisma";
import Link from "next/link";
import ExpandableCard from "../../components/ExpandableCard";
import type { StudyPlan } from "@prisma/client"; 

export default async function SavedPlansPage() {
  
  const plans = await prisma.studyPlan.findMany({
    orderBy: {
      createdAt: 'desc' 
    }
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 border-b border-slate-800 pb-6 gap-6">
          <div>
            <h1 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-2">My Dashboard</h1>
            <p className="text-slate-400 text-sm">Review and manage your generated study protocols.</p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 transition-all px-6 py-3 rounded-xl text-white font-poppins font-semibold shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            + Create New Study Plan
          </Link>
        </div>

        {/* Dynamic Content */}
        {plans.length === 0 ? (
          <div className="text-center mt-20 p-12 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl">
            <p className="text-slate-400 text-lg mb-4">No study protocols found in your database.</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Initialize a new study plan &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {plans.map((plan: StudyPlan) => (
              <div key={plan.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-slate-700 transition-colors overflow-hidden shadow-xl">
                <ExpandableCard plan={plan} />
              </div>
            ))}
          </div>
        )}
        
      </div>
    </main>
  );
}