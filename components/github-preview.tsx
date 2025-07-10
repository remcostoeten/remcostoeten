"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ExternalLink } from "lucide-react"
import { ThemedModal } from "./themed-modal"

interface GitHubRepo {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  homepage?: string
}

interface GitHubPreviewProps {
  url: string
  children: React.ReactNode
  className?: string
}

export function GitHubPreview({ url, children, className }: GitHubPreviewProps) {
  const [repo, setRepo] = useState<GitHubRepo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const extractRepoInfo = (githubUrl: string) => {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (match) {
      return { owner: match[1], repo: match[2] }
    }
    return null
  }

  const fetchRepoData = async () => {
    const repoInfo = extractRepoInfo(url)
    if (!repoInfo) {
      setError("Invalid GitHub URL")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`)
      if (!response.ok) {
        throw new Error("Repository not found")
      }
      const data = await response.json()
      setRepo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch repository")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMouseEnter = () => {
    if (!repo && !isLoading && !error) {
      fetchRepoData()
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
    if (!repo && !isLoading && !error) {
      fetchRepoData()
    }
  }


  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }
  if (!mounted) return null

  return (
    <>
      <span className={className} onMouseEnter={handleMouseEnter} onClick={handleClick} style={{ cursor: "pointer" }}>
        {children}
      </span>

      <ThemedModal open={isOpen} onOpenChange={handleOpenChange}>
        <div className="flex flex-col gap-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 m-0">{error}</p>
            </div>
          )}

          {repo && (
            <div className="flex flex-col gap-y-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {repo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {repo.description || "No description available"}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                {repo.language && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-x-1">
                  ⭐ {repo.stargazers_count}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-x-3 flex-wrap">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <ExternalLink size={16} />
                  View Repository
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </ThemedModal>
    </>
  )
}
