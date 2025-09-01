'use client'

import { useState } from 'react'
import { ChartBarIcon, DocumentTextIcon, ArrowTrendingUpIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { SecurityAnalytics } from '@/components/reports/SecurityAnalytics'
import { ThreatReports } from '@/components/reports/ThreatReports'
import { ComplianceReports } from '@/components/reports/ComplianceReports'
import { CustomReports } from '@/components/reports/CustomReports'

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<'analytics' | 'threats' | 'compliance' | 'custom'>('analytics')

  const reportSections = [
    {
      id: 'analytics',
      name: 'Security Analytics',
      description: 'Comprehensive security metrics and trends',
      icon: ChartBarIcon,
      color: 'cyber-blue'
    },
    {
      id: 'threats',
      name: 'Threat Reports',
      description: 'Detailed threat analysis and patterns',
      icon: ArrowTrendingUpIcon,
      color: 'cyber-red'
    },
    {
      id: 'compliance',
      name: 'Compliance Reports',
      description: 'Security compliance and audit reports',
      icon: DocumentTextIcon,
      color: 'cyber-green'
    },
    {
      id: 'custom',
      name: 'Custom Reports',
      description: 'Generate custom security reports',
      icon: CalendarDaysIcon,
      color: 'cyber-purple'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Reports & Analytics</h1>
          <p className="text-cyber-gray-500 mt-1">
            Comprehensive security insights, trends, and compliance reporting
          </p>
        </div>
        <ChartBarIcon className="h-8 w-8 text-cyber-green-500" />
      </div>

      {/* Report Navigation */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Report Categories</h3>
        <div className="grid-responsive-1 gap-4">
          {reportSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveReport(section.id as any)}
              className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 text-left ${
                activeReport === section.id
                  ? 'border-cyber-green-500 bg-cyber-green-500/10'
                  : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
              }`}
            >
              <div className="flex items-center mb-3">
                <section.icon className={`h-6 w-6 mr-3 ${
                  activeReport === section.id ? 'text-cyber-green-500' : 'text-cyber-gray-400'
                }`} />
                <h4 className="font-medium text-white">{section.name}</h4>
              </div>
              <p className="text-sm text-cyber-gray-400">{section.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Report Content */}
      <div className="min-h-[600px]">
        {activeReport === 'analytics' && <SecurityAnalytics />}
        {activeReport === 'threats' && <ThreatReports />}
        {activeReport === 'compliance' && <ComplianceReports />}
        {activeReport === 'custom' && <CustomReports />}
      </div>
    </div>
  )
}
