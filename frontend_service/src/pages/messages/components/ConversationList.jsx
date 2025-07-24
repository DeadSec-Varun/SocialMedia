import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ConversationList = ({ conversations, activeConversation, onConversationSelect, searchQuery, onSearchChange }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) { // 7 days
      return messageTime.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Search Header */}
      <div className="p-4 border-b border-border bg-background sticky top-0 z-10">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-smooth ${
              isSearchFocused ? 'text-primary' : 'text-text-muted'
            }`}
          />
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10 pr-4 py-2.5 bg-surface border border-border rounded-full text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     placeholder:text-text-muted transition-smooth"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <Icon name="MessageCircle" size={24} className="text-text-muted" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </h3>
            <p className="text-text-secondary text-center">
              {searchQuery 
                ? 'Try searching with different keywords' 
                : 'Start a conversation with your friends'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-surface transition-smooth
                          focus:outline-none focus:bg-surface-100 active:bg-surface-200
                          ${activeConversation?.id === conversation.id ? 'bg-primary-50 border-r-2 border-primary' : ''}
                        `}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-200">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success border-2 border-background rounded-full"></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${
                      conversation.unreadCount > 0 ? 'text-text-primary' : 'text-text-primary'
                    }`}>
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-text-muted flex-shrink-0 ml-2">
                      {formatTime(conversation.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'text-text-primary font-medium' : 'text-text-secondary'
                    }`}>
                      {conversation.isTyping ? (
                        <span className="text-primary flex items-center">
                          <Icon name="MoreHorizontal" size={16} className="mr-1 animate-pulse" />
                          typing...
                        </span>
                      ) : (
                        <>
                          {conversation.lastMessageSender === 'You' && (
                            <span className="text-text-muted mr-1">You: </span>
                          )}
                          {conversation.lastMessage}
                        </>
                      )}
                    </p>
                    
                    {conversation.unreadCount > 0 && (
                      <NotificationBadge 
                        count={conversation.unreadCount} 
                        size="sm"
                        className="ml-2 flex-shrink-0"
                      />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;