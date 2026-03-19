import { Twitter, X, Send, Github } from 'lucide-react'

const footerLinks = {
  '产品': [
    { label: '首页', href: '/' },
    { label: '预测市场', href: 'https://yc.qlwy.xyz/' },
    { label: '卜卦', href: 'https://www.qlwy.xyz/fortune' },
    { label: '奖池', href: 'https://www.qlwy.xyz/jackpot' },
    { label: '对战', href: 'https://www.qlwy.xyz/battle' },
    { label: '签灵', href: 'https://www.qlwy.xyz/spirit' },
    { label: '炼签', href: 'https://www.qlwy.xyz/refinery' },
    { label: '质押', href: 'https://www.qlwy.xyz/staking' },
  ],
  '文档': [
    { label: '技术文档', href: '/docs' },
    { label: '入门指南', href: '/docs' },
    { label: '白皮书', href: '/whitepaper' },
  ],
  '社区': [
    { label: '官方推特', href: 'https://x.com/wwwqlwyxyz' },
    { label: '加入社区', href: 'https://t.me/qlwyxyz' },
    { label: 'GitHub', href: 'https://github.com/qlwy' },
  ],
}

export function Footer() {
  return (
    <footer className="px-12 py-16 md:px-24" style={{ background: '#333333' }}>
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="潜龙勿用" className="h-10 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="classical-footer-copy text-sm mb-4" style={{ color: 'rgba(245, 243, 235, 0.6)' }}>
              基于易经智慧的Web3游戏化NFT生态系统
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://x.com/wwwqlwyxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                style={{ background: 'rgba(196, 154, 108, 0.2)' }}
                title="项目推特"
              >
                <Twitter className="w-5 h-5" style={{ color: '#C49A6C' }} />
              </a>
              <a
                href="https://x.com/drag0ooon?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                style={{ background: 'rgba(196, 154, 108, 0.2)' }}
                title="开发者推特"
              >
                <X className="w-5 h-5" style={{ color: '#C49A6C' }} />
              </a>
              <a
                href="https://t.me/qlwyxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                style={{ background: 'rgba(196, 154, 108, 0.2)' }}
              >
                <Send className="w-5 h-5" style={{ color: '#C49A6C' }} />
              </a>
              <a
                href="https://github.com/qlwy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                style={{ background: 'rgba(196, 154, 108, 0.2)' }}
              >
                <Github className="w-5 h-5" style={{ color: '#C49A6C' }} />
              </a>
              <a
                href="https://four.meme/zh-TW/token/0x2e591b13d3caf27adf1db47d75278315d0754444"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                style={{ background: 'rgba(196, 154, 108, 0.2)' }}
              >
                <img src="/images/four.svg" alt="Four.meme" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="classical-footer-title text-sm mb-4" style={{ color: '#C49A6C' }}>
                {title}
              </h4>
              <div className="space-y-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="classical-footer-link block text-sm transition-colors hover:opacity-70"
                    style={{ color: 'rgba(245, 243, 235, 0.6)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}
        >
          <span className="classical-footer-copy text-sm" style={{ color: 'rgba(245, 243, 235, 0.4)' }}>
            © 2026 潜龙勿用. 保留所有权利.
          </span>
          <div className="flex gap-6">
            <a href="/whitepaper" className="classical-footer-link text-sm transition-colors hover:opacity-70" style={{ color: 'rgba(245, 243, 235, 0.4)' }}>
              白皮书
            </a>
            <a href="/docs" className="classical-footer-link text-sm transition-colors hover:opacity-70" style={{ color: 'rgba(245, 243, 235, 0.4)' }}>
              开发文档
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
