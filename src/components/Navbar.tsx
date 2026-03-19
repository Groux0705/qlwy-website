import { Link } from 'react-router-dom'
import { ArrowUpRight, Twitter, X, Send, Github, ExternalLink } from 'lucide-react'

const navLinks = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/docs' },
  { label: '预测市场', href: 'https://yc.qlwy.xyz/' },
  { label: 'NFT市场', href: '#nft' },
]

export function Navbar() {
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative font-body text-sm font-medium transition-all duration-200 hover:scale-105 group"
                style={{ color: '#333333' }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#C49A6C] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-4 pl-4" style={{ borderLeft: '1px solid rgba(196, 154, 108, 0.3)' }}>
              <a href="https://x.com/wwwqlwyxyz" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }} title="项目推特">
                <Twitter className="w-4 h-4" style={{ color: '#C49A6C' }} />
              </a>
              <a href="https://x.com/drag0ooon?s=21" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: 'rgba(196, 154, 108, 0.1)' }} title="开发者推特">
                <X className="w-4 h-4" style={{ color: '#C49A6C' }} />
              </a>
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
