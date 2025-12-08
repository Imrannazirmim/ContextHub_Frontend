import { Trophy, Sparkles, GraduationCap } from 'lucide-react';


const Choose = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Win Amazing Prizes',
      description: 'Compete for cash prizes, industry recognition, and exclusive opportunities.'
    },
    {
      icon: Sparkles,
      title: 'Discover Talent',
      description: 'A global stage for creators to showcase their skills and get noticed by top brands.'
    },
    {
      icon: GraduationCap,
      title: 'Build Your Portfolio',
      description: 'Every entry is a new piece for your portfolio, demonstrating your growth and versatility.'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
            Why Choose ContestHub?
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            We provide the platform for you to shine. Focus on your creativity, we'll handle the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Icon className="text-primary" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-base-content mb-3">
                  {feature.title}
                </h3>
                <p className="text-base-content/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Choose;