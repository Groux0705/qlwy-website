import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, FileText, Sparkles, Sword, Users, TrendingUp, Coins, Shield, BarChart3, Twitter, Clock, User, X, ChevronDown } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import communityTweetsData from '@/data/communityTweets.json'
import officialTweetsData from '@/data/officialTweets.json'

const docSections = [
  {
    id: 'overview',
    title: '项目定位',
    icon: Sparkles,
    content: '潜龙勿用不是单一的“算命工具”，而是一个以《易经》叙事为世界观、以卦象卡牌NFT为资产底座、以签灵为执行引擎，并由奖池、对战、预测市场与仲裁机制组成闭环的链上应用型 Meme / 游戏协议。',
    details: [
      '两条主线并行：卜卦-NFT-精炼/签灵/对战-奖池，与预测市场-争议-仲裁。',
      '核心叙事不是给出答案，而是把“识势、择时、承担结果”做成可参与的链上仪式。',
      '神话级 NFT 是顶层资产，同时承接奖池权益、仲裁资格和生态身份。',
      '签灵让用户从手动点操作，升级到“设策略、让签灵长期执行”。',
    ],
  },
  {
    id: 'entry',
    title: '入口机制',
    icon: Sparkles,
    content: '用户进入潜龙勿用的第一步不是直接拿到 NFT，而是先发起卜卦请求。BNB 触发 VRF 返回卦象与运势后，只有稀有及以上结果才进入铸签决策，这让“问卦”成为整个生态的流量入口与筛选器。',
    details: [
      '卜卦请求使用 BNB 发起，结果由 Chainlink VRF 返回，保证随机性可验证。',
      '返回结果包含六爻、卦象、幸运值、稀有度等关键属性，稀有及以上才可进入铸签流程。',
      '免费额度与冷却时间不是附属功能，而是协议用来控节奏、做活动与防刷的运营阀门。',
      '用户从这里分流到三条成长线：冲奖池、升级签灵、或进入精炼与战斗体系。',
    ],
  },
  {
    id: 'assets',
    title: '资产层与稀有度',
    icon: Shield,
    content: 'FortuneCore 定义了整个生态的资产底座。每个 NFT 都映射一组卦象和运势参数，而五级稀有度则决定了它在奖池、签灵、仲裁与精炼里的位置与上限。',
    details: [
      '资产属性由六爻、卦象 ID、幸运值与稀有度组成，对应 64 卦的文化表达层。',
      '稀有度从普通到神话共五级，既决定稀缺性，也决定后续玩法入口和收益权重。',
      '稀有及以上才能铸造成正式 NFT，也是签灵升级、奖池竞争和战斗体系的基础门槛。',
      '神话级具有顶层身份：数量稀缺、权益最重，并向奖池与仲裁机制延伸。',
    ],
  },
  {
    id: 'jackpot',
    title: '奖池机制',
    icon: Coins,
    content: '奖池不是固定时间开奖，而是在铸出神话级 NFT 时触发的全局分配事件。它把“抽到神话”从一次性稀有事件，变成整个生态共享的价值结算时刻。',
    details: [
      '当前神话级铸造者获得 50%，把“抽中神话”直接转化为即时奖励。',
      '现有神话持有者分享 30%，让顶层资产拥有持续的被动分配能力。',
      '剩余 20% 留在合约中滚入下一轮，形成跨周期累积与更强的期待感。',
      '神话级上限为 88 个，达到上限后奖池会进入终局式平均分配。',
    ],
  },
  {
    id: 'spirit',
    title: '签灵',
    icon: Users,
    content: '稀有及以上 NFT 可以升级成符合 BAP-578 的签灵，获得独立身份、经验成长与自动执行能力。项目真正的差异化，不是“多一个升级形态”，而是把用户行为从手动操作推进到策略驱动。',
    details: [
      '签灵拥有链上身份与签灵金库，可以代表自身持有和执行指定资产与动作。',
      '能力侧覆盖自动战斗、自动下注、自动卜卦、自动铸签与资产兑换等策略行为。',
      '0-99 级成长系统让签灵可随使用累计经验，形成长期养成价值。',
      '升级后的签灵不可自由转让，保证发送者身份与权限边界始终清晰。',
    ],
  },
  {
    id: 'battle',
    title: '对战系统',
    icon: Sword,
    content: 'PVP 不是展示型小游戏，而是带真实资产风险的 3v3 对抗场。幸运值、等级与稀有度共同影响胜率，失败方还要承担被销毁的压力，因此它更像一个高风险的资源消耗与成长模块。',
    details: [
      '核心评分由有效幸运值 × 70 + 随机值 × 30 构成，随机性存在但不会完全吞没资产差异。',
      '稀有度与等级都会增加有效幸运值，高级资产的成长会实打实转化成战力优势。',
      '失败方 NFT 存在销毁概率，形成战斗消耗、通缩和风险决策三重效果。',
      '胜负之外还会沉淀经验值，为签灵升级与长期养成提供反馈循环。',
    ],
  },
  {
    id: 'prediction',
    title: '预测市场',
    icon: TrendingUp,
    content: '预测市场是潜龙勿用的第二条增长曲线。协议使用 LMSR AMM 而不是订单簿，目标不是做最像交易所的界面，而是让长尾、任何人都可创建的事件从创建那一刻起就具备可交易性。',
    details: [
      '市场采用 YES/NO 结构，并使用 USD1 作为计价与结算资产，降低理解成本。',
      'LMSR 适合没有深度订单簿支持的长尾市场，是无许可创建体验的关键。',
      '市场状态会经历创建、交易、争议、仲裁到最终结算，完整闭环比“能下注”更重要。',
      '创建者费、协议费与 LP 费共同组成经济激励，让市场创建与流动性供给有持续动力。',
    ],
  },
  {
    id: 'governance',
    title: '仲裁与治理',
    icon: Shield,
    content: '神话级 NFT 的价值不只来自稀有度，也来自仲裁与治理权。预测市场发生争议后，符合条件的神话持有者可以通过质押 NFT 与潜龙勿用代币成为协议的裁决者。',
    details: [
      '市场在创建者提交结果后进入争议窗口，争议期结束前可以升级到仲裁流程。',
      '仲裁员并非抽象治理代币投票，而是以神话级 NFT + 潜龙勿用代币质押为基础的高门槛角色。',
      '争议处理完成后，仲裁费用会按参与情况分配给有效仲裁者，形成治理激励。',
      '这让神话级从“稀有收藏品”升级为协议可信度与最终裁决权的承载体。',
    ],
  },
  {
    id: 'refinery',
    title: '精炼系统',
    icon: Coins,
    content: '精炼系统解决的是低稀有 NFT 堆积的问题。通过 3 合 1 机制，协议把存量资产向更高等级压缩；失败时返还灰烬，又让玩家有机会用长期积累修正运气。',
    details: [
      '每次精炼投入 3 张同稀有度 NFT，用失败概率换更高一层的资产等级。',
      '基础成功率从稀有→史诗、史诗→传奇到传奇→神话逐级下降。',
      '失败会返还灰烬，灰烬又可用于提高后续成功率，形成带缓冲的长期通缩机制。',
      '它是“非神话资产如何继续升维”的关键通道，也是库存管理工具。',
    ],
  },
  {
    id: 'token',
    title: '代币与质押',
    icon: Coins,
    content: '潜龙勿用是整个生态的实用型 / 治理型代币，承担铸签、升级、精炼、质押与部分治理场景；质押系统则把协议里的长期参与者和价值分配绑定在一起。',
    details: [
      '潜龙勿用代币参与稀有及以上铸签、签灵升级、精炼等高频行为，是所有模块之间的通用燃料。',
      '质押系统以 BNB 形式发放收益，把协议活动与持币激励连接起来。',
      '默认解质押会带有销毁或成本约束，鼓励更稳定的中长期参与行为。',
      '代币不只是支付手段，也是用户进入高阶玩法与治理层的门票之一。',
    ],
  },
  {
    id: 'architecture',
    title: '技术架构',
    icon: BarChart3,
    content: '技术上，潜龙勿用把可验证随机数、签灵标准、LMSR 市场和 BSC 低成本执行环境组合在一起，让叙事、资产与自动化三层都可以真正落到链上。',
    details: [
      '底层运行在 BSC 上，用低 gas 环境承接高频卜卦、精炼、战斗和市场交互。',
      'FortuneCore、Casting、Renderer 与 Content Pack 组成 NFT 资产和文化表达的基础层。',
      'Chainlink VRF 保证卦象与运势生成的可验证随机性，避免中心化发牌。',
      'SpiritLogic + SpiritAgent + BAP-578 则把“链上自动执行”做成标准化的产品能力。',
    ],
  },
  {
    id: 'community',
    title: '社区文章',
    icon: Twitter,
    content: '社区成员分享的潜龙勿用相关内容，包括项目解析、玩法攻略、市场分析等。',
    details: [],
    isArticles: true,
  },
  {
    id: 'official',
    title: '官方机制文章',
    icon: FileText,
    content: '官方发布的潜龙勿用深度文章，详细解读项目机制、玩法指南和技术解析。',
    details: [],
    isArticles: true,
    isOfficial: true,
  },
]

