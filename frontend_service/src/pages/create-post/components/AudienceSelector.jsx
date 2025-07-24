import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudienceSelector = ({ selectedAudience, onAudienceChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const audienceOptions = [
    {
      id: 'public',
      label: 'Public',
      description: 'Anyone on or off SocialConnect',
      icon: 'Globe',
      color: 'text-primary'
    },
    {
      id: 'friends',
      label: 'Friends',
      description: 'Your friends on SocialConnect',
      icon: 'Users',
      color: 'text-secondary'
    },
    {
      id: 'friends_except',
      label: 'Friends except...',
      description: 'Don\'t show to some friends',
      icon: 'UserMinus',
      color: 'text-warning'
    },
    {
      id: 'specific_friends',
      label: 'Specific friends',
      description: 'Only show to some friends',
      icon: 'UserCheck',
      color: 'text-accent'
    },
    {
      id: 'only_me',
      label: 'Only me',
      description: 'Only you can see this post',
      icon: 'Lock',
      color: 'text-text-secondary'
    }
  ];

  const currentOption = audienceOptions.find(option => option.id === selectedAudience) || audienceOptions[0];

  const handleOptionSelect = (optionId) => {
    onAudienceChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Selector Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-surface"
      >
        <Icon 
          name={currentOption.icon} 
          size={16} 
          className={currentOption.color}
        />
        <span className="text-sm font-medium text-text-primary">
          {currentOption.label}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-muted"
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-floating z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Who can see your post?
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Your post will show up in Feed, on your profile and in search results.
              </p>
              
              <div className="space-y-2">
                {audienceOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`
                      w-full flex items-start space-x-3 p-3 rounded-lg text-left
                      transition-smooth hover:bg-surface
                      ${selectedAudience === option.id ? 'bg-primary-50 border border-primary-100' : ''}
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${selectedAudience === option.id ? 'bg-primary text-primary-foreground' : 'bg-surface-100'}
                    `}>
                      <Icon 
                        name={option.icon} 
                        size={18} 
                        className={selectedAudience === option.id ? 'text-primary-foreground' : option.color}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`
                        font-medium
                        ${selectedAudience === option.id ? 'text-primary' : 'text-text-primary'}
                      `}>
                        {option.label}
                      </h4>
                      <p className="text-sm text-text-secondary mt-1">
                        {option.description}
                      </p>
                    </div>
                    
                    {selectedAudience === option.id && (
                      <Icon name="Check" size={18} className="text-primary mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AudienceSelector;