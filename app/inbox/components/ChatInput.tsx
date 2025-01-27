import React from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
    <div className="border-t border-zinc-200 p-4">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-zinc-100 rounded-full">
          <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button 
          onClick={() => onSend(value)}
          className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};
