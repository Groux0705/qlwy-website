import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ArrowLeft, FileText, Sparkles, Sword, Users, TrendingUp, Coins, Shield, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const docSections = [
  {
    id: 'core',
    title: '核心NFT系统',
    icon: Shield,
    content: 'QLWYFortuneCore是整个生态系统的基础协议，负责生成和管理具有运势属性的NFT。每个NFT代表一条"龙"，拥有独特的六爻卦象和运气值。',
    details: [
      '基于易经六十四卦设计',
      '5级稀有度：普通/稀有/史诗/传奇/神话',
      '幸运值范围 0-100，影响战斗表现',
      '使用Chainlink VRF确保随机性',
    ],
  },
  {
    id: 'casting',
    title: '卜卦系统',
    icon: Sparkles,
    content: '卜卦系统是获取NFT的核心途径，用户通过占卜请求获得随机的六爻卦象和运势属性。',
    details: [
      '占卜费用：0.005 BNB',
      '三阶段流程：请求→等待结果→铸造NFT',
      '铸造费用：稀有50 / 史诗100 / 传奇500 / 神话2000 QLWY',
      '占卜费用70%注入Jackpot奖池',
    ],
  },
  {
    id: 'spirit',
    title: '灵魂代理',
    icon: Users,
    content: 'Spirit Agent是将FortuneCore NFT升级后的智能代理，可以自主执行操作，支持自动化交易和战斗。',
    details: [
      '符合BAP-578 NFT代理标准',
      '等级系统：0-99级',
      '支持自动战斗、自动下注、自动铸造',
      '不可转让，确保资产安全',
    ],
  },
  {
    id: 'battle',
    title: 'PVP战斗',
    icon: Sword,
    content: '3v3团队对战系统，玩家使用Spirit Agent NFT进行PVP战斗，胜者可获得代币奖励。',
    details: [
      '评分公式：score = effectiveLuck×70 + random×30',
      '稀有度幸运加成：普通+0 / 稀有+5 / 史诗+10 / 传奇+15 / 神话+20',
      '失败方NFT有概率被销毁',
      '战斗可获得经验值用于升级',
    ],
  },
  {
    id: 'prediction',
    title: '预测市场',
    icon: TrendingUp,
    content: '基于LMSR AMM的去中心化预测市场，用户可以对各种事件结果进行预测和投注。',
    details: [
      '支持YES/NO预测',
      '24小时争议期',
      '神话NFT持有者可参与仲裁',
      '手续费：创建者1% / 协议1% / LP1%',
    ],
  },
  {
    id: 'refinery',
    title: '精炼系统',
    icon: Coins,
    content: '将多个低稀有度NFT精炼为更高稀有度的系统，是获得稀有NFT的主要途径之一。',
    details: [
      '投入3个相同稀有度NFT',
      '稀有→史诗：45%成功率',
      '史诗→传奇：20%成功率',
      '传奇→神话：8%成功率',
    ],
  },
  {
    id: 'token',
    title: '代币系统',
    icon: Coins,
    content: 'QLWY是生态系统的ERC-20治理和实用代币，用于铸造、升级、精炼等功能。',
    details: [
      '标准ERC-20代币',
      '用于NFT铸造和升级',
      '精炼系统费用',
      '质押奖励分配',
    ],
  },
  {
    id: 'architecture',
    title: '系统架构',
    icon: BarChart3,
    content: '潜龙勿用是一个基于BNB链的Web3游戏化NFT生态系统，整合了多种DeFi和游戏机制。',
    details: [
      '主网部署：BSC (Chain ID 56)',
      'Chainlink VRF随机数',
      'BAP-578 NFT代理标准',
      'Planner模式：SpiritLogic + SpiritAgent',
    ],
  },
]

function SectionBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium',
        className
      )}
      style={{
        background: 'rgba(196, 154, 108, 0.15)',
        color: '#C49A6C',
        border: '1px solid rgba(196, 154, 108, 0.3)',
      }}
    >
      {children}
    </span>
  )
}

function DocsPage() {
  const [activeSection, setActiveSection] = useState('core')

  const currentDoc = docSections.find(d => d.id === activeSection) || docSections[0]
  const CurrentIcon = currentDoc.icon

  return (
    <div className="min-h-screen" style={{ background: '#F5F3EB' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 py-4"
        style={{ background: 'rgba(245, 243, 235, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(196, 154, 108, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="潜龙勿用" className="h-10 w-auto" />
            <span className="font-heading italic text-lg" style={{ color: '#333333' }}>潜龙勿用</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(196, 154, 108, 0.15)', color: '#C49A6C' }}
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <SectionBadge className="mb-4">技术文档</SectionBadge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl italic mb-4" style={{ color: '#333333' }}>
              玩转潜龙勿用
            </h1>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.7 }}>
              基于易经智慧的Web3游戏化NFT生态系统，详细了解核心机制和玩法
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Navigation */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="rounded-2xl p-4 sticky top-28"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <h3 className="font-heading text-sm italic mb-4 px-3" style={{ color: '#333333' }}>文档目录</h3>
                <nav className="space-y-1">
                  {docSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                        style={{
                          background: activeSection === section.id ? 'rgba(196, 154, 108, 0.15)' : 'transparent',
                          color: activeSection === section.id ? '#C49A6C' : '#333333',
                        }}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="lg:col-span-3"
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-3xl p-8"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                }}
              >
                {/* Title Area */}
                <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(196, 154, 108, 0.2)' }}>
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl"
                    style={{ background: 'rgba(196, 154, 108, 0.15)' }}
                  >
                    <CurrentIcon className="w-7 h-7" style={{ color: '#C49A6C' }} />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl italic" style={{ color: '#333333' }}>{currentDoc.title}</h2>
                    <p className="text-sm mt-1" style={{ color: '#333333', opacity: 0.6 }}>QLWY {currentDoc.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed mb-8" style={{ color: '#333333', opacity: 0.8 }}>
                  {currentDoc.content}
                </p>

                {/* Detail List */}
                <div className="space-y-3">
                  <h4 className="font-heading text-sm italic" style={{ color: '#C49A6C' }}>核心要点</h4>
                  {currentDoc.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(196, 154, 108, 0.08)' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ background: '#C49A6C' }}
                      />
                      <p className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>{detail}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-8 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
                  <button
                    onClick={() => {
                      const idx = docSections.findIndex(d => d.id === activeSection)
                      if (idx > 0) setActiveSection(docSections[idx - 1].id)
                    }}
                    disabled={activeSection === docSections[0].id}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30"
                    style={{ color: '#C49A6C' }}
                  >
                    <ArrowUpRight className="w-4 h-4 rotate-180" />
                    上一篇
                  </button>
                  <button
                    onClick={() => {
                      const idx = docSections.findIndex(d => d.id === activeSection)
                      if (idx < docSections.length - 1) setActiveSection(docSections[idx + 1].id)
                    }}
                    disabled={activeSection === docSections[docSections.length - 1].id}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30"
                    style={{ color: '#C49A6C' }}
                  >
                    下一篇
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Whitepaper Download */}
              <motion.div
                className="mt-6 rounded-2xl p-6 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm mb-4" style={{ color: '#333333', opacity: 0.7 }}>
                  想要了解更多技术细节？
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                  style={{ background: '#C49A6C', color: '#F5F3EB' }}
                >
                  <FileText className="w-4 h-4" />
                  下载完整白皮书
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DocsPage
