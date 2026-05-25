interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const config = score > 70
    ? { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Strong', dot: 'bg-emerald-500' }
    : score > 49
    ? { bg: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Good Start', dot: 'bg-amber-500' }
    : { bg: 'bg-red-100 text-red-700 border-red-200', label: 'Needs Work', dot: 'bg-red-500' };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </div>
  );
};

export default ScoreBadge;
