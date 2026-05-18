type NotificationState = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  decreaseUnread: () => void;
  resetUnread: () => void;
};

class NotificationStore {
  unreadCount = 0;

  setUnreadCount = (count: number) => {
    this.unreadCount = count;
  };

  decreaseUnread = () => {
    this.unreadCount = Math.max(0, this.unreadCount - 1);
  };

  resetUnread = () => {
    this.unreadCount = 0;
  };
}

export const notificationStore = new NotificationStore();
