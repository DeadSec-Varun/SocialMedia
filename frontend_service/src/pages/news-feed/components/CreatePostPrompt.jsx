import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CreatePostPrompt = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'photo',
      label: 'Photo',
      icon: 'Camera',
      color: 'text-success',
      onClick: () => navigate('/create-post?type=photo')
    },
    {
      id: 'video',
      label: 'Video',
      icon: 'Video',
      color: 'text-error',
      onClick: () => navigate('/create-post?type=video')
    },
    {
      id: 'location',
      label: 'Check-in',
      icon: 'MapPin',
      color: 'text-warning',
      onClick: () => navigate('/create-post?type=location')
    },
    {
      id: 'feeling',
      label: 'Feeling',
      icon: 'Smile',
      color: 'text-accent',
      onClick: () => navigate('/create-post?type=feeling')
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg shadow-elevation-1 p-4 mb-4">
      {/* Main Create Post Area */}
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
          alt="Your profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <button
          onClick={() => navigate('/create-post')}
          className="flex-1 px-4 py-3 bg-surface border border-border rounded-full text-left text-text-muted hover:bg-surface-100 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          What's on your mind?
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface transition-smooth group flex-1 justify-center"
            aria-label={`Create ${action.label.toLowerCase()} post`}
          >
            <Icon 
              name={action.icon} 
              size={18} 
              className={`${action.color} group-hover:scale-110 transition-transform`}
            />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary hidden sm:inline">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Live Features (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">3 friends are online</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Trending: #MondayMotivation</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Zap"
          onClick={() => navigate('/create-post?type=story')}
        >
          Create Story
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPrompt;