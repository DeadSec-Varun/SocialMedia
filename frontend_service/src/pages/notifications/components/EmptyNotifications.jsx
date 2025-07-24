import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyNotifications = ({ filterType, onRefresh }) => {
  const getEmptyStateContent = () => {
    switch (filterType) {
      case 'interactions':
        return {
          icon: 'Heart',
          title: 'No interactions yet',
          description: 'When people like, comment, or share your posts, you\'ll see them here.',
          actionText: 'Create a post',
          actionIcon: 'Plus'
        };
      case 'follows':
        return {
          icon: 'UserPlus',
          title: 'No new followers',
          description: 'When someone follows you or sends a friend request, you\'ll see them here.',
          actionText: 'Find friends',
          actionIcon: 'Search'
        };
      case 'mentions':
        return {
          icon: 'AtSign',
          title: 'No mentions yet',
          description: 'When someone mentions you in a post or comment, you\'ll see them here.',
          actionText: 'Explore posts',
          actionIcon: 'Compass'
        };
      default:
        return {
          icon: 'Bell',
          title: 'All caught up!',
          description: 'You\'re all up to date. New notifications will appear here when they arrive.',
          actionText: 'Refresh',
          actionIcon: 'RefreshCw'
        };
    }
  };

  const content = getEmptyStateContent();

  const handleAction = () => {
    if (filterType === 'all') {
      onRefresh();
    } else {
      console.log(`Navigate to ${filterType} action`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
        <Icon 
          name={content.icon} 
          size={32} 
          color="var(--color-text-muted)"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-2 font-heading">
        {content.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
        {content.description}
      </p>

      {/* Action Button */}
      <Button
        variant="primary"
        iconName={content.actionIcon}
        iconPosition="left"
        onClick={handleAction}
        className="px-6"
      >
        {content.actionText}
      </Button>

      {/* Additional Tips */}
      <div className="mt-12 max-w-md">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Tips to get more notifications:
        </h4>
        <ul className="text-sm text-text-secondary space-y-2 text-left">
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Share interesting content to engage your audience</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Comment on friends' posts to start conversations</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Follow people with similar interests</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyNotifications;