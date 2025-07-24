import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white border-border text-text-primary hover:bg-surface',
      provider: 'google'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 text-white hover:bg-blue-700',
      provider: 'facebook'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black text-white hover:bg-gray-800',
      provider: 'apple'
    }
  ];

  const handleSocialRegister = (provider) => {
    if (onSocialRegister) {
      onSocialRegister(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-4">
          Quick registration with your existing account
        </p>
      </div>

      {/* Social Provider Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.provider}
            variant="outline"
            onClick={() => handleSocialRegister(provider.provider)}
            disabled={isLoading}
            className={`
              h-12 transition-all duration-200 border-2
              ${provider.color}
              focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name={provider.icon} size={20} />
              <span className="font-medium">
                {provider.name}
              </span>
            </div>
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-muted">
            Or register with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;