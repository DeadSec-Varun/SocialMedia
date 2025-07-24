import React from 'react';
import Icon from '../AppIcon';

const AuthenticationLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-elevation-2">
            <Icon name="Users" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary font-heading mb-2">
            V'Connect
          </h1>
          <p className="text-text-secondary text-center max-w-sm">
            Connect with friends, share moments, and discover communities that matter to you.
          </p>
        </div>

        {/* Page Title */}
        {title && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-text-primary font-heading">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-text-secondary">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background py-8 px-4 shadow-elevation-3 sm:rounded-2xl sm:px-10 border border-border">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-muted">
          © 2024 V'Connect. Made with care for meaningful connections.
        </p>
      </div>
    </div>
  );
};

export default AuthenticationLayout;