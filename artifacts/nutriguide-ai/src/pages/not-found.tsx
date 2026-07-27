import { Link } from 'wouter';
import { ArrowRight, Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 bg-background">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span
          className="text-lg font-bold tracking-tight text-foreground"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}
        >
          NutriGuide <span className="text-primary">AI</span>
        </span>
      </div>

      <div
        className="text-8xl font-extrabold text-primary/20 mb-4 leading-none"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        404
      </div>
      <h1
        className="text-2xl font-bold text-foreground mb-3 text-center"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        Page not found
      </h1>
      <p className="text-muted-foreground text-center max-w-xs mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors group"
      >
        Back to Home
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
