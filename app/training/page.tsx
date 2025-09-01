'use client'

import { useState } from 'react'
import { BookOpenIcon, ShieldExclamationIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { PhishingSimulation } from '@/components/training/PhishingSimulation'
import { MalwareSimulation } from '@/components/training/MalwareSimulation'
import { SocialEngineeringSimulation } from '@/components/training/SocialEngineeringSimulation'
import { QuizSection } from '@/components/training/QuizSection'

function TrainingModuleRenderer({ activeModule }: { activeModule: 'phishing' | 'malware' | 'social' | 'quiz' }) {
  switch (activeModule) {
    case 'phishing':
      return <PhishingSimulation />
    case 'malware':
      return <MalwareSimulation />
    case 'social':
      return <SocialEngineeringSimulation />
    case 'quiz':
      return <QuizSection />
    default:
      return <PhishingSimulation />
  }
}

export default function TrainingPage() {
  const [activeTraining, setActiveTraining] = useState<'phishing' | 'malware' | 'social' | 'quiz'>('phishing')

  const trainingModules = [
    {
      id: 'phishing',
      name: 'Phishing Attacks',
      description: 'Learn to identify and avoid phishing attempts',
      icon: ShieldExclamationIcon,
      color: 'cyber-red',
      difficulty: 'Beginner',
      duration: '15 mins'
    },
    {
      id: 'malware',
      name: 'Malware Defense',
      description: 'Understand different types of malware and protection strategies',
      icon: ShieldExclamationIcon,
      color: 'cyber-purple',
      difficulty: 'Intermediate',
      duration: '20 mins'
    },
    {
      id: 'social',
      name: 'Social Engineering',
      description: 'Master the art of recognizing social engineering tactics',
      icon: UserGroupIcon,
      color: 'cyber-blue',
      difficulty: 'Advanced',
      duration: '25 mins'
    },
    {
      id: 'quiz',
      name: 'Security Quiz',
      description: 'Test your cybersecurity knowledge and earn badges',
      icon: TrophyIcon,
      color: 'cyber-green',
      difficulty: 'All Levels',
      duration: '10 mins'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Cybersecurity Training</h1>
          <p className="text-cyber-gray-500 mt-1">
            Interactive simulations and educational content to improve your security awareness
          </p>
        </div>
        <BookOpenIcon className="h-8 w-8 text-cyber-green-500" />
      </div>

      {/* Progress Overview */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
            <div className="text-2xl font-bold text-cyber-green-400">3</div>
            <div className="text-xs text-cyber-gray-400">Modules Completed</div>
          </div>
          <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
            <div className="text-2xl font-bold text-cyber-blue-400">85%</div>
            <div className="text-xs text-cyber-gray-400">Average Score</div>
          </div>
          <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
            <div className="text-2xl font-bold text-cyber-purple-400">12</div>
            <div className="text-xs text-cyber-gray-400">Badges Earned</div>
          </div>
          <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
            <div className="text-2xl font-bold text-cyber-yellow-400">2.5h</div>
            <div className="text-xs text-cyber-gray-400">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Module Selection */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Training Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainingModules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveTraining(module.id as any)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                activeTraining === module.id
                  ? 'border-cyber-green-500 bg-cyber-green-500/10'
                  : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
              }`}
            >
              <div className="flex items-center mb-3">
                <module.icon className={`h-6 w-6 mr-3 ${
                  activeTraining === module.id ? 'text-cyber-green-500' : 'text-cyber-gray-400'
                }`} />
                <div>
                  <h4 className="font-medium text-white">{module.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    module.difficulty === 'Beginner' ? 'bg-cyber-green-500/20 text-cyber-green-400' :
                    module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    module.difficulty === 'Advanced' ? 'bg-cyber-red-500/20 text-cyber-red-400' :
                    'bg-cyber-blue-500/20 text-cyber-blue-400'
                  }`}>
                    {module.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-sm text-cyber-gray-400 mb-2">{module.description}</p>
              <div className="text-xs text-cyber-gray-500">
                Duration: {module.duration}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Training Module */}
      <div className="min-h-[600px]">
        <TrainingModuleRenderer activeModule={activeTraining} />
      </div>
    </div>
  )
}
