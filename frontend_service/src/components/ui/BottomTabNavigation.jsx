import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('/news-feed');

  const navigationTabs = [
    {
      label: 'Feed',
      icon: 'Home',
      path: '/news-feed',
      tooltip: 'News Feed'
    },
    {
      label: 'Create',
      icon: 'Plus',
      path: '/create-post',
      tooltip: 'Create Post'
    },
    {
      label: 'Messages',
      icon: 'MessageCircle',
      path: '/messages',
      tooltip: 'Messages'
    },
    {
      label: 'Notifications',
      icon: 'Bell',
      path: '/notifications',
      tooltip: 'Notifications'
    }
  ];

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleKeyDown = (event, path) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(path);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-100"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around px-4 py-3 safe-area-bottom">
          {navigationTabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              onKeyDown={(e) => handleKeyDown(e, tab.path)}
              className={`
                relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-1
                transition-smooth rounded-lg
                ${activeTab === tab.path 
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                }
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                active:scale-95
              `}
              aria-label={tab.tooltip}
              aria-current={activeTab === tab.path ? 'page' : undefined}
            >
              <div className="relative">
                <Icon 
                  name={tab.icon} 
                  size={24} 
                  strokeWidth={activeTab === tab.path ? 2.5 : 2}
                />
              </div>
              <span className={`
                text-xs font-medium mt-1 truncate
                ${activeTab === tab.path ? 'text-primary' : 'text-text-secondary'}
              `}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav 
        className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-60 lg:flex-col bg-background border-r border-border z-100"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary font-heading">
              V'Connect
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navigationTabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              onKeyDown={(e) => handleKeyDown(e, tab.path)}
              className={`
                relative w-full flex items-center px-4 py-3 rounded-lg
                transition-smooth group
                ${activeTab === tab.path 
                  ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:bg-surface hover:text-text-primary'
                }
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              `}
              title={tab.tooltip}
              aria-label={tab.tooltip}
              aria-current={activeTab === tab.path ? 'page' : undefined}
            >
              <div className="relative">
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  strokeWidth={activeTab === tab.path ? 2.5 : 2}
                />
              </div>
              <span className={`
                ml-3 font-medium
                ${activeTab === tab.path ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}
              `}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center px-4 py-3 rounded-lg hover:bg-surface transition-smooth cursor-pointer">
            <div className="w-8 h-8 bg-surface-200 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="var(--color-text-secondary)" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                Your Profile
              </p>
              <p className="text-xs text-text-secondary truncate">
                View and edit profile
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;