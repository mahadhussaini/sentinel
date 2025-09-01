'use client'

import { useState } from 'react'
import { UserIcon, CheckCircleIcon, MoonIcon, SunIcon, GlobeAltIcon, BellIcon } from '@heroicons/react/24/outline'

export function UserPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
    notifications: true,
    emailReports: true,
    autoScan: false,
    showTips: true,
    compactView: false
  })

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Preferences saved successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="cyber-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="cyber-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Job Title</label>
            <input
              type="text"
              defaultValue="Security Analyst"
              className="cyber-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Organization</label>
            <input
              type="text"
              defaultValue="CyberSec Corp"
              className="cyber-input w-full"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Appearance</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-3">Theme</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updatePreference('theme', 'dark')}
                className={`p-4 rounded-lg border transition-all ${
                  preferences.theme === 'dark'
                    ? 'border-cyber-green-500 bg-cyber-green-500/10'
                    : 'border-cyber-gray-300 bg-cyber-gray-200/30'
                }`}
              >
                <div className="flex items-center">
                  <MoonIcon className="h-5 w-5 mr-3 text-cyber-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-white">Dark</div>
                    <div className="text-xs text-cyber-gray-400">Cybersecurity theme</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => updatePreference('theme', 'light')}
                className={`p-4 rounded-lg border transition-all ${
                  preferences.theme === 'light'
                    ? 'border-cyber-green-500 bg-cyber-green-500/10'
                    : 'border-cyber-gray-300 bg-cyber-gray-200/30'
                }`}
              >
                <div className="flex items-center">
                  <SunIcon className="h-5 w-5 mr-3 text-cyber-yellow-400" />
                  <div className="text-left">
                    <div className="font-medium text-white">Light</div>
                    <div className="text-xs text-cyber-gray-400">Standard theme</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Compact View</div>
              <div className="text-sm text-cyber-gray-400">Reduce spacing and padding for more content</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.compactView}
                onChange={(e) => updatePreference('compactView', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Localization</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => updatePreference('language', e.target.value)}
              className="cyber-input w-full"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Timezone</label>
            <select
              value={preferences.timezone}
              onChange={(e) => updatePreference('timezone', e.target.value)}
              className="cyber-input w-full"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
              <option value="CET">Central European Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* General Preferences */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">General Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Enable Notifications</div>
              <div className="text-sm text-cyber-gray-400">Receive alerts about security events</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => updatePreference('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Email Reports</div>
              <div className="text-sm text-cyber-gray-400">Receive weekly security reports via email</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.emailReports}
                onChange={(e) => updatePreference('emailReports', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Auto Security Scan</div>
              <div className="text-sm text-cyber-gray-400">Automatically scan for threats daily</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoScan}
                onChange={(e) => updatePreference('autoScan', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Show Tips</div>
              <div className="text-sm text-cyber-gray-400">Display helpful security tips and hints</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.showTips}
                onChange={(e) => updatePreference('showTips', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="cyber-button px-8"
        >
          <CheckCircleIcon className="h-4 w-4 mr-2" />
          Save Preferences
        </button>
      </div>
    </div>
  )
}
