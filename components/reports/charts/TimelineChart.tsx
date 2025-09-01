'use client'

interface TimelineChartProps {
  timeRange: string
}

export function TimelineChart({ timeRange }: TimelineChartProps) {
  const events = [
    { time: '08:00', event: 'System Scan Started', type: 'info', severity: 'low' },
    { time: '09:15', event: 'Phishing Email Blocked', type: 'threat', severity: 'medium' },
    { time: '10:30', event: 'Failed Login Attempt', type: 'threat', severity: 'low' },
    { time: '11:45', event: 'Security Update Applied', type: 'info', severity: 'low' },
    { time: '13:20', event: 'Malware Detected & Quarantined', type: 'threat', severity: 'high' },
    { time: '14:10', event: 'VPN Connection Established', type: 'info', severity: 'low' },
    { time: '15:30', event: 'Unusual Network Traffic', type: 'warning', severity: 'medium' },
    { time: '16:45', event: 'Backup Completed', type: 'info', severity: 'low' }
  ]

  const getEventColor = (type: string, severity: string) => {
    if (type === 'threat') {
      return severity === 'high' ? 'cyber-red' : severity === 'medium' ? 'orange' : 'yellow'
    }
    if (type === 'warning') return 'orange'
    return 'cyber-green'
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cyber-gray-300"></div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-center">
              <div className="absolute left-6 w-4 h-4 bg-cyber-gray-200 rounded-full border-2 border-cyber-black"></div>

              <div className={`w-4 h-4 rounded-full bg-${getEventColor(event.type, event.severity)}-500 absolute left-6`}></div>

              <div className="ml-16 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-white">{event.event}</h5>
                  <span className="text-xs text-cyber-gray-400">{event.time}</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-1 rounded bg-${getEventColor(event.type, event.severity)}-500/20 text-${getEventColor(event.type, event.severity)}-400`}>
                    {event.type === 'threat' ? 'THREAT' : event.type === 'warning' ? 'WARNING' : 'INFO'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-cyber-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-cyber-red-400">
              {events.filter(e => e.type === 'threat').length}
            </div>
            <div className="text-xs text-cyber-gray-400">Threats</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">
              {events.filter(e => e.type === 'warning').length}
            </div>
            <div className="text-xs text-cyber-gray-400">Warnings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-cyber-green-400">
              {events.filter(e => e.type === 'info').length}
            </div>
            <div className="text-xs text-cyber-gray-400">Info</div>
          </div>
        </div>
      </div>
    </div>
  )
}
