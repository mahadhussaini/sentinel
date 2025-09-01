'use client'

export function RiskDistribution() {
  const riskData = [
    { level: 'Critical', count: 12, percentage: 15, color: 'cyber-red' },
    { level: 'High', count: 28, percentage: 35, color: 'orange' },
    { level: 'Medium', count: 24, percentage: 30, color: 'yellow' },
    { level: 'Low', count: 16, percentage: 20, color: 'cyber-green' }
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {riskData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">{item.level}</span>
              <span className="text-sm text-cyber-gray-400">{item.count} ({item.percentage}%)</span>
            </div>
            <div className="w-full bg-cyber-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-${item.color}-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-cyber-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">80</div>
          <div className="text-xs text-cyber-gray-400">Total Risk Events</div>
        </div>
      </div>
    </div>
  )
}
