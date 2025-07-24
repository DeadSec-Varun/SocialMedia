import React, { useState, useEffect, useCallback } from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NotificationCard from './components/NotificationCard';
import NotificationFilters from './components/NotificationFilters';
import EmptyNotifications from './components/EmptyNotifications';
import NotificationActions from './components/NotificationActions';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      user: {
        id: 101,
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      message: 'liked your photo',
      preview: 'Beautiful sunset at the beach! 🌅',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false,
      media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'comment',
      user: {
        id: 102,
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      message: 'commented on your post',
      preview: 'Amazing shot! What camera did you use?',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      isRead: false
    },
    {
      id: 3,
      type: 'follow',
      user: {
        id: 103,
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      message: 'started following you',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: false
    },
    {
      id: 4,
      type: 'friend_request',
      user: {
        id: 104,
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      message: 'sent you a friend request',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false
    },
    {
      id: 5,
      type: 'mention',
      user: {
        id: 105,
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
      },
      message: 'mentioned you in a comment',
      preview: '@you check out this amazing place!',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true
    },
    {
      id: 6,
      type: 'share',
      user: {
        id: 106,
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      message: 'shared your post',
      preview: 'Great tips for photography beginners!',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      isRead: true
    },
    {
      id: 7,
      type: 'like',
      user: {
        id: 107,
        name: 'Jennifer Lee',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
      },
      message: 'liked your comment',
      preview: 'Thanks for the helpful advice!',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      isRead: true
    },
    {
      id: 8,
      type: 'system',
      user: {
        id: 0,
        name: 'SocialConnect',
        avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop'
      },
      message: 'Your post reached 100 likes!',
      preview: 'Congratulations! Your recent post is performing well.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true
    }
  ];

  // Initialize notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter(notification => {
    switch (activeFilter) {
      case 'interactions':
        return ['like', 'comment', 'share'].includes(notification.type);
      case 'follows':
        return ['follow', 'friend_request'].includes(notification.type);
      case 'mentions':
        return notification.type === 'mention';
      default:
        return true;
    }
  });

  // Calculate filter counts
  const filterCounts = {
    all: notifications.length,
    interactions: notifications.filter(n => ['like', 'comment', 'share'].includes(n.type)).length,
    follows: notifications.filter(n => ['follow', 'friend_request'].includes(n.type)).length,
    mentions: notifications.filter(n => n.type === 'mention').length
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Handle marking notification as read
  const handleMarkAsRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Handle marking all notifications as read
  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  // Handle clearing all notifications
  const handleClearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add a new mock notification
      const newNotification = {
        id: Date.now(),
        type: 'like',
        user: {
          id: 999,
          name: 'New User',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
        },
        message: 'liked your recent post',
        timestamp: new Date(),
        isRead: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setIsRefreshing(false);
    }, 1500);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ContextualHeader />
        <div className="lg:ml-60 pb-20 lg:pb-0">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading notifications...</p>
            </div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <div className="lg:ml-60 pb-20 lg:pb-0">
        {/* Filter Tabs */}
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          filterCounts={filterCounts}
        />

        {/* Notifications List */}
        <div className="max-w-2xl mx-auto">
          {filteredNotifications.length === 0 ? (
            <EmptyNotifications 
              filterType={activeFilter}
              onRefresh={handleRefresh}
            />
          ) : (
            <div className="divide-y divide-border">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="flex justify-center py-8">
            <button
              onClick={() => console.log('Load more notifications')}
              className="px-6 py-2 text-primary hover:text-primary-700 font-medium transition-smooth"
            >
              Load more notifications
            </button>
          </div>
        )}
      </div>

      {/* Notification Actions */}
      <NotificationActions
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default NotificationsPage;