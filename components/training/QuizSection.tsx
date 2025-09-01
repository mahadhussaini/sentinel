'use client'

import { useState } from 'react'
import { TrophyIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which of the following is a common sign of a phishing email?',
    options: [
      'Email from a known contact',
      'Urgent request for personal information',
      'Newsletter from a legitimate company',
      'Password reset confirmation'
    ],
    correctAnswer: 1,
    explanation: 'Phishing emails often create urgency to make you act quickly without thinking. Legitimate companies rarely ask for sensitive information via email.',
    category: 'Phishing'
  },
  {
    id: '2',
    question: 'What should you do if you receive a suspicious email asking for your password?',
    options: [
      'Click the link to reset your password',
      'Reply with your password',
      'Contact the company directly using official contact information',
      'Ignore it and hope it goes away'
    ],
    correctAnswer: 2,
    explanation: 'Always verify suspicious requests by contacting the company through official channels, not by responding to the email or clicking links.',
    category: 'Response'
  },
  {
    id: '3',
    question: 'Which password is strongest?',
    options: [
      'password123',
      'MyDogName2023',
      'Tr0ub4dor&3',
      'abc'
    ],
    correctAnswer: 2,
    explanation: 'Strong passwords combine uppercase, lowercase, numbers, and special characters. They should be long and not based on dictionary words.',
    category: 'Passwords'
  },
  {
    id: '4',
    question: 'What is two-factor authentication (2FA)?',
    options: [
      'Using two different passwords',
      'A second layer of security beyond just a password',
      'Logging in from two devices',
      'Having two email accounts'
    ],
    correctAnswer: 1,
    explanation: '2FA adds an extra layer of security by requiring something you know (password) and something you have (like a phone or hardware key).',
    category: 'Authentication'
  },
  {
    id: '5',
    question: 'Which of these is an example of social engineering?',
    options: [
      'Installing antivirus software',
      'Pretending to be IT support to get someone\'s password',
      'Using a firewall',
      'Updating software regularly'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering involves manipulating people to gain confidential information or unauthorized access, rather than technical hacking.',
    category: 'Social Engineering'
  },
  {
    id: '6',
    question: 'What should you do if you suspect malware on your computer?',
    options: [
      'Click all suspicious links to investigate',
      'Disconnect from the internet and run a scan',
      'Share files with friends to check',
      'Delete all your files to be safe'
    ],
    correctAnswer: 1,
    explanation: 'Disconnecting from the internet prevents malware from communicating with attackers, and running a scan helps identify and remove the threat.',
    category: 'Malware'
  },
  {
    id: '7',
    question: 'Which is the most secure way to store passwords?',
    options: [
      'Write them on sticky notes',
      'Save them in a Word document',
      'Use a password manager',
      'Email them to yourself'
    ],
    correctAnswer: 2,
    explanation: 'Password managers encrypt and securely store your passwords, making them much safer than any other method.',
    category: 'Password Management'
  },
  {
    id: '8',
    question: 'What is a "zero-day" vulnerability?',
    options: [
      'A vulnerability discovered on day zero',
      'A vulnerability that takes zero days to fix',
      'A vulnerability unknown to the software vendor',
      'A vulnerability that affects zero users'
    ],
    correctAnswer: 2,
    explanation: 'Zero-day vulnerabilities are security flaws that are unknown to the software vendor and have no fix available yet.',
    category: 'Vulnerabilities'
  }
]

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [startTime] = useState(Date.now())

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers(new Array(quizQuestions.length).fill(null))
    setQuizCompleted(false)
    setTimeLeft(600)
  }

  const getScorePercentage = () => {
    return Math.round((score / quizQuestions.length) * 100)
  }

  const getScoreColor = () => {
    const percentage = getScorePercentage()
    if (percentage >= 80) return 'text-cyber-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-cyber-red-400'
  }

  const getGrade = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B'
    if (percentage >= 60) return 'C'
    if (percentage >= 50) return 'D'
    return 'F'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (quizCompleted) {
    return (
      <div className="space-y-6">
        {/* Completion Header */}
        <div className="cyber-card text-center">
          <TrophyIcon className="h-16 w-16 text-cyber-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
          <p className="text-cyber-gray-400 mb-6">Here&apos;s how you performed</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-cyber-gray-200/30 rounded p-6">
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {getScorePercentage()}%
              </div>
              <div className="text-cyber-gray-400">Score</div>
            </div>
            <div className="bg-cyber-gray-200/30 rounded p-6">
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {score}/{quizQuestions.length}
              </div>
              <div className="text-cyber-gray-400">Correct Answers</div>
            </div>
            <div className="bg-cyber-gray-200/30 rounded p-6">
              <div className="text-4xl font-bold text-cyber-yellow-400">
                {getGrade()}
              </div>
              <div className="text-cyber-gray-400">Grade</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="cyber-button"
            >
              Retake Quiz
            </button>
            <button className="cyber-button">
              View Detailed Results
            </button>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="cyber-card">
          <h4 className="text-lg font-semibold text-white mb-4">Performance by Category</h4>
          <div className="space-y-3">
            {['Phishing', 'Passwords', 'Authentication', 'Malware', 'Social Engineering', 'Response', 'Password Management', 'Vulnerabilities'].map(category => {
              const categoryQuestions = quizQuestions.filter(q => q.category === category)
              const categoryCorrect = categoryQuestions.filter(q =>
                answers[quizQuestions.indexOf(q)] === q.correctAnswer
              ).length

              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-cyber-gray-400">{category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">
                      {categoryCorrect}/{categoryQuestions.length}
                    </span>
                    <div className="w-20 bg-cyber-gray-200 rounded-full h-2">
                      <div
                        className="bg-cyber-green-500 h-2 rounded-full"
                        style={{ width: `${(categoryCorrect / categoryQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <TrophyIcon className="h-6 w-6 text-cyber-yellow-500 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Cybersecurity Knowledge Quiz</h3>
              <p className="text-sm text-cyber-gray-400">Test your security awareness and earn badges</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-cyber-gray-400">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-cyber-gray-400">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-cyber-gray-200 rounded-full h-2">
          <div
            className="bg-cyber-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="cyber-card">
        <div className="mb-6">
          <span className="text-xs text-cyber-gray-400 uppercase tracking-wide">
            {question.category}
          </span>
          <h4 className="text-lg font-medium text-white mt-2 mb-4">
            {question.question}
          </h4>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-cyber-green-500 bg-cyber-green-500/10'
                    : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
                } ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'border-cyber-green-500 bg-cyber-green-500/10'
                      : selectedAnswer === index
                      ? 'border-cyber-red-500 bg-cyber-red-500/10'
                      : ''
                    : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                    selectedAnswer === index
                      ? 'border-cyber-green-500 bg-cyber-green-500'
                      : 'border-cyber-gray-400'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    showResult && index === question.correctAnswer
                      ? 'text-cyber-green-400 font-medium'
                      : selectedAnswer === index && showResult && index !== question.correctAnswer
                      ? 'text-cyber-red-400'
                      : 'text-white'
                  }`}>
                    {option}
                  </span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircleIcon className="h-4 w-4 text-cyber-green-500 ml-auto" />
                  )}
                  {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircleIcon className="h-4 w-4 text-cyber-red-500 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="bg-cyber-blue-500/10 border border-cyber-blue-500/30 rounded p-4 mb-6">
            <h5 className="font-medium text-cyber-blue-400 mb-2">Explanation:</h5>
            <p className="text-sm text-cyber-gray-400">{question.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="text-sm text-cyber-gray-400">
            {answers.filter(answer => answer !== null).length} of {quizQuestions.length} answered
          </div>

          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="cyber-button"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Question Progress</h4>
        <div className="flex space-x-2">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded ${
                index < currentQuestion
                  ? answers[index] !== null
                    ? answers[index] === quizQuestions[index].correctAnswer
                      ? 'bg-cyber-green-500'
                      : 'bg-cyber-red-500'
                    : 'bg-cyber-gray-400'
                  : index === currentQuestion
                  ? 'bg-cyber-blue-500'
                  : 'bg-cyber-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-cyber-gray-400 mt-2">
          <span>Answered: {answers.filter(answer => answer !== null).length}</span>
          <span>Correct: {answers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length}</span>
        </div>
      </div>
    </div>
  )
}
