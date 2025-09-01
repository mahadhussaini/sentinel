'use client'

import { BellIcon, ExclamationTriangleIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Alert Types</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-cyber-red-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">Critical Threats</div>
                    <div className="text-sm text-cyber-gray-400">Immediate alerts for high-risk security events</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-cyber-yellow-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">Security Updates</div>
                    <div className="text-sm text-cyber-gray-400">Notifications about security patches and updates</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div className="flex items-center">
                  <BellIcon className="h-5 w-5 text-cyber-blue-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">System Status</div>
                    <div className="text-sm text-cyber-gray-400">Alerts about system health and performance</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Delivery Methods</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-cyber-gray-200/20 rounded text-center">
                <div className="text-2xl mb-2">🖥️</div>
                <div className="font-medium text-white mb-1">Desktop</div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="p-4 bg-cyber-gray-200/20 rounded text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-medium text-white mb-1">Email</div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="p-4 bg-cyber-gray-200/20 rounded text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium text-white mb-1">Mobile</div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="cyber-button px-8">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
