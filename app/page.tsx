import StudyForm from "../components/StudyForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="flex justify-end mb-8">
        <Link href="/saved" className="text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors font-medium flex items-center gap-2">
          📁 View My Dashboard
        </Link>
      </div>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-2 text-purple-500">PrepWise AI</h1>
        <p className="text-zinc-400 mb-8">
          Smart Study Planner - Generate your personalized exam schedule.
        </p>
        
        {/* We are bringing in our form component here! */}
        <StudyForm />
      </div>
    </main>
  );
}