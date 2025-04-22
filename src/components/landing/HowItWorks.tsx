
import { Zap, Code, Package } from 'lucide-react';

const steps = [
  {
    icon: <Zap className="h-12 w-12 text-violet-400" />,
    title: 'Describe',
    description: 'You fill in a quick prompt form.',
    emoji: '📝',
    color: 'from-violet-500/20 to-purple-500/10'
  },
  {
    icon: <Code className="h-12 w-12 text-primary" />,
    title: 'We Build',
    description: 'We generate a full project — code, docs, everything.',
    emoji: '⚙️',
    color: 'from-primary/20 to-blue-500/10'
  },
  {
    icon: <Package className="h-12 w-12 text-blue-400" />,
    title: 'You Launch',
    description: 'You receive a ready-to-run ZIP in your inbox.',
    emoji: '🚀',
    color: 'from-blue-500/20 to-cyan-500/10'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM0NDQ0NjYiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <h2 className="mb-3 text-3xl font-display font-bold text-white tracking-tight">How It Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">Our streamlined process takes you from idea to implementation in three simple steps.</p>
        </div>
        
        <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`w-full flex-1 rounded-2xl glass-card p-8 text-center transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden backdrop-blur-lg border border-white/5 animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${step.color} group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/30 p-4 mx-auto border border-white/5 group-hover:border-primary/30 transition-colors duration-300">
                  {step.icon}
                </div>
                
                <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <div className="mt-6 flex justify-center">
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{step.emoji}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 transform">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L15 12L9 19" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
