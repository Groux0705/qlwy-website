import { PropsWithChildren, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles, Sword, Gift, Users, Lock, TrendingUp, ArrowUp, Zap, X, BookOpen, Coins, Shield, Zap as Zap2, BarChart3, Users as Users2, Twitter, Send, Github, ExternalLink, ChevronDown, Clock, User } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import DocsPage from './pages/DocsPage'
import { WhitepaperPage } from './pages/WhitepaperPage'
import communityTweetsData from '@/data/communityTweets.json'
import officialTweetsData from '@/data/officialTweets.json'

const modules = [
  {
    id: 'divination',
    icon: Sparkles,
    title: '卜卦',
    shortDesc: '摇签问卦，得天指引',
    fullDesc: '摇签问卦，得天指引。易经六十四卦，洞悉万事万物之理。每一卦都蕴含着宇宙运行的奥秘，通过古老的蓍草占卜法或硬币占卜法，寻求天人之际的智慧指引。',
    href: 'https://www.qlwy.xyz/fortune',
    accent: true,
  },
  {
    id: 'lottery',
    icon: Gift,
    title: '奖池开奖',
    shortDesc: '每日开奖，福运临门',
    fullDesc: '每日开奖，福运临门。丰厚奖池，惊喜不断。每晚八点准时开奖，众多奖项等待有缘人。参与方式简单，中奖概率透明，公平公正公开。',
    href: 'https://www.qlwy.xyz/jackpot',
    accent: false,
  },
  {
    id: 'market',
    icon: TrendingUp,
    title: '预测市场',
    shortDesc: '预知未来，把握机遇',
    fullDesc: '预知未来，把握机遇。洞察趋势，先人一步。通过预测市场，用户可以对未来事件的结果进行投注。准确预判趋势的用户将获得丰厚奖励，让知识与洞察转化为收益。',
    href: 'https://yc.qlwy.xyz/',
    accent: false,
  },
  {
    id: 'battle',
    icon: Sword,
    title: 'NFT 对战',
    shortDesc: '灵兽对决，策略博弈',
    fullDesc: '灵兽对决，策略博弈。以智取胜，以巧夺魁。收集和培养你的灵兽，在竞技场中与其他玩家对战。根据灵兽的属性和技能，制定最优策略，夺取荣耀和奖励。',
    href: 'https://www.qlwy.xyz/battle',
    accent: true,
  },
  {
    id: 'signin',
    icon: Users,
    title: '签灵',
    shortDesc: '每日签到，凝聚灵力',
    fullDesc: '每日签到，凝聚灵力。签满七日，召唤神秘灵兽。坚持每日签到可积累灵力值，连续签到七天即可召唤一只随机灵兽 NFT。断签会清零，重新计算。',
    href: 'https://www.qlwy.xyz/spirit',
    accent: false,
  },
  {
    id: 'staking',
    icon: Lock,
    title: '质押',
    shortDesc: '质押生息，稳中求进',
    fullDesc: '质押生息，稳中求进。让您的资产静默增值。将您的代币质押在合约中，即可获得每日利息收益。质押时间越长，收益率越高。随时可取，灵活便捷。',
    href: 'https://www.qlwy.xyz/staking',
    accent: false,
  },
]

const stats = [
  { value: '10,000+', label: '注册用户' },
  { value: '64', label: '灵兽种类' },
  { value: '888 ETH', label: '累计交易额' },
  { value: '99.9%', label: '服务可用性' },
]

function SectionBadge({ children, className, style }: PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) {
  return <span className={cn('section-badge liquid-glass', className)} style={style}>{children}</span>
}

function SectionHeading({ children, className, style }: PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) {
  return <h2 className={cn('section-heading text-4xl md:text-5xl lg:text-6xl', className)} style={style}>{children}</h2>
}

function VideoFades() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-[200px] bg-gradient-to-t from-black to-transparent" />
    </>
  )
}

const sideNavItems = [
  { id: 'home', label: '顶部', icon: ArrowUp },
  { id: 'divination', label: '卜卦', icon: Sparkles },
  { id: 'nft', label: '资产', icon: Gift },
  { id: 'spirit', label: '签灵', icon: Users },
  { id: 'battle', label: '对战', icon: Sword },
  { id: 'prediction', label: '预测市场', icon: TrendingUp },
  { id: 'docs', label: '文档', icon: BookOpen },
]

