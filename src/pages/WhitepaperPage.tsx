import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { ArrowDown, FileText, Download, ExternalLink } from 'lucide-react'

export function WhitepaperPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-cream)' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-heading mb-6"
            style={{ color: '#FFFFFF', fontFamily: 'Noto Serif SC, serif' }}
          >
            白皮书
          </h1>
          <p className="text-xl mb-4" style={{ color: 'rgba(245, 243, 235, 0.9)' }}>
            潜龙勿用 (QLWY) 项目完整技术白皮书
          </p>
          <p className="text-sm" style={{ color: 'rgba(245, 243, 235, 0.6)' }}>
            版本 1.0 | 2026年3月
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background: '#fff',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            }}
          >
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(196, 154, 108, 0.15)' }}
            >
              <FileText className="w-10 h-10" style={{ color: 'var(--primary-gold)' }} />
            </div>

            <h2
              className="text-2xl font-heading mb-4"
              style={{ color: 'var(--text-dark)', fontFamily: 'Noto Serif SC, serif' }}
            >
              下载白皮书
            </h2>

            <p className="text-base mb-8" style={{ color: '#333', opacity: 0.7 }}>
              了解潜龙勿用的完整项目机制、技术架构和经济模型
            </p>

            <div className="space-y-4">
              {/* HTML Version */}
              <a
                href="/whitepaper_qlwy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(196, 154, 108, 0.1)',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--primary-gold)' }}
                  >
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium" style={{ color: 'var(--text-dark)' }}>
                      HTML 网页版
                    </div>
                    <div className="text-sm" style={{ color: '#666' }}>
                      在线阅读，精美排版
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5" style={{ color: 'var(--primary-gold)' }} />
              </a>

              {/* Markdown Version */}
              <a
                href="/whitepaper_qlwy.md"
                download="潜龙勿用_白皮书_v1.0.md"
                className="flex items-center justify-between p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(196, 154, 108, 0.1)',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(196, 154, 108, 0.5)' }}
                  >
                    <Download className="w-6 h-6" style={{ color: 'var(--primary-gold)' }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium" style={{ color: 'var(--text-dark)' }}>
                      Markdown 下载版
                    </div>
                    <div className="text-sm" style={{ color: '#666' }}>
                      .md 格式，适合本地保存
                    </div>
                  </div>
                </div>
                <Download className="w-5 h-5" style={{ color: 'var(--primary-gold)' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: '#666' }}>
              或浏览完整文档
            </p>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
              style={{
                background: 'var(--primary-gold)',
                color: '#fff',
              }}
            >
              查看在线文档
              <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-4" style={{ background: 'rgba(196, 154, 108, 0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <h3
            className="text-xl font-heading text-center mb-10"
            style={{ color: 'var(--text-dark)', fontFamily: 'Noto Serif SC, serif' }}
          >
            白皮书涵盖内容
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: '项目概述', desc: '潜龙勿用核心理念、项目定位与核心成就' },
              { title: '核心NFT系统', desc: 'FortuneCore协议、五级稀有度、进化路径' },
              { title: '游戏机制', desc: '卜卦、PVP战斗、奖池、签灵Agent、精炼系统' },
              { title: '代币经济', desc: 'QLWY代币信息、用途与分配机制' },
              { title: '预测市场', desc: 'LMSR AMM机制、费用结构、仲裁系统' },
              { title: '技术架构', desc: 'Chainlink VRF、BAP-578标准、技术栈' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.2)',
                }}
              >
                <h4
                  className="font-medium mb-2"
                  style={{ color: 'var(--primary-gold)', fontFamily: 'Noto Serif SC, serif' }}
                >
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: '#666' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
