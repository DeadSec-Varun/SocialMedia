import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const navigate = useNavigate();

  const getNotificationIcon = (type) => {
    const iconMap = {
      like: 'Heart',
      comment: 'MessageCircle',
      share: 'Share2',
      follow: 'UserPlus',
      mention: 'AtSign',
      friend_request: 'Users',
      system: 'Bell',
      post: 'FileText'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      like: 'text-error',
      comment: 'text-primary',
      share: 'text-secondary',
      follow: 'text-accent',
      mention: 'text-warning',
      friend_request: 'text-primary',
      system: 'text-text-secondary',
      post: 'text-text-primary'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return notificationTime.toLocaleDateString();
  };

  const handleNotificationClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'like': case'comment': case'share': case'mention': navigate('/news-feed');
        break;
      case 'follow': case'friend_request': navigate('/news-feed');
        break;
      case 'message': navigate('/messages');
        break;
      default:
        break;
    }
  };

  const handleAcceptRequest = (e) => {
    e.stopPropagation();
    console.log('Accept friend request:', notification.id);
    onMarkAsRead(notification.id);
  };

  const handleDeclineRequest = (e) => {
    e.stopPropagation();
    console.log('Decline friend request:', notification.id);
    onMarkAsRead(notification.id);
  };

  return (
    <div
      className={`
        flex items-start space-x-3 p-4 cursor-pointer transition-smooth
        hover:bg-surface-100 border-b border-border last:border-b-0
        ${!notification.isRead ? 'bg-primary-50 border-l-4 border-l-primary' : 'bg-background'}
      `}
      onClick={handleNotificationClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNotificationClick();
        }
      }}
    >
      {/* User Avatar */}
      <div className="flex-shrink-0 relative">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-200">
          <Image
            src={notification.user.avatar}
            alt={notification.user.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Notification Type Icon */}
        <div className={`
          absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background
          flex items-center justify-center border-2 border-background
          ${getNotificationColor(notification.type)}
        `}>
          <Icon 
            name={getNotificationIcon(notification.type)} 
            size={12} 
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* Notification Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className={`text-sm ${!notification.isRead ? 'font-semibold text-text-primary' : 'text-text-primary'}`}>
              <span className="font-medium">{notification.user.name}</span>
              {' '}
              <span className={!notification.isRead ? 'font-medium' : 'font-normal'}>
                {notification.message}
              </span>
            </p>
            
            {/* Content Preview */}
            {notification.preview && (
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {notification.preview}
              </p>
            )}
            
            {/* Timestamp */}
            <p className="text-xs text-text-muted mt-1">
              {formatTimeAgo(notification.timestamp)}
            </p>
          </div>

          {/* Unread Indicator */}
          {!notification.isRead && (
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
          )}
        </div>

        {/* Friend Request Actions */}
        {notification.type === 'friend_request' && !notification.isRead && (
          <div className="flex space-x-2 mt-3">
            <Button
              variant="primary"
              size="xs"
              onClick={handleAcceptRequest}
              className="px-4"
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={handleDeclineRequest}
              className="px-4"
            >
              Decline
            </Button>
          </div>
        )}

        {/* Media Preview */}
        {notification.media && (
          <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden bg-surface-200">
            <Image
              src={notification.media}
              alt="Notification media"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;