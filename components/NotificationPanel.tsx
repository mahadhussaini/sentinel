'use client'

import { useState, useEffect } from 'react'
import {
  XMarkIcon,
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { useNotifications, Notification } from '@/contexts/NotificationContext'

interface NotificationPanelProps {
  onClose: () => void
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    unreadCount
  } = useNotifications()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return CheckCircleIcon
      case 'error': return ExclamationTriangleIcon
      case 'warning': return ExclamationTriangleIcon
      case 'info': return InformationCircleIcon
      case 'threat': return ExclamationTriangleIcon
      default: return BellIcon
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-cyber-green-400'
      case 'error': return 'text-cyber-red-400'
      case 'warning': return 'text-yellow-400'
      case 'info': return 'text-cyber-blue-400'
      case 'threat': return 'text-cyber-purple-400'
      default: return 'text-cyber-gray-400'
    }
  }

  const formatTimeAgo = (date: Date) => {
    if (!mounted) return '--m ago'

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="absolute top-0 right-0 w-full max-w-sm sm:max-w-md lg:w-96 h-full bg-cyber-gray-100/95 backdrop-blur-xl border-l border-cyber-gray-200 z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-cyber-gray-200 space-y-3 sm:space-y-0">
          <div className="flex items-center">
            <BellIcon className="h-5 w-5 text-cyber-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="ml-2 bg-cyber-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="text-cyber-gray-400 hover:text-white text-sm hidden sm:block"
                >
                  Mark all read
                </button>
                <button
                  onClick={clearAll}
                  className="text-cyber-gray-400 hover:text-cyber-red-400 text-sm"
                >
                  Clear all
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="text-cyber-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <BellIcon className="h-12 w-12 text-cyber-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">No notifications</h4>
              <p className="text-cyber-gray-400 text-sm">
                You&apos;re all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-cyber-gray-200">
              {notifications.map(notification => {
                const IconComponent = getNotificationIcon(notification.type)
                const iconColor = getNotificationColor(notification.type)

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-cyber-gray-200/20 transition-colors ${
                      !notification.read ? 'bg-cyber-gray-200/10' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <IconComponent className={`h-5 w-5 ${iconColor}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${
                              notification.read ? 'text-cyber-gray-400' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm mt-1 ${
                              notification.read ? 'text-cyber-gray-500' : 'text-cyber-gray-300'
                            }`}>
                              {notification.message}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-cyber-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-cyber-gray-400 hover:text-cyber-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-cyber-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </span>

                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-cyber-blue-400 hover:text-cyber-blue-300 flex items-center"
                              >
                                <EyeIcon className="h-3 w-3 mr-1" />
                                Mark read
                              </button>
                            )}

                            {notification.actionable && notification.onAction && (
                              <button
                                onClick={() => {
                                  notification.onAction?.()
                                  markAsRead(notification.id)
                                }}
                                className="text-xs bg-cyber-green-500 text-black px-2 py-1 rounded hover:bg-cyber-green-400 transition-colors"
                              >
                                {notification.actionLabel || 'Action'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-cyber-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyber-gray-400">
                {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center space-x-4">
                <span className="text-cyber-gray-400">
                  {unreadCount} unread
                </span>
                <button
                  onClick={clearAll}
                  className="text-cyber-red-400 hover:text-cyber-red-300 text-sm"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
