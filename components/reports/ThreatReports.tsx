'use client'

import { DocumentTextIcon, ArrowDownTrayIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

export function ThreatReports() {
  const reports = [
    {
      id: '1',
      title: 'Weekly Threat Summary',
      description: 'Comprehensive analysis of threats detected in the past week',
      date: '2024-01-15',
      type: 'Weekly',
      severity: 'Medium',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Phishing Attack Analysis',
      description: 'Detailed report on recent phishing attempts and patterns',
      date: '2024-01-12',
      type: 'Special',
      severity: 'High',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Malware Incident Report',
      description: 'Analysis of malware detections and response actions',
      date: '2024-01-10',
      type: 'Incident',
      severity: 'Critical',
      downloadUrl: '#'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Threat Intelligence Reports</h3>

        <div className="space-y-4">
          {reports.map(report => (
            <div key={report.id} className="bg-cyber-gray-200/20 rounded p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <DocumentTextIcon className="h-5 w-5 text-cyber-blue-400 mr-2" />
                    <h4 className="text-lg font-medium text-white">{report.title}</h4>
                  </div>
                  <p className="text-cyber-gray-400 text-sm mb-3">{report.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-1 text-cyber-gray-500" />
                      <span className="text-cyber-gray-500">{report.date}</span>
                    </div>
                    <span className={`px-2 py-1 rounded ${
                      report.severity === 'Critical' ? 'bg-cyber-red-500/20 text-cyber-red-400' :
                      report.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {report.severity}
                    </span>
                    <span className="bg-cyber-blue-500/20 text-cyber-blue-400 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </div>
                </div>
                <button className="cyber-button text-sm ml-4">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Generate New Report</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Report Type</label>
            <select className="cyber-input w-full">
              <option>Threat Summary</option>
              <option>Malware Analysis</option>
              <option>Phishing Report</option>
              <option>Incident Response</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Time Period</label>
            <select className="cyber-input w-full">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
        <button className="cyber-button mt-4">
          Generate Report
        </button>
      </div>
    </div>
  )
}
