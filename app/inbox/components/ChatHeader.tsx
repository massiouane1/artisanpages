import React from 'react';
import { ChatHeaderProps } from '../types';

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, status, avatar, lastSeen }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
            ${status === 'online' ? 'bg-green-500' : 
              status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'}`} 
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">
            {status === 'online' ? 'Online' : lastSeen ? `Last seen ${lastSeen}` : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 hover:bg-zinc-100 rounded-full">
          <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M3 12h18M3 19h18" />
          </svg>
        </button>
      </div>
    </div>
  );
};
