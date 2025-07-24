import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationActions = ({ 
  unreadCount, 
  onMarkAllAsRead, 
  onClearAll, 
  onRefresh,
  isRefreshing 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    setShowActions(false);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications? This action cannot be undone.')) {
      onClearAll();
      setShowActions(false);
    }
  };

  return (
    <>
      {/* Mobile Actions */}
      <div className="lg:hidden sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={onRefresh}
              disabled={isRefreshing}
              className={isRefreshing ? 'animate-spin' : ''}
              aria-label="Refresh notifications"
            />
            
            {unreadCount > 0 && (
              <span className="text-sm text-text-secondary">
                {unreadCount} unread
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="primary"
                size="sm"
                iconName="CheckCheck"
                onClick={handleMarkAllAsRead}
                className="px-4"
              >
                Mark all read
              </Button>
            )}
            
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg hover:bg-surface transition-smooth"
              aria-label="More actions"
            >
              <Icon name="MoreVertical" size={20} />
            </button>
          </div>
        </div>

        {/* Expandable Actions */}
        {showActions && (
          <div className="mt-4 pt-4 border-t border-border animate-slide-up">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                onClick={() => {
                  console.log('Open notification settings');
                  setShowActions(false);
                }}
                className="justify-center"
              >
                Settings
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                onClick={handleClearAll}
                className="justify-center text-error hover:text-error"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-background border border-border rounded-full px-4 py-2 shadow-elevation-3 flex items-center space-x-2">
            <Icon name="RefreshCw" size={16} className="animate-spin text-primary" />
            <span className="text-sm text-text-primary">Refreshing...</span>
          </div>
        </div>
      )}

      {/* Desktop Floating Actions */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-50">
        <div className="flex flex-col space-y-3">
          {/* Refresh Button */}
          <Button
            variant="primary"
            size="md"
            iconName="RefreshCw"
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`rounded-full w-12 h-12 shadow-floating ${isRefreshing ? 'animate-spin' : ''}`}
            aria-label="Refresh notifications"
          />

          {/* Mark All Read Button */}
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="md"
              iconName="CheckCheck"
              onClick={handleMarkAllAsRead}
              className="rounded-full w-12 h-12 shadow-floating"
              aria-label={`Mark all ${unreadCount} notifications as read`}
            />
          )}

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="md"
            iconName="Settings"
            onClick={() => console.log('Open notification settings')}
            className="rounded-full w-12 h-12 shadow-floating bg-background border border-border"
            aria-label="Notification settings"
          />
        </div>
      </div>

      {/* Unread Count Badge */}
      {unreadCount > 0 && (
        <div className="hidden lg:block fixed top-24 right-8 z-40">
          <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium shadow-elevation-2">
            {unreadCount} unread
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationActions;