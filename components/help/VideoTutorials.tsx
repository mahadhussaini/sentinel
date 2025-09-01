'use client'

import { PlayIcon, ClockIcon } from '@heroicons/react/24/outline'

export function VideoTutorials() {
  const videos = [
    {
      title: 'Getting Started with DesAIgn',
      duration: '5:30',
      description: 'Complete walkthrough of initial setup and configuration',
      thumbnail: '🎬',
      category: 'Getting Started'
    },
    {
      title: 'Understanding the Dashboard',
      duration: '8:15',
      description: 'Learn to interpret security metrics and alerts',
      thumbnail: '📊',
      category: 'Dashboard'
    },
    {
      title: 'Using the AI Assistant',
      duration: '6:45',
      description: 'Master the AI chat interface and security queries',
      thumbnail: '🤖',
      category: 'AI Assistant'
    },
    {
      title: 'Password Security Best Practices',
      duration: '7:20',
      description: 'Create and manage strong passwords effectively',
      thumbnail: '🔐',
      category: 'Security Tools'
    },
    {
      title: 'Phishing Detection Training',
      duration: '12:30',
      description: 'Learn to identify and avoid phishing attacks',
      thumbnail: '🎣',
      category: 'Training'
    },
    {
      title: 'Incident Response Workflow',
      duration: '10:45',
      description: 'Step-by-step guide to handling security incidents',
      thumbnail: '🚨',
      category: 'Response'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-6">Video Tutorials</h3>
        <p className="text-cyber-gray-400 mb-6">
          Learn DesAIgn features through our comprehensive video library.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-cyber-gray-200/20 rounded p-4">
              <div className="aspect-video bg-cyber-gray-300/20 rounded mb-3 flex items-center justify-center text-4xl">
                {video.thumbnail}
              </div>

              <h4 className="font-medium text-white mb-2">{video.title}</h4>
              <p className="text-sm text-cyber-gray-400 mb-3">{video.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-xs text-cyber-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
                <span className="text-xs text-cyber-gray-500 bg-cyber-gray-200/20 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>

              <button className="cyber-button w-full">
                <PlayIcon className="h-4 w-4 mr-2" />
                Watch Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Tutorial Series</h4>
        <div className="space-y-4">
          <div className="bg-cyber-gray-200/20 rounded p-4">
            <h5 className="font-medium text-white mb-2">Complete Security Training Series</h5>
            <p className="text-sm text-cyber-gray-400 mb-3">12 comprehensive videos covering all aspects of cybersecurity</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-cyber-gray-500">12 videos • 2.5 hours</span>
              <button className="cyber-button">
                Start Series
              </button>
            </div>
          </div>

          <div className="bg-cyber-gray-200/20 rounded p-4">
            <h5 className="font-medium text-white mb-2">Advanced Threat Hunting</h5>
            <p className="text-sm text-cyber-gray-400 mb-3">Learn advanced techniques for identifying sophisticated threats</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-cyber-gray-500">8 videos • 1.8 hours</span>
              <button className="cyber-button">
                Start Series
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
