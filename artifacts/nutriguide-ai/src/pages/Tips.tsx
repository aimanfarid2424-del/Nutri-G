import { useState } from 'react';
import { Lightbulb, Apple, Wheat, Droplets, Moon, Activity, Heart, Shield, Scale, Clock, Flame, Leaf, Fish, Milk, Coffee } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { useScrollReveal } from '@/components/useScrollReveal';

const CATEGORIES = ['All', 'Diet', 'Hydration', 'Lifestyle', 'Pakistani Foods'];

const TIPS = [
  {
    id: 1,
    category: 'Pakistani Foods',
    icon: Leaf,
    color: 'bg-primary',
    title: 'Daal is a nutritional powerhouse',
    body: 'Daal mash, chana daal, and masoor daal are among the richest plant-based protein and fiber sources available. A single cup of cooked lentils delivers roughly 18g protein and 16g fiber at very low cost. Eat daal daily.',
  },
  {
    id: 2,
    category: 'Diet',
    icon: Apple,
    color: 'bg-red-500',
    title: 'Eat 5 colors of vegetables daily',
    body: 'Different plant pigments represent different phytonutrients. Aiming for red (tomatoes), green (palak), orange (carrots), white (onions), and purple (baingan) ensures a broad spectrum of antioxidants and micronutrients in your diet.',
  },
  {
    id: 3,
    category: 'Hydration',
    icon: Droplets,
    color: 'bg-blue-500',
    title: 'Drink water before each meal',
    body: 'Consuming 500ml of water 30 minutes before meals can reduce calorie intake at that meal by up to 13%, according to clinical research. It also aids digestion and helps distinguish real hunger from thirst.',
  },
  {
    id: 4,
    category: 'Lifestyle',
    icon: Moon,
    color: 'bg-indigo-500',
    title: 'Sleep affects your appetite hormones',
    body: 'Sleeping fewer than 7 hours raises ghrelin (hunger hormone) and lowers leptin (satiety hormone). This directly drives overeating and weight gain. Consistent 7–9 hours of quality sleep is as important as diet for a healthy weight.',
  },
  {
    id: 5,
    category: 'Pakistani Foods',
    icon: Wheat,
    color: 'bg-amber-600',
    title: 'Choose whole wheat atta over maida',
    body: 'Whole wheat flour retains the bran and germ, providing 3x more fiber, significantly more B vitamins, and a lower glycemic index than refined maida. This matters enormously for blood sugar control, digestion, and satiety.',
  },
  {
    id: 6,
    category: 'Diet',
    icon: Scale,
    color: 'bg-purple-500',
    title: 'Portion size matters more than food choice',
    body: 'Research consistently shows that calorie density and portion size drive weight outcomes more than demonizing any single food. A palm-sized serving of rice with a fist of sabzi and a thumb of ghee is a balanced Pakistani plate.',
  },
  {
    id: 7,
    category: 'Hydration',
    icon: Coffee,
    color: 'bg-brown-500',
    title: 'Tea counts, but watch the milk and sugar',
    body: 'Chai with a teaspoon of sugar and full-fat milk adds 70–110 calories per cup. Three to four cups daily can add 280–440 calories — significant for weight management. Try reducing sugar gradually and using less milk.',
  },
  {
    id: 8,
    category: 'Diet',
    icon: Fish,
    color: 'bg-teal-500',
    title: 'Add oily fish twice a week',
    body: 'Pomfret, rohu, and catla (available across Pakistan) are rich in omega-3 fatty acids, which reduce inflammation, support brain health, and lower cardiovascular risk. Grilling or steaming preserves more nutrients than deep frying.',
  },
  {
    id: 9,
    category: 'Lifestyle',
    icon: Activity,
    color: 'bg-orange-500',
    title: 'Walk after meals — especially dinner',
    body: 'A 10–15 minute walk after eating significantly improves glucose uptake into muscles, reducing post-meal blood sugar spikes by up to 30%. This is particularly beneficial for people with diabetes risk or metabolic syndrome.',
  },
  {
    id: 10,
    category: 'Pakistani Foods',
    icon: Milk,
    color: 'bg-sky-400',
    title: 'Dahi (yogurt) is your gut health ally',
    body: 'Pakistani dahi contains live probiotic cultures that strengthen gut microbiome diversity, improve lactose digestion, reduce bloating, and boost immune function. Opt for plain, unsweetened dahi over flavored varieties.',
  },
  {
    id: 11,
    category: 'Diet',
    icon: Heart,
    color: 'bg-rose-500',
    title: 'Replace white rice with brown rice occasionally',
    body: 'Brown rice retains the bran layer, providing 3x the fiber, magnesium, and B vitamins of white rice. The lower glycemic index means slower glucose release. You do not have to eliminate white rice — replacing 2 meals per week makes a meaningful difference.',
  },
  {
    id: 12,
    category: 'Lifestyle',
    icon: Shield,
    color: 'bg-emerald-600',
    title: 'Stress eating is a real metabolic problem',
    body: 'Chronic stress elevates cortisol, which promotes fat storage (especially abdominal) and drives sugar cravings. Stress management — whether through prayer, walking, socializing, or deep breathing — directly supports a healthy weight.',
  },
  {
    id: 13,
    category: 'Pakistani Foods',
    icon: Flame,
    color: 'bg-amber-500',
    title: 'Haldi (turmeric) is anti-inflammatory',
    body: 'Curcumin in haldi has been studied for its anti-inflammatory and antioxidant properties. Pakistani cooking naturally includes turmeric in almost every curry — this is genuinely health-protective. Adding black pepper enhances absorption by 2,000%.',
  },
  {
    id: 14,
    category: 'Diet',
    icon: Clock,
    color: 'bg-violet-500',
    title: 'Eat breakfast within 2 hours of waking',
    body: 'Skipping breakfast is linked to higher BMI and poorer blood sugar control throughout the day. A protein-rich morning meal — eggs, dahi, or daal — stabilizes cortisol levels and reduces unhealthy snack cravings before lunch.',
  },
  {
    id: 15,
    category: 'Hydration',
    icon: Droplets,
    color: 'bg-cyan-500',
    title: 'Coconut water is a natural electrolyte drink',
    body: 'Nariyal pani contains natural potassium, magnesium, and sodium — making it an excellent post-exercise rehydration option without the added sugars of sports drinks. It is widely available and affordable across Pakistan.',
  },
  {
    id: 16,
    category: 'Pakistani Foods',
    icon: Leaf,
    color: 'bg-green-600',
    title: 'Methi (fenugreek) regulates blood sugar',
    body: 'Methi seeds and leaves contain soluble fiber that slows carbohydrate digestion and improves insulin sensitivity. Research shows soaking a tablespoon of methi seeds overnight and drinking the water in the morning can improve fasting blood glucose in people with diabetes.',
  },
  {
    id: 17,
    category: 'Diet',
    icon: Apple,
    color: 'bg-lime-500',
    title: 'Eat fruit whole, not juiced',
    body: 'Whole fruit preserves fiber, which slows sugar absorption and promotes satiety. Juicing removes most fiber and concentrates sugar — a glass of mango juice can have 30g of sugar with almost no fiber. Eat the fruit instead.',
  },
  {
    id: 18,
    category: 'Lifestyle',
    icon: Activity,
    color: 'bg-fuchsia-500',
    title: 'Strength training beats cardio for long-term weight loss',
    body: 'Building muscle increases your resting metabolic rate — meaning you burn more calories even at rest. Just 2–3 sessions per week of bodyweight exercises (squats, push-ups, lunges) can significantly improve body composition over 3–6 months.',
  },
  {
    id: 19,
    category: 'Pakistani Foods',
    icon: Wheat,
    color: 'bg-yellow-600',
    title: 'Bajra (pearl millet) is a forgotten superfood',
    body: 'Bajra is one of the most nutrient-dense grains available in Pakistan — rich in iron, magnesium, phosphorus, and B vitamins. It is naturally gluten-free with a low glycemic index. Bajra ki roti is an excellent alternative to wheat for people with blood sugar concerns.',
  },
  {
    id: 20,
    category: 'Diet',
    icon: Shield,
    color: 'bg-blue-600',
    title: 'Read nutrition labels carefully',
    body: 'Packaged foods in Pakistan often hide large amounts of sodium, refined sugar, and trans fats behind small serving sizes. Check the serving size first, then multiply the numbers. "Low fat" products often compensate with extra sugar. Whole foods are almost always the better choice.',
  },
];

