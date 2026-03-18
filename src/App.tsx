import { PropsWithChildren, useState, useRef } from 'react'
import { ArrowUpRight, Sparkles, Sword, Gift, ShoppingBag, Users, Lock, TrendingUp, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
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

function SectionBadge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <span className={cn('section-badge liquid-glass', className)}>{children}</span>
}

function SectionHeading({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <h2 className={cn('section-heading text-4xl md:text-5xl lg:text-6xl', className)}>{children}</h2>
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

function ModulesSection() {
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null)

  return (
    <section id="modules" className="px-6 py-24 md:px-16 lg:px-24" style={{ background: '#F5F3EB' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <SectionBadge className="mb-6">核心玩法</SectionBadge>
          <SectionHeading>六大功能</SectionHeading>
          <motion.p
            className="mt-4 text-sm"
            style={{ color: '#333333', opacity: 0.6 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            点击任意模块了解更多详情
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              index={index}
              onClick={() => setSelectedModule(module)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedModule && (
          <ModuleDetailModal
            module={selectedModule}
            onClose={() => setSelectedModule(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function FeaturedNFTSection() {
  return (
    <section className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#333333' }}>
      <div className="mx-auto max-w-7xl">
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
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium"
                style={{ background: '#C49A6C', color: '#F5F3EB' }}
              >
                进入市场
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <a
                href="#docs"
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-medium"
                style={{ borderColor: 'rgba(196, 154, 108, 0.6)', color: '#C49A6C' }}
              >
                查看详情
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              className="flex aspect-square items-center justify-center rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.2), rgba(196, 154, 108, 0.05))',
                border: '1px solid rgba(196, 154, 108, 0.3)',
              }}
            >
              <div className="text-center space-y-4">
                <div
                  className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl"
                  style={{ background: 'rgba(196, 154, 108, 0.2)' }}
                >
                  <img src="/images/logo.png" alt="NFT" className="h-full w-full object-contain" />
                </div>
                <p className="text-sm" style={{ color: '#F5F3EB', opacity: 0.6 }}>
                  NFT 配图占位符
                </p>
              </div>
            </div>
            <div
              className="absolute -right-4 -top-4 h-24 w-24 rounded-xl"
              style={{ background: 'rgba(196, 154, 108, 0.3)' }}
            />
            <div
              className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full"
              style={{ background: 'rgba(196, 154, 108, 0.2)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="px-6 py-20" style={{ background: 'rgba(196, 154, 108, 0.08)' }}>
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
    <section className="relative px-6 py-24 md:px-16 lg:px-24" style={{ background: '#333333' }}>
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
        <SectionHeading className="text-foreground">
          潜龙在渊<br />待时而动
        </SectionHeading>
        <p className="text-lg" style={{ color: '#F5F3EB', opacity: 0.7 }}>
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
      <HeroSection />
      <ModulesSection />
      <FeaturedNFTSection />
      <StatsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
