import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import SocialRegistration from './components/SocialRegistration';
import RegistrationStep1 from './components/RegistrationStep1';
import Button from '../../components/ui/Button';


const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
      // Check if user is already authenticated
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated === 'true') {
        navigate('/news-feed', { replace: true });
      }
    }, [navigate]);
  

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);

    try {
      // Mock social registration
      console.log(`Registering with ${provider}`);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock success - redirect to news feed
      navigate('/news-feed');
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/register', formData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user_id', res.data.user_id);
      navigate('/news-feed');

    } catch (error) {
      setError( err.response.data.error || 'Oops! Some error occurred');
    }
    finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    return (
      <RegistrationStep1
        formData={formData}
        onFormDataChange={handleFormDataChange}
        isLoading={isLoading}
        onSubmit={handleRegistration}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationLayout
        title="Join SocialConnect"
        subtitle="Create your account and start connecting with friends"
      >
        <div className="space-y-6">
          <SocialRegistration
            onSocialRegister={handleSocialRegister}
            isLoading={isLoading}
          />

          {/* Registration Steps */}
          <div className="transition-all duration-300 ease-in-out">
            {renderCurrentStep()}
            { error }
          </div>

          {/* Login Link */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate('/login')}
                className="p-0 h-auto font-medium text-gray-600 hover:underline hover:text-primary"
              >
                Sign in here
              </Button>
            </p>
          </div>

          {/* Help Section */}
          <div className="text-center">
            <Button
              variant="ghost"
              iconName="HelpCircle"
              iconPosition="left"
              className="text-text-muted hover:text-text-primary"
            >
              Need help with registration?
            </Button>
          </div>
        </div>
      </AuthenticationLayout>
    </div>
  );
};

export default Register;