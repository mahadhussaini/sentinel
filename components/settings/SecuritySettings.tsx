'use client'

import { ShieldCheckIcon, KeyIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Security Configuration</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Password Security</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div>
                  <div className="font-medium text-white">Require Strong Passwords</div>
                  <div className="text-sm text-cyber-gray-400">Enforce complex password requirements</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div>
                  <div className="font-medium text-white">Password Expiration</div>
                  <div className="text-sm text-cyber-gray-400">Require password changes every 90 days</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div>
                  <div className="font-medium text-white">Enforce 2FA</div>
                  <div className="text-sm text-cyber-gray-400">Require 2FA for all user accounts</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div>
                  <div className="font-medium text-white">Allow Hardware Keys</div>
                  <div className="text-sm text-cyber-gray-400">Support YubiKey and similar devices</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Session Management</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-cyber-gray-400 mb-2">Session Timeout (minutes)</label>
                  <select className="cyber-input w-full">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                    <option>120 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-cyber-gray-400 mb-2">Max Login Attempts</label>
                  <select className="cyber-input w-full">
                    <option>3 attempts</option>
                    <option>5 attempts</option>
                    <option>10 attempts</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="cyber-button px-8">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Save Security Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
