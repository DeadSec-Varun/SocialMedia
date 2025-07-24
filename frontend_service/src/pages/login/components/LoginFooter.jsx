import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginFooter = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="space-y-6">
      {/* Forgot Password Link */}
      <div className="text-center">
        <button
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-700 font-medium transition-smooth hover:underline"
        >
          Forgot your password?
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-muted font-medium">
            New to V'Connect?
          </span>
        </div>
      </div>

      {/* Create Account Button */}
      <Button
        variant="outline"
        fullWidth
        onClick={handleCreateAccount}
        className="h-12 text-base font-semibold border-2 hover:bg-surface"
      >
        Create New Account
      </Button>

      {/* Help Links */}
      <div className="flex justify-center space-x-6 text-sm">
        <button className="text-text-muted hover:text-text-secondary transition-smooth">
          Help
        </button>
        <button className="text-text-muted hover:text-text-secondary transition-smooth">
          Support
        </button>
        <button className="text-text-muted hover:text-text-secondary transition-smooth">
          Contact
        </button>
      </div>
    </div>
  );
};

export default LoginFooter;