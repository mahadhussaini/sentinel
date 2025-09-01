'use client'

import { useState, useEffect } from 'react'
import { CpuChipIcon, ExclamationTriangleIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { threatEngine, AIAnalysisResult } from '@/lib/threatDetection'

export function AIAnalysisPanel() {
  const [analysis, setAnalysis] = useState<AIAnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedAnalysis, setSelectedAnalysis] = useState<AIAnalysisResult | null>(null)

  useEffect(() => {
    performAnalysis()
  }, [])

  const performAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate log entries for analysis
    const mockLogs = [
      {
        action: 'login_failed',
        ip: '203.45.67.89',
        user: 'admin',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        action: 'file_access',
        details: 'Accessed confidential/reports.pdf',
        user: 'john.doe',
        ip: '192.168.1.105'
      },
      {
        action: 'network_traffic',
        size: 5000000,
        destination: 'unknown.server.com'
      },
      {
        action: 'email_received',
        sender: 'unknown@malicious.com',
        subject: 'URGENT: Account Verification Required',
        links: ['http://fake-bank.com/login']
      }
    ]

    try {
      const results = await threatEngine.getRealtimeAnalysis(mockLogs)
      setAnalysis(results)
      if (results.length > 0) {
        setSelectedAnalysis(results[0])
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-cyber-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-cyber-blue-400'
      default: return 'text-cyber-gray-400'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-cyber-green-400'
    if (confidence >= 60) return 'text-yellow-400'
    return 'text-cyber-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CpuChipIcon className="h-6 w-6 text-cyber-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-white">AI Threat Analysis</h3>
              <p className="text-sm text-cyber-gray-400">Real-time threat detection and analysis</p>
            </div>
          </div>
          <button
            onClick={performAnalysis}
            disabled={isAnalyzing}
            className="cyber-button text-sm"
          >
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>

        {/* Analysis Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyber-gray-200/30 rounded p-3">
            <div className="text-2xl font-bold text-cyber-red-400">{analysis.filter(a => a.threat.severity === 'critical').length}</div>
            <div className="text-xs text-cyber-gray-400">Critical Threats</div>
          </div>
          <div className="bg-cyber-gray-200/30 rounded p-3">
            <div className="text-2xl font-bold text-orange-400">{analysis.filter(a => a.threat.severity === 'high').length}</div>
            <div className="text-xs text-cyber-gray-400">High Risk</div>
          </div>
          <div className="bg-cyber-gray-200/30 rounded p-3">
            <div className="text-2xl font-bold text-cyber-green-400">{analysis.filter(a => a.analysis.confidence >= 80).length}</div>
            <div className="text-xs text-cyber-gray-400">High Confidence</div>
          </div>
          <div className="bg-cyber-gray-200/30 rounded p-3">
            <div className="text-2xl font-bold text-cyber-blue-400">{analysis.length}</div>
            <div className="text-xs text-cyber-gray-400">Total Analyzed</div>
          </div>
        </div>
      </div>

      {/* Threat List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat List */}
        <div className="cyber-card">
          <h4 className="text-lg font-semibold text-white mb-4">Detected Threats</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-blue-500 mx-auto mb-4"></div>
                <p className="text-cyber-gray-400">AI analyzing threat patterns...</p>
              </div>
            ) : analysis.length === 0 ? (
              <div className="text-center py-8">
                <ShieldCheckIcon className="h-12 w-12 text-cyber-green-500 mx-auto mb-4" />
                <p className="text-cyber-gray-400">No significant threats detected</p>
              </div>
            ) : (
              analysis.map((item, index) => (
                <div
                  key={item.threat.id}
                  onClick={() => setSelectedAnalysis(item)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedAnalysis?.threat.id === item.threat.id
                      ? 'border-cyber-green-500 bg-cyber-green-500/10'
                      : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ExclamationTriangleIcon className={`h-4 w-4 ${getSeverityColor(item.threat.severity)}`} />
                      <span className="text-sm font-medium text-white capitalize">
                        {item.threat.type.replace('_', ' ')}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(item.threat.severity)} bg-current/20`}>
                      {item.threat.severity.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-cyber-gray-400 mb-2 truncate">
                    {item.threat.description}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${getConfidenceColor(item.analysis.confidence)}`}>
                      {item.analysis.confidence}% confidence
                    </span>
                    <span className="text-cyber-gray-500">
                      Risk: {item.threat.riskScore}/100
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="cyber-card">
          <h4 className="text-lg font-semibold text-white mb-4">Detailed Analysis</h4>

          {selectedAnalysis ? (
            <div className="space-y-6">
              {/* Threat Overview */}
              <div className="bg-cyber-gray-200/30 rounded p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-white capitalize">
                    {selectedAnalysis.threat.type.replace('_', ' ')} Threat
                  </h5>
                  <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(selectedAnalysis.threat.severity)} bg-current/20`}>
                    {selectedAnalysis.threat.severity.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-cyber-gray-400 mb-4">
                  {selectedAnalysis.threat.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-cyber-gray-500">Confidence:</span>
                    <span className={`ml-2 font-medium ${getConfidenceColor(selectedAnalysis.analysis.confidence)}`}>
                      {selectedAnalysis.analysis.confidence}%
                    </span>
                  </div>
                  <div>
                    <span className="text-cyber-gray-500">Risk Score:</span>
                    <span className="ml-2 font-medium text-cyber-red-400">
                      {selectedAnalysis.threat.riskScore}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div>
                <h5 className="font-medium text-white mb-3">AI Analysis</h5>
                <div className="bg-cyber-blue-500/10 border border-cyber-blue-500/30 rounded p-4">
                  <p className="text-sm text-cyber-gray-400 mb-3">
                    {selectedAnalysis.analysis.reasoning}
                  </p>

                  <div className="mb-3">
                    <h6 className="text-xs font-medium text-cyber-blue-400 uppercase tracking-wide mb-2">
                      Detected Patterns
                    </h6>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnalysis.analysis.patterns.map((pattern, index) => (
                        <span
                          key={index}
                          className="text-xs bg-cyber-blue-500/20 text-cyber-blue-400 px-2 py-1 rounded"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="text-xs font-medium text-cyber-gray-400 uppercase tracking-wide mb-2">
                      Risk Assessment
                    </h6>
                    <p className="text-sm text-cyber-gray-400">
                      {selectedAnalysis.analysis.riskAssessment}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h5 className="font-medium text-white mb-3">Recommended Actions</h5>
                <div className="space-y-2">
                  {selectedAnalysis.analysis.mitigation.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-cyber-green-500/10 border border-cyber-green-500/30 rounded"
                    >
                      <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-cyber-gray-400">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predictions */}
              <div>
                <h5 className="font-medium text-white mb-3">AI Predictions</h5>
                <div className="bg-cyber-purple-500/10 border border-cyber-purple-500/30 rounded p-4">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div>
                      <span className="text-cyber-gray-500">Likelihood:</span>
                      <span className="ml-2 font-medium text-cyber-purple-400">
                        {Math.round(selectedAnalysis.predictions.likelihood)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-cyber-gray-500">Potential Impact:</span>
                      <span className="ml-2 font-medium text-cyber-red-400">
                        {selectedAnalysis.predictions.potentialImpact}
                      </span>
                    </div>
                    <div>
                      <span className="text-cyber-gray-500">Timeframe:</span>
                      <span className="ml-2 font-medium text-yellow-400">
                        {selectedAnalysis.predictions.timeframe}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ChartBarIcon className="h-12 w-12 text-cyber-gray-400 mx-auto mb-4" />
              <p className="text-cyber-gray-400">Select a threat to view detailed analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
