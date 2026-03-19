import { PropsWithChildren, useState, useEffect } from 'react'
import { ArrowUpRight, Sparkles, Sword, Gift, Users, Lock, TrendingUp, ArrowUp, FileText, Zap, X } from 'lucide-react'
import { motion } from 'motion/react'
import { BlurText } from '@/components/BlurText'
import { VideoBackground } from '@/components/VideoBackground'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: '首页', href: '#home' },
  { label: '文档', href: '#docs' },
  { label: '预测市场', href: '#market' },
  { label: '联系', href: '#contact' },
]

const modules = [
  {
    id: 'divination',
    icon: Sparkles,
    title: '卜卦',
    shortDesc: '摇签问卦，得天指引',
    fullDesc: '摇签问卦，得天指引。易经六十四卦，洞悉万事万物之理。每一卦都蕴含着宇宙运行的奥秘，通过古老的蓍草占卜法或硬币占卜法，寻求天人之际的智慧指引。',
    accent: true,
  },
  {
    id: 'lottery',
    icon: Gift,
    title: '奖池开奖',
    shortDesc: '每日开奖，福运临门',
    fullDesc: '每日开奖，福运临门。丰厚奖池，惊喜不断。每晚八点准时开奖，众多奖项等待有缘人。参与方式简单，中奖概率透明，公平公正公开。',
    accent: false,
  },
  {
    id: 'market',
    icon: TrendingUp,
    title: '预测市场',
    shortDesc: '预知未来，把握机遇',
    fullDesc: '预知未来，把握机遇。洞察趋势，先人一步。通过预测市场，用户可以对未来事件的结果进行投注。准确预判趋势的用户将获得丰厚奖励，让知识与洞察转化为收益。',
    accent: false,
  },
  {
    id: 'battle',
    icon: Sword,
    title: 'NFT 对战',
    shortDesc: '灵兽对决，策略博弈',
    fullDesc: '灵兽对决，策略博弈。以智取胜，以巧夺魁。收集和培养你的灵兽，在竞技场中与其他玩家对战。根据灵兽的属性和技能，制定最优策略，夺取荣耀和奖励。',
    accent: true,
  },
  {
    id: 'signin',
    icon: Users,
    title: '签灵',
    shortDesc: '每日签到，凝聚灵力',
    fullDesc: '每日签到，凝聚灵力。签满七日，召唤神秘灵兽。坚持每日签到可积累灵力值，连续签到七天即可召唤一只随机灵兽 NFT。断签会清零，重新计算。',
    accent: false,
  },
  {
    id: 'staking',
    icon: Lock,
    title: '质押',
    shortDesc: '质押生息，稳中求进',
    fullDesc: '质押生息，稳中求进。让您的资产静默增值。将您的代币质押在合约中，即可获得每日利息收益。质押时间越长，收益率越高。随时可取，灵活便捷。',
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

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full px-6 py-3"
        style={{ background: 'rgba(245, 243, 235, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(196, 154, 108, 0.3)' }}
      >
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="潜龙勿用" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex justify-center">
          <div className="flex items-center gap-12">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="relative font-body text-sm font-medium transition-all duration-200 hover:scale-105 group"
                style={{ color: '#333333' }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#C49A6C] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.a
          href="https://your-dapp-link.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium"
          style={{ background: '#C49A6C', color: '#F5F3EB' }}
        >
          立即开始
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </nav>
  )
}

const sideNavItems = [
  { id: 'home', label: '顶部', icon: ArrowUp },
  { id: 'divination', label: '占卦', icon: Sparkles },
  { id: 'battle', label: '签灵', icon: Sword },
  { id: 'prediction', label: '预测市场', icon: TrendingUp },
  { id: 'nft', label: 'NFT市场', icon: Gift },
  { id: 'stats', label: '用户量', icon: Users },
  { id: 'cta', label: '开始', icon: Zap },
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
      className="fixed left-4 z-50 flex flex-col gap-2"
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
            href="https://your-dapp-link.com"
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
      initial={{
        opacity: 0,
        scale: 0.3,
        rotate: -180,
        x: 0,
        y: 0,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
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
            href={`https://your-dapp-link.com/${module.id}`}
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
  return (
    <section id="divination" className="relative min-h-screen py-24 overflow-hidden" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionHeading>卜卦</SectionHeading>
          <div className="mt-4 max-w-2xl mx-auto relative">
            <motion.p
              className="text-sm leading-relaxed px-10 py-3 text-center rounded-full border"
              style={{ color: '#333333', opacity: 0.7, borderColor: 'rgba(196, 154, 108, 0.4)' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              摇签问卦，得天指引。易经六十四卦，洞悉万事万物之理。
            </motion.p>
          </div>
        </div>

        {/* Main visual + content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Visual with guijia as main, luopan as background */}
          <div className="relative flex flex-col items-center">
            {/* Luopan as background */}
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

              {/* Guijia as foreground image centered on luopan */}
              <motion.img
                src="/images/section1/guijia.png"
                alt="卦象"
                className="absolute inset-0 m-auto w-[75%] h-[75%] object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              {/* Three coins positioned in semi-circle at bottom */}
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

          {/* Right: Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-heading text-3xl italic mb-3" style={{ color: '#333333' }}>
                蓍草占卜
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#333333', opacity: 0.7 }}>
                卜卦费用分配至奖池，部分注入质押池，质押收益持续增值。
              </p>
            </motion.div>

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
              style={{ background: '#C49A6C', color: '#F5F3EB' }}
            >
              开始卜卦
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        {/* Bottom features: 奖池 + 质押 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 奖池 */}
          <motion.div
            className="relative rounded-3xl overflow-hidden p-8"
            style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))', border: '1px solid rgba(196, 154, 108, 0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <img src="/images/section1/ding.png" alt="奖池" className="w-20 h-20" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading text-2xl italic mb-2" style={{ color: '#333333' }}>奖池开奖</h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#333333', opacity: 0.6 }}>
                  每日开奖，福运临门。丰厚奖池，惊喜不断。每晚八点准时开奖，众多奖项等待有缘人。
                </p>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: '#C49A6C' }}>
                  查看详情 <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* 质押 */}
          <motion.div
            className="relative rounded-3xl overflow-hidden p-8"
            style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))', border: '1px solid rgba(196, 154, 108, 0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <img src="/images/section1/pool.png" alt="质押" className="w-20 h-20" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading text-2xl italic mb-2" style={{ color: '#333333' }}>质押生息</h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#333333', opacity: 0.6 }}>
                  质押生息，稳中求进。让您的资产静默增值。质押时间越长，收益率越高。
                </p>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: '#C49A6C' }}>
                  查看详情 <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BattleSection() {
  const rarities = [
    { name: '普通卦', img: '/images/section2/rank/普通卦.png', rate: '基础' },
    { name: '稀有卦', img: '/images/section2/rank/稀有卦.png', rate: '45%' },
    { name: '史诗卦', img: '/images/section2/rank/史诗卦.png', rate: '20%' },
    { name: '传奇卦', img: '/images/section2/rank/传奇卦.png', rate: '8%' },
    { name: '神话卦', img: '/images/section2/rank/神话卦.avif', rate: '顶级' },
  ]

  const features = [
    { img: '/images/section2/炼签炉.png', title: '炼签炉', desc: '3个同等级卦象+手续费，概率升至更高等级', tags: ['稀有45%', '史诗20%', '传奇8%'] },
    { img: '/images/section2/战斗下注.png', title: '3v3 对战', desc: '灵力值+运气综合决胜，等级越高幸运加成越多', tags: ['胜利奖励', '参与经验'] },
    { img: '/images/section2/等级系统.png', title: '签灵觉醒', desc: '升级为签灵解锁等级，等级÷2=幸运加成', tags: ['上限99级', 'QLWY升级'] },
    { img: '/images/section2/签灵自动对战设置.png', title: '自动作战', desc: '设置后签灵自动对战/下注/卜卦/mint', tags: ['自动对战', '自动下注', '自动mint'] },
  ]

  return (
    <section id="battle" className="relative py-24 px-6 md:px-16 lg:px-24" style={{ background: '#333333' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <SectionBadge className="mb-4">博弈之争</SectionBadge>
          <SectionHeading style={{ color: '#F5F3EB' }}>签灵·对战</SectionHeading>
          <motion.p
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(245, 243, 235, 0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            卦象五重进化，炼签升级。签灵觉醒，自动为我作战。
          </motion.p>
        </div>

        <div className="mb-12">
          <h3 className="text-center font-heading text-xl italic mb-6" style={{ color: '#C49A6C' }}>卦象进化之路</h3>
          <div className="flex items-center justify-center gap-3">
            {rarities.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.2), rgba(196, 154, 108, 0.05))',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <img src={r.img} alt={r.name} className="w-14 h-14 object-contain" />
                </div>
                <p className="text-xs text-center mt-2" style={{ color: '#F5F3EB', opacity: 0.8 }}>{r.name}</p>
                {i < rarities.length - 1 && (
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-lg" style={{ color: '#C49A6C' }}>→</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
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
                  className="w-24 h-24 rounded-2xl shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(196, 154, 108, 0.15)' }}
                >
                  <img src={f.img} alt={f.title} className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-xl italic mb-2" style={{ color: '#F5F3EB' }}>{f.title}</h4>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(245, 243, 235, 0.6)' }}>
                    {f.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map(tag => (
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

        <motion.div
          className="mt-10 rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(196, 154, 108, 0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src="/images/section2/签灵对话.png" alt="签灵对话" className="w-full object-cover" style={{ maxHeight: '200px' }} />
        </motion.div>

        <motion.div className="mt-10 text-center">
          <motion.a
            href="#"
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
    { title: '创建市场', desc: '任何人都可创建预测市场，设置事件与到期时间', icon: '📊' },
    { title: 'YES/NO 交易', desc: '买入YES或NO份额，实时价格由LMSR做市商模型计算', icon: '💰' },
    { title: '24小时争议期', desc: '结果公布后进入争议期，可申请仲裁', icon: '⚖️' },
    { title: '神话卦仲裁', desc: '神话NFT持有者投票决定争议结果', icon: '🔮' },
  ]

  const marketPhases = [
    { label: '交易中', color: '#22c55e' },
    { label: '争议期', color: '#eab308' },
    { label: '仲裁中', color: '#f97316' },
    { label: '已结算', color: '#6b7280' },
  ]

  return (
    <section id="prediction" className="relative py-24 px-6 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <SectionBadge className="mb-4">预见未来</SectionBadge>
          <SectionHeading style={{ color: '#333333' }}>预测市场</SectionHeading>
          <motion.p
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(51, 51, 51, 0.7)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            预测未来事件结果，通过LMSR做市商模型交易YES/NO份额，把握趋势赢取奖励。
          </motion.p>
        </div>

        <div className="mb-12">
          <h3 className="text-center font-heading text-xl italic mb-6" style={{ color: '#C49A6C' }}>市场生命周期</h3>
          <div className="flex items-center justify-center gap-2">
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
                  style={{ background: phase.color, color: '#fff' }}
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

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            className="rounded-3xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))',
              border: '1px solid rgba(196, 154, 108, 0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-heading text-2xl italic mb-4" style={{ color: '#333333' }}>做市商机制</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[rgba(196,154,108,0.2)]">
                <span className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>YES 价格</span>
                <span className="font-medium" style={{ color: '#22c55e' }}>实时计算</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[rgba(196,154,108,0.2)]">
                <span className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>NO 价格</span>
                <span className="font-medium" style={{ color: '#ef4444' }}>实时计算</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[rgba(196,154,108,0.2)]">
                <span className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>流动性深度</span>
                <span className="font-medium" style={{ color: '#3b82f6' }}>动态增减</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))',
              border: '1px solid rgba(196, 154, 108, 0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-heading text-2xl italic mb-4" style={{ color: '#333333' }}>手续费结构</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[rgba(196,154,108,0.2)]">
                <span className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>创建者费用</span>
                <span className="font-medium" style={{ color: '#C49A6C' }}>1%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[rgba(196,154,108,0.2)]">
                <span className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>协议费用</span>
                <span className="font-medium" style={{ color: '#C49A6C' }}>1%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[rgba(196,154,108,0.2)]">
                <span className="text-sm" style={{ color: '#333333', opacity: 0.8 }}>LP 奖励</span>
                <span className="font-medium" style={{ color: '#C49A6C' }}>1%</span>
              </div>
            </div>
          </motion.div>
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
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-heading text-lg italic mb-2" style={{ color: '#333333' }}>{f.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: '#333333', opacity: 0.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 text-center">
          <motion.a
            href="#"
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

function FeaturedNFTSection() {
  const nftCards = [
    { name: '乾卦', level: '神话', img: '/images/section2/rank/神话卦.avif', rare: '顶级' },
    { name: '坤卦', level: '传奇', img: '/images/section2/rank/传奇卦.png', rare: '8%' },
    { name: '震卦', level: '史诗', img: '/images/section2/rank/史诗卦.png', rare: '20%' },
    { name: '巽卦', level: '稀有', img: '/images/section2/rank/稀有卦.png', rare: '45%' },
    { name: '坎卦', level: '普通', img: '/images/section2/rank/普通卦.png', rare: '基础' },
    { name: '离卦', level: '稀有', img: '/images/section2/rank/稀有卦.png', rare: '45%' },
  ]

  const rarityColors: Record<string, string> = {
    '神话': '#f97316',
    '传奇': '#a855f7',
    '史诗': '#3b82f6',
    '稀有': '#22c55e',
    '普通': '#6b7280',
  }

  return (
    <section id="nft" className="relative px-6 py-24 md:px-16 lg:px-24 overflow-hidden" style={{ background: '#333333' }}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C49A6C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* 光晕装饰 */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.4) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(196,154,108,0.3) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <SectionBadge style={{ background: 'rgba(196, 154, 108, 0.2)', color: '#C49A6C', border: '1px solid rgba(196, 154, 108, 0.4)' }}>
              限量首发
            </SectionBadge>
            <SectionHeading className="text-foreground">
              潜龙系列<br />灵兽 NFT
            </SectionHeading>
            <p className="text-base leading-relaxed" style={{ color: '#F5F3EB', opacity: 0.7 }}>
              融合八卦五行之理，铸造独一无二之灵兽 NFT。每一枚皆蕴含独特灵力属性，可用于对战、质押、收藏。限量发行，先到先得。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#market"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium transition-all hover:scale-105"
                style={{ background: '#C49A6C', color: '#F5F3EB' }}
              >
                进入市场
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <a
                href="#docs"
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-medium transition-all hover:scale-105"
                style={{ borderColor: 'rgba(196, 154, 108, 0.6)', color: '#C49A6C' }}
              >
                查看详情
              </a>
            </div>
          </div>

          {/* NFT 卡片展示 */}
          <div className="relative">
            <div
              className="rounded-3xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))',
                border: '1px solid rgba(196, 154, 108, 0.3)',
              }}
            >
              {/* 头部统计 */}
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(196, 154, 108, 0.2)' }}>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" style={{ color: '#C49A6C' }} />
                  <span className="font-medium" style={{ color: '#F5F3EB' }}>热门灵兽</span>
                </div>
                <span className="text-sm" style={{ color: 'rgba(245, 243, 235, 0.5)' }}>查看全部</span>
              </div>

              {/* NFT 网格 */}
              <div className="grid grid-cols-3 gap-3">
                {nftCards.map((nft, i) => (
                  <motion.div
                    key={nft.name}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <div
                      className="rounded-xl p-3 transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${rarityColors[nft.level]}40`,
                        boxShadow: `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
                      }}
                    >
                      <div className="aspect-square mb-2 overflow-hidden rounded-lg" style={{ background: 'rgba(196, 154, 108, 0.1)' }}>
                        <img
                          src={nft.img}
                          alt={nft.name}
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-heading text-sm italic" style={{ color: '#F5F3EB' }}>{nft.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: rarityColors[nft.level] }}>{nft.level}</p>
                      </div>
                    </div>

                    {/* 稀有度标识 */}
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: rarityColors[nft.level] }}
                    >
                      <span className="text-[10px] font-bold text-white">{nft.rare === '顶级' ? '★' : '%'}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 底部价格信息 */}
              <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: 'rgba(245, 243, 235, 0.5)' }}>当前地板价</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-heading italic text-lg" style={{ color: '#C49A6C' }}>0.08 ETH</span>
                </div>
              </div>
            </div>

            {/* 装饰元素 */}
            <div
              className="absolute -right-6 -top-6 h-28 w-28 rounded-2xl rotate-12 opacity-60"
              style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.3), rgba(196, 154, 108, 0.1))', border: '1px solid rgba(196, 154, 108, 0.2)' }}
            />
            <div
              className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full opacity-40"
              style={{ background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.4), rgba(196, 154, 108, 0.1))' }}
            />
          </div>
        </div>
      </div>
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
          <SectionBadge className="mb-6">入门指南</SectionBadge>
          <SectionHeading>三步开启你的易道之旅</SectionHeading>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: '01', title: '连接钱包', desc: '使用 Web3 钱包一键连接，进入潜龙世界' },
            { step: '02', title: '卜卦问道', desc: '摇签卜卦，获得你的专属灵兽 NFT' },
            { step: '03', title: '探索生态', desc: '参与对战、质押、预测市场，开启易道人生' },
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
          href="https://your-dapp-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium"
          style={{ background: '#C49A6C', color: '#F5F3EB' }}
        >
          立即开始
          <ArrowUpRight className="h-5 w-5" />
        </a>
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
          <a
            href="#docs"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium"
            style={{ background: '#C49A6C', color: '#F5F3EB' }}
          >
            下载白皮书
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <a
            href="#contact"
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

function Footer() {
  return (
    <footer className="px-6 py-12" style={{ background: '#F5F3EB', borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="潜龙勿用" className="h-10 w-auto" />
            <span className="font-heading italic text-lg" style={{ color: '#333333' }}>
              潜龙勿用
            </span>
          </div>

          <div className="flex gap-6">
            {['关于我们', '白皮书', '社区', '联系方式'].map((link) => (
              <button
                key={link}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: '#333333', opacity: 0.6 }}
              >
                {link}
              </button>
            ))}
          </div>

          <span className="text-xs" style={{ color: '#333333', opacity: 0.4 }}>
            © 2026 潜龙勿用. 保留所有权利.
          </span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="overflow-visible" style={{ background: '#F5F3EB' }}>
      <Navbar />
      <SideNav />
      <HeroSection />
      <DivinationSection />
      <BattleSection />
      <PredictionSection />
      <FeaturedNFTSection />
      <StatsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
