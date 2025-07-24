import React from 'react';
import Button from '../../../components/ui/Button';

const NotificationFilters = ({ activeFilter, onFilterChange, filterCounts }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All', 
      count: filterCounts.all,
      description: 'All notifications'
    },
    { 
      key: 'interactions', 
      label: 'Interactions', 
      count: filterCounts.interactions,
      description: 'Likes, comments, shares'
    },
    { 
      key: 'follows', 
      label: 'Follows', 
      count: filterCounts.follows,
      description: 'New followers and friend requests'
    },
    { 
      key: 'mentions', 
      label: 'Mentions', 
      count: filterCounts.mentions,
      description: 'When you are mentioned'
    }
  ];

  return (
    <div className="bg-background border-b border-border sticky top-0 z-10">
      {/* Mobile Filter Tabs */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-smooth
                ${activeFilter === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-secondary hover:bg-surface-100 hover:text-text-primary'
                }
              `}
              aria-label={filter.description}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                  ${activeFilter === filter.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary text-primary-foreground'
                  }
                `}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Filter Buttons */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4">
        <div className="flex space-x-1">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="relative"
              aria-label={filter.description}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                  ${activeFilter === filter.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary text-primary-foreground'
                  }
                `}>
                  {filter.count}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => console.log('Notification settings clicked')}
            aria-label="Notification settings"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="CheckCheck"
            onClick={() => console.log('Mark all as read clicked')}
            aria-label="Mark all as read"
          >
            Mark all read
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;