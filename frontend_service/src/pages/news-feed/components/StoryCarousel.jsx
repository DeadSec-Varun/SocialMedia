import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import axios from 'axios';
import useSWR from 'swr';
import StoryLoadingSkeleton from './StoryLoadingSkeleton';
import StoryComponent from './StoryComponent';

const StoryCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const fetcher = url => axios.get(url, { withCredentials: true }).then(res => res.data.storyData);

  const userId = localStorage.getItem('user_id');
  const { data, error, isLoading } = useSWR(
    userId ? `http://localhost:5001/api/feed/stories/${userId}` : null,
    fetcher,
    {
      dedupingInterval: 10000,    // 10s no duplicate fetches
      refreshInterval: 60000,     // background polling every 60s
    }
  );

  const stories = [
    {
      user_id: 1,
      name: "Your Story",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      // hasStory: false
    }, ...data || []
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  return (
    <div className="relative bg-background border-b border-border">
      <div className="px-4 py-3">
        <div className="relative">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-elevation-2 hover:bg-surface transition-smooth"
              aria-label="Scroll stories left"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
          )}

          {/* Stories container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Loading Skeleton */}
            {isLoading ? (
              <StoryLoadingSkeleton count={8} />
            ) : (
              stories.map((story) => (
                <StoryComponent key={story.user_id} story={story} />
              )))}
          </div>

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-elevation-2 hover:bg-surface transition-smooth"
              aria-label="Scroll stories right"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCarousel;