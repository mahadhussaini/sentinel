export interface ThreatData {
  id: string
  type: 'phishing' | 'malware' | 'bruteforce' | 'anomaly' | 'data_exfiltration' | 'suspicious_login'
  source: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number // 0-100
  timestamp: Date
  description: string
  indicators: string[]
  recommendedActions: string[]
  riskScore: number // 0-100
}

export interface AIAnalysisResult {
  threat: ThreatData
  analysis: {
    confidence: number
    reasoning: string
    patterns: string[]
    riskAssessment: string
    mitigation: string[]
  }
  predictions: {
    likelihood: number
    potentialImpact: string
    timeframe: string
  }
}

class ThreatDetectionEngine {
  private threatPatterns = {
    phishing: [
      'suspicious_sender',
      'urgent_language',
      'link_mismatch',
      'attachment_unknown',
      'spelling_errors'
    ],
    malware: [
      'suspicious_file_extension',
      'large_file_size',
      'executable_content',
      'unknown_source',
      'behavior_anomaly'
    ],
    bruteforce: [
      'multiple_failed_attempts',
      'unusual_timing',
      'geographic_anomaly',
      'pattern_recognition'
    ],
    anomaly: [
      'unusual_traffic',
      'abnormal_behavior',
      'deviation_from_baseline',
      'unexpected_patterns'
    ]
  }

  private riskWeights = {
    severity: {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4
    },
    confidence: 1.5,
    frequency: 0.8,
    impact: 2.0
  }

  async analyzeLogEntry(logEntry: any): Promise<AIAnalysisResult | null> {
    // Simulate AI analysis delay
    await this.delay(Math.random() * 500 + 200)

    const threat = this.detectThreat(logEntry)
    if (!threat) return null

    const analysis = this.performAIAnalysis(threat)
    const predictions = this.generatePredictions(threat)

    return {
      threat,
      analysis,
      predictions
    }
  }

  private detectThreat(logEntry: any): ThreatData | null {
    const indicators = this.extractIndicators(logEntry)
    const threatType = this.classifyThreatType(indicators)
    const confidence = this.calculateConfidence(indicators)
    const severity = this.determineSeverity(indicators, confidence)
    const riskScore = this.calculateRiskScore(severity, confidence, indicators.length)

    if (confidence < 30) return null // Too low confidence to flag as threat

    return {
      id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: threatType,
      source: logEntry.source || 'unknown',
      severity,
      confidence,
      timestamp: new Date(),
      description: this.generateDescription(threatType, indicators),
      indicators,
      recommendedActions: this.getRecommendedActions(threatType, severity),
      riskScore
    }
  }

  private extractIndicators(logEntry: any): string[] {
    const indicators: string[] = []

    // Analyze login attempts
    if (logEntry.action === 'login_failed') {
      indicators.push('multiple_failed_attempts')
      if (logEntry.ip !== '192.168.1.100') indicators.push('geographic_anomaly')
    }

    // Analyze file access
    if (logEntry.action === 'file_access' && logEntry.details?.includes('confidential')) {
      indicators.push('suspicious_file_access')
    }

    // Analyze network traffic
    if (logEntry.action === 'network_traffic' && logEntry.size > 1000000) {
      indicators.push('large_data_transfer')
    }

    // Analyze email content
    if (logEntry.action === 'email_received') {
      if (logEntry.sender?.includes('unknown')) indicators.push('suspicious_sender')
      if (logEntry.subject?.includes('urgent')) indicators.push('urgent_language')
      if (logEntry.links?.length > 0) indicators.push('link_mismatch')
    }

    // Analyze system behavior
    if (logEntry.action === 'system_anomaly') {
      indicators.push('behavior_anomaly')
      indicators.push('deviation_from_baseline')
    }

    return indicators
  }

  private classifyThreatType(indicators: string[]): ThreatData['type'] {
    const phishingScore = indicators.filter(i =>
      this.threatPatterns.phishing.includes(i)
    ).length

    const malwareScore = indicators.filter(i =>
      this.threatPatterns.malware.includes(i)
    ).length

    const bruteforceScore = indicators.filter(i =>
      this.threatPatterns.bruteforce.includes(i)
    ).length

    const anomalyScore = indicators.filter(i =>
      this.threatPatterns.anomaly.includes(i)
    ).length

    const scores = {
      phishing: phishingScore,
      malware: malwareScore,
      bruteforce: bruteforceScore,
      anomaly: anomalyScore,
      suspicious_login: bruteforceScore,
      data_exfiltration: anomalyScore
    }

    const maxScore = Math.max(...Object.values(scores))
    const threatType = Object.keys(scores).find(key =>
      scores[key as keyof typeof scores] === maxScore
    ) as ThreatData['type']

    return threatType || 'anomaly'
  }

  private calculateConfidence(indicators: string[]): number {
    if (indicators.length === 0) return 0

    const baseConfidence = Math.min(indicators.length * 15, 60)
    const patternMatch = indicators.length > 2 ? 20 : 10
    const contextualBonus = Math.random() * 10

    return Math.min(baseConfidence + patternMatch + contextualBonus, 95)
  }

  private determineSeverity(indicators: string[], confidence: number): ThreatData['severity'] {
    const riskFactors = indicators.length + (confidence / 20)

    if (riskFactors >= 8) return 'critical'
    if (riskFactors >= 6) return 'high'
    if (riskFactors >= 4) return 'medium'
    return 'low'
  }