function SideNav() {
  const [activeId, setActiveId] = useState('home')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > 300)

      const sectionIds = sideNavItems.map(item => item.id)
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element && element.offsetTop <= scrollY + 150) {
          setActiveId(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="hidden lg:flex fixed left-4 z-50 flex flex-col gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      style={{ top: '30%', transform: 'translateY(-45%)' }}
    >
      {sideNavItems.map(({ id, label, icon: Icon }) => (
        <motion.a
          key={id}
          href={`#${id}`}
          className="relative group flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById(id)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
              setActiveId(id)
            }
          }}
        >
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
            style={{
              background: activeId === id ? '#C49A6C' : 'rgba(245, 243, 235, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              border: activeId === id ? 'none' : '1px solid rgba(196, 154, 108, 0.3)',
            }}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: activeId === id ? '#F5F3EB' : '#C49A6C' }}
            />
          </div>

          {/* 标签 */}
          <div
            className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
            style={{
              background: '#F5F3EB',
              color: '#333333',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {label}
            <div
              className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent"
              style={{ borderRightColor: '#F5F3EB' }}
            />
          </div>
        </motion.a>
      ))}

      {/* 回到顶部按钮 */}
      <motion.button
        className="mt-4 flex items-center justify-center w-10 h-10 rounded-full"
        style={{
          background: 'rgba(196, 154, 108, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(196, 154, 108, 0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-4 h-4" style={{ color: '#C49A6C' }} />
      </motion.button>
    </motion.div>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/video/dragon.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)' }} />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 text-center"
          style={{
            fontFamily: '"Ma Shan Zheng", "ZCOOL XiaoWei", serif',
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            color: '#F5F3EB',
            textShadow: `
              0 0 40px rgba(196, 154, 108, 0.5),
              0 0 80px rgba(196, 154, 108, 0.3),
              4px 4px 0 rgba(0,0,0,0.3),
              -2px -2px 0 rgba(0,0,0,0.2)
            `,
            letterSpacing: '0.2em',
            lineHeight: 1.1,
          }}
        >
          潜龙勿用
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12 text-center text-lg md:text-xl tracking-[0.3em]"
          style={{
            color: 'rgba(245, 243, 235, 0.9)',
            textShadow: '0 0 20px rgba(0,0,0,0.5)',
            letterSpacing: '0.4em',
          }}
        >
          易经智慧 · Web3 赋能
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href="https://www.qlwy.xyz/fortune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-sm font-medium transition-transform hover:scale-105"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            开始探索
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="inline-flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest" style={{ color: 'rgba(245, 243, 235, 0.6)' }}>SCROLL</span>
          <div className="h-12 w-px" style={{ background: 'linear-gradient(to bottom, rgba(196, 154, 108, 0.8), transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}

function ModuleCard({ module, index, onClick }: { module: typeof modules[0]; index: number; onClick: () => void }) {
  const Icon = module.icon

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        ease: 'easeOut',
        delay: index * 0.08,
      }}
      whileHover={{
        scale: 1.02,
        y: -6,
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
    >
      <div
        className="rounded-2xl p-6 transition-all duration-300"
        style={{
          background: 'rgba(245, 243, 235, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(196, 154, 108, 0.3)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: module.accent ? '#C49A6C' : 'rgba(196, 154, 108, 0.15)',
          }}
        >
          <Icon className="h-6 w-6" style={{ color: module.accent ? '#F5F3EB' : '#C49A6C' }} />
        </div>
        <h3 className="mb-2 font-heading text-lg italic" style={{ color: '#333333' }}>
          {module.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#333333', opacity: 0.6 }}>
          {module.shortDesc}
        </p>
      </div>
    </motion.div>
  )
}

function ModuleDetailModal({ module, onClose }: { module: typeof modules[0]; onClose: () => void }) {
  const Icon = module.icon

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-lg rounded-3xl p-8"
        style={{ background: '#F5F3EB', border: '1px solid rgba(196, 154, 108, 0.4)' }}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/5"
          style={{ color: '#333333' }}
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ background: module.accent ? '#C49A6C' : 'rgba(196, 154, 108, 0.15)' }}
        >
          <Icon className="h-10 w-10" style={{ color: module.accent ? '#F5F3EB' : '#C49A6C' }} />
        </div>

        <h2 className="mb-4 font-heading text-3xl italic" style={{ color: '#333333' }}>
          {module.title}
        </h2>

        <p className="mb-8 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.8 }}>
          {module.fullDesc}
        </p>

        <div className="flex gap-4">
          <a
            href={module.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            进入功能
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium"
            style={{ borderColor: 'rgba(196, 154, 108, 0.5)', color: '#333333' }}
          >
            关闭
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ModuleSection({ id, title, subtitle, description, modules: sectionModules, bgColor = '#F5F3EB', textColor = '#333333' }: {
  id: string
  title: string
  subtitle: string
  description: string
  modules: typeof modules
  bgColor?: string
  textColor?: string
}) {
  return (
    <section id={id} className="relative py-24 px-6 md:px-16 lg:px-24" style={{ background: bgColor }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionBadge className="mb-4">{subtitle}</SectionBadge>
          <SectionHeading style={{ color: textColor }}>{title}</SectionHeading>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: textColor, opacity: 0.7 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectionModules.map((mod) => (
            <motion.div
              key={mod.id}
              className="rounded-2xl p-8 text-center"
              style={{
                background: bgColor === '#333333' ? 'rgba(245, 243, 235, 0.1)' : 'rgba(196, 154, 108, 0.1)',
                border: `1px solid rgba(196, 154, 108, 0.3)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: mod.accent ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)' }}
              >
                <mod.icon className="h-7 w-7" style={{ color: mod.accent ? '#F5F3EB' : '#C49A6C' }} />
              </div>
              <h3 className="mb-2 font-heading text-xl italic" style={{ color: textColor }}>
                {mod.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.6 }}>
                {mod.shortDesc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DivinationSection() {
  const castingSteps = [
    {
      step: '01',
      title: '支付 BNB 发起卜卦',
      desc: '用户先请求一次链上卜卦，系统通过 Chainlink VRF 生成不可篡改的随机结果。',
    },
    {
      step: '02',
      title: '获得卦象、幸运值与稀有度',
      desc: '约 10 秒后返回六爻、卦象 ID、幸运值与五级稀有度，完成第一次命运揭示。',
    },
    {
      step: '03',
      title: '稀有及以上才进入资产层',
      desc: '只有稀有及以上才可支付潜龙勿用代币铸签；若铸出神话级，将立刻触发奖池分配。',
    },
  ]

  return (
    <section id="divination" className="relative min-h-screen py-24 overflow-hidden" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <SectionBadge className="mb-4" style={{ color: '#C49A6C' }}>核心入口</SectionBadge>
          <SectionHeading>卜卦 · 铸签 · 神话触发</SectionHeading>
          <motion.p
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed"
            style={{ color: '#333333', opacity: 0.72 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            潜龙勿用的真正入口不是直接买 NFT，而是先卜一卦。用户支付 BNB 请求链上随机，卜卦费用按 70% 进入奖池、30% 用于协议运营；若结果达到稀有及以上，再用潜龙勿用代币铸造成卦象卡牌NFT；而神话级结果的诞生，会把一次抽签变成全局奖池事件。
          </motion.p>
        </div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md aspect-square"
            >
              <img
                src="/images/section1/luopan.png"
                alt="罗盘"
                className="absolute inset-0 w-full h-full object-contain opacity-20"
              />

              <motion.img
                src="/images/section1/guijia.png"
                alt="卦象"
                className="absolute inset-0 m-auto w-[75%] h-[75%] object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              <motion.img
                src="/images/section1/coin1.png"
                alt="铜钱"
                className="absolute w-12 h-12"
                style={{ bottom: '0%', left: '10%' }}
                animate={{ rotate: [0, 10, 0], y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.img
                src="/images/section1/coin2.png"
                alt="铜钱"
                className="absolute w-12 h-12"
                style={{ bottom: '-10%', left: '44%' }}
                animate={{ rotate: [0, -8, 0], y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.img
                src="/images/section1/coin3.png"
                alt="铜钱"
                className="absolute w-12 h-12"
                style={{ bottom: '0%', right: '10%' }}
                animate={{ rotate: [0, 12, 0], y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <div className="space-y-4">
            {castingSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.72)',
                  border: '1px solid rgba(196, 154, 108, 0.22)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                }}
              >
                <div className="mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.22em]" style={{ background: 'rgba(196, 154, 108, 0.12)', color: '#C49A6C' }}>
                  {item.step}
                </div>
                <h3 className="mb-2 font-heading text-2xl italic" style={{ color: '#333333' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.72 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <motion.a
                href="https://www.qlwy.xyz/fortune"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.32 }}
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
                style={{ background: '#C49A6C', color: '#F5F3EB' }}
              >
                开始卜卦
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <Link
                to="/docs?section=entry"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
                style={{ border: '1px solid rgba(196, 154, 108, 0.35)', color: '#333333', background: 'rgba(255,255,255,0.55)' }}
              >
                阅读机制说明
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-8"
            style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))', border: '1px solid rgba(196, 154, 108, 0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <img src="/images/section1/ding.png" alt="奖池" className="mb-5 h-16 w-16" />
            <h4 className="mb-2 font-heading text-2xl italic" style={{ color: '#333333' }}>神话触发，而非定时开奖</h4>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.68 }}>
              奖池不是每天固定开奖，而是在铸出神话级 NFT 时触发。当前铸造者获得 50%，现有神话持有者分享 30%，其余 20% 留在合约滚入下一轮。
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['50% 新神话持有者', '30% 现有神话持有者', '20% 留存滚入下一轮'].map((tag) => (
                <span key={tag} className="rounded-full px-3 py-1" style={{ background: 'rgba(196,154,108,0.14)', color: '#8D6B45' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden p-8"
            style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))', border: '1px solid rgba(196, 154, 108, 0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <img src="/images/section1/guijia.png" alt="铸签" className="mb-5 h-16 w-16 object-contain" />
            <h4 className="mb-2 font-heading text-2xl italic" style={{ color: '#333333' }}>稀有及以上才进入资产层</h4>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.68 }}>
              普通级只停留在结果层；稀有、史诗、传奇与神话级才能支付潜龙勿用代币铸造成真正的卦象卡牌NFT，随后进入精炼、签灵、战斗与仲裁等成长线。
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['稀有 50', '史诗 100', '传奇 500', '神话 2000'].map((tag) => (
                <span key={tag} className="rounded-full px-3 py-1" style={{ background: 'rgba(255,255,255,0.55)', color: '#8D6B45', border: '1px solid rgba(196,154,108,0.18)' }}>
                  {tag} 潜龙勿用
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden p-8"
            style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))', border: '1px solid rgba(196, 154, 108, 0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <img src="/images/section1/pool.png" alt="质押" className="mb-5 h-16 w-16" />
            <h4 className="mb-2 font-heading text-2xl italic" style={{ color: '#333333' }}>质押生息，绑定长期价值</h4>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.68 }}>
              质押潜龙勿用代币参与协议治理与收益分配，收益以 BNB 形式发放。解质押时自动销毁 1% 代币，鼓励中长期持币与持续参与，让价值分配与长期绑定。
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['BNB 收益分发', '解质押销毁 1%', '治理参与权'].map((tag) => (
                <span key={tag} className="rounded-full px-3 py-1" style={{ background: 'rgba(196,154,108,0.14)', color: '#8D6B45' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SpiritSection() {
  const spiritPillars = [
    {
      icon: Users,
      title: '升级为签灵',
      desc: '稀有及以上卦象卡牌NFT可以升级为签灵，进入可执行、可成长、可自动化的签灵形态。',
    },
    {
      icon: Zap,
      title: '策略驱动自动化',
      desc: '支持自动战斗、自动下注、自动卜卦、自动铸签，不再只是手动点按钮，而是配置策略后持续运行。',
    },
    {
      icon: Coins,
      title: '签灵金库',
      desc: '签灵拥有自己的资产与 gas 空间，用户可以存入 BNB 或代币，为自动化操作提供持续燃料。',
    },
    {
      icon: Shield,
      title: '身份与安全边界',
      desc: '基于 BAP-578 代理标准，签灵以自身身份执行白名单逻辑，不可转移，资产边界更清晰。',
    },
  ]

  const strategyRows = [
    { label: '自动战斗', value: 88, tone: '#C49A6C' },
    { label: '自动下注', value: 72, tone: '#D2B48C' },
    { label: '自动卜卦', value: 61, tone: '#B98A56' },
    { label: '自动铸签', value: 46, tone: '#8D6B45' },
  ]

  const executionQueue = [
    { title: '监控市场波动', status: '运行中', icon: TrendingUp },
    { title: '等待战斗匹配', status: '待执行', icon: Sword },
    { title: '检查金库余额', status: '已完成', icon: Coins },
  ]

  const spiritMetrics = [
    { label: '升级门槛', value: '稀有及以上' },
    { label: '成长等级', value: '0-99' },
    { label: '可执行动作', value: '5+' },
  ]

  const spiritLoop = [
    '稀有及以上卦象卡牌NFT',
    '升级为签灵',
    '配置策略与资金',
    '自动执行并积累经验',
  ]

  const spiritActionTags = ['自动战斗', '自动下注', '自动卜卦', '自动铸签', '资产兑换']

  const spiritDifferentiators = [
    {
      label: '资产层',
      value: '稀有及以上卦象卡牌NFT、BNB 与潜龙勿用代币可以一起进入签灵金库，成为持续执行的燃料。',
    },
    {
      label: '策略层',
      value: '用户不再反复手点，而是预设风险偏好、动作白名单和资金使用方式。',
    },
    {
      label: '身份层',
      value: '基于 BAP-578 执行边界，签灵以自身身份行动，权限与归属更可追踪。',
    },
  ]

  return (
    <section id="spirit" className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <SectionBadge className="mb-4" style={{ color: '#C49A6C' }}>
            自动化引擎
          </SectionBadge>
          <SectionHeading>签灵</SectionHeading>
          <motion.p
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed"
            style={{ color: '#333333', opacity: 0.72 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            从产品辨识度上看，签灵才是潜龙勿用最不像“普通 NFT 项目”的地方。它让稀有及以上卦象卡牌NFT不再只是静态收藏，而是可以升级、学习、持有资产并长期执行策略的链上角色。
          </motion.p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div
            className="relative overflow-hidden rounded-[36px] p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(51, 51, 51, 0.98), rgba(42, 38, 33, 0.92))',
              border: '1px solid rgba(196, 154, 108, 0.22)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
              style={{ background: 'rgba(196, 154, 108, 0.18)' }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'rgba(196, 154, 108, 0.12)' }}
            />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs tracking-[0.28em]" style={{ color: 'rgba(245,243,235,0.48)' }}>
                    签灵控制台
                  </p>
                  <h3 className="mt-3 font-heading text-4xl italic leading-tight" style={{ color: '#F5F3EB' }}>
                    把卦象卡牌NFT
                    <br />
                    升级成可执行的签灵
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(245,243,235,0.72)' }}>
                    这一块不再用截图拼贴，而是直接把签灵最关键的能力做成一张原生控制台。用户更容易一眼理解：门槛、策略、金库和自动执行到底怎么连起来。
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs"
                  style={{ background: 'rgba(245,243,235,0.08)', color: '#F5F3EB', border: '1px solid rgba(245,243,235,0.1)' }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: '#C49A6C' }} />
                  策略已启用
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {spiritMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="rounded-[22px] p-4"
                    style={{ background: 'rgba(245,243,235,0.05)', border: '1px solid rgba(245,243,235,0.08)' }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <p className="text-xs" style={{ color: 'rgba(245,243,235,0.46)' }}>{metric.label}</p>
                    <p className="mt-3 text-2xl font-semibold" style={{ color: '#F5F3EB' }}>{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div
                  className="rounded-[28px] p-5"
                  style={{ background: 'rgba(245,243,235,0.05)', border: '1px solid rgba(245,243,235,0.08)' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs tracking-[0.2em]" style={{ color: 'rgba(245,243,235,0.42)' }}>策略矩阵</p>
                      <p className="mt-2 text-lg font-medium" style={{ color: '#F5F3EB' }}>按风险偏好分配执行强度</p>
                    </div>
                    <div className="rounded-full px-3 py-1 text-xs" style={{ background: 'rgba(196,154,108,0.12)', color: '#C49A6C' }}>
                      平衡模式
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {strategyRows.map((row) => (
                      <div key={row.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span style={{ color: '#F5F3EB' }}>{row.label}</span>
                          <span style={{ color: 'rgba(245,243,235,0.56)' }}>{row.value}%</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: 'rgba(245,243,235,0.08)' }}>
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${row.value}%`,
                              background: `linear-gradient(90deg, ${row.tone}, rgba(245,243,235,0.92))`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[22px] p-4" style={{ background: 'rgba(196,154,108,0.08)' }}>
                    <p className="text-xs tracking-[0.18em]" style={{ color: 'rgba(245,243,235,0.48)' }}>执行闭环</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {spiritLoop.map((step, index) => (
                        <div
                          key={step}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3"
                          style={{ background: 'rgba(245,243,235,0.04)', border: '1px solid rgba(245,243,235,0.06)' }}
                        >
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                            style={{ background: 'rgba(245,243,235,0.1)', color: '#F5F3EB' }}
                          >
                            0{index + 1}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,243,235,0.74)' }}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div
                    className="rounded-[28px] p-5"
                    style={{ background: 'rgba(245,243,235,0.05)', border: '1px solid rgba(245,243,235,0.08)' }}
                  >
                    <p className="text-xs tracking-[0.2em]" style={{ color: 'rgba(245,243,235,0.42)' }}>签灵状态</p>
                    <div className="mt-5 flex items-center justify-center">
                      <div
                        className="relative flex h-40 w-40 items-center justify-center rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.34), rgba(196,154,108,0.08) 58%, transparent 60%)' }}
                      >
                        <div
                          className="absolute inset-4 rounded-full"
                          style={{ border: '1px solid rgba(245,243,235,0.12)' }}
                        />
                        <div
                          className="absolute inset-9 rounded-full"
                          style={{ border: '1px dashed rgba(245,243,235,0.16)' }}
                        />
                        <div
                          className="relative flex h-16 w-16 items-center justify-center rounded-full"
                          style={{ background: '#C49A6C', color: '#2A2621' }}
                        >
                          <Users className="h-8 w-8" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(245,243,235,0.04)' }}>
                        <p style={{ color: 'rgba(245,243,235,0.46)' }}>Level</p>
                        <p className="mt-1 font-medium" style={{ color: '#F5F3EB' }}>Lv. 27</p>
                      </div>
                      <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(245,243,235,0.04)' }}>
                        <p style={{ color: 'rgba(245,243,235,0.46)' }}>Vault</p>
                        <p className="mt-1 font-medium" style={{ color: '#F5F3EB' }}>1.82 BNB</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-[28px] p-5"
                    style={{ background: 'rgba(196,154,108,0.08)', border: '1px solid rgba(196,154,108,0.16)' }}
                  >
                    <p className="text-xs tracking-[0.2em]" style={{ color: 'rgba(245,243,235,0.48)' }}>执行队列</p>
                    <div className="mt-4 space-y-3">
                      {executionQueue.map(({ title, status, icon: Icon }) => (
                        <div
                          key={title}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3"
                          style={{ background: 'rgba(245,243,235,0.05)' }}
                        >
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: 'rgba(245,243,235,0.08)' }}
                          >
                            <Icon className="h-5 w-5" style={{ color: '#F5F3EB' }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium" style={{ color: '#F5F3EB' }}>{title}</p>
                            <p className="mt-1 text-xs" style={{ color: 'rgba(245,243,235,0.48)' }}>{status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {spiritPillars.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl p-6"
                style={{ background: '#fff', border: '1px solid rgba(196, 154, 108, 0.24)', boxShadow: '0 10px 28px rgba(0,0,0,0.05)' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(196, 154, 108, 0.14)' }}>
                  <Icon className="h-6 w-6" style={{ color: '#C49A6C' }} />
                </div>
                <h3 className="mb-2 font-heading text-2xl italic" style={{ color: '#333333' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.7 }}>
                  {desc}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="sm:col-span-2 rounded-[32px] p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.16), rgba(255, 255, 255, 0.92))',
                border: '1px solid rgba(196, 154, 108, 0.24)',
                boxShadow: '0 14px 36px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.22em]" style={{ color: '#8D6B45' }}>核心差异</p>
                  <h3 className="mt-3 font-heading text-3xl italic leading-tight" style={{ color: '#333333' }}>
                    它不是自动点击器，
                    <br />
                    而是能长期执行的链上角色
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.72 }}>
                    右侧这块补成一张完整的机制卡之后，用户能更直观地看明白签灵和普通 NFT 升级最大的区别：它同时拥有资产、策略和身份三层能力，所以能在多个模块里长期运行，而不是只做一次性动作。
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {spiritActionTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{ background: 'rgba(255,255,255,0.72)', color: '#8D6B45', border: '1px solid rgba(196,154,108,0.2)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {spiritDifferentiators.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] p-4"
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(196,154,108,0.18)' }}
                  >
                    <p className="text-xs tracking-[0.18em]" style={{ color: '#C49A6C' }}>{item.label}</p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.76 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://www.qlwy.xyz/spirit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium transition-transform hover:scale-[1.02]"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            进入签灵
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <Link
            to="/docs?section=spirit"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium"
            style={{ background: '#fff', color: '#333333', border: '1px solid rgba(196, 154, 108, 0.28)' }}
          >
            查看签灵机制
            <BookOpen className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function BattleSection() {
  const battleCards = [
    {
      title: '评分不是纯抽奖',
      desc: '每场对战的核心是有效幸运值与随机数的叠加，稀有度和等级都会真实影响结果，而不是只拼图片稀缺。',
      tags: ['有效幸运值 × 70', '随机值 × 30'],
    },
    {
      title: '等级会持续放大上限',
      desc: '签灵参与战斗后继续获得经验，胜利 +50 经验、失败 +20 经验，成长性是这条玩法链的核心回报。',
      tags: ['胜 +50 EXP', '败 +20 EXP', '0-99 级'],
    },
    {
      title: '幸运加权评分机制',
      desc: '每回合得分 = (幸运值 + 稀有度加成 + 签灵等级加成) × 70% + 随机因素 × 30%，稀有度越高、签灵等级越高，优势越明显。',
      tags: ['稀有 +5', '史诗 +10', '传奇 +15', '神话 +20'],
    },
  ]

  return (
    <section id="battle" className="relative py-24 px-6 md:px-16 lg:px-24" style={{ background: '#333333' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <SectionBadge className="mb-4">高风险成长环</SectionBadge>
          <SectionHeading style={{ color: '#F5F3EB' }}>3v3 对战，不只是展示</SectionHeading>
          <motion.p
            className="mt-4 max-w-3xl mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(245, 243, 235, 0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            潜龙勿用的战斗系统不是一个装饰型 PVP 页面，而是 NFT 生命周期里的真实风险场。签灵上场后，稀有度、幸运值、等级都会影响胜负；输了不仅会失去赌注，甚至可能直接失去 NFT。
          </motion.p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            className="rounded-[32px] p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.12), rgba(196, 154, 108, 0.04))',
              border: '1px solid rgba(196, 154, 108, 0.18)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-[26px] border border-[rgba(196,154,108,0.14)]">
              <img src="/images/section2/战斗下注.png" alt="战斗下注" className="w-full object-cover" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] p-5" style={{ background: 'rgba(245,243,235,0.06)', border: '1px solid rgba(196,154,108,0.14)' }}>
                <p className="text-xs tracking-[0.22em]" style={{ color: 'rgba(245,243,235,0.48)' }}>评分公式</p>
                <p className="mt-3 font-heading text-2xl italic" style={{ color: '#F5F3EB' }}>
                  幸运值 × 70<br />+ 随机值 × 30
                </p>
              </div>
              <div className="rounded-[24px] p-5" style={{ background: 'rgba(245,243,235,0.06)', border: '1px solid rgba(196,154,108,0.14)' }}>
                <p className="text-xs tracking-[0.22em]" style={{ color: 'rgba(245,243,235,0.48)' }}>成长奖励</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(245,243,235,0.76)' }}>
                  胜利 +50 EXP，失败 +20 EXP。参与本身就会推动签灵成长。
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {battleCards.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.12), rgba(196, 154, 108, 0.04))',
                  border: '1px solid rgba(196, 154, 108, 0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
              initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex gap-5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: 'rgba(196, 154, 108, 0.15)' }}
                  >
                    <Sword className="h-7 w-7" style={{ color: '#C49A6C' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-xl italic mb-2" style={{ color: '#F5F3EB' }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(245, 243, 235, 0.68)' }}>
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ background: 'rgba(196, 154, 108, 0.25)', color: '#C49A6C' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="mt-10 text-center">
          <motion.a
            href="https://www.qlwy.xyz/battle"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-sm font-medium"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            进入对战
            <ArrowUpRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function PredictionSection() {
  const features = [
    { title: 'USD1 统一结算', desc: '所有买入、卖出与最终结算都围绕 USD1 展开，减少理解门槛。', icon: 'USD1' },
    { title: '任何人可加流动性', desc: '市场创建后可继续追加补贴，增加 b 值并分享结算后的剩余流动性收益。', icon: 'LP' },
    { title: '创作者也有动力', desc: '每笔交易都会给创建者 1% 手续费，高质量话题因此更有持续运营动力。', icon: '1%' },
    { title: '无效结果兜底', desc: '当结果不可判定或创建者超时未结算时，系统仍有无效结果与争议流程兜底。', icon: 'SAFE' },
  ]

  const marketPhases = [
    { label: '待创建', color: '#6b7280' },
    { label: '交易中', color: '#22c55e' },
    { label: '争议期', color: '#eab308' },
    { label: '仲裁中', color: '#f97316' },
    { label: '已结算', color: '#8D6B45' },
  ]

  return (
    <section id="prediction" className="relative py-24 px-6 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <SectionBadge className="mb-4" style={{ color: '#C49A6C' }}>第二增长曲线</SectionBadge>
          <SectionHeading style={{ color: '#333333' }}>预测市场</SectionHeading>
          <motion.p
            className="mt-4 max-w-3xl mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(51, 51, 51, 0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            潜龙勿用的预测市场不是单纯增加一个“下注页”，而是把高稀有 NFT、协议结算与社区治理串成第二条主线。它用 LMSR 解决长尾命题也要可交易的问题，再通过争议期和神话仲裁去保证最终可信度。
          </motion.p>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            className="rounded-3xl p-7"
            style={{
              background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))',
              border: '1px solid rgba(196, 154, 108, 0.28)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-heading text-2xl italic" style={{ color: '#333333' }}>为什么用 LMSR</h3>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.74 }}>
              <p>1. 不依赖对手盘挂单，市场创建后就能立刻交易。</p>
              <p>2. 长尾命题也有流动性，更适合无许可创建的中文市场。</p>
              <p>3. 用参数 `b` 管理价格灵敏度与滑点，而不是完全靠运营“养深度”。</p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl p-7"
            style={{
              background: '#fff',
              border: '1px solid rgba(196, 154, 108, 0.22)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.05)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h3 className="mb-4 font-heading text-2xl italic" style={{ color: '#333333' }}>三层结算与信任结构</h3>
            <div className="space-y-3">
              {[
                '创建者先提交结果，承担第一层结算责任',
                '到期后进入 24 小时争议窗口，社区可对结果提出质疑',
                '如进入仲裁，则由神话持有者投票决定最终结果',
              ].map((line) => (
                <div key={line} className="flex gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(196, 154, 108, 0.08)' }}>
                  <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#C49A6C' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.74 }}>{line}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-12">
          <h3 className="text-center font-heading text-xl italic mb-6" style={{ color: '#C49A6C' }}>市场生命周期</h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {marketPhases.map((phase, i) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: phase.color, color: '#fff', minWidth: '102px', textAlign: 'center' }}
                >
                  {phase.label}
                </div>
                {i < marketPhases.length - 1 && (
                  <span className="text-lg" style={{ color: '#C49A6C' }}>→</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#fff',
                border: '1px solid rgba(196, 154, 108, 0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-[11px] font-semibold tracking-[0.12em]"
                style={{ background: 'rgba(196, 154, 108, 0.12)', color: '#C49A6C' }}
              >
                {f.icon}
              </div>
              <h4 className="font-heading text-lg italic mb-2" style={{ color: '#333333' }}>{f.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: '#333333', opacity: 0.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 text-center">
          <motion.a
            href="https://yc.qlwy.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-sm font-medium"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            进入预测市场
            <ArrowUpRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 rounded-full transition-colors hover:bg-white/10"
          style={{ color: '#F5F3EB' }}
        >
          <X className="h-6 w-6" />
        </button>
        <img src={src} alt={alt} className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" />
      </motion.div>
    </motion.div>
  )
}

function FeaturedNFTSection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const rarityTiers = [
    {
      label: '普通',
      img: '/images/section2/rank/普通卦.png',
      probability: '85.9%',
      mintFee: '不可铸造',
      rights: ['停留在结果层', '不进入奖池与成长线'],
    },
    {
      label: '稀有',
      img: '/images/section2/rank/稀有卦.png',
      probability: '10%',
      mintFee: '50 潜龙勿用',
      rights: ['正式进入资产层', '可升级为签灵', '可作为精炼起点'],
    },
    {
      label: '史诗',
      img: '/images/section2/rank/史诗卦.png',
      probability: '3%',
      mintFee: '100 潜龙勿用',
      rights: ['更强战斗潜力', '更高成长价值', '可精炼至传奇'],
    },
    {
      label: '传奇',
      img: '/images/section2/rank/传奇卦.png',
      probability: '1%',
      mintFee: '500 潜龙勿用',
      rights: ['高阶战斗单位', '更低战败销毁概率', '冲击神话前置'],
    },
    {
      label: '神话',
      img: '/images/section2/rank/神话卦.avif',
      probability: '0.1%',
      mintFee: '2000 潜龙勿用',
      rights: ['触发并分享奖池', '可参与预测市场仲裁', '总上限 88 个'],
    },
  ]

  const rarityColors: Record<string, string> = {
    '神话': '#712aa9',
    '传奇': '#8c641f',
    '史诗': '#8e4d3e',
    '稀有': '#2a3873',
    '普通': '#6b7280',
  }

  const rarityBackgrounds: Record<string, string> = {
    '神话': 'linear-gradient(135deg, rgba(113, 42, 169, 0.34), rgba(245, 243, 235, 0.08))',
    '传奇': 'linear-gradient(135deg, rgba(140, 100, 31, 0.32), rgba(245, 243, 235, 0.08))',
    '史诗': 'linear-gradient(135deg, rgba(142, 77, 62, 0.3), rgba(245, 243, 235, 0.08))',
    '稀有': 'linear-gradient(135deg, rgba(42, 56, 115, 0.3), rgba(245, 243, 235, 0.08))',
    '普通': 'linear-gradient(135deg, rgba(107, 114, 128, 0.22), rgba(245, 243, 235, 0.06))',
  }

  return (
    <section id="nft" className="relative px-6 py-24 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#333333' }}>
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C49A6C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.4) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.3) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 max-w-3xl">
          <SectionBadge style={{ background: 'rgba(196, 154, 108, 0.2)', color: '#C49A6C', border: '1px solid rgba(196, 154, 108, 0.4)' }}>
            资产层结构
          </SectionBadge>
          <SectionHeading className="mt-4" style={{ color: '#F5F3EB' }}>
            五级稀有度，对应五层权益
          </SectionHeading>
          <p className="mt-5 text-base leading-relaxed" style={{ color: '#F5F3EB', opacity: 0.72 }}>
            潜龙勿用的卦象卡牌NFT不只是“好看的卡片”。不同稀有度不仅决定图片和稀缺性，更决定你能不能进入签灵成长线、能否承担更低战败风险，以及最终是否拥有奖池与预测市场仲裁权。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {rarityTiers.map((tier, index) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="rounded-[28px] p-5"
              style={{
                background: rarityBackgrounds[tier.label],
                border: `1px solid ${rarityColors[tier.label]}40`,
                boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${rarityColors[tier.label]}20`, color: rarityColors[tier.label] }}>
                  {tier.label}级
                </span>
                <span className="text-xs" style={{ color: 'rgba(245,243,235,0.5)' }}>
                  概率 {tier.probability}
                </span>
              </div>

              <div
                className="mb-4 overflow-hidden rounded-2xl cursor-pointer transition-transform hover:scale-105"
                style={{ background: 'rgba(245,243,235,0.06)' }}
                onClick={() => setSelectedImage({ src: tier.img, alt: tier.label })}
              >
                <img src={tier.img} alt={tier.label} className="h-full w-full object-contain" />
              </div>

              <h3 className="font-heading text-2xl italic" style={{ color: '#F5F3EB' }}>
                {tier.label}
              </h3>
              <p className="mt-1 text-xs" style={{ color: 'rgba(245,243,235,0.52)' }}>
                铸签成本：{tier.mintFee}
              </p>

              <div className="mt-4 space-y-2">
                {tier.rights.map((line) => (
                  <div key={line} className="flex gap-2 text-sm" style={{ color: 'rgba(245,243,235,0.76)' }}>
                    <span style={{ color: rarityColors[tier.label] }}>•</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://element.market/collections/qlwy-fortune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium transition-all hover:scale-[1.02]"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            查看 NFT 市场
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <Link
            to="/docs?section=assets"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-4 font-medium transition-all hover:scale-[1.02]"
            style={{ borderColor: 'rgba(196, 154, 108, 0.35)', color: '#C49A6C' }}
          >
            阅读资产机制
            <BookOpen className="h-5 w-5" />
          </Link>
        </div>

        {/* 炼签合成区域 */}
        <div className="mt-16 rounded-3xl p-8" style={{ background: 'rgba(245,243,235,0.05)', border: '1px solid rgba(196,154,108,0.2)' }}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="/images/section2/炼签炉.png"
                alt="炼签炉"
                className="h-32 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedImage({ src: '/images/section2/炼签炉.png', alt: '炼签炉' })}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-2xl italic mb-3" style={{ color: '#F5F3EB' }}>
                炼签 · 合成
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,243,235,0.7)' }}>
                集齐 3 张同稀有度卦象卡牌，可投入炼签炉尝试合成更高稀有度。成功则获得目标稀有度 NFT（投入的 3 张燃烧）；失败则获得灰烬作为补偿，灰烬可提高下次合成成功率。每 1 灰烬增加 1.25% 成功概率，最高 +15%。
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                {[
                  { from: '稀有', to: '史诗', rate: '60%', fee: '200 QLWY' },
                  { from: '史诗', to: '传奇', rate: '30%', fee: '800 QLWY' },
                  { from: '传奇', to: '神话', rate: '15%', fee: '5000 QLWY' },
                ].map((item) => (
                  <div
                    key={item.from}
                    className="rounded-full px-4 py-2"
                    style={{ background: 'rgba(196,154,108,0.15)', color: '#C49A6C', border: '1px solid rgba(196,154,108,0.25)' }}
                  >
                    {item.from} → {item.to}：基础 {item.rate} · 费用 {item.fee}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function StatsSection() {
  return (
    <section id="stats" className="px-6 py-20" style={{ background: 'rgba(196, 154, 108, 0.08)' }}>
      <div className="mx-auto max-w-5xl">
        <div
          className="rounded-3xl p-12 md:p-16"
          style={{ background: '#F5F3EB', border: '1px solid rgba(196, 154, 108, 0.3)' }}
        >
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="font-heading text-3xl italic md:text-4xl" style={{ color: '#C49A6C' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#333333', opacity: 0.6 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section className="relative min-h-[600px] px-6 py-24 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-16">
          <SectionBadge className="mb-6" style={{ color: '#C49A6C' }}>新手路径</SectionBadge>
          <SectionHeading>三步进入潜龙生态</SectionHeading>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: '01', title: '先卜一卦', desc: '支付 BNB 发起卜卦，请求 VRF 随机，得到卦象、幸运值与稀有度结果。' },
            { step: '02', title: '稀有及以上再铸签', desc: '如果结果达到稀有及以上，再支付潜龙勿用代币铸造成卦象卡牌NFT，真正进入资产层。' },
            { step: '03', title: '选择成长路线', desc: '继续精炼升阶、升级成签灵、参加对战，或者把神话级资产带入预测市场治理。' },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-4">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-heading italic"
                style={{ background: '#C49A6C', color: '#F5F3EB' }}
              >
                {item.step}
              </div>
              <h3 className="font-heading text-xl italic" style={{ color: '#333333' }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: '#333333', opacity: 0.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <a
          href="https://www.qlwy.xyz/fortune"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium"
          style={{ background: '#C49A6C', color: '#F5F3EB' }}
        >
          从卜卦开始
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}

const docSections = [
  {
    id: 'overview',
    title: '项目定位',
    icon: Sparkles,
    content: '以易经叙事为世界观、以卦象卡牌NFT为资产底座、以签灵为执行引擎的链上应用型 Meme / 游戏协议。',
    details: [
      '两条主线并行：卜卦-NFT 与 预测-仲裁',
      '神话级是顶层权益资产',
      '签灵负责自动化执行',
      '奖池负责全局价值放大',
    ],
  },
  {
    id: 'entry',
    title: '入口机制',
    icon: Sparkles,
    content: '用户先发起卜卦请求，由 VRF 返回卦象与运势；只有稀有及以上结果才进入铸签决策，这也是整个生态的真实入口。',
    details: [
      'BNB 请求 + VRF 返回结果',
      '稀有及以上才能铸造成正式 NFT',
      '冷却与免费额度负责控节奏',
      '从这里分流到奖池、签灵与精炼',
    ],
  },
  {
    id: 'assets',
    title: '资产层与稀有度',
    icon: Shield,
    content: 'FortuneCore 定义了六爻、卦象、幸运值与稀有度等资产结构，五级稀有度决定了 NFT 在生态里的玩法边界与权益层级。',
    details: [
      '64 卦构成文化表达层',
      '从普通到神话共五级',
      '稀有及以上是高阶玩法门槛',
      '神话级向奖池与仲裁延伸',
    ],
  },
  {
    id: 'jackpot',
    title: '奖池机制',
    icon: Coins,
    content: '奖池在神话级铸造时触发，而不是按日开奖。它把稀有事件转化为全生态共享的价值结算时刻。',
    details: [
      '50% 给当前神话级铸造者',
      '30% 给已有神话持有者',
      '20% 留存滚入下一轮',
      '88 个神话级后进入终局分配',
    ],
  },
  {
    id: 'spirit',
    title: '签灵',
    icon: Users,
    content: '稀有及以上 NFT 可以升级成符合 BAP-578 的签灵，把用户从手动点击推进到“设策略、让签灵长期执行”。',
    details: [
      '拥有独立身份与签灵金库',
      '0-99 级成长与长期养成',
      '支持自动战斗、下注、卜卦、铸签',
      '不可转让，权限边界清晰',
    ],
  },
  {
    id: 'battle',
    title: '对战系统',
    icon: Sword,
    content: '3v3 对战是高风险的资源消耗与成长模块。幸运值、等级与稀有度共同影响胜率，失败方要承担销毁风险。',
    details: [
      '有效幸运值 × 70 + 随机值 × 30',
      '等级与稀有度都会提高战力',
      '失败会带来真实资产风险',
      '经验值反哺签灵成长',
    ],
  },
  {
    id: 'prediction',
    title: '预测市场',
    icon: TrendingUp,
    content: '预测市场使用 LMSR 而不是订单簿，重点是让长尾、任何人都可创建的事件从创建第一刻起就能交易。',
    details: [
      'YES/NO 结构 + USD1 计价',
      'LMSR 适合长尾事件流动性',
      '创建、交易、争议、仲裁、结算',
      '与神话仲裁机制深度耦合',
    ],
  },
  {
    id: 'governance',
    title: '仲裁与治理',
    icon: Shield,
    content: '神话级不只是稀有收藏品，也是协议可信度与最终裁决权的承载体。预测市场的争议，最终依赖这一层来完成结算。',
    details: [
      '争议市场进入专门仲裁流程',
      '仲裁员由神话级 NFT + 潜龙勿用代币质押构成',
      '仲裁费会分配给有效参与者',
      '把稀有资产升级成治理资产',
    ],
  },
  {
    id: 'refinery',
    title: '精炼系统',
    icon: Coins,
    content: '精炼负责消化低稀有 NFT 库存，通过 3 合 1 的方式把资产向更高等级压缩，并用灰烬做失败缓冲。',
    details: [
      '3 张同稀有度 NFT 才能精炼',
      '成功率逐级下降',
      '失败返还灰烬',
      '灰烬可提高后续成功率',
    ],
  },
  {
    id: 'token',
    title: '代币与质押',
    icon: Coins,
    content: '潜龙勿用是生态的实用型 / 治理型代币，参与铸签、升级、精炼、质押与部分治理；质押又把协议活动和长期持有者绑定在一起。',
    details: [
      '用于铸签、升级、精炼等高频行为',
      '质押收益以 BNB 形式发放',
      '解质押存在成本约束',
      '是进入高阶玩法的重要门票',
    ],
  },
  {
    id: 'architecture',
    title: '技术架构',
    icon: BarChart3,
    content: '潜龙勿用把可验证随机数、签灵标准、LMSR 市场和 BSC 低成本执行环境拼成了一套可落地的链上产品架构。',
    details: [
      'BSC 承接高频低成本交互',
      'Chainlink VRF 提供可验证随机数',
      'FortuneCore + Casting + Renderer 构成资产层',
      'SpiritLogic + SpiritAgent 负责自动化执行',
    ],
  },
]

// Get tagged tweets for featured articles section
interface FeaturedArticle {
  id: string
  author: string
  authorHandle: string
  authorAvatar?: string
  title?: string
  content: string
  publishTime: string
  mediaUrl?: string
  originalUrl: string
  tags?: string[]
}

interface FeaturedArticleData {
  authors: Record<string, unknown>
  tweets: FeaturedArticle[]
}

interface CommunityFeaturedArticleData {
  authors: Record<string, unknown>
  tweets: FeaturedArticle[]
}

const featuredInsights = (officialTweetsData as FeaturedArticleData).tweets.slice(0, 3)
const featuredCommunityArticles = (communityTweetsData as CommunityFeaturedArticleData).tweets
  .filter((tweet) => tweet.tags && tweet.tags.length > 0)
  .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
  .slice(0, 3)

function getCommunityHeadline(tweet: FeaturedArticle) {
  const firstLine = tweet.content
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean)

  if (!firstLine) return '社区精选文章'
  return firstLine.length > 28 ? `${firstLine.slice(0, 28)}...` : firstLine
}

function FeaturedArticlesSection() {
  if (featuredInsights.length === 0) return null

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
    } catch {
      return ''
    }
  }

  return (
    <section className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionBadge className="mb-4" style={{ color: '#C49A6C' }}>
            机制文章
          </SectionBadge>
          <SectionHeading>先读官方深度文章</SectionHeading>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: '#333333', opacity: 0.7 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            首页更适合优先把“项目为什么成立、机制为什么这样设计”讲清楚。下面这些官方文章，基本就是理解潜龙勿用产品闭环的最快入口。
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredInsights.map((tweet, index) => (
            <motion.a
              key={tweet.id}
              href={tweet.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="h-full rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  {tweet.authorAvatar ? (
                    <img
                      src={tweet.authorAvatar}
                      alt={tweet.author}
                      className="h-10 w-10 rounded-full object-cover"
                      style={{ border: '2px solid rgba(196, 154, 108, 0.3)' }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(196, 154, 108, 0.15)' }}>
                      <User className="h-5 w-5" style={{ color: '#C49A6C' }} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#333333' }}>{tweet.author}</p>
                    <p className="text-xs" style={{ color: '#333333', opacity: 0.5 }}>{tweet.authorHandle}</p>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  {tweet.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ background: 'rgba(196, 154, 108, 0.15)', color: '#C49A6C' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-3 font-heading text-2xl italic leading-tight" style={{ color: '#333333' }}>
                  {tweet.title ?? '官方机制文章'}
                </h3>

                <p className="mb-4 line-clamp-5 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.8 }}>
                  {tweet.content}
                </p>

                {tweet.mediaUrl && (
                  <div className="mb-4 -mx-2">
                    <img src={tweet.mediaUrl} alt="" className="h-40 w-full rounded-lg object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
                  <div className="flex items-center gap-1 text-xs" style={{ color: '#333333', opacity: 0.5 }}>
                    <Clock className="h-3 w-3" />
                    {formatTime(tweet.publishTime)}
                  </div>
                  <div className="flex items-center gap-1 text-xs transition-colors" style={{ color: '#C49A6C' }}>
                    查看全文
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium transition-all hover:scale-105"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            <BookOpen className="h-5 w-5" />
            查看完整文档与文章
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function CommunityFeaturedSection() {
  if (featuredCommunityArticles.length === 0) return null

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
    } catch {
      return ''
    }
  }

  return (
    <section className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionBadge className="mb-4" style={{ color: '#C49A6C' }}>
            社区精选
          </SectionBadge>
          <SectionHeading>来自社区的精选解读</SectionHeading>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: '#333333', opacity: 0.7 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            这些文章来自 `/docs` 里的社区文章区，且已经打过标签。适合放在首页单独展示，让用户快速看到外部视角下的项目理解、生态关注和传播信号。
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredCommunityArticles.map((tweet, index) => (
            <motion.a
              key={tweet.id}
              href={tweet.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="h-full rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  {tweet.authorAvatar ? (
                    <img
                      src={tweet.authorAvatar}
                      alt={tweet.author}
                      className="h-10 w-10 rounded-full object-cover"
                      style={{ border: '2px solid rgba(196, 154, 108, 0.3)' }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(196, 154, 108, 0.15)' }}>
                      <User className="h-5 w-5" style={{ color: '#C49A6C' }} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#333333' }}>{tweet.author}</p>
                    <p className="text-xs" style={{ color: '#333333', opacity: 0.5 }}>{tweet.authorHandle}</p>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  {tweet.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ background: 'rgba(196, 154, 108, 0.15)', color: '#C49A6C' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-3 font-heading text-2xl italic leading-tight" style={{ color: '#333333' }}>
                  {getCommunityHeadline(tweet)}
                </h3>

                <p className="mb-4 line-clamp-5 text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.8 }}>
                  {tweet.content}
                </p>

                {tweet.mediaUrl && (
                  <div className="mb-4 -mx-2">
                    <img src={tweet.mediaUrl} alt="" className="h-40 w-full rounded-lg object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
                  <div className="flex items-center gap-1 text-xs" style={{ color: '#333333', opacity: 0.5 }}>
                    <Clock className="h-3 w-3" />
                    {formatTime(tweet.publishTime)}
                  </div>
                  <div className="flex items-center gap-1 text-xs transition-colors" style={{ color: '#C49A6C' }}>
                    阅读原文
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/docs?section=community"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium transition-all hover:scale-105"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            <Twitter className="h-5 w-5" />
            查看更多社区文章
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function DocsSection() {
  return (
    <section id="docs" className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#333333' }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <SectionBadge style={{ background: 'rgba(196, 154, 108, 0.2)', color: '#C49A6C', border: '1px solid rgba(196, 154, 108, 0.4)' }}>
            技术文档
          </SectionBadge>
          <SectionHeading style={{ color: '#F5F3EB' }}>玩转潜龙勿用</SectionHeading>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(245, 243, 235, 0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            从入口机制、资产层到签灵、预测与仲裁，快速建立对潜龙勿用项目闭环的整体理解。
          </motion.p>
        </div>

        {/* Docs Teaser Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {docSections.slice(0, 4).map((section, i) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.id}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(245, 243, 235, 0.05)',
                  border: '1px solid rgba(196, 154, 108, 0.2)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(196, 154, 108, 0.15)' }}
                >
                  <Icon className="h-7 w-7" style={{ color: '#C49A6C' }} />
                </div>
                <h3 className="font-heading text-lg italic mb-2" style={{ color: '#F5F3EB' }}>{section.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(245, 243, 235, 0.6)' }}>
                  {section.content.slice(0, 60)}...
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium transition-all hover:scale-105"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            <BookOpen className="h-5 w-5" />
            查看完整文档
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="cta" className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#333333' }}>
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, #C49A6C 0%, transparent 50%), radial-gradient(circle at 70% 50%, #C49A6C 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center space-y-8">
        <SectionHeading style={{ color: '#F5F3EB' }}>
          潜龙在渊<br />待时而动
        </SectionHeading>
        <p className="text-lg" style={{ color: '#F5F3EB', opacity: 0.8 }}>
          立即加入，与万千易道爱好者一同探索千年智慧与前沿科技的完美融合
        </p>
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
          <Link
            to="/whitepaper"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            下载白皮书
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <a
            href="https://t.me/qlwyxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-medium"
            style={{ borderColor: 'rgba(196, 154, 108, 0.6)', color: '#C49A6C' }}
          >
            加入社区
          </a>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="overflow-visible" style={{ background: '#F5F3EB' }}>
            <Navbar />
            <SideNav />
            <HeroSection />
            <DivinationSection />
            <FeaturedNFTSection />
            <SpiritSection />
            <BattleSection />
            <PredictionSection />
            <FeaturedArticlesSection />
            <CommunityFeaturedSection />
            <DocsSection />
            {/* <StatsSection /> */}
            <HowItWorksSection />
            {/* <CTASection /> */}
            <Footer />
          </div>
        }
      />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/whitepaper" element={<WhitepaperPage />} />
    </Routes>
  )
}

export default App
