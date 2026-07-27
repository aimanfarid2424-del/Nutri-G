import { Link } from 'wouter';
import { ArrowRight, AlertTriangle, Users, Target, BookOpen, Heart } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { useScrollReveal } from '@/components/useScrollReveal';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <PageWrapper>
      <div className="pt-24 pb-20 min-h-[100dvh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-14 animate-reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">About NutriGuide AI</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Built from a gap in the room.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              NutriGuide AI began with a simple observation: the nutrition tools available online almost never reflect how people actually eat in Pakistan. Calorie counters without daal, BMI apps without Pakistani context, and advice designed for Western supermarkets and Western budgets.
            </p>
          </div>

          {/* The Problem */}
          <Section className="mb-12">
            <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  The Problem We Solve
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Pakistan faces a dual burden of malnutrition: widespread micronutrient deficiencies coexist with rising rates of obesity, type 2 diabetes, and cardiovascular disease. Studies suggest that more than 40% of Pakistani adults are micronutrient deficient, while metabolic disorders are growing at some of the fastest rates in the region.
                </p>
                <p>
                  Yet most people who want to eat better cannot access a nutritionist. Appointments are expensive, rare outside major cities, and often focused on diagnosing illness rather than preventing it. Online resources are generic, Western-centric, or buried behind paywalls.
                </p>
                <p>
                  NutriGuide AI is our answer: free, always accessible nutrition guidance that understands the food you actually eat.
                </p>
              </div>
            </div>
          </Section>

          {/* Who It's For */}
          <Section className="mb-12">
            <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Who It Is For
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Students',
                    desc: 'Managing hostel meals, exam stress eating, and limited food budgets while trying to stay energized and focused.',
                  },
                  {
                    title: 'Families',
                    desc: 'Mothers planning meals for children and elders, navigating diabetes management alongside everyday cooking.',
                  },
                  {
                    title: 'Health-conscious individuals',
                    desc: 'Anyone who wants science-backed guidance on their diet without medical appointments or expensive apps.',
                  },
                ].map((group) => (
                  <div key={group.title} className="bg-muted rounded-xl p-5" data-testid={`audience-${group.title.toLowerCase()}`}>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{group.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{group.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* What We Offer */}
          <Section className="mb-12">
            <div className="bg-white rounded-2xl border border-card-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  What We Offer
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'AI Meal Analyzer', desc: 'Describe any meal in Urdu-influenced English and get a complete nutritional breakdown, health score, and goal-specific recommendations from Gemini AI.' },
                  { title: 'BMI Calculator', desc: 'Instant body mass index calculation with clear category explanation and practical next steps.' },
                  { title: 'Water Intake Calculator', desc: 'Personalized daily hydration targets adjusted for body weight and activity level, with context specific to Pakistan\'s climate.' },
                  { title: 'Nutrition Tips Library', desc: 'Twenty evidence-based nutrition insights curated specifically for Pakistani dietary patterns and budgets.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 py-3 border-b border-border last:border-0" data-testid={`feature-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Disclaimer */}
          <Section className="mb-12">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8" data-testid="disclaimer-section">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Important Disclaimer
                </h2>
              </div>
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                <p>
                  NutriGuide AI is an educational tool designed to raise nutritional awareness and provide general guidance. It is <strong>not a substitute for professional medical advice, diagnosis, or treatment.</strong>
                </p>
                <p>
                  The AI meal analysis is generated by a language model and may not accurately reflect the precise nutritional content of every specific food. Local variations in ingredients, cooking methods, and portion sizes can significantly affect actual nutritional values.
                </p>
                <p>
                  If you have a medical condition — including but not limited to diabetes, cardiovascular disease, kidney disease, or eating disorders — please consult a qualified healthcare provider or registered dietitian before making significant changes to your diet.
                </p>
                <p>
                  <strong>Always prioritize the advice of a licensed medical professional over any AI-generated guidance.</strong>
                </p>
              </div>
            </div>
          </Section>

          {/* CTA */}
          <Section>
            <div className="bg-primary rounded-2xl p-8 text-center" data-testid="about-cta">
              <h2
                className="text-2xl font-extrabold text-white mb-3"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Start eating better today.
              </h2>
              <p className="text-white/75 text-sm mb-6 max-w-xs mx-auto">
                No account, no subscription. Just describe your last meal.
              </p>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-secondary/80 transition-colors group"
                data-testid="button-about-cta"
              >
                Analyze My Meal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Section>
        </div>
      </div>
    </PageWrapper>
  );
}
