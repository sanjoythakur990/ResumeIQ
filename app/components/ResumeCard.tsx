import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            setResumeUrl(URL.createObjectURL(blob));
        }
        loadResume();
    }, [imagePath]);

    const score = feedback.overallScore;
    const scoreColor = score > 70 ? 'text-emerald-600' : score > 49 ? 'text-amber-600' : 'text-red-500';
    const scoreBg = score > 70 ? 'bg-emerald-50 border-emerald-100' : score > 49 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100';

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-500">
            <div className="resume-card-header">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    {companyName && (
                        <h2 className="!text-slate-900 font-bold !text-xl break-words leading-snug">{companyName}</h2>
                    )}
                    {jobTitle && (
                        <p className="text-sm text-slate-500 font-medium break-words">{jobTitle}</p>
                    )}
                    {!companyName && !jobTitle && (
                        <h2 className="!text-slate-900 font-bold !text-xl">Resume</h2>
                    )}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border w-fit mt-1 ${scoreBg} ${scoreColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {score > 70 ? 'Strong Match' : score > 49 ? 'Good Start' : 'Needs Work'}
                    </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                    <ScoreCircle score={score} />
                </div>
            </div>

            {resumeUrl ? (
                <div className="gradient-border animate-in fade-in duration-700 flex-1 overflow-hidden">
                    <img
                        src={resumeUrl}
                        alt="resume preview"
                        className="w-full h-full object-cover object-top rounded-[14px]"
                    />
                </div>
            ) : (
                <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                    <div className="text-center text-slate-300">
                        <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xs">Loading...</p>
                    </div>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
