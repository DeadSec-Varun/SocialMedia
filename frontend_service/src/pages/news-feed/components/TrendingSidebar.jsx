import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import RecommendationSkeleton from './RecommendationSkeleton';
import SuggestedUser from './SuggestedUser';

const TrendingSidebar = () => {

  const fetcher = url => axios.get(url, { withCredentials: true }).then(res => res.data.recomendedData);

  const userId = localStorage.getItem('user_id');
  const { data, error, isLoading } = useSWR(
    userId ? `http://localhost:5001/api/feed/recomended/${userId}` : null
    ,
    fetcher,
    {
      dedupingInterval: 10000,    // 10s no duplicate fetches
      refreshInterval: 300000,     // background polling every 300s
    }
  );

  const [followedUsers, setFollowedUsers] = useState([]);

  async function followUser(id) {
    if (!userId || followedUsers.includes(id)) return;
    try {
      await axios.post(`http://localhost:4001/api/user/follow`, {
        follower_id: id,
        following_id: userId
      });
        setFollowedUsers(prev => [...prev, id]);
    } catch (error) {
      console.error('Error following user:', error);
    }
  }

  const trendingTopics = [
    {
      id: 1,
      hashtag: '#MondayMotivation',
      posts: '12.5K posts',
      trend: 'up'
    },
    {
      id: 2,
      hashtag: '#TechNews',
      posts: '8.2K posts',
      trend: 'up'
    },
    {
      id: 3,
      hashtag: '#Photography',
      posts: '15.7K posts',
      trend: 'stable'
    },
    {
      id: 4,
      hashtag: '#Fitness',
      posts: '6.3K posts',
      trend: 'up'
    },
    {
      id: 5,
      hashtag: '#Travel',
      posts: '9.1K posts',
      trend: 'down'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Meetup 2024',
      date: '2024-01-15',
      time: '6:00 PM',
      attendees: 127,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Photography Workshop',
      date: '2024-01-18',
      time: '2:00 PM',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=300&h=200&fit=crop'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={14} className="text-error" />;
      default:
        return <Icon name="Minus" size={14} className="text-text-muted" />;
    }
  };

  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* Trending Topics */}
      <div className="bg-background border border-border rounded-lg shadow-elevation-1">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">Trending Topics</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              aria-label="More trending options"
            />
          </div>
        </div>
        <div className="p-4 space-y-3">
          {trendingTopics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-smooth cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-primary text-sm">
                    {topic.hashtag}
                  </span>
                  {getTrendIcon(topic.trend)}
                </div>
                <p className="text-xs text-text-muted">{topic.posts}</p>
              </div>
            </div>
          ))}
          <Button
            variant="link"
            size="sm"
            className="w-full justify-center mt-3"
          >
            Show more
          </Button>
        </div>
      </div>

      {/* Suggested Connections */}
      <div className="bg-background border border-border rounded-lg shadow-elevation-1">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary">People You May Know</h3>
        </div>
        <div className="p-4 space-y-4">
          {isLoading ? (
            <RecommendationSkeleton />
          ) : (
            (data || []).map((user) => (
              <SuggestedUser key={user.user_id} user={user} onFollow={followUser}/>
            ))
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-background border border-border rounded-lg shadow-elevation-1">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary">Upcoming Events</h3>
        </div>
        <div className="p-4 space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex space-x-3 p-2 rounded-lg hover:bg-surface transition-smooth cursor-pointer"
            >
              <Image
                src={event.image}
                alt={event.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary text-sm truncate">
                  {event.title}
                </h4>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Calendar" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-muted">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Users" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-muted">
                    {event.attendees} attending
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="link"
            size="sm"
            className="w-full justify-center mt-3"
          >
            View all events
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-background border border-border rounded-lg shadow-elevation-1 p-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">1.2K</div>
            <div className="text-xs text-text-muted">Following</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">856</div>
            <div className="text-xs text-text-muted">Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;