import { useState } from 'react';
import { Brain, AlertCircle, ChevronDown, CheckCircle2, XCircle, AlertTriangle, Zap, Utensils, TrendingUp, RefreshCw } from 'lucide-react';
import { useAnalyzeMeal } from '@workspace/api-client-react';
import type { MealAnalysis } from '@workspace/api-client-react';
import PageWrapper from '@/components/PageWrapper';
import ScoreGauge from '@/components/ScoreGauge';

const HEALTH_GOALS = [
  { value: 'weight_loss', label: 'Weight Loss', description: 'Reduce calories, manage portions' },
  { value: 'weight_gain', label: 'Weight Gain', description: 'Increase caloric intake healthily' },
  { value: 'high_protein', label: 'High Protein', description: 'Maximize protein for muscle' },
  { value: 'diabetes_friendly', label: 'Diabetes Friendly', description: 'Control blood sugar' },
  { value: 'heart_healthy', label: 'Heart Healthy', description: 'Protect cardiovascular health' },
];

function SkeletonLoader() {
  return (
    <div className="space-y-5 animate-pulse" data-testid="skeleton-loader">
      <div className="flex justify-center">
        <div className="w-36 h-36 rounded-full bg-muted shimmer" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-muted shimmer" />
        ))}
      </div>
      <div className="space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 rounded-md bg-muted shimmer" style={{ width: `${85 - i * 12}%` }} />
        ))}
      </div>
      <div className="space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 rounded-md bg-muted shimmer" style={{ width: `${75 - i * 10}%` }} />
        ))}
      </div>
    </div>
  );
}

function MacroCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-card-border p-4 text-center" data-testid={`macro-card-${label.toLowerCase()}`}>
      <div className={`text-xs font-semibold uppercase tracking-wider mb-1.5`} style={{ color }}>
        {label}
      </div>
      <div className="text-sm font-medium text-foreground leading-snug">{value}</div>
    </div>
  );
}

