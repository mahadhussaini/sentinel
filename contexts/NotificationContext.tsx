'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'threat'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionable?: boolean
  actionLabel?: string
  onAction?: () => void
  autoHide?: boolean
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    }

    setNotifications(prev => [newNotification, ...prev])

    // Show toast notification
    const toastOptions = {
      duration: notification.duration || 4000,
      style: {
        background: getBackgroundColor(notification.type),
        color: '#fff',
        border: `1px solid ${getBorderColor(notification.type)}`
      }
    }

    if (notification.actionable && notification.onAction) {
      toast(
        <div>
          <div className="font-medium">{notification.title}</div>
          <div className="text-sm opacity-90">{notification.message}</div>
          <button
            onClick={() => {
              notification.onAction?.()
              toast.dismiss()
            }}
            className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
          >
            {notification.actionLabel || 'View'}
          </button>
        </div>,
        toastOptions
      )
    } else {
      toast[notification.type === 'error' ? 'error' : notification.type === 'warning' ? 'error' : 'success'](
        <div>
          <div className="font-medium">{notification.title}</div>
          <div className="text-sm opacity-90">{notification.message}</div>
        </div>,
        toastOptions
      )
    }

    // Auto-hide if specified
    if (notification.autoHide !== false) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, notification.duration || 4000)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const threatTypes = [
          {
            type: 'threat' as const,
            title: 'Suspicious Login Attempt',
            message: 'Failed login attempt detected from unknown IP address',
            actionable: true,
            actionLabel: 'Review'
          },
          {
            type: 'warning' as const,
            title: 'High Network Traffic',
            message: 'Unusual network activity detected on your system',
            actionable: false
          },
          {
            type: 'info' as const,
            title: 'Security Scan Complete',
            message: 'System security scan has been completed successfully',
            actionable: false
          },
          {
            type: 'success' as const,
            title: 'Password Updated',
            message: 'Your password has been successfully updated',
            actionable: false
          }
        ]

        const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)]
        addNotification(randomThreat)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const value: NotificationContextType = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    unreadCount
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

function getBackgroundColor(type: Notification['type']): string {
  switch (type) {
    case 'success': return '#10b981' // green-500
    case 'error': return '#ef4444' // red-500
    case 'warning': return '#f59e0b' // amber-500
    case 'info': return '#3b82f6' // blue-500
    case 'threat': return '#8b5cf6' // purple-500
    default: return '#374151' // gray-700
  }
}

function getBorderColor(type: Notification['type']): string {
  switch (type) {
    case 'success': return '#059669' // green-600
    case 'error': return '#dc2626' // red-600
    case 'warning': return '#d97706' // amber-600
    case 'info': return '#2563eb' // blue-600
    case 'threat': return '#7c3aed' // purple-600
    default: return '#4b5563' // gray-600
  }
}
