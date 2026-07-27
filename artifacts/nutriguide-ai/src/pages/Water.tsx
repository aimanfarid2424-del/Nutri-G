import { useState } from 'react';
import { Droplets, AlertCircle, Info } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

interface WaterResult {
  intake: string;
  intakeMl: number;
  tip: string;
}

const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise, desk job', multiplier: 0.9 },
  { value: 'light', label: 'Light', description: 'Light exercise 1–3 days per week', multiplier: 1.0 },
  { value: 'moderate', label: 'Moderate', description: 'Moderate exercise 3–5 days per week', multiplier: 1.1 },
  { value: 'active', label: 'Active', description: 'Hard exercise 6–7 days per week', multiplier: 1.2 },
  { value: 'very_active', label: 'Very Active', description: 'Intense exercise or physical job', multiplier: 1.3 },
];

const TIPS_BY_ACTIVITY: Record<string, string> = {
  sedentary: 'Even with low activity, aim to sip water steadily throughout the day. Set a reminder every hour to drink a small glass — it adds up without feeling like a chore.',
  light: 'Drink a glass of water before each meal and after any exercise session. Herbal teas like kahwa count toward your daily intake too.',
  moderate: 'Hydrate before, during, and after workouts. Electrolyte-rich options like coconut water or a pinch of salt in water can help on active days.',
  active: 'At your activity level, hydration is performance-critical. Pre-load with water 30 minutes before exercise and replenish 500ml for every hour of training.',
  very_active: 'Your body loses significant fluid through sweat. Consider weighing yourself before and after exercise — replace each 0.5 kg of weight lost with 500ml of water.',
};

function calculateWater(weight: number, activityLevel: string): WaterResult {
  const level = ACTIVITY_LEVELS.find((a) => a.value === activityLevel) || ACTIVITY_LEVELS[1];
  const baseMl = 35 * weight;
  const adjustedMl = Math.round(baseMl * level.multiplier);
  const liters = (adjustedMl / 1000).toFixed(1);
  const glasses = Math.round(adjustedMl / 250);
  const tip = TIPS_BY_ACTIVITY[activityLevel] || TIPS_BY_ACTIVITY.light;

  return {
    intake: `${liters} L (approx. ${glasses} glasses)`,
    intakeMl: adjustedMl,
    tip,
  };
}

