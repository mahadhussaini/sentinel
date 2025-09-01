'use client'

import { useState } from 'react'
import { CogIcon, BellIcon, ShieldCheckIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline'
import { NotificationSettings } from '@/components/settings/NotificationSettings'
import { SecuritySettings } from '@/components/settings/SecuritySettings'
import { UserPreferences } from '@/components/settings/UserPreferences'
import { SystemSettings } from '@/components/settings/SystemSettings'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'notifications' | 'security' | 'preferences' | 'system'>('preferences')

  const sections = [
    {
      id: 'preferences',
      name: 'User Preferences',
      description: 'Personalize your experience',
      icon: UserIcon,
      color: 'cyber-blue'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Manage alerts and notifications',
      icon: BellIcon,
      color: 'cyber-green'
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Configure security settings',
      icon: ShieldCheckIcon,
      color: 'cyber-red'
    },
    {
      id: 'system',
      name: 'System',
      description: 'System configuration and maintenance',
      icon: CogIcon,
      color: 'cyber-purple'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-cyber-gray-500 mt-1">
            Configure your DesAIgn experience and security preferences
          </p>
        </div>
        <CogIcon className="h-8 w-8 text-cyber-green-500" />
      </div>

      {/* Settings Navigation */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Settings Categories</h3>
        <div className="grid-responsive-1 gap-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 text-left ${
                activeSection === section.id
                  ? 'border-cyber-green-500 bg-cyber-green-500/10'
                  : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
              }`}
            >
              <div className="flex items-center mb-3">
                <section.icon className={`h-6 w-6 mr-3 ${
                  activeSection === section.id ? 'text-cyber-green-500' : 'text-cyber-gray-400'
                }`} />
                <h4 className="font-medium text-white">{section.name}</h4>
              </div>
              <p className="text-sm text-cyber-gray-400">{section.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Settings Section */}
      <div className="min-h-[600px]">
        {activeSection === 'preferences' && <UserPreferences />}
        {activeSection === 'notifications' && <NotificationSettings />}
        {activeSection === 'security' && <SecuritySettings />}
        {activeSection === 'system' && <SystemSettings />}
      </div>
    </div>
  )
}
