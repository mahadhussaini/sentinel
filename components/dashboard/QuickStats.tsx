'use client'

import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  EyeIcon,
  UserGroupIcon,
  ServerIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Threats Detected',
    value: '3',
    change: '+2 from yesterday',
    changeType: 'increase',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Active Monitors',
    value: '24',
    change: '100% uptime',
    changeType: 'neutral',
    icon: EyeIcon,
  },
  {
    name: 'Protected Users',
    value: '1,247',
    change: '+12 new today',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
  {
    name: 'System Uptime',
    value: '99.9%',
    change: '30 days',
    changeType: 'positive',
    icon: ServerIcon,
  },
]

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="cyber-card hover:bg-cyber-gray-200/50 transition-all duration-200"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <stat.icon 
                className={`h-8 w-8 ${
                  stat.changeType === 'increase' ? 'text-cyber-red-500' :
                  stat.changeType === 'positive' ? 'text-cyber-green-500' :
                  'text-cyber-blue-500'
                }`} 
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
              <p className="text-sm font-medium text-cyber-gray-500 truncate">
                {stat.name}
              </p>
              <p className={`text-xs ${
                stat.changeType === 'increase' ? 'text-cyber-red-400' :
                stat.changeType === 'positive' ? 'text-cyber-green-400' :
                'text-cyber-gray-400'
              }`}>
                {stat.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