const legacySectionMap: Record<string, string> = {
  intro: 'overview',
  'getting-started': 'entry',
  core: 'assets',
  casting: 'entry',
  jackpot: 'jackpot',
  spirit: 'spirit',
  battle: 'battle',
  prediction: 'prediction',
  refinery: 'refinery',
  staking: 'token',
  token: 'token',
  architecture: 'architecture',
  community: 'community',
  official: 'official',
}

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

interface Tweet {
  id: string
  author: string
  authorHandle: string
  authorAvatar?: string
  content: string
  publishTime: string
  mediaUrl?: string
  originalUrl: string
  tags?: string[]
}

interface Author {
  name: string
  handle: string
  avatar?: string
}

interface TweetData {
  authors: Record<string, Author>
  tweets: Tweet[]
}

// Group tweets by author handle
const tweetsByAuthor = (communityTweetsData as TweetData).tweets.reduce((acc, tweet) => {
  const handle = tweet.authorHandle
  if (!acc[handle]) {
    acc[handle] = []
  }
  acc[handle].push(tweet)
  return acc
}, {} as Record<string, Tweet[]>)

// Extract authors data for sidebar
const authorsData = (communityTweetsData as TweetData).authors

// Official tweets data
interface OfficialTweet {
  id: string
  author: string
  authorHandle: string
  authorAvatar?: string
  content: string
  title?: string
  publishTime: string
  mediaUrl?: string
  originalUrl: string
  tags?: string[]
}

