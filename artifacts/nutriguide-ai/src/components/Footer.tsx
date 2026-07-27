import { Link } from 'wouter';
import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-24" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}
              >
                NutriGuide <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Science-backed nutrition guidance for Pakistani families and health-conscious individuals. Not a substitute for professional medical advice.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">Tools</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/analyze', label: 'AI Meal Analyzer' },
                { href: '/bmi', label: 'BMI Calculator' },
                { href: '/water', label: 'Water Intake Calculator' },
                { href: '/tips', label: 'Nutrition Tips' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">Information</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About NutriGuide' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    data-testid={`link-footer-info-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <p className="text-white/35 text-sm">Educational use only</p>
              </li>
              <li>
                <p className="text-white/35 text-sm">Consult a licensed nutritionist</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} NutriGuide AI. For educational purposes only.
          </p>
          <p className="text-white/35 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary fill-primary" /> for healthier Pakistani communities
          </p>
        </div>
      </div>
    </footer>
  );
}
