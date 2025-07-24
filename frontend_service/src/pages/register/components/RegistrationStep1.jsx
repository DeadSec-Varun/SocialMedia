import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationStep1 = ({ formData, onFormDataChange, isLoading, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateStep = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit();
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-error' },
      1: { label: 'Weak', color: 'bg-error' },
      2: { label: 'Fair', color: 'bg-warning' },
      3: { label: 'Good', color: 'bg-warning' },
      4: { label: 'Strong', color: 'bg-success' },
      5: { label: 'Very Strong', color: 'bg-success' }
    };

    return { strength, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary font-heading mb-2">
          Create Your Account
        </h2>
        <p className="text-text-secondary">
          Let's get started with your basic information
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Full Name *
          </label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name || ''}
              onChange={(e) => onFormDataChange('name', e.target.value)}
              className={`pr-10 ${errors.name ? 'border-error' : formData.name?.trim() ? 'border-success' : ''}`}
              required
            />
            {formData.name?.trim() && !errors.name && (
              <Icon 
                name="Check" 
                size={18} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-success"
              />
            )}
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email || ''}
              onChange={(e) => onFormDataChange('email', e.target.value)}
              className={`pr-10 ${errors.email ? 'border-error' : formData.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'border-success' : ''}`}
              required
            />
            {formData.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !errors.email && (
              <Icon 
                name="Check" 
                size={18} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-success"
              />
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData.password || ''}
              onChange={(e) => onFormDataChange('password', e.target.value)}
              className={`pr-10 ${errors.password ? 'border-error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-smooth"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Password Strength</span>
                <span className={`text-xs font-medium ${passwordStrength.strength >= 3 ? 'text-success' : passwordStrength.strength >= 2 ? 'text-warning' : 'text-error'}`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full bg-surface-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword || ''}
              onChange={(e) => onFormDataChange('confirmPassword', e.target.value)}
              className={`pr-10 ${errors.confirmPassword ? 'border-error' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-success' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-smooth"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
            {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
              <Icon 
                name="Check" 
                size={18} 
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-success"
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Signing up': 'Sign up'}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationStep1;