"use client"

import { useEffect, useState } from "react"
import { GitHubPreview } from "@/components/github-preview"

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("")
  const [isDark, setIsDark] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 1 * 3600000)
      const timeString = utcTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setCurrentTime(timeString)
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Load theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
    }

    checkMobile()
    updateTime()

    // Modern fast load
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    const interval = setInterval(updateTime, 1000)
    window.addEventListener("resize", checkMobile)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleTheme = async () => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers without view transitions
      const newTheme = !isDark
      setIsDark(newTheme)
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      return
    }

    // Use View Transitions API
    const transition = document.startViewTransition(() => {
      const newTheme = !isDark
      setIsDark(newTheme)
      localStorage.setItem("theme", newTheme ? "dark" : "light")
    })

    // Wait for the transition to complete
    await transition.ready
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#171717] text-white"
          : "bg-gradient-to-br from-white via-white to-gray-50 text-gray-900"
      }`}
      style={{ viewTransitionName: "main-background" }}
    >
      {/* Desktop theme toggle */}
      <button
        onClick={toggleTheme}
        className={`hidden md:flex fixed top-6 right-6 p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark
            ? "text-gray-400 hover:text-gray-200 focus:ring-gray-500"
            : "text-gray-600 hover:text-gray-800 focus:ring-gray-400"
        }`}
        style={{ viewTransitionName: "theme-toggle-desktop" }}
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 relative">
          {isDark ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ viewTransitionName: "theme-icon" }}>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ viewTransitionName: "theme-icon" }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      </button>

      {/* Mobile theme toggle */}
      <button
        onClick={toggleTheme}
        className={`md:hidden fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 z-50 ${
          isDark
            ? "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500 shadow-black/20"
            : "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400 shadow-gray-900/10 border border-gray-200"
        }`}
        style={{ viewTransitionName: "theme-toggle-mobile" }}
        aria-label="Toggle theme"
      >
        <div className="w-6 h-6 relative">
          {isDark ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              style={{ viewTransitionName: "theme-icon-mobile" }}
            >
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              style={{ viewTransitionName: "theme-icon-mobile" }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      </button>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-6">
          {/* Main heading */}
          <div
            className={`mb-10 transition-all duration-800 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isLoaded ? "200ms" : "0ms" }}
          >
            <h1
              className={`text-2xl font-medium tracking-[-0.02em] leading-tight ${
                isDark ? "text-gray-50" : "text-gray-900"
              }`}
            >
              I craft digital experiences.
            </h1>
          </div>

          {/* Experience section */}
          <div
            className={`mb-8 transition-all duration-800 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isLoaded ? "400ms" : "0ms" }}
          >
            <p className={`text-[15px] leading-[1.6] font-normal ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              With extensive experience in{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-product-design" }}
              >
                TypeScript
              </span>{" "}
              and{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-frontend-dev" }}
              >
                React & Next.js
              </span>
              , I specialize in building scalable web applications, from Magento shops to modern SaaS platforms.
              Currently leading development on{" "}
              <a
                href="https://allyoucanlearn.nl"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-purple-400 hover:text-purple-300 decoration-purple-400/60"
                    : "text-purple-600 hover:text-purple-700 decoration-purple-600/60"
                }`}
              >
                All You Can Learn ↗
              </a>
              , a comprehensive LMS platform for Dutch MBO students and citizenship education.
            </p>
          </div>

          {/* Recent projects section */}
          <div
            className={`mb-8 transition-all duration-800 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isLoaded ? "600ms" : "0ms" }}
          >
            <p className={`text-[15px] leading-[1.6] font-normal ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Recently I've been building{" "}
              <GitHubPreview
                url="https://github.com/remcostoeten/nextjs-15-roll-your-own-authentication"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                screenshots={[
                  {
                    src: "/screenshots/login.png",
                    alt: "Authentication Login",
                    title: "Secure authentication with social login options",
                  },
                  {
                    src: "/screenshots/profile.png",
                    alt: "User Profile",
                    title: "User profile management and settings",
                  },
                  {
                    src: "/screenshots/dashboard.png",
                    alt: "Dashboard",
                    title: "Analytics dashboard with real-time monitoring",
                  },
                ]}
              >
                roll-your-own authentication ↗
              </GitHubPreview>{" "}
              and{" "}
              <GitHubPreview
                url="https://github.com/remcostoeten/Turso-db-creator-auto-retrieve-env-credentials"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                screenshots={[
                  {
                    src: "/screenshots/turso-demo.gif",
                    alt: "Turso CLI Demo",
                    title: "Automated Turso database creation and environment setup",
                  },
                ]}
              >
                Turso database automation ↗
              </GitHubPreview>{" "}
              . More projects and experiments can be found on{" "}
              <a
                href="https://github.com/remcostoeten"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                style={{ viewTransitionName: "link-behance" }}
              >
                GitHub ↗
              </a>{" "}
              .
            </p>
          </div>

          {/* Contact section */}
          <div
            className={`mb-8 transition-all duration-800 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isLoaded ? "800ms" : "0ms" }}
          >
            <p className={`text-[15px] leading-[1.6] font-normal ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Find me on{" "}
              <a
                href="https://github.com/remcostoeten"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                style={{ viewTransitionName: "link-x" }}
              >
                GitHub ↗
              </a>{" "}
              and{" "}
              <a
                href="https://linkedin.com/in/remco-stoeten"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                style={{ viewTransitionName: "link-github" }}
              >
                LinkedIn ↗
              </a>{" "}
              or contact me via{" "}
              <a
                href="mailto:remcostoeten@hotmail.com"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                style={{ viewTransitionName: "link-email" }}
              >
                Email ↗
              </a>{" "}
              or check out my{" "}
              <a
                href="https://remcostoeten.nl"
                className={`transition-colors duration-200 underline decoration-dotted underline-offset-[3px] font-medium ${
                  isDark
                    ? "text-green-400 hover:text-green-300 decoration-green-400/60"
                    : "text-green-600 hover:text-green-700 decoration-green-600/60"
                }`}
                style={{ viewTransitionName: "link-telegram" }}
              >
                website ↗
              </a>{" "}
              .
            </p>
          </div>

          {/* Timezone section */}
          <div
            className={`pb-20 md:pb-0 transition-all duration-800 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isLoaded ? "1000ms" : "0ms" }}
          >
            <p className={`text-[15px] leading-[1.6] font-normal ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              My current timezone is{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-utc" }}
              >
                CET
              </span>{" "}
              which includes countries like{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-ireland" }}
              >
                Netherlands
              </span>{" "}
              ,{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-morocco" }}
              >
                Germany
              </span>{" "}
              and{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-portugal" }}
              >
                France
              </span>{" "}
              . Right now it is{" "}
              <span
                className={`px-2.5 py-1 rounded font-mono text-[13px] font-medium tabular-nums transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm select-none ${isDark ? "bg-gray-800 text-white hover:bg-gray-750" : "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                style={{ viewTransitionName: "badge-time" }}
              >
                {currentTime}
              </span>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
