import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PostScheduler = ({ scheduledDate, onScheduleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(scheduledDate || '');
  const [selectedTime, setSelectedTime] = useState('');

  const handleScheduleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !scheduledDate) {
      // Set default to tomorrow at current time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      const timeStr = new Date().toTimeString().slice(0, 5);
      setSelectedDate(dateStr);
      setSelectedTime(timeStr);
    }
  };

  const handleSaveSchedule = () => {
    if (selectedDate && selectedTime) {
      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
      onScheduleChange(scheduledDateTime);
      setIsOpen(false);
    }
  };

  const handleClearSchedule = () => {
    setSelectedDate('');
    setSelectedTime('');
    onScheduleChange(null);
    setIsOpen(false);
  };

  const formatScheduledDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  };

  const minDate = new Date().toISOString().split('T')[0];
  const minTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="relative">
      {/* Schedule Button */}
      <Button
        variant={scheduledDate ? "outline" : "ghost"}
        size="sm"
        onClick={handleScheduleToggle}
        className={`
          flex items-center space-x-2 px-3 py-2 border border-border rounded-lg
          ${scheduledDate ? 'border-primary text-primary bg-primary-50' : 'hover:bg-surface'}
        `}
      >
        <Icon 
          name="Clock" 
          size={16} 
          className={scheduledDate ? "text-primary" : "text-text-secondary"}
        />
        <span className="text-sm font-medium">
          {scheduledDate ? `Scheduled: ${formatScheduledDate(scheduledDate)}` : 'Schedule'}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-muted"
        />
      </Button>

      {/* Schedule Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-floating z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Schedule Post
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsOpen(false)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
              
              <p className="text-sm text-text-secondary mb-4">
                Choose when you want your post to be published.
              </p>

              {/* Date Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={minDate}
                  className="w-full"
                />
              </div>

              {/* Time Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Time
                </label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  min={selectedDate === minDate ? minTime : undefined}
                  className="w-full"
                />
              </div>

              {/* Preview */}
              {selectedDate && selectedTime && (
                <div className="mb-4 p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">
                      Will be published on:
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1 ml-6">
                    {formatScheduledDate(new Date(`${selectedDate}T${selectedTime}`))}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between space-x-3">
                {scheduledDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSchedule}
                    className="text-error hover:text-error hover:bg-error-50"
                  >
                    Clear Schedule
                  </Button>
                )}
                
                <div className="flex items-center space-x-2 ml-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveSchedule}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostScheduler;