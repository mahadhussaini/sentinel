'use client'

import { BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export function UserGuide() {
  const guides = [
    {
      title: 'Getting Started',
      description: 'Complete guide to setting up DesAIgn for the first time',
      sections: ['Initial Setup', 'Profile Configuration', 'First Security Scan']
    },
    {
      title: 'Dashboard Overview',
      description: 'Understanding the main dashboard and its features',
      sections: ['Security Status', 'Threat Alerts', 'Activity Logs', 'Quick Stats']
    },
    {
      title: 'AI Assistant Usage',
      description: 'How to effectively use the AI security assistant',
      sections: ['Chat Interface', 'Security Queries', 'Recommendations', 'Voice Commands']
    },
    {
      title: 'Security Tools',
      description: 'Complete guide to all available security tools',
      sections: ['Password Checker', '2FA Simulator', 'Breach Checker', 'SSL Analyzer']
    },
    {
      title: 'Threat Detection',
      description: 'Understanding how DesAIgn detects and responds to threats',
      sections: ['Detection Methods', 'Alert Types', 'Response Actions', 'False Positives']
    },
    {
      title: 'Reports & Analytics',
      description: 'Generating and interpreting security reports',
      sections: ['Custom Reports', 'Analytics Dashboard', 'Export Options', 'Scheduled Reports']
    }
  ]

  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">User Guide & Documentation</h3>
        <p className="text-cyber-gray-400 mb-6">
          Comprehensive guides to help you master DesAIgn&apos;s features and maximize your security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="bg-cyber-gray-200/20 rounded p-6">
              <div className="flex items-center mb-3">
                <BookOpenIcon className="h-6 w-6 text-cyber-blue-400 mr-3" />
                <h4 className="text-lg font-semibold text-white">{guide.title}</h4>
              </div>

              <p className="text-cyber-gray-400 mb-4">{guide.description}</p>

              <div className="space-y-2 mb-4">
                {guide.sections.map((section, idx) => (
                  <div key={idx} className="flex items-center text-sm text-cyber-gray-500">
                    <ArrowRightIcon className="h-3 w-3 mr-2" />
                    {section}
                  </div>
                ))}
              </div>

              <button className="cyber-button w-full">
                Read Guide
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Quick Start Guide</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-cyber-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <div>
              <h5 className="font-medium text-white">Complete Your Profile</h5>
              <p className="text-sm text-cyber-gray-400">Set up your preferences and security settings</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-cyber-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div>
              <h5 className="font-medium text-white">Run Initial Security Scan</h5>
              <p className="text-sm text-cyber-gray-400">Check your current security posture</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-cyber-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div>
              <h5 className="font-medium text-white">Configure Notifications</h5>
              <p className="text-sm text-cyber-gray-400">Set up alerts for security events</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-cyber-green-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
            <div>
              <h5 className="font-medium text-white">Start Training</h5>
              <p className="text-sm text-cyber-gray-400">Learn to identify and respond to threats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