  private calculateRiskScore(severity: ThreatData['severity'], confidence: number, indicatorCount: number): number {
    const severityWeight = this.riskWeights.severity[severity]
    const confidenceWeight = confidence * this.riskWeights.confidence
    const frequencyWeight = indicatorCount * this.riskWeights.frequency
    const impactWeight = severity === 'critical' ? 100 : severity === 'high' ? 75 : severity === 'medium' ? 50 : 25

    const rawScore = (severityWeight * 10) + confidenceWeight + frequencyWeight + (impactWeight * this.riskWeights.impact)
    return Math.min(Math.round(rawScore / 4), 100)
  }

  private generateDescription(threatType: ThreatData['type'], indicators: string[]): string {
    const descriptions = {
      phishing: `Potential phishing attempt detected with indicators: ${indicators.join(', ')}`,
      malware: `Malicious software detected with suspicious indicators: ${indicators.join(', ')}`,
      bruteforce: `Brute force attack pattern identified with ${indicators.length} suspicious indicators`,
      anomaly: `Unusual system behavior detected: ${indicators.join(', ')}`,
      suspicious_login: `Suspicious login activity detected from unusual location/pattern`,
      data_exfiltration: `Potential data exfiltration attempt detected with large data transfers`
    }

    return descriptions[threatType] || 'Unknown threat pattern detected'
  }

  private getRecommendedActions(threatType: ThreatData['type'], severity: ThreatData['severity']): string[] {
    const baseActions = [
      'Monitor affected systems closely',
      'Review security logs for related activity',
      'Update security policies if necessary'
    ]

    const specificActions = {
      phishing: [
        'Block suspicious email domains',
        'Enable email filtering',
        'Educate users about phishing recognition'
      ],
      malware: [
        'Quarantine affected files',
        'Run full system scan',
        'Update antivirus signatures'
      ],
      bruteforce: [
        'Implement account lockout policies',
        'Enable multi-factor authentication',
        'Monitor for IP-based attacks'
      ],
      anomaly: [
        'Investigate system configuration changes',
        'Review user access patterns',
        'Update intrusion detection rules'
      ],
      suspicious_login: [
        'Verify user identity',
        'Review login history',
        'Implement geographic restrictions'
      ],
      data_exfiltration: [
        'Block suspicious network connections',
        'Implement data loss prevention',
        'Review data access policies'
      ]
    }

    const actions = [...(specificActions[threatType] || []), ...baseActions]
    return severity === 'critical' ? ['IMMEDIATE ACTION REQUIRED: ' + actions[0], ...actions.slice(1)] : actions
  }

  private performAIAnalysis(threat: ThreatData): AIAnalysisResult['analysis'] {
    const patterns = this.analyzePatterns(threat.indicators)
    const riskAssessment = this.assessRisk(threat)
    const mitigation = threat.recommendedActions

    return {
      confidence: threat.confidence,
      reasoning: `Analysis based on ${threat.indicators.length} indicators with ${threat.confidence}% confidence. Pattern matching shows ${patterns.length} suspicious behaviors.`,
      patterns,
      riskAssessment,
      mitigation
    }
  }

  private analyzePatterns(indicators: string[]): string[] {
    return indicators.map(indicator => {
      const descriptions = {
        'multiple_failed_attempts': 'Repeated authentication failures',
        'geographic_anomaly': 'Login from unusual geographic location',
        'suspicious_file_access': 'Access to sensitive files',
        'large_data_transfer': 'Unusually large data transmission',
        'suspicious_sender': 'Email from untrusted source',
        'urgent_language': 'Urgent or threatening language',
        'link_mismatch': 'Links not matching displayed text',
        'behavior_anomaly': 'Unexpected system behavior',
        'deviation_from_baseline': 'Activity outside normal patterns'
      }
      return descriptions[indicator as keyof typeof descriptions] || indicator
    })
  }

  private assessRisk(threat: ThreatData): string {
    const riskLevels = {
      critical: 'HIGH RISK: Immediate attention required. Potential compromise of critical systems.',
      high: 'ELEVATED RISK: Significant threat detected. Monitor closely and prepare response.',
      medium: 'MODERATE RISK: Potential security concern. Investigate and document.',
      low: 'LOW RISK: Minor anomaly detected. Log for trend analysis.'
    }

    return riskLevels[threat.severity]
  }

  private generatePredictions(threat: ThreatData): AIAnalysisResult['predictions'] {
    const likelihood = Math.min(threat.confidence + Math.random() * 20, 95)
    const impacts = {
      critical: 'Potential system compromise, data loss, or service disruption',
      high: 'Significant impact on operations or data security',
      medium: 'Moderate impact on system performance or security',
      low: 'Minimal impact, primarily informational'
    }

    const timeframes = {
      critical: 'Immediate (within hours)',
      high: 'Short-term (within 24 hours)',
      medium: 'Medium-term (within days)',
      low: 'Long-term monitoring required'
    }

    return {
      likelihood,
      potentialImpact: impacts[threat.severity],
      timeframe: timeframes[threat.severity]
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Public method to get real-time threat analysis
  async getRealtimeAnalysis(logStream: any[]): Promise<AIAnalysisResult[]> {
    const analyses: AIAnalysisResult[] = []

    for (const logEntry of logStream) {
      const analysis = await this.analyzeLogEntry(logEntry)
      if (analysis) {
        analyses.push(analysis)
      }
    }

    return analyses
  }
}

export const threatEngine = new ThreatDetectionEngine()
