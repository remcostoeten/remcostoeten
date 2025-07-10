"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, ExternalLink, ChevronLeft, ChevronRight, Info, ImageIcon } from "lucide-react"

interface GitHubRepo {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  homepage?: string
}

interface Screenshot {
  src: string
  alt: string
  title: string
}

interface GitHubPreviewProps {
  url: string
  children: React.ReactNode
  className?: string
  screenshots?: Screenshot[]
}

export function GitHubPreview({ url, children, className, screenshots = [] }: GitHubPreviewProps) {
  const [repo, setRepo] = useState<GitHubRepo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<"info" | "screenshots">("info")
  const [mounted, setMounted] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Default screenshots
  const defaultScreenshots: Screenshot[] = [
    {
      src: "/screenshots/dashboard.png",
      alt: "Dashboard",
      title: "Analytics Dashboard",
    },
    {
      src: "/screenshots/profile.png",
      alt: "Profile",
      title: "User Profile",
    },
    {
      src: "/screenshots/login.png",
      alt: "Authentication",
      title: "Login System",
    },
  ]

  const allScreenshots = screenshots.length > 0 ? screenshots : defaultScreenshots

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "15px" // Prevent layout shift
    } else {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        setIsOpen(false)
      } else if (activeTab === "screenshots") {
        if (e.key === "ArrowLeft") {
          handlePrevSlide()
        } else if (e.key === "ArrowRight") {
          handleNextSlide()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, activeTab])

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

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allScreenshots.length)
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNextSlide()
    } else if (isRightSwipe) {
      handlePrevSlide()
    }
  }

  const closeModal = () => {
    setIsOpen(false)
    setActiveTab("info")
  }

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        backgroundColor: "rgba(0, 0, 0, 0.95)", // Darker backdrop
        backdropFilter: "blur(8px)", // More blur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={closeModal}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          maxWidth: "90vw", // Much wider
          width: "100%",
          maxHeight: "90vh", // Much taller
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          animation: "slideIn 0.3s ease-out",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #f1f5f9",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Tab buttons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setActiveTab("info")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: activeTab === "info" ? "#f1f5f9" : "transparent",
                color: activeTab === "info" ? "#0f172a" : "#64748b",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.15s ease",
              }}
            >
              <Info size={16} />
              Info
            </button>
            <button
              onClick={() => setActiveTab("screenshots")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: activeTab === "screenshots" ? "#f1f5f9" : "transparent",
                color: activeTab === "screenshots" ? "#0f172a" : "#64748b",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.15s ease",
              }}
            >
              <ImageIcon size={16} />
              Screenshots
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#64748b",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9"
              e.currentTarget.style.color = "#0f172a"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#64748b"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            maxHeight: "calc(90vh - 80px)",
            overflowY: "auto",
          }}
        >
          {/* Info Tab */}
          {activeTab === "info" && (
            <div>
              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "3rem 0",
                  }}
                >
                  <div
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      border: "2px solid #e2e8f0",
                      borderTop: "2px solid #3b82f6",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
              )}

              {error && (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <p style={{ color: "#64748b", margin: 0 }}>{error}</p>
                </div>
              )}

              {repo && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* Title */}
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {repo.name}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        lineHeight: "1.6",
                        margin: 0,
                        fontSize: "0.95rem",
                      }}
                    >
                      {repo.description || "No description available"}
                    </p>
                  </div>

                  {/* Simple stats */}
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", color: "#64748b" }}>
                    {repo.language && (
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          backgroundColor: "#f1f5f9",
                          borderRadius: "1rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "#475569",
                        }}
                      >
                        {repo.language}
                      </span>
                    )}
                    <span>⭐ {repo.stargazers_count}</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1.25rem",
                        backgroundColor: "#0f172a",
                        color: "white",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1e293b"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#0f172a"
                      }}
                    >
                      <ExternalLink size={16} />
                      View Repository
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.75rem 1.25rem",
                          border: "1px solid #e2e8f0",
                          color: "#475569",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f8fafc"
                          e.currentTarget.style.borderColor = "#cbd5e1"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                          e.currentTarget.style.borderColor = "#e2e8f0"
                        }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Screenshots Tab */}
          {activeTab === "screenshots" && (
            <div>
              <div
                style={{
                  position: "relative",
                  height: window.innerWidth > 768 ? "70vh" : "50vh", // Responsive height
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    overflow: "hidden",
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {allScreenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        transform: `translateX(${(index - currentSlide) * 100}%)`,
                        transition: "transform 0.4s ease-out",
                      }}
                    >
                      <img
                        src={screenshot.src || "/placeholder.svg"}
                        alt={screenshot.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                        crossOrigin="anonymous"
                      />
                    </div>
                  ))}

                  {/* Navigation arrows */}
                  {allScreenshots.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevSlide}
                        style={{
                          position: "absolute",
                          left: "0.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          padding: "0.5rem",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          color: "#475569",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.15s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={handleNextSlide}
                        style={{
                          position: "absolute",
                          right: "0.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          padding: "0.5rem",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          color: "#475569",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.15s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Slide indicators */}
                {allScreenshots.length > 1 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: "0.375rem",
                    }}
                  >
                    {allScreenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                          width: index === currentSlide ? "1.25rem" : "0.375rem",
                          height: "0.375rem",
                          borderRadius: "0.1875rem",
                          backgroundColor: index === currentSlide ? "white" : "rgba(255, 255, 255, 0.6)",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Screenshot title */}
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
                  {allScreenshots[currentSlide]?.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
      `}</style>
    </div>
  )

  if (!mounted) return null

  return (
    <>
      <span className={className} onMouseEnter={handleMouseEnter} onClick={handleClick} style={{ cursor: "pointer" }}>
        {children}
      </span>

      {/* Portal-rendered modal */}
      {isOpen && createPortal(modalContent, document.body)}
    </>
  )
}
