import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const isGood = score > 69;
  const isMid = score > 49;

  const config = isGood
    ? { border: 'border-emerald-200', bg: 'bg-emerald-50', accent: 'bg-emerald-500', text: 'text-emerald-700', lightBg: 'bg-emerald-100', subtitle: 'Great ATS Match', headerBg: 'from-emerald-50 to-white' }
    : isMid
    ? { border: 'border-amber-200', bg: 'bg-amber-50', accent: 'bg-amber-500', text: 'text-amber-700', lightBg: 'bg-amber-100', subtitle: 'Decent ATS Match', headerBg: 'from-amber-50 to-white' }
    : { border: 'border-red-200', bg: 'bg-red-50', accent: 'bg-red-500', text: 'text-red-700', lightBg: 'bg-red-100', subtitle: 'Needs Improvement', headerBg: 'from-red-50 to-white' };

  return (
    <div className={`rounded-2xl border ${config.border} overflow-hidden shadow-sm w-full bg-white`}>
      <div className={`bg-gradient-to-br ${config.headerBg} p-5 border-b ${config.border}`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 ${config.lightBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <span className={`text-xl font-black ${config.text}`}>{score}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-lg font-bold text-slate-800">ATS Score</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.lightBg} ${config.text}`}>
                {config.subtitle}
              </span>
            </div>
            <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${config.accent} transition-all duration-700`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-500 mb-4">
          How well your resume performs in Applicant Tracking Systems used by employers.
        </p>
        <div className="flex flex-col gap-2.5">
          {suggestions.map((s, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
              s.type === 'good'
                ? 'bg-emerald-50 border border-emerald-100 text-emerald-800'
                : 'bg-amber-50 border border-amber-100 text-amber-800'
            }`}>
              {s.type === 'good' ? (
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              )}
              <p className="leading-snug">{s.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ATS
