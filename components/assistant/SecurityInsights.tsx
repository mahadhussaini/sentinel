'use client'

import { useState, useEffect } from 'react'
import { LightBulbIcon, ArrowTrendingUpIcon, ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

interface Insight {
  id: string
  title: string
  description: string
  category: 'trend' | 'warning' | 'recommendation' | 'achievement'
  priority: 'high' | 'medium' | 'low'
  impact: 'critical' | 'high' | 'medium' | 'low'
  timestamp: Date
  actionable: boolean
  metrics?: {
    current: number
    previous: number
    trend: 'up' | 'down' | 'stable'
  }
}

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Phishing Attempts Increasing',
    description: 'Detected 40% more phishing attempts this week compared to last week. Most common vectors are email links and malicious attachments.',
    category: 'trend',
    priority: 'high',
    impact: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    actionable: true,
    metrics: {
      current: 24,
      previous: 17,
      trend: 'up'
    }
  },
  {
    id: '2',
    title: 'Password Security Improved',
    description: 'Great job! 85% of your accounts now use strong passwords. Continue monitoring weak passwords.',
    category: 'achievement',
    priority: 'medium',
    impact: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    actionable: false,
    metrics: {
      current: 85,
      previous: 72,
      trend: 'up'
    }
  },
  {
    id: '3',
    title: 'Unusual Network Traffic',
    description: 'High bandwidth usage detected from unknown IP ranges. Could indicate data exfiltration attempts.',
    category: 'warning',
    priority: 'high',
    impact: 'critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    actionable: true
  },
  {
    id: '4',
    title: 'Enable Multi-Factor Authentication',
    description: 'Only 3 out of 12 accounts have MFA enabled. Adding MFA significantly reduces unauthorized access risks.',
    category: 'recommendation',
    priority: 'high',
    impact: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    actionable: true,
    metrics: {
      current: 3,
      previous: 3,
      trend: 'stable'
    }
  },
  {
    id: '5',
    title: 'Software Updates Pending',
    description: '12 software applications have pending security updates. Outdated software is a common attack vector.',
    category: 'warning',
    priority: 'medium',
    impact: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    actionable: true,
    metrics: {
      current: 12,
      previous: 8,
      trend: 'up'
    }
  },
  {
    id: '6',
    title: 'Zero Trust Architecture Progress',
    description: 'Your organization has implemented 78% of zero trust principles. Continue with network segmentation.',
    category: 'achievement',
    priority: 'low',
    impact: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    actionable: false,
    metrics: {
      current: 78,
      previous: 65,
      trend: 'up'
    }
  }
]

export function SecurityInsights() {
  const [insights, setInsights] = useState<Insight[]>(mockInsights)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'trend' | 'warning' | 'recommendation' | 'achievement'>('all')

  const filteredInsights = insights.filter(insight => {
    const priorityMatch = filter === 'all' || insight.priority === filter
    const categoryMatch = categoryFilter === 'all' || insight.category === categoryFilter
    return priorityMatch && categoryMatch
  })

  const getCategoryIcon = (category: Insight['category']) => {
    switch (category) {
      case 'trend': return ArrowTrendingUpIcon
      case 'warning': return ExclamationTriangleIcon
      case 'recommendation': return LightBulbIcon
      case 'achievement': return ShieldCheckIcon
    }
  }

  const getCategoryColor = (category: Insight['category']) => {
    switch (category) {
      case 'trend': return 'text-cyber-blue-400'
      case 'warning': return 'text-cyber-red-400'
      case 'recommendation': return 'text-cyber-purple-400'
      case 'achievement': return 'text-cyber-green-400'
    }
  }

  const getPriorityColor = (priority: Insight['priority']) => {
    switch (priority) {
      case 'high': return 'text-cyber-red-400 bg-cyber-red-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'low': return 'text-cyber-blue-400 bg-cyber-blue-500/20'
    }
  }

  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'critical': return 'border-l-cyber-red-500'
      case 'high': return 'border-l-orange-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-cyber-blue-500'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  return (
    <div className="space-y-6">
      {/* Insights Header */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <LightBulbIcon className="h-6 w-6 text-cyber-yellow-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-white">Security Insights</h3>
              <p className="text-sm text-cyber-gray-400">AI-powered security analysis and recommendations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyber-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-cyber-green-500">Live Analysis</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-cyber-gray-400">Priority:</span>
            {(['all', 'high', 'medium', 'low'] as const).map(priority => (
              <button
                key={priority}
                onClick={() => setFilter(priority)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  filter === priority
                    ? 'bg-cyber-green-500 text-black'
                    : 'bg-cyber-gray-200 text-cyber-gray-400 hover:text-white'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-cyber-gray-400">Category:</span>
            {(['all', 'trend', 'warning', 'recommendation', 'achievement'] as const).map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  categoryFilter === category
                    ? 'bg-cyber-green-500 text-black'
                    : 'bg-cyber-gray-200 text-cyber-gray-400 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights.map(insight => {
          const CategoryIcon = getCategoryIcon(insight.category)

          return (
            <div
              key={insight.id}
              className={`cyber-card border-l-4 ${getImpactColor(insight.impact)} hover:bg-cyber-gray-200/20 transition-all duration-200`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <CategoryIcon className={`h-5 w-5 ${getCategoryColor(insight.category)} mr-2`} />
                  <span className={`text-xs px-2 py-1 rounded font-medium ${getPriorityColor(insight.priority)}`}>
                    {insight.priority.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-cyber-gray-500">
                  {formatTimeAgo(insight.timestamp)}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-white mb-2">{insight.title}</h4>

              {/* Description */}
              <p className="text-sm text-cyber-gray-400 mb-4">{insight.description}</p>

              {/* Metrics */}
              {insight.metrics && (
                <div className="bg-cyber-gray-200/20 rounded p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyber-gray-400">Current:</span>
                    <span className="text-white font-medium">{insight.metrics.current}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-cyber-gray-400">Previous:</span>
                    <span className="text-cyber-gray-500">{insight.metrics.previous}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-cyber-gray-400">Trend:</span>
                    <span className={`font-medium ${
                      insight.metrics.trend === 'up' ? 'text-cyber-green-400' :
                      insight.metrics.trend === 'down' ? 'text-cyber-red-400' :
                      'text-cyber-gray-400'
                    }`}>
                      {insight.metrics.trend === 'up' ? '↗' :
                       insight.metrics.trend === 'down' ? '↘' : '→'}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {insight.actionable && (
                <button className="w-full cyber-button text-sm">
                  Take Action
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Insights Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-red-400">
              {insights.filter(i => i.priority === 'high').length}
            </div>
            <div className="text-xs text-cyber-gray-400">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {insights.filter(i => i.category === 'warning').length}
            </div>
            <div className="text-xs text-cyber-gray-400">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-purple-400">
              {insights.filter(i => i.category === 'recommendation').length}
            </div>
            <div className="text-xs text-cyber-gray-400">Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-green-400">
              {insights.filter(i => i.category === 'achievement').length}
            </div>
            <div className="text-xs text-cyber-gray-400">Achievements</div>
          </div>
        </div>
      </div>
    </div>
  )
}
