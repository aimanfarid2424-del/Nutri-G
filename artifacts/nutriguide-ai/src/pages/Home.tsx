import { Link } from 'wouter';
import { Brain, Calculator, Droplets, Lightbulb, ArrowRight, CheckCircle, Star, TrendingUp, Shield, Users } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { useScrollReveal } from '@/components/useScrollReveal';

const features = [
  {
    icon: Brain,
    title: 'AI Meal Analyzer',
    description: 'Describe what you ate and get instant nutritional analysis — health score, macros, gaps, and Pakistan-specific alternatives.',
    href: '/analyze',
    color: 'bg-primary',
    tag: 'Powered by Gemini AI',
  },
  {
    icon: Calculator,
    title: 'BMI Calculator',
    description: 'Enter your height and weight to understand your body mass index and get a clear, jargon-free health recommendation.',
    href: '/bmi',
    color: 'bg-accent',
    tag: 'Instant results',
  },
  {
    icon: Droplets,
    title: 'Water Intake Calculator',
    description: 'Find out exactly how much water your body needs based on your weight and daily activity level.',
    href: '/water',
    color: 'bg-blue-500',
    tag: 'Science-backed',
  },
  {
    icon: Lightbulb,
    title: 'Nutrition Tips',
    description: 'Evidence-based guidance that fits real Pakistani lifestyles — from dal to fruit chaat, we speak your food language.',
    href: '/tips',
    color: 'bg-purple-500',
    tag: '20 curated tips',
  },
];

const stats = [
  { value: '7+', label: 'Nutrition metrics analyzed per meal' },
  { value: '4', label: 'Free tools, no account required' },
  { value: '100%', label: 'Science-backed recommendations' },
];

const trustPoints = [
  'Tailored for Pakistani dietary patterns and ingredients',
  'No medical jargon — clear, actionable guidance',
  'Analyzes meals against 5 specific health goals',
  'Affordable local food alternatives suggested',
];

function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden" data-testid="hero-section">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, hsl(148 58% 36%), transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -left-32 w-[360px] h-[360px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(38 85% 55%), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[280px] h-[280px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, hsl(200 65% 48%), transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-reveal-up">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI-Powered Nutrition Guidance</span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-6 animate-reveal-up stagger-1"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Eat better.{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Live well.</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-3 -z-0 rounded-sm opacity-20"
                style={{ background: 'hsl(148 58% 36%)' }}
              />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10 animate-reveal-up stagger-2">
            NutriGuide AI is your personal nutrition companion — built for Pakistani students, families, and anyone who wants honest, science-backed guidance without the overwhelm.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 animate-reveal-up stagger-3">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white rounded-xl font-semibold text-base shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200 group"
              data-testid="button-cta-analyze"
            >
              Analyze Your Meal
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/tips"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-foreground rounded-xl font-semibold text-base border border-border hover:border-primary/40 hover:bg-secondary/40 transition-all duration-200"
              data-testid="button-cta-tips"
            >
              Browse Nutrition Tips
            </Link>
          </div>

          {/* Trust points */}
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-reveal-up stagger-4">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-14 bg-primary" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
              data-testid={`stat-item-${i}`}
            >
              <div
                className="text-4xl font-extrabold text-white mb-1"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-20 md:py-28" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">What NutriGuide Offers</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Four tools. One goal.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Every tool is designed around how Pakistani families actually eat and live — no Western food pyramids, no confusing terminology.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <Link
                  href={feature.href}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-card-border p-7 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-11 h-11 ${feature.color} rounded-xl flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                      {feature.tag}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Open tool
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, visible } = useScrollReveal();
  const steps = [
    {
      num: '01',
      title: 'Describe your meal',
      desc: 'Tell us what you ate in plain language — roti with daal, or chicken karahi with rice. No calorie counting needed.',
    },
    {
      num: '02',
      title: 'Choose your health goal',
      desc: 'Select from Weight Loss, High Protein, Diabetes Friendly, Heart Healthy, or Weight Gain — we tailor the analysis.',
    },
    {
      num: '03',
      title: 'Get your analysis',
      desc: 'Receive a health score, macro breakdown, nutrient gaps, and affordable local alternatives in seconds.',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-secondary/40" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">How It Works</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            From meal to insight in seconds.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 130 + 200}ms` }}
              data-testid={`step-${i + 1}`}
            >
              <div className="bg-white rounded-2xl border border-card-border p-7 h-full">
                <div
                  className="text-5xl font-extrabold text-primary/15 mb-4 leading-none"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border z-10" />
              )}
            </div>
          ))}
        </div>

        <div className={`mt-10 flex justify-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '600ms' }}>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200 group"
            data-testid="button-start-analyzing"
          >
            Start Analyzing Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const { ref, visible } = useScrollReveal();
  const reasons = [
    { icon: TrendingUp, title: 'Goal-oriented analysis', desc: 'Every analysis is filtered through your specific health goal — not generic advice.' },
    { icon: Shield, title: 'Evidence-based', desc: 'Backed by nutritional science, not trends. No fad diets, no miracle supplements.' },
    { icon: Users, title: 'Built for Pakistani diets', desc: 'Dal chawal, biryani, parathas — we understand what Pakistani families actually eat.' },
    { icon: Star, title: 'Free, always', desc: 'All tools are free with no sign-up required. Nutrition guidance should not have a paywall.' },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28" data-testid="why-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Why NutriGuide</p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Nutrition that speaks your language.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Most nutrition apps are built around Western diets and expensive supplements. NutriGuide AI was built from the ground up for South Asian eating patterns — the spices, the cooking methods, the budget constraints.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              data-testid="link-learn-more-about"
            >
              Learn our story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className={`bg-white rounded-xl border border-card-border p-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100 + 300}ms` }}
                  data-testid={`reason-card-${i}`}
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{reason.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  const { ref, visible } = useScrollReveal();
  return (
    <section ref={ref} className="py-16 md:py-20 mx-4 sm:mx-6 lg:mx-8 mb-0" data-testid="cta-banner">
      <div
        className={`max-w-7xl mx-auto rounded-3xl bg-primary p-10 md:p-16 text-center transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Ready to understand what you eat?
        </h2>
        <p className="text-white/75 mb-8 max-w-md mx-auto">
          Paste in your last meal. We'll tell you everything your body needs to know.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-secondary/80 transition-all duration-200 group"
          data-testid="button-cta-banner"
        >
          Analyze My Meal
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhySection />
      <CtaBanner />
    </PageWrapper>
  );
}
