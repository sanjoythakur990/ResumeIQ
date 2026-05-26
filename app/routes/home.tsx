import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }
    loadResumes()
  }, []);

  return (
    <main className="bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-10">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            AI-Powered Resume Analysis
          </div>
          <h1>Track Your Applications &amp; Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes yet. Upload your first resume to get AI-powered feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            {[
              { label: 'Instant ATS Score', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
              { label: 'Detailed AI Feedback', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
              { label: 'Structure Analysis', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /> },
            ].map(({ label, icon }) => (
              <div key={label} className="inline-flex items-center gap-2 bg-white border border-indigo-100 shadow-sm px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="w-5 h-5 rounded-full primary-gradient flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                  </svg>
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <img src="/images/resume-scan-2.gif" className="w-[180px] opacity-80" />
            <p className="text-slate-500 text-sm font-medium">Loading your resumes...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-6 gap-6">
            <div className="w-64 h-64 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4 text-center p-8">
              <div className="w-14 h-14 primary-gradient rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-700 text-sm">No resumes yet</p>
                <p className="text-slate-400 text-xs mt-1">Upload your first resume to get started</p>
              </div>
            </div>
            <Link to="/upload" className="primary-button w-fit text-base px-8 py-3">
              Upload Your Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
