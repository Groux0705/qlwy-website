import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, FileText, Sparkles, Sword, Users, TrendingUp, Coins, Shield, BarChart3, Twitter, Clock, User, X, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import communityTweetsData from '@/data/communityTweets.json'
import officialTweetsData from '@/data/officialTweets.json'

const docSections = [
  {
    id: 'core',
    title: '核心NFT系统',
    icon: Shield,
    content: '潜龙勿用FortuneCore是整个生态系统的基础协议，负责生成和管理具有运势属性的NFT。每个NFT代表一条"龙"，拥有独特的六爻卦象和运气值。',
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
      '铸造费用：稀有50 / 史诗100 / 传奇500 / 神话2000 $潜龙勿用',
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
    content: '$潜龙勿用是生态系统的ERC-20治理和实用代币，用于铸造、升级、精炼等功能。',
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
    title: '官推 Blog',
    icon: FileText,
    content: '官方发布的潜龙勿用深度文章，详细解读项目机制、玩法指南和技术解析。',
    details: [],
    isArticles: true,
    isOfficial: true,
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
  const [activeSection, setActiveSection] = useState('core')
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null)
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null)
  const [selectedOfficialTweet, setSelectedOfficialTweet] = useState<OfficialTweet | null>(null)
  const [articlesExpanded, setArticlesExpanded] = useState(false)

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
      <main className="px-6 py-12 md:px-16 lg:px-24" style={{ paddingTop: '6rem' }}>
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <SectionBadge className="mb-2">技术文档</SectionBadge>
            <h1 className="font-heading text-2xl md:text-3xl italic mb-2" style={{ color: '#333333' }}>
              玩转潜龙勿用
            </h1>
            <p className="max-w-xl mx-auto text-xs" style={{ color: '#333333', opacity: 0.6 }}>
              基于易经智慧的Web3游戏化NFT生态系统，详细了解核心机制和玩法
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Navigation */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="rounded-2xl p-4 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
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
              </div>

              {/* Articles Navigation - Separate div */}
              <div
                className="rounded-2xl p-4 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto mt-6"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
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
                    <span className="text-sm font-medium">官推 Blog</span>
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
                    <p className="text-sm mt-1" style={{ color: '#333333', opacity: 0.6 }}>潜龙勿用 {currentDoc.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed mb-8" style={{ color: '#333333', opacity: 0.8 }}>
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
