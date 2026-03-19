import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Twitter, Send, Github, ExternalLink, ChevronDown, Sparkles, Shield, Coins, Users, Sword, TrendingUp, Lock, FileText } from 'lucide-react'

const docNavItems = [
  { id: 'intro', label: '项目简介', icon: Sparkles },
  { id: 'getting-started', label: '快速开始', icon: Sparkles },
  { id: 'core', label: '核心NFT', icon: Shield },
  { id: 'casting', label: '卜卦', icon: Sparkles },
  { id: 'jackpot', label: '奖池', icon: Coins },
  { id: 'spirit', label: '签灵 Agent', icon: Users },
  { id: 'battle', label: 'PVP战斗', icon: Sword },
  { id: 'prediction', label: '预测市场', icon: TrendingUp },
  { id: 'refinery', label: '精炼', icon: Coins },
  { id: 'staking', label: '质押', icon: Lock },
  { id: 'token', label: '代币', icon: Coins },
  { id: 'community', label: '社区文章', icon: FileText },
  { id: 'official', label: '官推 Blog', icon: FileText },
]

const navLinks = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/docs', hasDropdown: true },
  { label: '预测市场', href: 'https://yc.qlwy.xyz/' },
  { label: 'NFT市场', href: 'https://element.market/collections/qlwy-fortune' },
]

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [twitterDropdownOpen, setTwitterDropdownOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const twitterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  const handleSectionClick = (sectionId: string) => {
    navigate(`/docs?section=${sectionId}`)
    setDropdownOpen(false)
  }

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const startCloseTimer = () => {
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 150)
  }

  const clearTwitterTimer = () => {
    if (twitterTimerRef.current) {
      clearTimeout(twitterTimerRef.current)
      twitterTimerRef.current = null
    }
  }

  const startTwitterTimer = () => {
    twitterTimerRef.current = setTimeout(() => {
      setTwitterDropdownOpen(false)
    }, 150)
  }

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div
        className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full px-6 py-3"
        style={{ background: 'rgba(245, 243, 235, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(196, 154, 108, 0.3)' }}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="潜龙勿用" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex justify-center">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('http')
              return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => {
                  clearCloseTimer()
                  link.hasDropdown && setDropdownOpen(true)
                }}
                onMouseLeave={() => {
                  link.hasDropdown && startCloseTimer()
                }}
              >
                {link.hasDropdown ? (
                  <button
                    onClick={() => navigate(link.href)}
                    className="relative font-body text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1 group"
                    style={{ color: '#333333' }}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      style={{ color: '#C49A6C' }}
                    />
                    <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#C49A6C] transition-all duration-300 ${dropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>
                ) : isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative font-body text-sm font-medium transition-all duration-200 hover:scale-105 group"
                    style={{ color: '#333333' }}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#C49A6C] transition-all duration-300 group-hover:w-full" />
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="relative font-body text-sm font-medium transition-all duration-200 hover:scale-105 group"
                    style={{ color: '#333333' }}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#C49A6C] transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}

                {/* Dropdown */}
                {link.hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-2xl py-2 overflow-hidden transition-all duration-200 ${
                      dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    style={{
                      background: 'rgba(245, 243, 235, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(196, 154, 108, 0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    }}
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={startCloseTimer}
                  >
                    <div className="px-3 py-2 mb-1">
                      <span className="text-xs font-medium" style={{ color: '#C49A6C' }}>文档目录</span>
                    </div>
                    {docNavItems.filter(item => !['community', 'official'].includes(item.id)).map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSectionClick(item.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-all hover:bg-[rgba(196,154,108,0.1)]"
                          style={{ color: '#333333' }}
                        >
                          <Icon className="w-4 h-4 shrink-0" style={{ color: '#C49A6C' }} />
                          {item.label}
                        </button>
                      )
                    })}
                    <div
                      className="mx-3 my-2"
                      style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}
                    />
                    <div className="px-3 py-2 mb-1">
                      <span className="text-xs font-medium" style={{ color: '#C49A6C' }}>社区</span>
                    </div>
                    {docNavItems.filter(item => ['community', 'official'].includes(item.id)).map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSectionClick(item.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-all hover:bg-[rgba(196,154,108,0.1)]"
                          style={{ color: '#333333' }}
                        >
                          <Icon className="w-4 h-4 shrink-0" style={{ color: '#C49A6C' }} />
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
              )
            })}

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-4 pl-4" style={{ borderLeft: '1px solid rgba(196, 154, 108, 0.3)' }}>
              {/* Twitter Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  clearTwitterTimer()
                  setTwitterDropdownOpen(true)
                }}
                onMouseLeave={startTwitterTimer}
              >
                <a
                  href="https://x.com/wwwqlwyxyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded-full transition-all hover:scale-110"
                  style={{ background: 'rgba(196, 154, 108, 0.1)' }}
                  title="推特"
                >
                  <Twitter className="w-4 h-4" style={{ color: '#C49A6C' }} />
                </a>
                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 mt-2 w-36 rounded-xl py-2 overflow-hidden transition-all duration-200 ${
                    twitterDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  style={{
                    background: 'rgba(245, 243, 235, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  <a
                    href="https://x.com/wwwqlwyxyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-left transition-all hover:bg-[rgba(196,154,108,0.1)]"
                    style={{ color: '#333333' }}
                  >
                    <Twitter className="w-4 h-4 shrink-0" style={{ color: '#C49A6C' }} />
                    官推
                  </a>
                  <a
                    href="https://x.com/drag0ooon?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-left transition-all hover:bg-[rgba(196,154,108,0.1)]"
                    style={{ color: '#333333' }}
                  >
                    <Twitter className="w-4 h-4 shrink-0" style={{ color: '#C49A6C' }} />
                    开发者
                  </a>
                </div>
              </div>
              <a href="https://t.me/qlwyxyz" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                <Send className="w-4 h-4" style={{ color: '#C49A6C' }} />
              </a>
              <a href="https://github.com/qlwy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                <Github className="w-4 h-4" style={{ color: '#C49A6C' }} />
              </a>
              <a href="https://four.meme/qlwy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                <ExternalLink className="w-4 h-4" style={{ color: '#C49A6C' }} />
              </a>
            </div>
          </div>
        </div>

        <a
          href="https://www.qlwy.xyz/fortune"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:scale-105"
          style={{ background: '#C49A6C', color: '#F5F3EB' }}
        >
          立即开始
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </nav>
  )
}
