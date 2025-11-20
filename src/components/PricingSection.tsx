import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      'Basic issue tracking',
      'Up to 3 repositories',
      'Community support',
      'Basic analytics',
      'Public repositories only'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: 15,
    period: 'month',
    description: 'For professional developers',
    features: [
      'Unlimited repositories',
      'Priority support',
      'Advanced analytics',
      'AI-powered suggestions',
      'Private repositories',
      'Custom integrations',
      'Team collaboration'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 50,
    period: 'month',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'On-premise deployment',
      'SLA guarantee',
      'Advanced security',
      'Custom training',
      'Unlimited team members'
    ],
    cta: 'Contact Sales'
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                tier.highlighted
                  ? 'border-2 border-[#14a800] ring-4 ring-green-50'
                  : 'border border-gray-200'
              }`}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#14a800] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">
                      ${tier.price}
                    </span>
                    <span className="text-gray-600 ml-2">/{tier.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-8 ${
                    tier.highlighted
                      ? 'bg-[#14a800] text-white hover:bg-[#108a00] shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {tier.cta}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    What's included:
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check
                          className={`flex-shrink-0 mr-3 mt-0.5 ${
                            tier.highlighted ? 'text-[#14a800]' : 'text-gray-400'
                          }`}
                          size={20}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include automatic updates and security patches.{' '}
            <a href="#" className="text-[#14a800] hover:underline font-semibold">
              Compare all features →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