function ResultPanel({ data }: { data: MealAnalysis }) {
  return (
    <div className="space-y-7 animate-reveal-up" data-testid="result-panel">
      {/* Score */}
      <div className="flex flex-col items-center gap-2 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Health Score</p>
        <ScoreGauge score={data.healthScore} />
      </div>

      {/* Calories */}
      <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center justify-between" data-testid="calorie-display">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Estimated Calories</span>
        </div>
        <span className="text-lg font-bold text-primary" data-testid="text-calories">{data.estimatedCalories}</span>
      </div>

      {/* Macros */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Macronutrients</p>
        <div className="grid grid-cols-3 gap-3">
          <MacroCard label="Protein" value={data.protein} color="hsl(148 58% 36%)" />
          <MacroCard label="Carbs" value={data.carbohydrates} color="hsl(38 85% 45%)" />
          <MacroCard label="Fat" value={data.fat} color="hsl(200 65% 40%)" />
        </div>
      </div>

      {/* Strengths */}
      {data.strengths.length > 0 && (
        <div data-testid="strengths-section">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
            <p className="font-semibold text-foreground">Nutritional Strengths</p>
          </div>
          <ul className="space-y-2">
            {data.strengths.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-muted-foreground bg-primary/5 rounded-lg px-3 py-2.5"
                data-testid={`strength-item-${i}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {data.weaknesses.length > 0 && (
        <div data-testid="weaknesses-section">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4.5 h-4.5 text-destructive" />
            <p className="font-semibold text-foreground">Nutritional Weaknesses</p>
          </div>
          <ul className="space-y-2">
            {data.weaknesses.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-muted-foreground bg-destructive/5 rounded-lg px-3 py-2.5"
                data-testid={`weakness-item-${i}`}
              >
                <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Nutrients */}
      {data.missingNutrients.length > 0 && (
        <div data-testid="missing-nutrients-section">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4.5 h-4.5 text-accent" />
            <p className="font-semibold text-foreground">Missing Nutrients</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.missingNutrients.map((n, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-medium text-accent-foreground"
                data-testid={`missing-nutrient-${i}`}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {data.alternatives.length > 0 && (
        <div data-testid="alternatives-section">
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="w-4.5 h-4.5 text-primary" />
            <p className="font-semibold text-foreground">Pakistani Diet Alternatives</p>
          </div>
          <ul className="space-y-2">
            {data.alternatives.map((alt, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-muted-foreground bg-white rounded-lg border border-card-border px-3 py-2.5"
                data-testid={`alternative-item-${i}`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                {alt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tip */}
      {data.tip && (
        <div
          className="bg-accent/10 border border-accent/25 rounded-xl p-5"
          data-testid="personalized-tip"
        >
          <p className="text-xs font-semibold text-accent-foreground uppercase tracking-wider mb-2">Personalized Tip</p>
          <p className="text-sm text-foreground leading-relaxed font-medium">{data.tip}</p>
        </div>
      )}
    </div>
  );
}

export default function Analyze() {
  const [mealDescription, setMealDescription] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [goalOpen, setGoalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  const mutation = useAnalyzeMeal();

  const selectedGoal = HEALTH_GOALS.find((g) => g.value === healthGoal);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!mealDescription.trim()) {
      setValidationError('Please describe your meal before analyzing.');
      return;
    }
    if (!healthGoal) {
      setValidationError('Please select a health goal.');
      return;
    }
    if (mealDescription.trim().length < 5) {
      setValidationError('Please provide a more detailed meal description.');
      return;
    }

    setValidationError('');
    mutation.mutate({ data: { mealDescription: mealDescription.trim(), healthGoal } });
  }

  function handleReset() {
    mutation.reset();
    setMealDescription('');
    setHealthGoal('');
    setValidationError('');
  }

  return (
    <PageWrapper>
      <div className="pt-24 pb-20 min-h-[100dvh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 animate-reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <Brain className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Meal Analyzer</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              What did you eat today?
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Describe your meal in plain language and select your health goal. Our AI will analyze the nutritional value and offer honest, tailored guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Input panel */}
            <div className="animate-reveal-up stagger-1">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-card-border p-7 shadow-sm space-y-6" data-testid="meal-analysis-form">
                {/* Meal description */}
                <div>
                  <label
                    htmlFor="meal-description"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Describe your meal
                  </label>
                  <textarea
                    id="meal-description"
                    value={mealDescription}
                    onChange={(e) => {
                      setMealDescription(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="e.g. Two chapatis with daal mash, a cup of chai with full-fat milk, and a banana for breakfast."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-input text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    disabled={mutation.isPending}
                    data-testid="input-meal-description"
                  />
                </div>

                {/* Health goal selector */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your health goal
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setGoalOpen(!goalOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted border border-input text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                      disabled={mutation.isPending}
                      data-testid="select-health-goal"
                    >
                      <span className={selectedGoal ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                        {selectedGoal ? selectedGoal.label : 'Select a goal...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${goalOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {goalOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-card-border rounded-xl shadow-lg z-20 overflow-hidden">
                        {HEALTH_GOALS.map((goal) => (
                          <button
                            key={goal.value}
                            type="button"
                            onClick={() => {
                              setHealthGoal(goal.value);
                              setGoalOpen(false);
                              if (validationError) setValidationError('');
                            }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors ${
                              healthGoal === goal.value ? 'bg-primary/5 text-primary' : 'text-foreground'
                            }`}
                            data-testid={`option-goal-${goal.value}`}
                          >
                            <div className="font-medium">{goal.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{goal.description}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Validation error */}
                {validationError && (
                  <div
                    className="flex items-center gap-2.5 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-4 py-3"
                    data-testid="validation-error"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {validationError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  data-testid="button-analyze-meal"
                >
                  {mutation.isPending ? (
                    <>
                      <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                      Analyzing your meal...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4.5 h-4.5" />
                      Analyze My Meal
                    </>
                  )}
                </button>

                {mutation.data && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    data-testid="button-analyze-another"
                  >
                    Analyze another meal
                  </button>
                )}
              </form>

              {/* Tips */}
              <div className="mt-5 bg-primary/5 rounded-xl border border-primary/15 p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Tips for better results</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">-</span> Include approximate portions (e.g. "2 cups", "half plate")</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">-</span> Mention cooking methods if relevant (fried, boiled, baked)</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">-</span> Include drinks and side dishes</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">-</span> You can describe a full day's meals for comprehensive analysis</li>
                </ul>
              </div>
            </div>

            {/* Result panel */}
            <div className="animate-reveal-up stagger-2">
              {mutation.isPending && (
                <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm">
                  <p className="text-center text-sm text-muted-foreground mb-6 font-medium">Analyzing your meal with AI...</p>
                  <SkeletonLoader />
                </div>
              )}

              {mutation.isError && (
                <div
                  className="bg-white rounded-2xl border border-destructive/25 p-8 text-center shadow-sm"
                  data-testid="error-state"
                >
                  <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 text-destructive" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Something went wrong
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    We could not analyze your meal right now. Please check your connection and try again.
                  </p>
                  <button
                    onClick={() => mutation.reset()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                    data-testid="button-retry-analysis"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              )}

              {mutation.isSuccess && mutation.data && (
                <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-foreground" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      Analysis Results
                    </h2>
                    <span className="text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                      {selectedGoal?.label}
                    </span>
                  </div>
                  <ResultPanel data={mutation.data} />
                </div>
              )}

              {!mutation.isPending && !mutation.isError && !mutation.isSuccess && (
                <div
                  className="bg-white rounded-2xl border border-dashed border-border p-12 text-center"
                  data-testid="empty-state-results"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Your analysis will appear here
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Describe your meal and select a health goal to get your personalized nutritional analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
