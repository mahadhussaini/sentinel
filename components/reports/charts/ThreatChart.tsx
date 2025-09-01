'use client'

interface ThreatChartProps {
  timeRange: string
}

export function ThreatChart({ timeRange }: ThreatChartProps) {
  // Mock data for the chart
  const data = [
    { day: 'Mon', threats: 12, blocked: 10 },
    { day: 'Tue', threats: 8, blocked: 7 },
    { day: 'Wed', threats: 15, blocked: 13 },
    { day: 'Thu', threats: 6, blocked: 5 },
    { day: 'Fri', threats: 18, blocked: 16 },
    { day: 'Sat', threats: 4, blocked: 4 },
    { day: 'Sun', threats: 9, blocked: 8 }
  ]

  const maxThreats = Math.max(...data.map(d => d.threats))

  return (
    <div className="space-y-4">
      {/* Chart Area */}
      <div className="h-64 flex items-end space-x-2">
        {data.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {/* Blocked threats (green) */}
            <div
              className="w-full bg-cyber-green-500/80 rounded-t"
              style={{
                height: `${(day.blocked / maxThreats) * 200}px`,
                minHeight: '4px'
              }}
            />
            {/* Unblocked threats (red) */}
            <div
              className="w-full bg-cyber-red-500/80"
              style={{
                height: `${((day.threats - day.blocked) / maxThreats) * 200}px`,
                minHeight: day.threats - day.blocked > 0 ? '4px' : '0px'
              }}
            />
            <div className="text-xs text-cyber-gray-400 mt-2">{day.day}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-cyber-red-500/80 rounded mr-2"></div>
          <span className="text-xs text-cyber-gray-400">Unblocked Threats</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-cyber-green-500/80 rounded mr-2"></div>
          <span className="text-xs text-cyber-gray-400">Blocked Threats</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyber-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-cyber-red-400">
            {data.reduce((sum, day) => sum + (day.threats - day.blocked), 0)}
          </div>
          <div className="text-xs text-cyber-gray-400">Unblocked</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-cyber-green-400">
            {data.reduce((sum, day) => sum + day.blocked, 0)}
          </div>
          <div className="text-xs text-cyber-gray-400">Blocked</div>
        </div>
      </div>
    </div>
  )
}
