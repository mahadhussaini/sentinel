'use client'

import { CogIcon, ServerIcon, CircleStackIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">System Configuration</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">System Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-green-400">87%</div>
                <div className="text-xs text-cyber-gray-400">CPU Usage</div>
                <div className="w-full bg-cyber-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-cyber-green-500 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-blue-400">2.4GB</div>
                <div className="text-xs text-cyber-gray-400">Memory Used</div>
                <div className="w-full bg-cyber-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-cyber-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-purple-400">45GB</div>
                <div className="text-xs text-cyber-gray-400">Storage Used</div>
                <div className="w-full bg-cyber-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-cyber-purple-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Database Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-cyber-gray-400 mb-2">Backup Frequency</label>
                <select className="cyber-input w-full">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-cyber-gray-400 mb-2">Retention Period</label>
                <select className="cyber-input w-full">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Maintenance</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div>
                  <div className="font-medium text-white">Automatic Updates</div>
                  <div className="text-sm text-cyber-gray-400">Install security updates automatically</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
                <div>
                  <div className="font-medium text-white">Log Rotation</div>
                  <div className="text-sm text-cyber-gray-400">Automatically rotate and compress logs</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-cyber-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyber-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">System Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="cyber-button">
                <CircleStackIcon className="h-4 w-4 mr-2" />
                Backup Now
              </button>
              <button className="cyber-button">
                <ServerIcon className="h-4 w-4 mr-2" />
                System Scan
              </button>
              <button className="cyber-button">
                <CogIcon className="h-4 w-4 mr-2" />
                Optimize
              </button>
              <button className="cyber-button-danger">
                Restart Service
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="cyber-button px-8">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Save System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
