import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Twitter, Send, Github, ChevronDown, Shield, Users, Sword, TrendingUp, Lock, FileText, Menu, X, BarChart3, Compass, LogIn, Trophy, Scale, FlaskConical } from 'lucide-react'

const docNavItems = [
  { id: 'overview', label: '项目定位', icon: Compass },
  { id: 'entry', label: '入口机制', icon: LogIn },
  { id: 'assets', label: '资产层与稀有度', icon: Shield },
  { id: 'jackpot', label: '奖池机制', icon: Trophy },
  { id: 'spirit', label: '签灵', icon: Users },
  { id: 'battle', label: '对战系统', icon: Sword },
  { id: 'prediction', label: '预测市场', icon: TrendingUp },
  { id: 'governance', label: '仲裁与治理', icon: Scale },
  { id: 'refinery', label: '精炼系统', icon: FlaskConical },
  { id: 'token', label: '代币与质押', icon: Lock },
  { id: 'architecture', label: '技术架构', icon: BarChart3 },
  { id: 'community', label: '社区文章', icon: Twitter },
  { id: 'official', label: '官方机制文章', icon: FileText },
]

const navLinks = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/docs', hasDropdown: true },
  { label: '预测市场', href: 'https://yc.qlwy.xyz/' },
  { label: 'NFT市场', href: 'https://element.market/collections/qlwy-fortune' },
]

const mobileQuickLinks = [
  { label: '卜卦', href: 'https://www.qlwy.xyz/fortune' },
  { label: '奖池', href: 'https://www.qlwy.xyz/jackpot' },
  { label: '对战', href: 'https://www.qlwy.xyz/battle' },
  { label: '签灵', href: 'https://www.qlwy.xyz/spirit' },
  { label: '质押', href: 'https://www.qlwy.xyz/staking' },
  { label: '白皮书', href: '/whitepaper' },
]