function WaterBar({ percent }: { percent: number }) {
  return (
    <div className="relative w-24 h-48 rounded-full border-2 border-blue-200 bg-blue-50 overflow-hidden mx-auto" data-testid="water-visualization">
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-1000 ease-out rounded-b-full"
        style={{ height: `${percent}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Droplets className="w-8 h-8 text-blue-500/60" />
      </div>
    </div>
  );
}

export default function Water() {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [result, setResult] = useState<WaterResult | null>(null);
  const [errors, setErrors] = useState<{ weight?: string; activity?: string }>({});

  function validate(): boolean {
    const newErrors: { weight?: string; activity?: string } = {};
    const w = parseFloat(weight);

    if (!weight || isNaN(w) || w <= 0) {
      newErrors.weight = 'Please enter a valid weight.';
    } else if (w < 10 || w > 500) {
      newErrors.weight = 'Weight must be between 10 and 500 kg.';
    }

    if (!activityLevel) {
      newErrors.activity = 'Please select your activity level.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const res = calculateWater(parseFloat(weight), activityLevel);
    setResult(res);
  }

  function handleReset() {
    setWeight('');
    setActivityLevel('');
    setResult(null);
    setErrors({});
  }

  // Water percent for visualization (max at ~4L = 100%)
  const waterPercent = result ? Math.min((result.intakeMl / 4000) * 100, 100) : 0;

  return (
    <PageWrapper>
      <div className="pt-24 pb-20 min-h-[100dvh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 animate-reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-5">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Water Intake Calculator</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              How much water do you need?
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Proper hydration is one of the simplest and most impactful things you can do for your health. This calculator gives you a personalized daily target.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm mb-6 animate-reveal-up stagger-1">
            <form onSubmit={handleCalculate} className="space-y-6" data-testid="water-form">
              {/* Weight */}
              <div>
                <label htmlFor="water-weight" className="block text-sm font-semibold text-foreground mb-2">
                  Body Weight (kg)
                </label>
                <input
                  id="water-weight"
                  type="number"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setErrors((prev) => ({ ...prev, weight: undefined }));
                  }}
                  placeholder="e.g. 65"
                  min="10"
                  max="500"
                  className={`w-full px-4 py-3 rounded-xl bg-muted border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-colors ${
                    errors.weight ? 'border-destructive' : 'border-input focus:border-blue-400'
                  }`}
                  data-testid="input-water-weight"
                />
                {errors.weight && (
                  <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> {errors.weight}
                  </p>
                )}
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Activity Level
                </label>
                <div className="space-y-2.5">
                  {ACTIVITY_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => {
                        setActivityLevel(level.value);
                        setErrors((prev) => ({ ...prev, activity: undefined }));
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all ${
                        activityLevel === level.value
                          ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300'
                          : 'bg-muted border-input hover:border-blue-200 hover:bg-blue-50/40'
                      }`}
                      data-testid={`option-activity-${level.value}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                          activityLevel === level.value
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-border bg-white'
                        }`}
                      />
                      <div>
                        <div className={`text-sm font-semibold ${activityLevel === level.value ? 'text-blue-700' : 'text-foreground'}`}>
                          {level.label}
                        </div>
                        <div className="text-xs text-muted-foreground">{level.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.activity && (
                  <p className="mt-2 text-xs text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> {errors.activity}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
                  data-testid="button-calculate-water"
                >
                  <Droplets className="w-4.5 h-4.5" />
                  Calculate Daily Intake
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3.5 bg-muted text-foreground rounded-xl font-medium text-sm hover:bg-secondary transition-colors"
                    data-testid="button-reset-water"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm space-y-7 animate-reveal-up" data-testid="water-result">
              {/* Visual + number */}
              <div className="flex flex-col items-center gap-4">
                <WaterBar percent={waterPercent} />
                <div className="text-center">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Daily Water Recommendation</p>
                  <div
                    className="text-4xl font-extrabold text-blue-500 mb-1"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    data-testid="text-water-intake"
                  >
                    {result.intake}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.intakeMl} ml total</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Morning', portion: Math.round(result.intakeMl * 0.35), note: '~35% on waking' },
                  { label: 'Afternoon', portion: Math.round(result.intakeMl * 0.35), note: '~35% at midday' },
                  { label: 'Evening', portion: Math.round(result.intakeMl * 0.30), note: '~30% early evening' },
                ].map((chunk) => (
                  <div
                    key={chunk.label}
                    className="bg-blue-50 rounded-xl border border-blue-100 p-4 text-center"
                    data-testid={`water-chunk-${chunk.label.toLowerCase()}`}
                  >
                    <div className="text-lg font-bold text-blue-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {chunk.portion} ml
                    </div>
                    <div className="text-xs font-semibold text-blue-700 mt-0.5">{chunk.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{chunk.note}</div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5" data-testid="water-tip">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Personalized Tip</p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.tip}</p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Increase intake during hot Pakistani summers, illness, or heavy physical work. Tea and other beverages contribute partially to daily fluid intake.
              </p>
            </div>
          )}

          {/* Info */}
          <div className="mt-6 bg-white rounded-2xl border border-card-border p-6 animate-reveal-up stagger-2" data-testid="water-info">
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Why hydration matters
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Water makes up roughly 60% of the human body and is essential for nearly every bodily function — from digestion and temperature regulation to joint lubrication and cognitive performance. Even mild dehydration (1–2% of body weight) can impair concentration, cause headaches, and reduce physical performance. In Pakistan's climate, where summer temperatures regularly exceed 40°C, adequate hydration is especially critical.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
