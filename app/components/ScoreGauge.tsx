import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);
    const percentage = score / 100;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    const color = score > 70 ? '#10b981' : score > 49 ? '#f59e0b' : '#ef4444';
    const label = score > 70 ? 'Strong' : score > 49 ? 'Good Start' : 'Needs Work';

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative w-44 h-24">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={color} />
                        </linearGradient>
                    </defs>
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span className="text-2xl font-bold text-slate-800">{score}</span>
                    <span className="text-xs text-slate-400 font-medium -mt-0.5">out of 100</span>
                </div>
            </div>
            <span className="text-sm font-semibold px-3 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}18` }}>
                {label}
            </span>
        </div>
    );
};

export default ScoreGauge;