const socialLinks = [
  { label: '官推', href: 'https://x.com/wwwqlwyxyz', icon: Twitter },
  { label: 'Telegram', href: 'https://t.me/qlwyxyz', icon: Send },
  { label: 'GitHub', href: 'https://github.com/qlwy-xyz', icon: Github },
]

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [twitterDropdownOpen, setTwitterDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const twitterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileMenuOpen])

  const handleSectionClick = (sectionId: string) => {
    navigate(`/docs?section=${sectionId}`)
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
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
      <div className="mx-auto max-w-7xl">
        <div
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full px-4 py-3 sm:px-6"
          style={{ background: 'rgba(245, 243, 235, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(196, 154, 108, 0.3)' }}
        >
          <Link to="/" className="flex items-center gap-2" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}>
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
                        onClick={() => { navigate(link.href); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                        className="classical-nav-link relative flex items-center gap-1 text-sm transition-all duration-200 hover:scale-105 group"
                        style={{ color: '#333333' }}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                          style={{ color: '#C49A6C' }}
                        />
                        <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#C49A6C] transition-all duration-300 ${dropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      </button>
                    ) : isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="classical-nav-link relative text-sm transition-all duration-200 hover:scale-105 group"
                        style={{ color: '#333333' }}
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#C49A6C] transition-all duration-300 group-hover:w-full" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="classical-nav-link relative text-sm transition-all duration-200 hover:scale-105 group"
                        style={{ color: '#333333' }}
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#C49A6C] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    )}

                    {link.hasDropdown && (
                      <div
                        className={`absolute top-full left-0 mt-2 w-48 overflow-hidden rounded-2xl py-2 transition-all duration-200 ${
                          dropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
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
                        <div className="mb-1 px-3 py-2">
                          <span className="classical-nav-subtle text-xs" style={{ color: '#C49A6C' }}>文档目录</span>
                        </div>
                        {docNavItems.filter(item => !['community', 'official'].includes(item.id)).map((item) => {
                          const Icon = item.icon
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSectionClick(item.id)}
                              className="classical-nav-link flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-all hover:bg-[rgba(196,154,108,0.1)]"
                              style={{ color: '#333333' }}
                            >
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#C49A6C' }} />
                              {item.label}
                            </button>
                          )
                        })}
                        <div
                          className="mx-3 my-2"
                          style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}
                        />
                        <div className="mb-1 px-3 py-2">
                          <span className="classical-nav-subtle text-xs" style={{ color: '#C49A6C' }}>社区</span>
                        </div>
                        {docNavItems.filter(item => ['community', 'official'].includes(item.id)).map((item) => {
                          const Icon = item.icon
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSectionClick(item.id)}
                              className="classical-nav-link flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-all hover:bg-[rgba(196,154,108,0.1)]"
                              style={{ color: '#333333' }}
                            >
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#C49A6C' }} />
                              {item.label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="ml-4 flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid rgba(196, 154, 108, 0.3)' }}>
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
                    className="block rounded-full p-2 transition-all hover:scale-110"
                    style={{ background: 'rgba(196, 154, 108, 0.1)' }}
                    title="推特"
                  >
                    <Twitter className="h-4 w-4" style={{ color: '#C49A6C' }} />
                  </a>
                  <div
                    className={`absolute top-full left-0 mt-2 w-36 overflow-hidden rounded-xl py-2 transition-all duration-200 ${
                      twitterDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'
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
                      className="classical-nav-link flex items-center gap-3 px-3 py-2 text-left text-sm transition-all hover:bg-[rgba(196,154,108,0.1)]"
                      style={{ color: '#333333' }}
                    >
                      <Twitter className="h-4 w-4 shrink-0" style={{ color: '#C49A6C' }} />
                      官推
                    </a>
                    <a
                      href="https://x.com/drag0ooon?s=21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="classical-nav-link flex items-center gap-3 px-3 py-2 text-left text-sm transition-all hover:bg-[rgba(196,154,108,0.1)]"
                      style={{ color: '#333333' }}
                    >
                      <Twitter className="h-4 w-4 shrink-0" style={{ color: '#C49A6C' }} />
                      开发者
                    </a>
                  </div>
                </div>
                <a href="https://t.me/qlwyxyz" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                  <Send className="h-4 w-4" style={{ color: '#C49A6C' }} />
                </a>
                <a href="https://github.com/qlwy-xyz" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                  <Github className="h-4 w-4" style={{ color: '#C49A6C' }} />
                </a>
                <a href="https://four.meme/zh-TW/token/0x2e591b13d3caf27adf1db47d75278315d0754444" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                  <img src="/images/four.svg" alt="Four.meme" className="h-4 w-4" />
                </a>
                <a href="https://docs.bnbchain.org/bnb-smart-chain/" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }} title="BNB Chain Docs">
                  <img src="/images/bnb.svg" alt="BNB Chain" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-self-end gap-3">
            <a
              href="https://www.qlwy.xyz/fortune"
              target="_blank"
              rel="noopener noreferrer"
              className="classical-nav-link hidden items-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all hover:scale-105 md:inline-flex"
              style={{ background: '#C49A6C', color: '#F5F3EB' }}
            >
              立即开始
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
              style={{ background: 'rgba(196, 154, 108, 0.12)', color: '#C49A6C', border: '1px solid rgba(196, 154, 108, 0.24)' }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mt-3 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-[28px] p-4 md:hidden"
              style={{
                background: 'rgba(245, 243, 235, 0.98)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(196, 154, 108, 0.3)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              }}
            >
              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const isExternal = link.href.startsWith('http')
                  const classes = 'classical-nav-link flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-[rgba(196,154,108,0.08)]'

                  if (link.hasDropdown) {
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                        className={classes}
                        style={{ color: '#333333' }}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="h-4 w-4 rotate-[-90deg]" style={{ color: '#C49A6C' }} />
                      </Link>
                    )
                  }

                  return isExternal ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                      className={classes}
                      style={{ color: '#333333' }}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4" style={{ color: '#C49A6C' }} />
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                      className={classes}
                      style={{ color: '#333333' }}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4" style={{ color: '#C49A6C' }} />
                    </Link>
                  )
                })}
              </div>

              <div
                className="mt-4 rounded-[24px] p-4"
                style={{ background: 'rgba(196, 154, 108, 0.08)', border: '1px solid rgba(196, 154, 108, 0.18)' }}
              >
                <p className="classical-nav-subtle mb-3 text-xs" style={{ color: '#C49A6C' }}>
                  常用入口
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {mobileQuickLinks.map((link) => {
                    const isExternal = link.href.startsWith('http')

                    return isExternal ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                        className="classical-nav-link rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-white/40"
                        style={{ color: '#333333', background: 'rgba(245, 243, 235, 0.72)' }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                        className="classical-nav-link rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-white/40"
                        style={{ color: '#333333', background: 'rgba(245, 243, 235, 0.72)' }}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: 'rgba(196, 154, 108, 0.12)' }}
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="h-4 w-4" style={{ color: '#C49A6C' }} />
                  </a>
                ))}
              </div>

              <a
                href="https://www.qlwy.xyz/fortune"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="classical-nav-link mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm"
                style={{ background: '#C49A6C', color: '#F5F3EB' }}
              >
                立即开始
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
