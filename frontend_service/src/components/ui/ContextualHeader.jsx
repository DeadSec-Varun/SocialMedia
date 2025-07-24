import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const getHeaderConfig = () => {
    switch (location.pathname) {
      case '/news-feed':
        return {
          title: 'News Feed',
          showLogo: true,
          showSearch: true,
          showNotifications: true,
          actions: [
            {
              icon: 'Search',
              label: 'Search',
              onClick: () => setShowSearch(!showSearch),
              className: 'lg:hidden'
            }
          ]
        };
      
      case '/create-post':
        return {
          title: 'Create Post',
          showBack: true,
          actions: [
            {
              icon: 'Image',
              label: 'Add Media',
              onClick: () => console.log('Add media clicked')
            },
            {
              icon: 'MapPin',
              label: 'Add Location',
              onClick: () => console.log('Add location clicked')
            }
          ]
        };
      
      case '/messages':
        return {
          title: 'Messages',
          showSearch: true,
          actions: [
            {
              icon: 'Edit',
              label: 'New Message',
              onClick: () => console.log('New message clicked')
            },
            {
              icon: 'MoreHorizontal',
              label: 'More Options',
              onClick: () => console.log('More options clicked')
            }
          ]
        };
      
      case '/notifications':
        return {
          title: 'Notifications',
          actions: [
            {
              icon: 'Settings',
              label: 'Notification Settings',
              onClick: () => console.log('Settings clicked')
            },
            {
              icon: 'CheckCheck',
              label: 'Mark All Read',
              onClick: () => console.log('Mark all read clicked')
            }
          ]
        };
      
      default:
        return {
          title: 'SocialConnect',
          showLogo: true
        };
    }
  };

  const config = getHeaderConfig();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      // Implement search functionality
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="lg:ml-60 sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-90">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {config.showBack && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={handleBack}
              className="lg:hidden"
              aria-label="Go back"
            />
          )}
          
          {config.showLogo ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center lg:hidden">
                <Icon name="Users" size={20} color="white" />
              </div>
              <h1 className="text-xl font-semibold text-text-primary font-heading lg:text-2xl">
                {config.title}
              </h1>
            </div>
          ) : (
            <h1 className="text-lg font-semibold text-text-primary font-heading lg:text-xl truncate">
              {config.title}
            </h1>
          )}
        </div>

        {/* Center Section - Search (Desktop) */}
        {config.showSearch && (
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search posts, people, hashtags..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-full text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           placeholder:text-text-muted transition-smooth"
                />
              </div>
            </form>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {config.actions?.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              iconName={action.icon}
              onClick={action.onClick}
              className={action.className}
              aria-label={action.label}
              title={action.label}
            />
          ))}
          
          {config.showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              onClick={() => navigate('/notifications')}
              className="relative lg:hidden"
              aria-label="Notifications"
            />
          )}

          {/* User Avatar */}
          <button
            className="w-8 h-8 bg-surface-200 rounded-full flex items-center justify-center
                     hover:bg-surface-100 transition-smooth focus:outline-none focus:ring-2 
                     focus:ring-primary focus:ring-offset-2"
            aria-label="User menu"
          >
            <Icon name="User" size={16} color="var(--color-text-secondary)" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {config.showSearch && showSearch && (
        <div className="lg:hidden px-4 pb-3 border-t border-border animate-slide-up">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search posts, people, hashtags..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-full text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         placeholder:text-text-muted transition-smooth"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default ContextualHeader;