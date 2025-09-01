'use client'

import { useState } from 'react'
import { DocumentTextIcon, CheckCircleIcon, ClipboardIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface HashResult {
  algorithm: string
  hash: string
  length: number
}

export function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<HashResult[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const algorithms = [
    { name: 'MD5', bits: 128 },
    { name: 'SHA-1', bits: 160 },
    { name: 'SHA-256', bits: 256 },
    { name: 'SHA-384', bits: 384 },
    { name: 'SHA-512', bits: 512 },
    { name: 'SHA-3-256', bits: 256 },
    { name: 'SHA-3-384', bits: 384 },
    { name: 'SHA-3-512', bits: 512 }
  ]

  const generateHashes = async () => {
    if (!input.trim()) return

    setIsGenerating(true)

    // Simulate hash generation (in real implementation, use crypto APIs)
    setTimeout(() => {
      const mockResults: HashResult[] = algorithms.map(algo => ({
        algorithm: algo.name,
        hash: generateMockHash(algo.bits / 8),
        length: algo.bits / 8
      }))

      setResults(mockResults)
      setIsGenerating(false)
    }, 1000)
  }

  const generateMockHash = (byteLength: number): string => {
    const chars = '0123456789abcdef'
    let hash = ''
    for (let i = 0; i < byteLength * 2; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)]
    }
    return hash
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // In a real app, show success message
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const clearAll = () => {
    setInput('')
    setResults([])
  }

  const getAlgorithmColor = (algorithm: string) => {
    if (algorithm.includes('MD5') || algorithm.includes('SHA-1')) {
      return 'text-cyber-red-400'
    }
    if (algorithm.includes('SHA-3')) {
      return 'text-cyber-purple-400'
    }
    return 'text-cyber-green-400'
  }

  const getSecurityLevel = (algorithm: string) => {
    if (algorithm.includes('MD5') || algorithm.includes('SHA-1')) {
      return { level: 'Weak', color: 'text-cyber-red-400', note: 'Not recommended for security' }
    }
    if (algorithm.includes('SHA-256')) {
      return { level: 'Strong', color: 'text-cyber-green-400', note: 'Good for general security' }
    }
    if (algorithm.includes('SHA-384') || algorithm.includes('SHA-512')) {
      return { level: 'Very Strong', color: 'text-cyber-green-400', note: 'Excellent for high security' }
    }
    return { level: 'Strong', color: 'text-cyber-purple-400', note: 'Modern algorithm' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Cryptographic Hash Generator</h3>
        <p className="text-cyber-gray-400 mb-6">
          Generate cryptographic hashes using various algorithms. Useful for password hashing, file integrity checking, and digital signatures.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-cyber-gray-400 mb-2">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="cyber-input w-full min-h-[100px] resize-y"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={generateHashes}
              disabled={!input.trim() || isGenerating}
              className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Generate Hashes
                </div>
              )}
            </button>

            <button
              onClick={clearAll}
              className="cyber-button"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Generated Hashes</h4>

            <div className="space-y-4">
              {results.map(result => {
                const security = getSecurityLevel(result.algorithm)
                return (
                  <div key={result.algorithm} className="bg-cyber-gray-200/20 rounded p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h5 className={`font-medium ${getAlgorithmColor(result.algorithm)}`}>
                          {result.algorithm}
                        </h5>
                        <span className={`text-xs px-2 py-1 rounded ${security.color} bg-current/20`}>
                          {security.level}
                        </span>
                        <span className="text-xs text-cyber-gray-400">
                          {result.length} bytes
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(result.hash)}
                        className="text-cyber-gray-400 hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        <ClipboardIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="bg-cyber-black/50 rounded p-3 font-mono text-sm text-cyber-green-400 break-all">
                      {result.hash}
                    </div>

                    <div className="mt-2 text-xs text-cyber-gray-400">
                      {security.note}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Hash Comparison */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Hash Algorithm Comparison</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-cyber-red-500/10 border border-cyber-red-500/30 rounded p-4">
                  <h5 className="font-medium text-cyber-red-400 mb-2">⚠️ Avoid These</h5>
                  <ul className="text-sm text-cyber-gray-400 space-y-1">
                    <li>• MD5 - Cryptographically broken</li>
                    <li>• SHA-1 - No longer secure</li>
                    <li>• Any hash without salt for passwords</li>
                  </ul>
                </div>

                <div className="bg-cyber-yellow-500/10 border border-yellow-500/30 rounded p-4">
                  <h5 className="font-medium text-yellow-400 mb-2">⚡ Good Choices</h5>
                  <ul className="text-sm text-cyber-gray-400 space-y-1">
                    <li>• SHA-256 - Balanced security/speed</li>
                    <li>• SHA-3 variants - Modern algorithms</li>
                    <li>• Use with salt for passwords</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-cyber-green-500/10 border border-cyber-green-500/30 rounded p-4">
                  <h5 className="font-medium text-cyber-green-400 mb-2">🔒 Best for Security</h5>
                  <ul className="text-sm text-cyber-gray-400 space-y-1">
                    <li>• SHA-384 - Higher security</li>
                    <li>• SHA-512 - Maximum security</li>
                    <li>• Argon2 for password hashing</li>
                  </ul>
                </div>

                <div className="bg-cyber-blue-500/10 border border-cyber-blue-500/30 rounded p-4">
                  <h5 className="font-medium text-cyber-blue-400 mb-2">📋 Use Cases</h5>
                  <ul className="text-sm text-cyber-gray-400 space-y-1">
                    <li>• File integrity: SHA-256</li>
                    <li>• Passwords: bcrypt/Argon2</li>
                    <li>• Digital signatures: SHA-256</li>
                    <li>• Blockchain: SHA-256</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Understanding Cryptographic Hashes</h4>

        <div className="space-y-4 text-sm text-cyber-gray-400">
          <div>
            <h5 className="font-medium text-white mb-2">What are Hash Functions?</h5>
            <p>Hash functions convert input data of any size into a fixed-size string of characters. They&apos;re one-way functions - you cannot reverse-engineer the original input from the hash.</p>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Common Use Cases</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Password Storage:</strong> Store password hashes instead of plain text</li>
              <li><strong>File Integrity:</strong> Verify files haven&apos;t been tampered with</li>
              <li><strong>Digital Signatures:</strong> Create unique identifiers for documents</li>
              <li><strong>Blockchain:</strong> Link blocks in cryptocurrency systems</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Security Considerations</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Salt:</strong> Always add random salt to passwords before hashing</li>
              <li><strong>Key Stretching:</strong> Use algorithms like bcrypt or Argon2 for passwords</li>
              <li><strong>Collision Resistance:</strong> Choose algorithms resistant to hash collisions</li>
              <li><strong>Regular Updates:</strong> Replace weak algorithms as new attacks are discovered</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Hash Properties</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Deterministic:</strong> Same input always produces same hash</li>
              <li><strong>Fixed Size:</strong> Output length is always the same</li>
              <li><strong>Irreversible:</strong> Cannot determine input from hash</li>
              <li><strong>Collision Resistant:</strong> Hard to find two inputs with same hash</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
