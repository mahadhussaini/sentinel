'use client'

import { ShieldCheckIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export function ComplianceReports() {
  const complianceItems = [
    {
      standard: 'GDPR',
      status: 'Compliant',
      score: 92,
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      issues: 2
    },
    {
      standard: 'HIPAA',
      status: 'Compliant',
      score: 88,
      lastAudit: '2024-01-08',
      nextAudit: '2024-07-08',
      issues: 3
    },
    {
      standard: 'PCI DSS',
      status: 'At Risk',
      score: 75,
      lastAudit: '2023-12-15',
      nextAudit: '2024-06-15',
      issues: 8
    },
    {
      standard: 'ISO 27001',
      status: 'Compliant',
      score: 90,
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      issues: 1
    }
  ]

  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Compliance Dashboard</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceItems.map((item, index) => (
            <div key={index} className="bg-cyber-gray-200/20 rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-white">{item.standard}</h4>
                <div className={`flex items-center ${
                  item.status === 'Compliant' ? 'text-cyber-green-400' : 'text-cyber-red-400'
                }`}>
                  {item.status === 'Compliant' ? (
                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                  ) : (
                    <ExclamationTriangleIcon className="h-5 w-5 mr-1" />
                  )}
                  {item.status}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyber-gray-400">Compliance Score:</span>
                  <span className={`font-medium ${
                    item.score >= 90 ? 'text-cyber-green-400' :
                    item.score >= 80 ? 'text-yellow-400' : 'text-cyber-red-400'
                  }`}>
                    {item.score}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cyber-gray-400">Last Audit:</span>
                  <span className="text-white">{item.lastAudit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cyber-gray-400">Next Audit:</span>
                  <span className="text-white">{item.nextAudit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cyber-gray-400">Open Issues:</span>
                  <span className={`font-medium ${item.issues > 5 ? 'text-cyber-red-400' : 'text-yellow-400'}`}>
                    {item.issues}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-cyber-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.score >= 90 ? 'bg-cyber-green-500' :
                      item.score >= 80 ? 'bg-yellow-500' : 'bg-cyber-red-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Compliance Actions</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-cyber-red-500/10 border border-cyber-red-500/30 rounded">
            <div>
              <h5 className="text-white font-medium">PCI DSS Compliance Review</h5>
              <p className="text-sm text-cyber-gray-400">8 open issues require immediate attention</p>
            </div>
            <button className="cyber-button-danger text-sm">
              Review Now
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <div>
              <h5 className="text-white font-medium">GDPR Data Mapping Update</h5>
              <p className="text-sm text-cyber-gray-400">2 minor issues to address</p>
            </div>
            <button className="cyber-button text-sm">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
