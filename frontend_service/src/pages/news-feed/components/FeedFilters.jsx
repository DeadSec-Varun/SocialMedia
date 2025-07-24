import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeedFilters = ({ onFilterChange, onSortChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortType, setSortType] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', label: 'All Posts', icon: 'Grid3X3' },
    { id: 'photos', label: 'Photos', icon: 'Image' },
    { id: 'videos', label: 'Videos', icon: 'Video' },
    { id: 'text', label: 'Text', icon: 'FileText' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: 'Clock' },
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'following', label: 'Following', icon: 'Users' }
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  const handleSortChange = (sortId) => {
    setSortType(sortId);
    onSortChange?.(sortId);
  };

  return (
    <div className="bg-background border-b border-border sticky top-16 lg:top-20 z-40">
      <div className="px-4 py-3">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-text-primary">Feed</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName={showFilters ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>

        {/* Filter Content */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          {/* Post Type Filters */}
          <div className="flex items-center space-x-2 mb-3 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-smooth whitespace-nowrap flex-shrink-0
                  ${activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-secondary hover:bg-surface-100 hover:text-text-primary'
                  }
                `}
                aria-pressed={activeFilter === filter.id}
              >
                <Icon name={filter.icon} size={16} />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium
                    transition-smooth whitespace-nowrap flex-shrink-0
                    ${sortType === option.id
                      ? 'bg-secondary-100 text-secondary-600' :'text-text-muted hover:text-text-secondary hover:bg-surface'
                    }
                  `}
                  aria-pressed={sortType === option.id}
                >
                  <Icon name={option.icon} size={14} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => console.log('Refresh feed')}
              className="flex-shrink-0 ml-2"
              aria-label="Refresh feed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;