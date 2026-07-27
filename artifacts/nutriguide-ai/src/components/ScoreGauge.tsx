import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number; // 0–10
}

function getScoreColor(score: number): string {
  if (score >= 8) return '#16a34a';    // green-600
  if (score >= 6) return '#65a30d';    // lime-600
  if (score >= 4) return '#d97706';    // amber-600
  return '#dc2626';                     // red-600
}

function getScoreLabel(score: number): string {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  return 'Needs Work';
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  // Only fill the top 75% arc (270 degrees)
  const arcLength = circumference * 0.75;
  const pct = Math.min(Math.max(score / 10, 0), 1);
  const fillLength = arcLength * pct;
  const gap = arcLength - fillLength;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="flex flex-col items-center" data-testid="score-gauge">
      <div className="relative w-36 h-36">
        <svg
          viewBox="0 0 128 128"
          className="w-full h-full -rotate-[135deg]"
          aria-label={`Health score: ${score} out of 10`}
        >
          {/* Track */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="hsl(140 15% 88%)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset={0}
          />
          {/* Fill */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${animated ? fillLength : 0} ${animated ? gap : arcLength} ${circumference - arcLength}`}
            strokeDashoffset={0}
            style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold leading-none"
            style={{ color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            data-testid="text-health-score"
          >
            {score.toFixed(1)}
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
            / 10
          </span>
        </div>
      </div>
      <div
        className="mt-1 text-sm font-semibold"
        style={{ color }}
        data-testid="text-score-label"
      >
        {label}
      </div>
    </div>
  );
}