function TipCard({ tip, index, visible }: { tip: typeof TIPS[0]; index: number; visible: boolean }) {
  const Icon = tip.icon;
  return (
    <div
      className={`bg-white rounded-2xl border border-card-border p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 6) * 80 + 100}ms`, transitionProperty: 'opacity, transform, box-shadow, border-color' }}
      data-testid={`tip-card-${tip.id}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${tip.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className="font-bold text-foreground text-sm leading-snug"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              data-testid={`tip-title-${tip.id}`}
            >
              {tip.title}
            </h3>
          </div>
          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-muted-foreground bg-muted rounded-full mb-2.5">
            {tip.category}
          </span>
          <p className="text-muted-foreground text-xs leading-relaxed" data-testid={`tip-body-${tip.id}`}>
            {tip.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function TipsGrid({ tips }: { tips: typeof TIPS }) {
  const { ref, visible } = useScrollReveal(0.05);
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5" data-testid="tips-grid">
      {tips.map((tip, i) => (
        <TipCard key={tip.id} tip={tip} index={i} visible={visible} />
      ))}
    </div>
  );
}

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? TIPS
    : TIPS.filter((t) => t.category === activeCategory);

  return (
    <PageWrapper>
      <div className="pt-24 pb-20 min-h-[100dvh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 animate-reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Evidence-Based Tips</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {TIPS.length} nutrition insights.
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Curated from nutritional science and adapted for Pakistani dietary patterns, lifestyles, and budgets. No fads, no supplements, no jargon.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 animate-reveal-up stagger-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground'
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
                {cat === 'All' ? ` (${TIPS.length})` : ` (${TIPS.filter((t) => t.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Tips */}
          <TipsGrid tips={filtered} />

          {filtered.length === 0 && (
            <div className="text-center py-16" data-testid="empty-tips">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No tips in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
