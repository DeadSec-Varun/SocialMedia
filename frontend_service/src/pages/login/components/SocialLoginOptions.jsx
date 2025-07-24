import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginOptions = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-900',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = async (providerId) => {
    setLoadingProvider(providerId);

    // Simulate social login process
    setTimeout(() => {
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${providerId}.com`);
      localStorage.setItem('loginMethod', providerId);
      navigate('/news-feed');
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-muted font-medium">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider.id)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider !== null}
            className={`
              h-12 flex items-center justify-center space-x-2 
              ${provider.bgColor} border-border hover:border-gray-300
              transition-smooth
            `}
          >
            <Icon 
              name={provider.icon} 
              size={20} 
              className={provider.color}
            />
            <span className="text-sm font-medium text-text-primary sm:hidden">
              Continue with {provider.name}
            </span>
            <span className="text-sm font-medium text-text-primary hidden sm:inline">
              {provider.name}
            </span>
          </Button>
        ))}
      </div>

      {/* Terms and Privacy */}
      <p className="text-xs text-text-muted text-center leading-relaxed">
        By continuing, you agree to our{' '}
        <button className="text-primary hover:underline font-medium">
          Terms of Service
        </button>{' '}
        and{' '}
        <button className="text-primary hover:underline font-medium">
          Privacy Policy
        </button>
      </p>
    </div>
  );
};

export default SocialLoginOptions;