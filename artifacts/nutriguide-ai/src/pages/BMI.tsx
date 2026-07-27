import { useState } from 'react';
import { Calculator, AlertCircle, TrendingUp } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

interface BMIResult {
  bmi: number;
  category: string;
  explanation: string;
  recommendation: string;
  color: string;
}

function calculateBMI(weight: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let category: string;
  let explanation: string;
  let recommendation: string;
  let color: string;

  if (bmi < 18.5) {
    category = 'Underweight';
    explanation = 'Your BMI indicates you are below the healthy weight range for your height. This may mean your body is not getting enough nutrients it needs to function optimally.';
    recommendation = 'Consider increasing your caloric intake with nutrient-dense foods like whole grains, legumes, nuts, and dairy. Aim for 3 balanced meals and 2 healthy snacks per day. Strength training can help build healthy muscle mass.';
    color = '#3b82f6';
  } else if (bmi < 25) {
    category = 'Normal Weight';
    explanation = 'Your BMI falls within the healthy range. This is associated with a lower risk of weight-related health conditions and suggests a good balance between calorie intake and activity.';
    recommendation = 'Keep up your healthy habits. Focus on a balanced diet rich in vegetables, whole grains, lean proteins, and healthy fats. Stay active with at least 150 minutes of moderate exercise per week.';
    color = '#16a34a';
  } else if (bmi < 30) {
    category = 'Overweight';
    explanation = 'Your BMI suggests you are above the healthy weight range. This can increase risk of conditions such as type 2 diabetes, high blood pressure, and joint stress over time.';
    recommendation = 'Aim for gradual weight loss of 0.5–1 kg per week through a modest caloric deficit. Reduce refined carbohydrates and sugary drinks. Increase physical activity to 200–300 minutes of moderate exercise per week.';
    color = '#d97706';
  } else if (bmi < 35) {
    category = 'Obese (Class I)';
    explanation = 'Your BMI indicates obesity, which significantly raises the risk of serious health conditions including cardiovascular disease, type 2 diabetes, sleep apnea, and certain cancers.';
    recommendation = 'Consulting a healthcare provider or registered dietitian is strongly advised. A structured, medically supervised weight loss program — combining dietary changes, increased physical activity, and behavioral support — can produce lasting results.';
    color = '#ea580c';
  } else {
    category = 'Obese (Class II+)';
    explanation = 'Your BMI indicates severe obesity, which carries high risk of life-threatening conditions. Immediate lifestyle intervention and medical supervision are important.';
    recommendation = 'Please consult a doctor or qualified healthcare professional promptly. Medical intervention, including dietary counseling, exercise therapy, and possibly pharmacological support, may be required. Sustainable, gradual change is safer than extreme measures.';
    color = '#dc2626';
  }

  return { bmi: Math.round(bmi * 10) / 10, category, explanation, recommendation, color };
}

const BMI_RANGES = [
  { range: '< 18.5', label: 'Underweight', color: '#3b82f6' },
  { range: '18.5 – 24.9', label: 'Normal', color: '#16a34a' },
  { range: '25 – 29.9', label: 'Overweight', color: '#d97706' },
  { range: '30 – 34.9', label: 'Obese I', color: '#ea580c' },
  { range: '35+', label: 'Obese II+', color: '#dc2626' },
];

