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
