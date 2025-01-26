export interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
}

export interface FriendType {
  // Add other friend properties as needed
  name: string;
  avatar: string;
  status?: string;
}