export default function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});

  function validate(): boolean {
    const newErrors: { height?: string; weight?: string } = {};
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!height || isNaN(h) || h <= 0) {
      newErrors.height = 'Please enter a valid height.';
    } else if (h < 50 || h > 280) {
      newErrors.height = 'Height must be between 50 and 280 cm.';
    }

    if (!weight || isNaN(w) || w <= 0) {
      newErrors.weight = 'Please enter a valid weight.';
    } else if (w < 10 || w > 500) {
      newErrors.weight = 'Weight must be between 10 and 500 kg.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const res = calculateBMI(parseFloat(weight), parseFloat(height));
    setResult(res);
  }

  function handleReset() {
    setHeight('');
    setWeight('');
    setResult(null);
    setErrors({});
  }

  const bmiPercent = result ? Math.min(((result.bmi - 10) / (45 - 10)) * 100, 100) : 0;

  return (
    <PageWrapper>
      <div className="pt-24 pb-20 min-h-[100dvh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 animate-reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 mb-5">
              <Calculator className="w-3.5 h-3.5 text-accent-foreground" />
              <span className="text-xs font-semibold text-accent-foreground uppercase tracking-wider">BMI Calculator</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Know your BMI.
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Body Mass Index gives you a quick snapshot of whether your weight is in a healthy range for your height. Enter your measurements below.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm mb-6 animate-reveal-up stagger-1">
            <form onSubmit={handleCalculate} className="space-y-6" data-testid="bmi-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Height */}
                <div>
                  <label htmlFor="bmi-height" className="block text-sm font-semibold text-foreground mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="bmi-height"
                    type="number"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setErrors((prev) => ({ ...prev, height: undefined }));
                    }}
                    placeholder="e.g. 168"
                    min="50"
                    max="280"
                    className={`w-full px-4 py-3 rounded-xl bg-muted border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${
                      errors.height ? 'border-destructive' : 'border-input focus:border-primary'
                    }`}
                    data-testid="input-height"
                  />
                  {errors.height && (
                    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" /> {errors.height}
                    </p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="bmi-weight" className="block text-sm font-semibold text-foreground mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="bmi-weight"
                    type="number"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      setErrors((prev) => ({ ...prev, weight: undefined }));
                    }}
                    placeholder="e.g. 65"
                    min="10"
                    max="500"
                    className={`w-full px-4 py-3 rounded-xl bg-muted border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${
                      errors.weight ? 'border-destructive' : 'border-input focus:border-primary'
                    }`}
                    data-testid="input-weight"
                  />
                  {errors.weight && (
                    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" /> {errors.weight}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                  data-testid="button-calculate-bmi"
                >
                  <Calculator className="w-4.5 h-4.5" />
                  Calculate BMI
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3.5 bg-muted text-foreground rounded-xl font-medium text-sm hover:bg-secondary transition-colors"
                    data-testid="button-reset-bmi"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm space-y-7 animate-reveal-up" data-testid="bmi-result">
              {/* BMI value */}
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Your BMI</p>
                <div
                  className="text-7xl font-extrabold mb-2"
                  style={{ color: result.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  data-testid="text-bmi-value"
                >
                  {result.bmi}
                </div>
                <div
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: result.color }}
                  data-testid="text-bmi-category"
                >
                  {result.category}
                </div>
              </div>

              {/* Visual gauge */}
              <div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #3b82f6 0%, #16a34a 30%, #d97706 55%, #ea580c 75%, #dc2626 100%)' }}>
                  <div
                    className="h-full w-1 rounded-full bg-foreground/80 transition-all duration-700 relative"
                    style={{ marginLeft: `calc(${bmiPercent}% - 2px)` }}
                    data-testid="bmi-gauge-indicator"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>10</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35</span>
                  <span>45+</span>
                </div>
              </div>

              {/* BMI ranges legend */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {BMI_RANGES.map((r) => (
                  <div
                    key={r.label}
                    className={`rounded-lg px-2.5 py-2 text-center border transition-all ${
                      result.category === r.label || (result.category.startsWith('Obese') && r.label === 'Obese I') || (result.category.startsWith('Obese (Class II') && r.label === 'Obese II+')
                        ? 'ring-2 ring-offset-1'
                        : ''
                    }`}
                    style={{
                      borderColor: r.color + '40',
                      backgroundColor: r.color + '10',
                      ...(result.category === r.label ? { ringColor: r.color } : {}),
                    }}
                    data-testid={`bmi-range-${r.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="text-xs font-semibold" style={{ color: r.color }}>{r.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{r.range}</div>
                  </div>
                ))}
              </div>

              {/* Explanation */}
              <div className="bg-muted rounded-xl p-5" data-testid="bmi-explanation">
                <p className="text-sm text-foreground leading-relaxed">{result.explanation}</p>
              </div>

              {/* Recommendation */}
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-5" data-testid="bmi-recommendation">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Recommendation</p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.recommendation}</p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                BMI is a screening tool, not a diagnostic. Consult a healthcare provider for personalised medical advice.
              </p>
            </div>
          )}

          {/* Info card */}
          <div className="mt-6 bg-white rounded-2xl border border-card-border p-6 animate-reveal-up stagger-2" data-testid="bmi-info">
            <h3 className="font-bold text-foreground mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Understanding BMI
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              BMI (Body Mass Index) is calculated by dividing weight in kilograms by height in meters squared. It is a widely used tool for population-level health screening but has limitations — it does not account for muscle mass, bone density, age, or body fat distribution. Use it as one data point alongside other health indicators.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
