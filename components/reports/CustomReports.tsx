'use client'

import { useState } from 'react'
import { CogIcon, PlayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export function CustomReports() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [dateRange, setDateRange] = useState('30d')
  const [reportFormat, setReportFormat] = useState('pdf')
  const [isGenerating, setIsGenerating] = useState(false)

  const availableMetrics = [
    { id: 'threats', label: 'Threat Detection', category: 'Security' },
    { id: 'malware', label: 'Malware Incidents', category: 'Security' },
    { id: 'phishing', label: 'Phishing Attempts', category: 'Security' },
    { id: 'logins', label: 'Login Activity', category: 'Access' },
    { id: 'network', label: 'Network Traffic', category: 'Network' },
    { id: 'compliance', label: 'Compliance Status', category: 'Compliance' },
    { id: 'updates', label: 'System Updates', category: 'System' },
    { id: 'backups', label: 'Backup Status', category: 'System' }
  ]

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    )
  }

  const generateReport = async () => {
    if (selectedMetrics.length === 0) return

    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would download the report
      alert('Report generated successfully!')
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Custom Report Builder</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Configuration */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Select Metrics</h4>
              <div className="space-y-4">
                {availableMetrics.map(metric => (
                  <div key={metric.id}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.id)}
                        onChange={() => toggleMetric(metric.id)}
                        className="mr-3 h-4 w-4 text-cyber-green-500 bg-cyber-gray-200 border-cyber-gray-300 rounded focus:ring-cyber-green-500"
                      />
                      <div>
                        <span className="text-white font-medium">{metric.label}</span>
                        <span className="text-xs text-cyber-gray-400 ml-2">({metric.category})</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Report Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-cyber-gray-400 mb-2">Time Range</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="cyber-input w-full"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-cyber-gray-400 mb-2">Format</label>
                  <select
                    value={reportFormat}
                    onChange={(e) => setReportFormat(e.target.value)}
                    className="cyber-input w-full"
                  >
                    <option value="pdf">PDF Report</option>
                    <option value="csv">CSV Data</option>
                    <option value="json">JSON Export</option>
                    <option value="xlsx">Excel Spreadsheet</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Report Preview</h4>
              <div className="bg-cyber-gray-200/20 rounded p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-cyber-gray-400">Selected Metrics:</span>
                    <span className="text-white">{selectedMetrics.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-gray-400">Time Range:</span>
                    <span className="text-white capitalize">{dateRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-gray-400">Format:</span>
                    <span className="text-white uppercase">{reportFormat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-gray-400">Estimated Size:</span>
                    <span className="text-white">~{selectedMetrics.length * 2}MB</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Included Metrics</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedMetrics.length === 0 ? (
                  <p className="text-cyber-gray-400 text-sm">No metrics selected</p>
                ) : (
                  selectedMetrics.map(metricId => {
                    const metric = availableMetrics.find(m => m.id === metricId)
                    return (
                      <div key={metricId} className="flex items-center justify-between bg-cyber-gray-200/20 rounded px-3 py-2">
                        <span className="text-white text-sm">{metric?.label}</span>
                        <span className="text-xs text-cyber-gray-400">{metric?.category}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6 pt-6 border-t border-cyber-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-cyber-gray-400">
              {selectedMetrics.length === 0
                ? 'Select at least one metric to generate report'
                : `Report will include ${selectedMetrics.length} metric${selectedMetrics.length !== 1 ? 's' : ''}`
              }
            </div>
            <button
              onClick={generateReport}
              disabled={selectedMetrics.length === 0 || isGenerating}
              className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Generate Report
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Custom Reports</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-cyber-gray-200/20 rounded">
            <div>
              <h5 className="text-white font-medium">Security Overview Report</h5>
              <p className="text-sm text-cyber-gray-400">Generated on 2024-01-15 • PDF • 4.2MB</p>
            </div>
            <button className="cyber-button text-sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-cyber-gray-200/20 rounded">
            <div>
              <h5 className="text-white font-medium">Compliance Audit Report</h5>
              <p className="text-sm text-cyber-gray-400">Generated on 2024-01-12 • PDF • 2.8MB</p>
            </div>
            <button className="cyber-button text-sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
