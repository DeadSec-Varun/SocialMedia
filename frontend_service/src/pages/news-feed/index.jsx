import React, { useState, useEffect, useCallback } from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import StoryCarousel from './components/StoryCarousel';
import PostCard from './components/PostCard';
import FeedFilters from './components/FeedFilters';
import CreatePostPrompt from './components/CreatePostPrompt';
import TrendingSidebar from './components/TrendingSidebar';
import FeedLoadingSkeleton from './components/FeedLoadingSkeleton';
import Icon from '../../components/AppIcon';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortType, setSortType] = useState('recent');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let eventSource;
    async function fetchUserFeed() {
      setFeedLoading(true);
      const userId = localStorage.getItem('user_id');
      const res = await axios.get(`http://localhost:5001/api/feed/${userId}`, { withCredentials: true });
      setPosts(res.data.feedData);
      setFeedLoading(false);
      eventSource = new EventSource(`http://localhost:8002/notifications/sse/${userId}`);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        toast.info(data.message);
      }
      eventSource.onerror = (err) => {
        console.error("SSE connection error:", err);
        eventSource.close(); // Stop retry loop on first error
      };
    }
    fetchUserFeed();
    return () => {
      // Cleanup EventSource on unmount
      if (eventSource) {
        eventSource.close();
      }
    }
  }
    , [])

  // Handle infinite scroll
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setPosts(prev => [...prev]);
    setPage(prev => prev + 1);

    // Simulate end of content after 3 pages
    if (page >= 3) {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [loadingMore, hasMore, page]);

  // Handle scroll to load more
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  // Filter posts based on active filter
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'photos') return post.media?.some(m => m.type === 'image');
    if (activeFilter === 'videos') return post.media?.some(m => m.type === 'video');
    if (activeFilter === 'text') return !post.media || post.media.length === 0;
    return true;
  });

  // Sort posts based on sort type
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'recent') {
      return new Date(b.created_on) - new Date(a.created_on);
    }
    if (sortType === 'popular') {
      return (b.like + b.share) - (a.like + a.share);
    }
    return 0; // Default order for 'following'
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface">
      <ContextualHeader />
      <ToastContainer />

      <div className="lg:ml-60 flex">
        {/* Main Content */}
        <main className="flex-1 max-w-2xl mx-auto">
          {/* Stories Section */}
          <StoryCarousel />

          {/* Feed Filters */}
          <FeedFilters
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          {/* Content Area */}
          <div className="px-4 py-4">
            {/* Create Post Prompt */}
            <CreatePostPrompt />

            {/* Posts Feed */}
            {feedLoading ? (
              <FeedLoadingSkeleton count={3} />
            ) : (
              <div className="space-y-4">
                {sortedPosts.map((post) => (
                  <PostCard key={post.post_id} post={post} />
                ))}

                {/* Load More Indicator */}
                {loadingMore && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2 text-text-muted">
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      <span className="text-sm">Loading more posts...</span>
                    </div>
                  </div>
                )}

                {/* End of Feed Message */}
                {!hasMore && posts.length > 0 && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-surface-100 rounded-full">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm text-text-muted">You're all caught up!</span>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!feedLoading && sortedPosts.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      No posts to show
                    </h3>
                    <p className="text-text-muted mb-4">
                      Follow more people or adjust your filters to see more content.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-floating flex items-center justify-center hover:bg-primary-700 transition-smooth z-50"
            aria-label="Scroll to top"
          >
            <Icon name="ArrowUp" size={20} />
          </button>
        </main>

        {/* Right Sidebar - Desktop Only */}
        <aside className="hidden lg:block flex-shrink-0 p-6">
          <TrendingSidebar />
        </aside>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default NewsFeed;