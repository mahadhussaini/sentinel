'use client'

import { useState } from 'react'
import { WrenchScrewdriverIcon, LockClosedIcon, ShieldCheckIcon, ExclamationTriangleIcon, GlobeAltIcon, ServerIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { PasswordChecker } from '@/components/tools/PasswordChecker'
import { TwoFactorSimulator } from '@/components/tools/TwoFactorSimulator'
import { BreachChecker } from '@/components/tools/BreachChecker'
import { SSLChecker } from '@/components/tools/SSLChecker'
import { VPNMonitor } from '@/components/tools/VPNMonitor'
import { PortScanner } from '@/components/tools/PortScanner'
import { HashGenerator } from '@/components/tools/HashGenerator'

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<'password' | '2fa' | 'breach' | 'ssl' | 'vpn' | 'ports' | 'hash'>('password')

  const tools = [
    {
      id: 'password',
      name: 'Password Strength',
      description: 'Analyze and improve password security',
      icon: LockClosedIcon,
      color: 'cyber-green'
    },
    {
      id: '2fa',
      name: '2FA Simulator',
      description: 'Practice two-factor authentication',
      icon: ShieldCheckIcon,
      color: 'cyber-blue'
    },
    {
      id: 'breach',
      name: 'Breach Checker',
      description: 'Check for data breaches',
      icon: ExclamationTriangleIcon,
      color: 'cyber-red'
    },
    {
      id: 'ssl',
      name: 'SSL Certificate Checker',
      description: 'Verify SSL certificates and security',
      icon: GlobeAltIcon,
      color: 'cyber-purple'
    },
    {
      id: 'vpn',
      name: 'VPN Monitor',
      description: 'Monitor VPN connection and security',
      icon: ServerIcon,
      color: 'cyber-yellow'
    },
    {
      id: 'ports',
      name: 'Port Scanner',
      description: 'Scan for open ports and vulnerabilities',
      icon: KeyIcon,
      color: 'cyber-pink'
    },
    {
      id: 'hash',
      name: 'Hash Generator',
      description: 'Generate and verify cryptographic hashes',
      icon: DocumentTextIcon,
      color: 'cyber-indigo'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Toolkit</h1>
          <p className="text-cyber-gray-500 mt-1">
            Essential tools for maintaining cybersecurity
          </p>
        </div>
        <WrenchScrewdriverIcon className="h-8 w-8 text-cyber-green-500" />
      </div>

      {/* Tool Selection */}
      <div className="cyber-card">
        <div className="grid-responsive-1 gap-4">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 text-left ${
                activeTool === tool.id
                  ? 'border-cyber-green-500 bg-cyber-green-500/10'
                  : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
              }`}
            >
              <div className="flex items-center mb-3">
                <tool.icon className={`h-6 w-6 mr-3 ${
                  activeTool === tool.id ? 'text-cyber-green-500' : 'text-cyber-gray-400'
                }`} />
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
              </div>
              <p className="text-sm text-cyber-gray-400">{tool.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Tool */}
      <div className="min-h-[600px]">
        {activeTool === 'password' && <PasswordChecker />}
        {activeTool === '2fa' && <TwoFactorSimulator />}
        {activeTool === 'breach' && <BreachChecker />}
        {activeTool === 'ssl' && <SSLChecker />}
        {activeTool === 'vpn' && <VPNMonitor />}
        {activeTool === 'ports' && <PortScanner />}
        {activeTool === 'hash' && <HashGenerator />}
      </div>
    </div>
  )
}
