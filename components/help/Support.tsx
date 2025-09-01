'use client'

import { ChatBubbleLeftRightIcon, EnvelopeIcon, PhoneIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export function Support() {
  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Get Support</h3>
        <p className="text-cyber-gray-400 mb-6">
          Need help? Our support team is here to assist you with any questions or issues.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cyber-gray-200/20 rounded p-6">
            <div className="flex items-center mb-4">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-cyber-green-400 mr-3" />
              <h4 className="text-lg font-semibold text-white">AI Assistant</h4>
            </div>
            <p className="text-cyber-gray-400 mb-4">
              Get instant help from our AI assistant for common questions and issues.
            </p>
            <button className="cyber-button w-full">
              Ask AI Assistant
            </button>
          </div>

          <div className="bg-cyber-gray-200/20 rounded p-6">
            <div className="flex items-center mb-4">
              <EnvelopeIcon className="h-6 w-6 text-cyber-blue-400 mr-3" />
              <h4 className="text-lg font-semibold text-white">Email Support</h4>
            </div>
            <p className="text-cyber-gray-400 mb-4">
              Send us an email and we&apos;ll respond within 24 hours.
            </p>
            <div className="text-sm text-cyber-gray-500 mb-4">
              support@desaign-security.com
            </div>
            <button className="cyber-button w-full">
              Send Email
            </button>
          </div>

          <div className="bg-cyber-gray-200/20 rounded p-6">
            <div className="flex items-center mb-4">
              <PhoneIcon className="h-6 w-6 text-cyber-purple-400 mr-3" />
              <h4 className="text-lg font-semibold text-white">Phone Support</h4>
            </div>
            <p className="text-cyber-gray-400 mb-4">
              Speak directly with our security experts for urgent issues.
            </p>
            <div className="text-sm text-cyber-gray-500 mb-4">
              1-800-SECURE (Available 24/7)
            </div>
            <button className="cyber-button w-full">
              Call Now
            </button>
          </div>

          <div className="bg-cyber-gray-200/20 rounded p-6">
            <div className="flex items-center mb-4">
              <QuestionMarkCircleIcon className="h-6 w-6 text-cyber-red-400 mr-3" />
              <h4 className="text-lg font-semibold text-white">Live Chat</h4>
            </div>
            <p className="text-cyber-gray-400 mb-4">
              Chat with our support team in real-time for immediate assistance.
            </p>
            <div className="text-sm text-cyber-gray-500 mb-4">
              Average wait time: 2 minutes
            </div>
            <button className="cyber-button w-full">
              Start Chat
            </button>
          </div>
        </div>
      </div>

      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Emergency Support</h4>
        <div className="bg-cyber-red-500/10 border border-cyber-red-500/30 rounded p-6">
          <h5 className="font-medium text-cyber-red-400 mb-2">Security Incident?</h5>
          <p className="text-cyber-gray-400 mb-4">
            If you&apos;re experiencing an active security incident, contact our emergency response team immediately.
          </p>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <div className="font-medium text-white">Emergency Hotline</div>
              <div className="text-cyber-red-400">1-888-SECURITY (24/7)</div>
            </div>
            <button className="cyber-button-danger">
              Report Incident
            </button>
          </div>
        </div>
      </div>

      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Community Resources</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
            <div>
              <h5 className="font-medium text-white">Security Forums</h5>
              <p className="text-sm text-cyber-gray-400">Discuss security topics with other professionals</p>
            </div>
            <button className="cyber-button">
              Visit Forums
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
            <div>
              <h5 className="font-medium text-white">Knowledge Base</h5>
              <p className="text-sm text-cyber-gray-400">Browse our comprehensive security documentation</p>
            </div>
            <button className="cyber-button">
              Browse Articles
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-cyber-gray-200/20 rounded">
            <div>
              <h5 className="font-medium text-white">Training Webinars</h5>
              <p className="text-sm text-cyber-gray-400">Join live training sessions and workshops</p>
            </div>
            <button className="cyber-button">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
