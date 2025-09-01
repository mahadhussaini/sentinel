'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is DesAIgn and how does it work?',
    answer: 'DesAIgn is an AI-powered cybersecurity monitoring and threat detection system. It uses advanced algorithms to analyze your digital environment, detect potential threats, and provide actionable security recommendations. The system monitors network traffic, user behavior, and system activities to identify anomalies and security risks.',
    category: 'General'
  },
  {
    question: 'How do I get started with DesAIgn?',
    answer: 'Getting started is easy! First, complete your profile in Settings, then run an initial security scan from the Dashboard. The AI Assistant can guide you through the setup process and answer any questions you have along the way.',
    category: 'Getting Started'
  },
  {
    question: 'What types of threats does DesAIgn detect?',
    answer: 'DesAIgn detects various threats including malware, phishing attempts, unusual network activity, brute force attacks, data exfiltration, and anomalous user behavior. The system uses machine learning to identify both known and unknown threats.',
    category: 'Security'
  },
  {
    question: 'How accurate is the AI threat detection?',
    answer: 'Our AI system achieves high accuracy through continuous learning and updates. The system uses multiple detection methods including signature-based detection, behavioral analysis, and anomaly detection. False positives are minimized through our advanced algorithms.',
    category: 'AI & Detection'
  },
  {
    question: 'Can I customize security alerts and notifications?',
    answer: 'Yes! You can customize notifications in the Settings page. Choose which types of alerts you want to receive, set notification preferences, and configure delivery methods (desktop, email, mobile).',
    category: 'Notifications'
  },
  {
    question: 'What should I do if DesAIgn detects a threat?',
    answer: 'If a threat is detected, follow the recommended actions provided by the system. For critical threats, immediately isolate affected systems, change passwords, and contact your security team. The AI Assistant can provide specific guidance based on the threat type.',
    category: 'Response'
  },
  {
    question: 'How do I use the security training modules?',
    answer: 'Navigate to the Training section to access interactive modules. Start with phishing detection, then move to malware analysis and social engineering. Each module includes simulations, quizzes, and educational content to improve your security awareness.',
    category: 'Training'
  },
  {
    question: 'Can DesAIgn protect against all cyber threats?',
    answer: 'While DesAIgn provides comprehensive protection, no system can guarantee 100% security. It significantly reduces risk by detecting threats early and providing actionable responses. Always combine automated tools with good security practices and regular training.',
    category: 'Security'
  },
  {
    question: 'How do I export security reports?',
    answer: 'Go to the Reports section and select the type of report you need. You can generate custom reports, export data in various formats (PDF, CSV, JSON), and schedule automatic report generation. All exports include detailed security metrics and recommendations.',
    category: 'Reports'
  },
  {
    question: 'What if I need help with a specific security issue?',
    answer: 'Use the AI Assistant for immediate help, or contact our support team through the Help section. You can also access our comprehensive documentation and video tutorials for detailed guidance on specific security topics.',
    category: 'Support'
  }
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-cyber-green-500 text-black'
                  : 'bg-cyber-gray-200 text-cyber-gray-400 hover:text-white hover:bg-cyber-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div key={index} className="cyber-card">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex-1">
                <h4 className="text-lg font-medium text-white mb-1">{faq.question}</h4>
                <span className="text-xs text-cyber-gray-400 bg-cyber-gray-200/20 px-2 py-1 rounded">
                  {faq.category}
                </span>
              </div>
              <div className="ml-4">
                {openItems.has(index) ? (
                  <ChevronUpIcon className="h-5 w-5 text-cyber-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-cyber-gray-400" />
                )}
              </div>
            </button>

            {openItems.has(index) && (
              <div className="px-4 pb-4 border-t border-cyber-gray-200">
                <div className="pt-4">
                  <p className="text-cyber-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="cyber-card">
        <div className="text-center py-8">
          <h4 className="text-lg font-semibold text-white mb-2">Still need help?</h4>
          <p className="text-cyber-gray-400 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="cyber-button">
              Contact Support
            </button>
            <button className="cyber-button">
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
