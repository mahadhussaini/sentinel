'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  ShieldCheckIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  BellIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  CogIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { useNotifications } from '@/contexts/NotificationContext'
import { NotificationPanel } from './NotificationPanel'

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartBarIcon },
  { name: 'Reports', href: '/reports', icon: ArrowTrendingUpIcon },
  { name: 'AI Assistant', href: '/assistant', icon: ChatBubbleLeftRightIcon },
  { name: 'Security Tools', href: '/tools', icon: WrenchScrewdriverIcon },
  { name: 'Training', href: '/training', icon: AcademicCapIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export default function Navigation() {
  const pathname = usePathname()
  const { unreadCount } = useNotifications()
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false)

  // Close mobile menu when clicking navigation links
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-cyber-gray-100/90 backdrop-blur-xl p-3 rounded-lg border border-cyber-gray-200 shadow-lg hover:bg-cyber-gray-200/50 transition-colors"
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-cyber-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-80 bg-cyber-gray-100/95 backdrop-blur-xl border-r border-cyber-gray-200 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyber-gray-200">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-8 w-8 text-cyber-green-500 mr-3" />
                  <div>
                    <h1 className="text-xl font-bold text-cyber-green-500">Sentinel</h1>
                    <p className="text-xs text-cyber-gray-500">Cyber Guardian</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-cyber-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={handleNavClick}
                      className={`
                        flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-cyber-green-500/20 text-cyber-green-400 border border-cyber-green-500/30'
                          : 'text-cyber-gray-500 hover:text-white hover:bg-cyber-gray-200/50'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Status */}
              <div className="p-4 border-t border-cyber-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-gray-500">System Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyber-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs text-cyber-green-500">SECURE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`
        hidden lg:flex lg:flex-col
        ${isDesktopSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        bg-cyber-gray-100/50 backdrop-blur-xl border-r border-cyber-gray-200
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex flex-col h-full">
          {/* Desktop Header */}
          <div className={`flex items-center px-4 py-6 border-b border-cyber-gray-200 ${
            isDesktopSidebarCollapsed ? 'justify-center' : 'justify-between'
          }`}>
            {!isDesktopSidebarCollapsed ? (
              <>
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-8 w-8 text-cyber-green-500 mr-3" />
                  <div>
                    <h1 className="text-xl font-bold text-cyber-green-500">Sentinel</h1>
                    <p className="text-xs text-cyber-gray-500">Cyber Guardian</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-cyber-gray-400 hover:text-white transition-colors"
                  >
                    <BellIcon className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-cyber-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
                    className="p-2 text-cyber-gray-400 hover:text-white transition-colors"
                  >
                    <Bars3Icon className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsDesktopSidebarCollapsed(false)}
                className="p-2 text-cyber-gray-400 hover:text-white transition-colors"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${isActive
                      ? 'bg-cyber-green-500/20 text-cyber-green-400 border border-cyber-green-500/30'
                      : 'text-cyber-gray-500 hover:text-white hover:bg-cyber-gray-200/50'
                    }
                    ${isDesktopSidebarCollapsed ? 'justify-center' : ''}
                  `}
                  title={isDesktopSidebarCollapsed ? item.name : ''}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 ${
                    isDesktopSidebarCollapsed ? '' : 'mr-3'
                  }`} />
                  {!isDesktopSidebarCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Status */}
          {!isDesktopSidebarCollapsed && (
            <div className="p-4 border-t border-cyber-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-cyber-gray-500">System Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-cyber-green-500">SECURE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </>
  )
}
