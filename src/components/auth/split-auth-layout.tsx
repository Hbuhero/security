import { ReactNode, useState, useEffect } from "react";
import { Shield, Lock, Zap, CheckCircle, LucideIcon } from "lucide-react";

interface SplitAuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const SplitAuthLayout = ({ children, title, subtitle }: SplitAuthLayoutProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const features: Array<{ icon: LucideIcon; title: string; description: string }> = [
    {
      icon: Shield,
      title: "Secure Your Account",
      description: "Enterprise-grade security with encrypted data protection"
    },
    {
      icon: Lock,
      title: "Resilient Authentication",
      description: "Multi-factor authentication and secure session management"
    },
    {
      icon: Zap,
      title: "Lightning Fast Access",
      description: "Optimized performance for seamless user experience"
    },
    {
      icon: CheckCircle,
      title: "Trusted Platform",
      description: "Built with industry-standard security protocols"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="w-full max-w-md relative z-10 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 gradient-text">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Feature highlights */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-secondary to-accent p-12 items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to the Future of Authentication
          </h2>
          <p className="text-white/90 text-lg mb-12">
            Experience seamless, secure access to your account with our cutting-edge authentication system.
          </p>

          {/* Carousel container */}
          <div className="relative min-h-[280px]">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="flex items-start space-x-6 mb-12">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-2xl mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel indicators */}
          <div className="flex space-x-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
