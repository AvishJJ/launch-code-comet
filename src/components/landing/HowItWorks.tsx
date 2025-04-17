
import { Zap, Code, Package } from 'lucide-react';

const steps = [
  {
    icon: <Zap className="h-12 w-12 text-purple-500" />,
    title: 'Describe',
    description: 'You fill in a quick prompt form.',
    emoji: '📝'
  },
  {
    icon: <Code className="h-12 w-12 text-blue-500" />,
    title: 'We Build',
    description: 'We generate a full project — code, docs, everything.',
    emoji: '⚙️'
  },
  {
    icon: <Package className="h-12 w-12 text-green-500" />,
    title: 'You Launch',
    description: 'You receive a ready-to-run ZIP in your inbox.',
    emoji: '📦'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#0A0A23]">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">How It Works</h2>
        <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex w-full flex-1 flex-col items-center rounded-lg border border-white/10 bg-[#1E1E3F]/30 p-6 text-center transition-all hover:border-purple-500/30 md:max-w-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A0A23] p-3">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
              <div className="mt-4 text-3xl">{step.emoji}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
