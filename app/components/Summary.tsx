import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const barColor = score > 70 ? 'bg-emerald-500' : score > 49 ? 'bg-amber-500' : 'bg-red-500';

    return (
        <div className="flex flex-row items-center gap-4 px-5 py-3.5 border-b border-slate-100 last:border-0">
            <div className="flex flex-row gap-3 items-center flex-1 min-w-0">
                <p className="text-base font-semibold text-slate-700 whitespace-nowrap">{title}</p>
                <ScoreBadge score={score} />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                        style={{ width: `${score}%` }}
                    />
                </div>
                <span className="text-sm font-bold text-slate-700 w-10 text-right">{score}/100</span>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm w-full overflow-hidden">
            <div className="flex flex-row items-center gap-6 p-5 border-b border-slate-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Overall Score</p>
                    <h2 className="text-xl font-bold !text-slate-900">Your Resume Score</h2>
                    <p className="text-sm text-slate-500">
                        Calculated across tone, content, structure, and skills.
                    </p>
                </div>
            </div>

            <Category title="Tone &amp; Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}
export default Summary
