export interface MessageProps {
  avatar?: string;
  sender: string;
  time: string;
  lastMessage: string;
  unreadCount?: number;
  isOnline?: boolean;
  subject: string;
  content: string;
  tags: {
    text: string;
    variant: 'primary' | 'secondary' | 'tertiary';
  }[];
  hasUnread: boolean;
}

export interface ChatMessageProps {
  sender: string;
  message: string;
  time: string;
  isUser: boolean;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name?: string;
  }>;
}

export interface ChatHeaderProps {
  name: string;
  status: 'online' | 'offline' | 'away';
  avatar: string;
  lastSeen?: string;
}