'use client'

interface QuickActionsProps {
  onAction: (action: string) => void
}

const quickActions = [
  {
    id: 'security-check',
    label: 'Security Check',
    description: 'Analyze current system security',
    icon: '🛡️',
    color: 'cyber-green'
  },
  {
    id: 'threat-scan',
    label: 'Threat Scan',
    description: 'Scan for active threats',
    icon: '🔍',
    color: 'cyber-blue'
  },
  {
    id: 'password-help',
    label: 'Password Security',
    description: 'Get password recommendations',
    icon: '🔐',
    color: 'cyber-purple'
  },
  {
    id: 'phishing-guide',
    label: 'Anti-Phishing',
    description: 'Learn to spot phishing',
    icon: '🎣',
    color: 'cyber-red'
  },
  {
    id: 'firewall-setup',
    label: 'Firewall Setup',
    description: 'Configure firewall rules',
    icon: '🔥',
    color: 'yellow'
  },
  {
    id: 'backup-guide',
    label: 'Data Backup',
    description: 'Secure backup strategies',
    icon: '💾',
    color: 'cyber-gray'
  }
]

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <div className="h-px bg-cyber-gray-300 flex-1"></div>
        <span className="px-3 text-xs text-cyber-gray-400 font-medium">Quick Actions</span>
        <div className="h-px bg-cyber-gray-300 flex-1"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickActions.map(action => (
          <button
            key={action.id}
            onClick={() => onAction(`${action.label}: ${action.description}`)}
            className={`p-4 rounded-lg border border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50 transition-all duration-200 text-left group`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{action.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:text-cyber-green-400 transition-colors">
                  {action.label}
                </div>
                <div className="text-xs text-cyber-gray-400 mt-1">
                  {action.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
