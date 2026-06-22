import StudyForm from "../components/StudyForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Nav Header */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg rotate-12 flex items-center justify-center">
              <span className="text-white font-bold -rotate-12">P</span>
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight">PREPWISE <span className="text-blue-400">LITE</span></span>
          </div>
          <Link href="/saved" className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-all">
            <span className="bg-slate-800 group-hover:bg-blue-600 p-2 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
            DASHBOARD
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-poppins text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Learning Path.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Harness high-velocity AI to generate structured, professional study protocols for complex engineering and CS subjects.
          </p>
        </div>

        {/* The Card Structure */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
            <StudyForm />
          </div>
        </div>
        
        {/* Footer subtle text */}
        <p className="text-center text-slate-600 text-xs mt-12 uppercase tracking-[0.2em]">
          Powered by Groq LPU™ Inference Engine
        </p>
      </div>
    </main>
  );
}