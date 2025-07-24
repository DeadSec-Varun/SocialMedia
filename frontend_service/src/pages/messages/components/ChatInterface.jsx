import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInterface = ({ conversation, messages, onSendMessage, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage({
        id: Date.now(),
        text: messageText.trim(),
        sender: 'You',
        timestamp: new Date(),
        type: 'text'
      });
      setMessageText('');
    }
  };

  const handleAttachmentClick = (type) => {
    setShowAttachmentMenu(false);
    if (type === 'photo') {
      fileInputRef.current?.click();
    } else if (type === 'location') {
      onSendMessage({
        id: Date.now(),
        sender: 'You',
        timestamp: new Date(),
        type: 'location',
        location: {
          name: 'Current Location',
          address: '123 Main Street, City, State',
          lat: 40.7128,
          lng: -74.0060
        }
      });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSendMessage({
          id: Date.now(),
          sender: 'You',
          timestamp: new Date(),
          type: 'image',
          imageUrl: event.target.result,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderMessage = (message) => {
    const isOwnMessage = message.sender === 'You';
    
    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
          {message.type === 'text' && (
            <div
              className={`px-4 py-2 rounded-2xl ${
                isOwnMessage
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-surface text-text-primary rounded-bl-md'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          )}
          
          {message.type === 'image' && (
            <div
              className={`rounded-2xl overflow-hidden ${
                isOwnMessage ? 'rounded-br-md' : 'rounded-bl-md'
              }`}
            >
              <Image
                src={message.imageUrl}
                alt="Shared image"
                className="w-full h-48 object-cover"
              />
              {message.text && (
                <div
                  className={`px-4 py-2 ${
                    isOwnMessage
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-text-primary'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              )}
            </div>
          )}
          
          {message.type === 'location' && (
            <div
              className={`rounded-2xl overflow-hidden border ${
                isOwnMessage
                  ? 'border-primary rounded-br-md' :'border-border rounded-bl-md'
              }`}
            >
              <div className="h-32 bg-surface-100">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={message.location.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${message.location.lat},${message.location.lng}&z=14&output=embed`}
                />
              </div>
              <div
                className={`px-4 py-2 ${
                  isOwnMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-primary'
                }`}
              >
                <p className="text-sm font-medium">{message.location.name}</p>
                <p className="text-xs opacity-80">{message.location.address}</p>
              </div>
            </div>
          )}
          
          <div className={`flex items-center mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-text-muted">
              {formatMessageTime(message.timestamp)}
            </span>
            {isOwnMessage && (
              <Icon 
                name="Check" 
                size={12} 
                className="ml-1 text-primary" 
              />
            )}
          </div>
        </div>
        
        {!isOwnMessage && (
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-200 order-0 mr-2 mt-auto">
            <Image
              src={conversation.avatar}
              alt={conversation.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            onClick={onBack}
            className="lg:hidden"
            aria-label="Back to conversations"
          />
          
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-200">
            <Image
              src={conversation.avatar}
              alt={conversation.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h2 className="font-semibold text-text-primary">{conversation.name}</h2>
            <p className="text-sm text-text-secondary">
              {conversation.isOnline ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-1"></span>
                  Online
                </span>
              ) : (
                'Last seen recently'
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            aria-label="Voice call"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Video"
            aria-label="Video call"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            aria-label="More options"
          />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-200">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-surface px-4 py-2 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-background">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName="Paperclip"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              aria-label="Attach file"
            />
            
            {showAttachmentMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-lg shadow-floating p-2 min-w-[160px]">
                <button
                  type="button"
                  onClick={() => handleAttachmentClick('photo')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface rounded-md transition-smooth"
                >
                  <Icon name="Image" size={16} />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAttachmentClick('location')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface rounded-md transition-smooth"
                >
                  <Icon name="MapPin" size={16} />
                  <span>Location</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-full
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder:text-text-muted transition-smooth"
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="sm"
            iconName="Send"
            disabled={!messageText.trim()}
            aria-label="Send message"
          />
        </form>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInterface;