import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import {
  Bell,
  BellRing,
  CheckCircle,
  Clock,
  ShoppingBag,
  Truck,
  CreditCard,
  Star,
  X,
  Filter,
  Search,
  ChevronRight,
} from "lucide-react";

interface Notification {
  id: string;
  type: "order" | "promotion" | "system" | "review";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and is on its way!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionUrl: "/profile#orders",
    priority: "high",
  },
  {
    id: "2",
    type: "promotion",
    title: "Flash Sale Alert",
    message: "50% off on all electronics! Limited time offer.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: "/category/Electronics",
    priority: "medium",
  },
  {
    id: "3",
    type: "review",
    title: "Review Your Purchase",
    message: "How was your experience with the Wireless Headphones?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: "/profile#orders",
    priority: "low",
  },
  {
    id: "4",
    type: "system",
    title: "Account Security",
    message: "Your password was changed successfully.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
    priority: "medium",
  },
  {
    id: "5",
    type: "order",
    title: "Order Delivered",
    message: "Your order #12344 has been delivered successfully!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    read: true,
    actionUrl: "/profile#orders",
    priority: "low",
  },
];

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  // Filter and search notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "read" && notification.read);

    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag size={20} className="text-blue-500" />;
      case "promotion":
        return <Star size={20} className="text-yellow-500" />;
      case "system":
        return <Bell size={20} className="text-gray-500" />;
      case "review":
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in-up">
          <div className="mx-auto w-24 h-24 bg-surface-soft rounded-full flex items-center justify-center mb-6">
            <Bell size={48} className="text-muted" />
          </div>
          <h1 className="text-3xl font-bold text-text">Notifications</h1>
          <p className="mt-2 text-muted">
            Please sign in to view your notifications.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-white font-semibold hover:bg-accent-dark transition shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Notifications | TechShed</title>
        <meta
          name="description"
          content="Stay updated with your order status, promotions, and account notifications."
        />
      </Head>

      <div className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 animate-fade-in-up">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <BellRing size={32} className="text-accent" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text">
                    Notifications
                  </h1>
                  <p className="text-muted text-sm">
                    Stay updated with your latest activity
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold hover:bg-accent-dark transition shadow-md"
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 animate-fade-in-up [animation-delay:100ms]">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2">
                {["all", "unread", "read"].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType as any)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      filter === filterType
                        ? "bg-accent text-white shadow-md"
                        : "bg-surface-soft text-muted hover:bg-surface-strong"
                    }`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    {filterType === "unread" && unreadCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-surface-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                />
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4 animate-fade-in-up [animation-delay:200ms]">
            {filteredNotifications.length === 0 ? (
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-12 text-center">
                <Bell size={48} className="mx-auto text-muted mb-4" />
                <p className="text-text font-semibold text-lg">
                  No notifications
                </p>
                <p className="text-muted mt-1">
                  {filter === "unread"
                    ? "You have no unread notifications."
                    : "You're all caught up!"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`bg-surface rounded-2xl border-l-4 shadow-sm hover:shadow-md transition-all duration-300 animate-bounce-in opacity-0 ${
                    !notification.read
                      ? "border-l-accent bg-accent/5"
                      : "border-l-border"
                  } ${getPriorityColor(notification.priority)}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-text text-lg">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                          <p className="text-muted mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted mt-3 flex items-center gap-1">
                            <Clock size={12} />
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notification.actionUrl && (
                          <Link
                            href={notification.actionUrl}
                            onClick={() => markAsRead(notification.id)}
                            className="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold hover:bg-accent-dark transition shadow-md flex items-center gap-1"
                          >
                            View <ChevronRight size={14} />
                          </Link>
                        )}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-muted hover:text-accent transition"
                            title="Mark as read"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-muted hover:text-red-500 transition"
                          title="Delete notification"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
