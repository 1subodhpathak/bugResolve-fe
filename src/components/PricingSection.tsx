import React from 'react';
import { useState } from 'react';
import './PricingSection.css';

interface PricingTier {
  name: string;
  price: number;
  features: string[];
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free Tier',
    price: 0,
    features: ['Basic issue tracking', 'Up to 3 repositories', 'Community support']
  },
  {
    name: 'Pro Tier',
    price: 15,
    features: ['Unlimited repositories', 'Priority support', 'Advanced analytics', 'AI-powered suggestions']
  },
  {
    name: 'Enterprise Tier',
    price: 50,
    features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'On-premise deployment']
  }
];

const PricingSection = () => {
  const [selectedTier, setSelectedTier] = useState('Free Tier');

  return (
    <div className="pricing-section">
      <h2>Pricing</h2>
      <div className="pricing-tiers">
        {pricingTiers.map((tier) => (
          <div key={tier.name} className="pricing-tier">
            <h3>{tier.name}</h3>
            <p>${tier.price}/month</p>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => setSelectedTier(tier.name)}>
              {selectedTier === tier.name ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;