interface OfficialTweetData {
  authors: Record<string, Author>
  tweets: OfficialTweet[]
}

const officialTweets = (officialTweetsData as OfficialTweetData).tweets

function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

function TweetCard({ tweet, onClick }: { tweet: Tweet; onClick: () => void }) {
  const hasTags = tweet.tags && tweet.tags.length > 0

  return (
    <button
      onClick={onClick}
      className="block w-full text-left p-4 rounded-xl transition-all hover:scale-[1.01] hover:shadow-md"
      style={{
        background: hasTags ? 'linear-gradient(135deg, rgba(196, 154, 108, 0.12), rgba(196, 154, 108, 0.05))' : '#fff',
        border: hasTags ? '2px solid #C49A6C' : '1px solid rgba(196, 154, 108, 0.2)',
        position: 'relative',
      }}
    >
      {/* Tags indicator for pinned articles */}
      {hasTags && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: '#C49A6C', color: '#fff' }}>
          置顶
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {tweet.authorAvatar ? (
          <img
            src={tweet.authorAvatar}
            alt={tweet.author}
            className="w-10 h-10 rounded-full shrink-0 object-cover"
            style={{ border: '2px solid rgba(196, 154, 108, 0.3)' }}
          />
        ) : (
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
            style={{ background: 'rgba(196, 154, 108, 0.15)' }}
          >
            <User className="w-5 h-5" style={{ color: '#C49A6C' }} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium" style={{ color: '#333333' }}>
            {tweet.author}
          </p>
          <p className="text-xs" style={{ color: '#333333', opacity: 0.5 }}>
            {tweet.authorHandle}
          </p>
        </div>
        <Twitter className="w-4 h-4 shrink-0" style={{ color: '#C49A6C' }} />
      </div>

      {/* Tags */}
      {hasTags && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tweet.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(196, 154, 108, 0.2)', color: '#C49A6C' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-sm leading-relaxed mb-3 line-clamp-4" style={{ color: '#333333' }}>
        {tweet.content}
      </p>

      {/* Media */}
      {tweet.mediaUrl && (
        <div className="mb-3 -mx-4 mt-3">
          <img
            src={tweet.mediaUrl}
            alt=""
            className="w-full h-auto object-cover max-h-72"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
        <div className="flex items-center gap-1 text-xs" style={{ color: '#333333', opacity: 0.5 }}>
          <Clock className="w-3 h-3" />
          {formatTime(tweet.publishTime)}
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: '#C49A6C' }}>
          点击查看全文
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </button>
  )
}

function TweetModal({ tweet, onClose }: { tweet: Tweet; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: '#fff' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4" style={{ background: '#fff', borderBottom: '1px solid rgba(196, 154, 108, 0.2)' }}>
          <div className="flex items-center gap-3">
            {tweet.authorAvatar ? (
              <img
                src={tweet.authorAvatar}
                alt={tweet.author}
                className="w-12 h-12 rounded-full shrink-0 object-cover"
                style={{ border: '2px solid rgba(196, 154, 108, 0.3)' }}
              />
            ) : (
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                style={{ background: 'rgba(196, 154, 108, 0.15)' }}
              >
                <User className="w-6 h-6" style={{ color: '#C49A6C' }} />
              </div>
            )}
            <div>
              <p className="font-medium" style={{ color: '#333333' }}>
                {tweet.author}
              </p>
              <p className="text-sm" style={{ color: '#333333', opacity: 0.5 }}>
                {tweet.authorHandle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{ background: 'rgba(196, 154, 108, 0.1)' }}
          >
            <X className="w-5 h-5" style={{ color: '#C49A6C' }} />
          </button>
        </div>

        {/* Cover Image */}
        {tweet.mediaUrl && (
          <div className="w-full">
            <img
              src={tweet.mediaUrl}
              alt=""
              className="w-full h-auto object-cover max-h-80"
            />
          </div>
        )}

        {/* Tags */}
        {tweet.tags && tweet.tags.length > 0 && (
          <div className="px-6 pt-4">
            <div className="flex flex-wrap gap-2">
              {tweet.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(196, 154, 108, 0.2)', color: '#C49A6C' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: '#333333' }}>
            {tweet.content}
          </p>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between p-4" style={{ background: '#fff', borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
          <div className="flex items-center gap-1 text-sm" style={{ color: '#333333', opacity: 0.5 }}>
            <Clock className="w-4 h-4" />
            {formatTime(tweet.publishTime)}
          </div>
          <a
            href={tweet.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: '#C49A6C', color: '#fff' }}
          >
            查看原文
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function OfficialTweetModal({ tweet, onClose }: { tweet: OfficialTweet; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: '#fff' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4" style={{ background: '#fff', borderBottom: '1px solid rgba(196, 154, 108, 0.2)' }}>
          <div className="flex items-center gap-3">
            {tweet.authorAvatar ? (
              <img
                src={tweet.authorAvatar}
                alt={tweet.author}
                className="w-12 h-12 rounded-full shrink-0 object-cover"
                style={{ border: '2px solid rgba(196, 154, 108, 0.3)' }}
              />
            ) : (
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                style={{ background: 'rgba(196, 154, 108, 0.15)' }}
              >
                <User className="w-6 h-6" style={{ color: '#C49A6C' }} />
              </div>
            )}
            <div>
              <p className="font-medium" style={{ color: '#333333' }}>
                {tweet.author}
              </p>
              <p className="text-sm" style={{ color: '#333333', opacity: 0.5 }}>
                {tweet.authorHandle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{ background: 'rgba(196, 154, 108, 0.1)' }}
          >
            <X className="w-5 h-5" style={{ color: '#C49A6C' }} />
          </button>
        </div>

        {/* Cover Image */}
        {tweet.mediaUrl && (
          <div className="w-full">
            <img
              src={tweet.mediaUrl}
              alt=""
              className="w-full h-auto object-cover max-h-80"
            />
          </div>
        )}

        {/* Title */}
        {tweet.title && (
          <div className="px-6 pt-4">
            <h3 className="font-heading text-xl italic" style={{ color: '#333333' }}>
              {tweet.title}
            </h3>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: '#333333' }}>
            {tweet.content}
          </p>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between p-4" style={{ background: '#fff', borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
          <div className="flex items-center gap-1 text-sm" style={{ color: '#333333', opacity: 0.5 }}>
            <Clock className="w-4 h-4" />
            {formatTime(tweet.publishTime)}
          </div>
          <a
            href={tweet.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: '#C49A6C', color: '#fff' }}
          >
            查看原文
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CommunityArticles({ onAuthorClick, onTweetClick }: { onAuthorClick?: (author: string) => void; onTweetClick?: (tweet: Tweet) => void }) {
  // Sort tweets: those with tags first, then by publish time (newest first)
  const sortedAuthors = Object.entries(tweetsByAuthor).sort(([, tweetsA], [, tweetsB]) => {
    const hasTagsA = tweetsA.some(t => t.tags && t.tags.length > 0)
    const hasTagsB = tweetsB.some(t => t.tags && t.tags.length > 0)
    if (hasTagsA && !hasTagsB) return -1
    if (!hasTagsA && hasTagsB) return 1
    return 0
  })

  return (
    <div className="space-y-6">
      {sortedAuthors.map(([authorHandle, tweets]) => {
        // Sort tweets within each author: tagged first, then by time
        const sortedTweets = [...tweets].sort((a, b) => {
          const hasTagsA = a.tags && a.tags.length > 0
          const hasTagsB = b.tags && b.tags.length > 0
          if (hasTagsA && !hasTagsB) return -1
          if (!hasTagsA && hasTagsB) return 1
          return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
        })
        const hasTaggedTweets = tweets.some(t => t.tags && t.tags.length > 0)

        return (
          <div key={authorHandle} id={`author-${authorHandle.replace('@', '')}`} className="space-y-3">
            <div className="flex items-center gap-3">
              <h4 className="font-heading text-sm italic" style={{ color: '#C49A6C' }}>社区成员文章</h4>
              <button
                onClick={() => onAuthorClick?.(authorHandle)}
                className="px-2 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{ background: hasTaggedTweets ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)', color: hasTaggedTweets ? '#fff' : '#C49A6C' }}
              >
                {sortedTweets[0]?.author || authorHandle.replace('@', '')}
                {hasTaggedTweets && ' ★'}
              </button>
              {hasTaggedTweets && (
                <span className="text-xs" style={{ color: '#C49A6C' }}>置顶</span>
              )}
            </div>
            <div className="grid gap-4">
              {sortedTweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} onClick={() => onTweetClick?.(tweet)} />
              ))}
            </div>
          </div>
        )
      })}
      <p className="text-xs mt-4" style={{ color: '#333333', opacity: 0.5 }}>
        * 文章来源于社区成员分享，点击查看全文
      </p>
    </div>
  )
}

function OfficialBlogArticles({ onTweetClick }: { onTweetClick?: (tweet: OfficialTweet) => void }) {
  // Sort by publish time (newest first)
  const sortedTweets = [...officialTweets].sort((a, b) =>
    new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  )

  return (
    <div className="space-y-4">
      <h4 className="font-heading text-sm italic" style={{ color: '#C49A6C' }}>官方文章</h4>
      <div className="grid gap-4">
        {sortedTweets.map((tweet) => (
          <button
            key={tweet.id}
            onClick={() => onTweetClick?.(tweet)}
            className="w-full text-left p-4 rounded-xl transition-all hover:scale-[1.01] hover:shadow-md"
            style={{
              background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.08), rgba(196, 154, 108, 0.03))',
              border: '1px solid rgba(196, 154, 108, 0.25)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              {tweet.authorAvatar ? (
                <img
                  src={tweet.authorAvatar}
                  alt={tweet.author}
                  className="w-8 h-8 rounded-full shrink-0 object-cover"
                />
              ) : (
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                  style={{ background: 'rgba(196, 154, 108, 0.15)' }}
                >
                  <User className="w-4 h-4" style={{ color: '#C49A6C' }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: '#333333' }}>
                  {tweet.author}
                </p>
              </div>
              <FileText className="w-4 h-4 shrink-0" style={{ color: '#C49A6C' }} />
            </div>

            {/* Title */}
            {tweet.title && (
              <h4 className="font-heading text-base italic mb-2" style={{ color: '#333333' }}>
                {tweet.title}
              </h4>
            )}

            {/* Preview */}
            <p className="text-sm leading-relaxed line-clamp-2 mb-3" style={{ color: '#333333', opacity: 0.7 }}>
              {tweet.content}
            </p>

            {/* Media */}
            {tweet.mediaUrl && (
              <div className="mb-3">
                <img
                  src={tweet.mediaUrl}
                  alt=""
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
              <div className="flex items-center gap-1 text-xs" style={{ color: '#333333', opacity: 0.5 }}>
                <Clock className="w-3 h-3" />
                {formatTime(tweet.publishTime)}
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: '#C49A6C' }}>
                点击阅读
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs mt-4" style={{ color: '#333333', opacity: 0.5 }}>
        * 文章来源于官方推特，点击查看全文
      </p>
    </div>
  )
}

function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null)
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null)
  const [selectedOfficialTweet, setSelectedOfficialTweet] = useState<OfficialTweet | null>(null)
  const [articlesExpanded, setArticlesExpanded] = useState(false)
  const [searchParams] = useSearchParams()

  // Handle section from URL query param
  useEffect(() => {
    const rawSection = searchParams.get('section')
    const section = rawSection ? (legacySectionMap[rawSection] ?? rawSection) : null
    if (section && docSections.some(d => d.id === section)) {
      setActiveSection(section)
      // Expand community articles dropdown if community section
      if (section === 'community') {
        setArticlesExpanded(true)
      }
    }
  }, [searchParams])

  const currentDoc = docSections.find(d => d.id === activeSection) || docSections[0]
  const CurrentIcon = currentDoc.icon

  // Sort authors: those with tagged tweets first, then alphabetically
  const authorHandles = Object.keys(tweetsByAuthor).sort((a, b) => {
    const tweetsA = tweetsByAuthor[a] || []
    const tweetsB = tweetsByAuthor[b] || []
    const hasTagsA = tweetsA.some(t => t.tags && t.tags.length > 0)
    const hasTagsB = tweetsB.some(t => t.tags && t.tags.length > 0)
    if (hasTagsA && !hasTagsB) return -1
    if (!hasTagsA && hasTagsB) return 1
    return a.localeCompare(b)
  })

  const scrollToAuthor = (authorHandle: string) => {
    setActiveAuthor(authorHandle)
    const element = document.getElementById(`author-${authorHandle.replace('@', '')}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAuthorClick = (authorHandle: string) => {
    setActiveAuthor(authorHandle)
    scrollToAuthor(authorHandle)
  }

  const handleTweetClick = (tweet: Tweet) => {
    setSelectedTweet(tweet)
  }

  const handleOfficialTweetClick = (tweet: OfficialTweet) => {
    setSelectedOfficialTweet(tweet)
  }

  const closeModal = () => {
    setSelectedTweet(null)
    setSelectedOfficialTweet(null)
  }

  return (
    <div className="min-h-screen" style={{ background: '#F5F3EB' }}>
      <Navbar />

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8 sm:py-12 lg:px-24" style={{ paddingTop: '6rem' }}>
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <SectionBadge className="mb-2 text-xs sm:text-sm">技术文档</SectionBadge>
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl italic mb-2" style={{ color: '#333333' }}>
              玩转潜龙勿用
            </h1>
            <p className="max-w-xl mx-auto text-xs px-4" style={{ color: '#333333', opacity: 0.6 }}>
              从入口机制、资产层到签灵、预测与仲裁，快速建立对潜龙勿用项目闭环的整体理解。
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Left Navigation - Desktop Sidebar */}
            <motion.div
              className="hidden lg:block lg:col-span-1 sticky top-24 self-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="rounded-2xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <h3 className="font-heading text-sm italic mb-4 px-3" style={{ color: '#333333' }}>文档目录</h3>
                <nav className="space-y-1">
                  {docSections.filter(s => !s.isArticles).map((section) => {
                    const Icon = section.icon
                    const isActive = activeSection === section.id

                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                        style={{
                          background: isActive ? 'rgba(196, 154, 108, 0.15)' : 'transparent',
                          color: isActive ? '#C49A6C' : '#333333',
                        }}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    )
                  })}
                </nav>

                {/* Articles Navigation - Separate section */}
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
                  <h3 className="font-heading text-sm italic mb-4 px-3" style={{ color: '#333333' }}>文章导航</h3>
                  <nav className="space-y-1">
                  {/* 官推 Blog */}
                  <button
                    onClick={() => setActiveSection('official')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: activeSection === 'official' ? 'rgba(196, 154, 108, 0.15)' : 'transparent',
                      color: activeSection === 'official' ? '#C49A6C' : '#333333',
                    }}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">官方机制文章</span>
                  </button>

                  {/* 社区文章 */}
                  <button
                    onClick={() => {
                      if (activeSection === 'community' && articlesExpanded) {
                        setArticlesExpanded(false)
                      } else {
                        setActiveSection('community')
                        setArticlesExpanded(true)
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: activeSection === 'community' ? 'rgba(196, 154, 108, 0.15)' : 'transparent',
                      color: activeSection === 'community' ? '#C49A6C' : '#333333',
                    }}
                  >
                    <Twitter className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">社区文章</span>
                    <ChevronDown
                      className={cn("w-4 h-4 ml-auto transition-transform duration-200", articlesExpanded && "rotate-180")}
                    />
                  </button>

                  {/* Community sub navigation - collapsible */}
                  <AnimatePresence>
                    {articlesExpanded && activeSection === 'community' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-0.5">
                          {authorHandles.map((authorHandle) => {
                            const author = authorsData[authorHandle]
                            const avatar = author?.avatar
                            const firstTweet = tweetsByAuthor[authorHandle]?.[0]
                            const tweetAvatar = firstTweet?.authorAvatar
                            const authorName = firstTweet?.author || author?.name || authorHandle.replace('@', '')
                            const hasTaggedTweets = (tweetsByAuthor[authorHandle] || []).some(t => t.tags && t.tags.length > 0)

                            return (
                              <button
                                key={authorHandle}
                                onClick={() => handleAuthorClick(authorHandle)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left text-xs transition-all duration-200"
                                style={{
                                  background: activeAuthor === authorHandle ? 'rgba(196, 154, 108, 0.1)' : hasTaggedTweets ? 'rgba(196, 154, 108, 0.05)' : 'transparent',
                                  color: activeAuthor === authorHandle ? '#C49A6C' : hasTaggedTweets ? '#C49A6C' : '#666666',
                                }}
                              >
                                {avatar || tweetAvatar ? (
                                  <img
                                    src={avatar || tweetAvatar}
                                    alt={authorName}
                                    className="w-5 h-5 rounded-full shrink-0 object-cover"
                                    style={{ border: hasTaggedTweets ? '1.5px solid #C49A6C' : 'none' }}
                                  />
                                ) : (
                                  <div
                                    className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                                    style={{ background: 'rgba(196, 154, 108, 0.2)' }}
                                  >
                                    <User className="w-3 h-3" style={{ color: '#C49A6C' }} />
                                  </div>
                                )}
                                <span className="truncate">{authorName}</span>
                                {hasTaggedTweets && (
                                  <span className="text-xs" style={{ color: '#C49A6C' }}>★</span>
                                )}
                                <span className="ml-auto text-xs opacity-50 shrink-0">
                                  {tweetsByAuthor[authorHandle]?.length || 0}篇
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </nav>
                </div>
              </div>
            </motion.div>

            {/* Mobile Navigation - Horizontal Scrollable Tabs */}
            <motion.div
              className="lg:hidden col-span-full -mx-6 px-4 mb-4 overflow-x-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex gap-2 pb-2" style={{ minWidth: 'max-content' }}>
                {docSections.filter(s => !s.isArticles).map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-200",
                        isActive
                          ? "text-white"
                          : "bg-white text-gray-600 border border-gray-200"
                      )}
                      style={isActive ? { background: '#C49A6C' } : {}}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      {section.title}
                    </button>
                  )
                })}
                <button
                  onClick={() => setActiveSection('official')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-200",
                    activeSection === 'official'
                      ? "text-white"
                      : "bg-white text-gray-600 border border-gray-200"
                  )}
                  style={activeSection === 'official' ? { background: '#C49A6C' } : {}}
                >
                  <FileText className="w-3 h-3 shrink-0" />
                  官方文章
                </button>
                <button
                  onClick={() => {
                    setActiveSection('community')
                    setArticlesExpanded(!articlesExpanded)
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-200",
                    activeSection === 'community'
                      ? "text-white"
                      : "bg-white text-gray-600 border border-gray-200"
                  )}
                  style={activeSection === 'community' ? { background: '#C49A6C' } : {}}
                >
                  <Twitter className="w-3 h-3 shrink-0" />
                  社区
                </button>
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
                className="rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                {/* Title Area */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6" style={{ borderBottom: '1px solid rgba(196, 154, 108, 0.2)' }}>
                  <div
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl"
                    style={{ background: 'rgba(196, 154, 108, 0.15)' }}
                  >
                    <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" style={{ color: '#C49A6C' }} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-heading text-lg sm:text-xl lg:text-2xl italic truncate" style={{ color: '#333333' }}>{currentDoc.title}</h2>
                    <p className="text-xs sm:text-sm mt-0 sm:mt-1 truncate" style={{ color: '#333333', opacity: 0.6 }}>潜龙勿用 {currentDoc.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: '#333333', opacity: 0.8 }}>
                  {currentDoc.content}
                </p>

                {/* Detail List */}
                {currentDoc.isArticles ? (
                  <>
                    {currentDoc.isOfficial ? (
                      <OfficialBlogArticles onTweetClick={handleOfficialTweetClick} />
                    ) : (
                      <CommunityArticles onAuthorClick={handleAuthorClick} onTweetClick={handleTweetClick} />
                    )}
                    <AnimatePresence>
                      {selectedTweet && (
                        <TweetModal tweet={selectedTweet} onClose={closeModal} />
                      )}
                      {selectedOfficialTweet && (
                        <OfficialTweetModal tweet={selectedOfficialTweet} onClose={closeModal} />
                      )}
                    </AnimatePresence>
                  </>
                ) : (
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
                )}

                {/* Bottom Navigation */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
                  <button
                    onClick={() => {
                      const idx = docSections.findIndex(d => d.id === activeSection)
                      if (idx > 0) setActiveSection(docSections[idx - 1].id)
                    }}
                    disabled={activeSection === docSections[0].id}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30 order-2 sm:order-1"
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
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30 order-1 sm:order-2"
                    style={{ color: '#C49A6C' }}
                  >
                    下一篇
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Whitepaper Download */}
              <motion.div
                className="mt-4 sm:mt-6 rounded-2xl p-4 sm:p-6 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.15), rgba(196, 154, 108, 0.05))',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: '#333333', opacity: 0.7 }}>
                  想要了解更多技术细节？
                </p>
                <Link
                  to="/whitepaper"
                  className="inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium"
                  style={{ background: '#C49A6C', color: '#F5F3EB' }}
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  查看白皮书
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DocsPage
