import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import LoginFooter from './components/LoginFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/news-feed', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      <AuthenticationLayout
        title="Welcome Back"
        subtitle="Sign in to your account to continue connecting with friends and sharing moments."
      >
        <div className="space-y-8">
          {/* Login Form */}
          <LoginForm />

          {/* Social Login Options */}
          <SocialLoginOptions />

          {/* Footer Links */}
          <LoginFooter />
        </div>
      </AuthenticationLayout>
    </div>
  );
};

export default LoginPage;