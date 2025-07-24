import React, { useState, useEffect } from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ConversationList from './components/ConversationList';
import ChatInterface from './components/ChatInterface';

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! How was your weekend?",
      lastMessageSender: "Sarah Johnson",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
      isTyping: false
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for sharing those photos!",
      lastMessageSender: "You",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false
    },
    {
      id: 3,
      name: "Design Team",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The new mockups look great! 🎨",
      lastMessageSender: "Alex Rivera",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 5,
      isOnline: true,
      isTyping: true
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "See you at the coffee shop tomorrow!",
      lastMessageSender: "Emma Wilson",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 1,
      isOnline: false,
      isTyping: false
    },
    {
      id: 5,
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Can you review the project proposal?",
      lastMessageSender: "David Park",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 0,
      isOnline: true,
      isTyping: false
    },
    {
      id: 6,
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Happy birthday! 🎉",
      lastMessageSender: "You",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false
    },
    {
      id: 7,
      name: "Marketing Team",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Campaign results are looking promising",
      lastMessageSender: "Jennifer Lee",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      unreadCount: 3,
      isOnline: true,
      isTyping: false
    },
    {
      id: 8,
      name: "Tom Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Let\'s catch up soon!",
      lastMessageSender: "Tom Rodriguez",
      timestamp: new Date(Date.now() - 604800000), // 1 week ago
      unreadCount: 0,
      isOnline: false,
      isTyping: false
    }
  ];

  // Mock messages data
  const mockMessages = {
    1: [
      {
        id: 1,
        text: "Hey! How was your weekend?",
        sender: "Sarah Johnson",
        timestamp: new Date(Date.now() - 300000),
        type: 'text'
      },
      {
        id: 2,
        text: "It was great! Went hiking with some friends. How about yours?",
        sender: "You",
        timestamp: new Date(Date.now() - 240000),
        type: 'text'
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        sender: "You",
        timestamp: new Date(Date.now() - 180000),
        type: 'image'
      },
      {
        id: 4,
        text: "Wow, that looks amazing! Where was this taken?",
        sender: "Sarah Johnson",
        timestamp: new Date(Date.now() - 120000),
        type: 'text'
      }
    ],
    2: [
      {
        id: 1,
        text: "Hey Mike! I uploaded those photos from the event",
        sender: "You",
        timestamp: new Date(Date.now() - 1800000),
        type: 'text'
      },
      {
        id: 2,
        text: "Thanks for sharing those photos!",
        sender: "Mike Chen",
        timestamp: new Date(Date.now() - 1740000),
        type: 'text'
      }
    ],
    3: [
      {
        id: 1,
        text: "Hi everyone! I\'ve uploaded the new design mockups",
        sender: "You",
        timestamp: new Date(Date.now() - 7200000),
        type: 'text'
      },
      {
        id: 2,
        text: "Looking good! I especially like the color scheme",
        sender: "Alex Rivera",
        timestamp: new Date(Date.now() - 7000000),
        type: 'text'
      },
      {
        id: 3,
        text: "The new mockups look great! 🎨",
        sender: "Alex Rivera",
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      }
    ]
  };

  useEffect(() => {
    setConversations(mockConversations);
    setMessages(mockMessages);
  }, []);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (newMessage) => {
    if (!activeConversation) return;

    const conversationId = activeConversation.id;
    
    // Add message to messages
    setMessages(prev => ({
      ...prev,
      [conversationId]: [
        ...(prev[conversationId] || []),
        newMessage
      ]
    }));

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage.type === 'text' 
                ? newMessage.text 
                : newMessage.type === 'image' ?'📷 Photo' :'📍 Location',
              lastMessageSender: 'You',
              timestamp: newMessage.timestamp
            }
          : conv
      )
    );
  };

  const handleBackToList = () => {
    setActiveConversation(null);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <main className="lg:ml-60 pb-16 lg:pb-0">
        <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex">
          {/* Desktop Layout */}
          <div className="hidden lg:flex w-full">
            {/* Conversation List Sidebar */}
            <div className="w-80 border-r border-border bg-background">
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationSelect={handleConversationSelect}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>
            
            {/* Chat Interface */}
            <div className="flex-1">
              {activeConversation ? (
                <ChatInterface
                  conversation={activeConversation}
                  messages={messages[activeConversation.id] || []}
                  onSendMessage={handleSendMessage}
                  onBack={handleBackToList}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-surface-50">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Select a conversation
                  </h2>
                  <p className="text-text-secondary text-center max-w-sm">
                    Choose a conversation from the sidebar to start messaging with your friends and colleagues.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden w-full">
            {activeConversation ? (
              <ChatInterface
                conversation={activeConversation}
                messages={messages[activeConversation.id] || []}
                onSendMessage={handleSendMessage}
                onBack={handleBackToList}
              />
            ) : (
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationSelect={handleConversationSelect}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            )}
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default Messages;