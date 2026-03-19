/**
 * Script to fetch tweets and save locally with images
 * Usage: npx tsx scripts/fetchTweets.ts
 */

import fs from 'fs'
import path from 'path'

const COMMUNITY_ARTICLES: Record<string, string[]> = {
  '@MaxShen1984': [
    'https://x.com/maxshen1984/status/2028700936202592355',
    'https://x.com/maxshen1984/status/2024724398637482112',
    'https://x.com/maxshen1984/status/2021956600257556602',
    'https://x.com/maxshen1984/status/2021831859714633972',
    'https://x.com/maxshen1984/status/2021826569489330518',
    'https://x.com/maxshen1984/status/2021049424575856778',
    'https://x.com/maxshen1984/status/2020701976628261275',
    'https://x.com/maxshen1984/status/2020697624937144702',
    'https://x.com/maxshen1984/status/2020351990061244772',
    'https://x.com/maxshen1984/status/2019661651830821205',
    'https://x.com/maxshen1984/status/2019215415390675415',
    'https://x.com/maxshen1984/status/2019220237405810862',
    'https://x.com/maxshen1984/status/2018776850676506904',
    'https://x.com/maxshen1984/status/2018639502454280330',
    'https://x.com/maxshen1984/status/2017709791473471997',
  ],
  '@Jason': [
    'https://x.com/jason_liu_1102/status/2031664038531485896',
    'https://x.com/jason_liu_1102/status/2031243957498458289',
    'https://x.com/jason_liu_1102/status/2030603532588761598',
    'https://x.com/jason_liu_1102/status/2025819976981221645',
    'https://x.com/jason_liu_1102/status/2022537600842727531',
    'https://x.com/jason_liu_1102/status/2022093798017577318',
    'https://x.com/jason_liu_1102/status/2021442350476820877',
    'https://x.com/jason_liu_1102/status/2020838597201649821',
    'https://x.com/kingbacktim999/status/2021438267799879857',
  ],
  '@0xG': [
    'https://x.com/0xgenffy/status/2031634903159418988',
  ],
  '@李大白': [
    'https://x.com/0xldb/status/2025345394675515447',
  ],
  '@俗趣': [
    'https://x.com/xi99665/status/2029112093342089525',
    'https://x.com/xi99665/status/2025062829553025286',
    'https://x.com/xi99665/status/2025060772649599451',
    'https://x.com/xi99665/status/2022986910629781817',
    'https://x.com/xi99665/status/2021422045083681122',
    'https://x.com/xi99665/status/2020447974946418864',
    'https://x.com/xi99665/status/2020408673739387013',
  ],
  '@LJ': [
    'https://x.com/luoji5137/status/2030578716783579309',
    'https://x.com/luoji5137/status/2029750623718224170',
    'https://x.com/luoji5137/status/2028801141312778492',
    'https://x.com/luoji5137/status/2028679093097787696',
  ],
  '@马保国': [
    'https://x.com/btc2014eth/status/2030492158546080231',
    'https://x.com/btc2014eth/status/2030486070337601937',
    'https://x.com/btc2014eth/status/2017486048851644541',
  ],
  '@T:)': [
    'https://x.com/wtmlaile168/status/2029216818444091663',
    'https://x.com/wtmlaile168/status/2029216734989959480',
    'https://x.com/wtmlaile168/status/2027673527164539123',
  ],
  '@Nn': [
    'https://x.com/shafu2026/status/2031385771647840591',
    'https://x.com/shafu2026/status/2022942781308862818',
  ],
  '@42': [
    'https://x.com/gofifi19346509/status/2029118516960633313',
  ],
  '@以太坊老张': [
    'https://x.com/ytflzyyds/status/2017483039501328560',
    'https://x.com/ytflzyyds/status/2017437207758528616',
    'https://x.com/ytflzyyds/status/2016459913380409628',
    'https://x.com/ytflzyyds/status/2016042244323856578',
  ],
  '@乌迪': [
    'https://x.com/web3udi/status/2033373352761724950',
    'https://x.com/web3udi/status/2033361873274610164',
    'https://x.com/web3udi/status/2033004754025198027',
    'https://x.com/web3udi/status/2032444068941508813',
    'https://x.com/web3udi/status/2031928642415321557',
    'https://x.com/web3udi/status/2031562873785430044',
    'https://x.com/web3udi/status/2031223063044567257',
    'https://x.com/web3udi/status/2030832848572461208',
  ],
  '@CCX': [
    'https://x.com/0xccx/status/2023415755346444523',
    'https://x.com/0xccx/status/2021918620650287255',
  ],
  '@euljimoonduk': [
    'https://x.com/euljimoonduk/status/2034052280585211996',
    'https://x.com/euljimoonduk/status/2028629976061546754',
    'https://x.com/euljimoonduk/status/2028626342137545111',
  ],
  '@drag0ooon': [
    'https://x.com/drag0ooon/status/2021206413046153372',
    'https://x.com/drag0ooon/status/2033389554930217380',
    'https://x.com/drag0ooon/status/2024108626189623501',
  ],
  '@文成': [
    'https://x.com/liwencheng888/status/2020403541463183529',
    'https://x.com/liwencheng888/status/2020371412461162663',
    'https://x.com/liwencheng888/status/2020195369066623140',
    'https://x.com/liwencheng888/status/2019801188192112727',
  ],
  '@four': [
    'https://x.com/four_meme_fora/status/2032006179476717870',
  ],
  '@fourmeme': [
    'https://x.com/fourdotmemezh/status/2024894507448516867',
  ],
  '@星星君': [
    'https://x.com/xingxingjun8888/status/2020472123601699191',
  ],
  '@莫信': [
    'https://x.com/musinoot/status/2032739780115706123',
    'https://x.com/musinoot/status/2032259488280166693',
    'https://x.com/musinoot/status/2031272402634838329',
    'https://x.com/musinoot/status/2026147217028141088',
  ],
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

// Ensure directories exist
const publicDir = path.join(process.cwd(), 'public')
const avatarsDir = path.join(publicDir, 'images', 'avatars')
const tweetsDir = path.join(publicDir, 'images', 'tweets')

function ensureDirs() {
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true })
  }
  if (!fs.existsSync(tweetsDir)) {
    fs.mkdirSync(tweetsDir, { recursive: true })
  }
}

// Download image and return local path
async function downloadImage(url: string, destDir: string, prefix: string): Promise<string | undefined> {
  if (!url) return undefined

  try {
    const urlObj = new URL(url)
    const ext = path.extname(urlObj.pathname) || '.jpg'
    const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`
    const filepath = path.join(destDir, filename)

    // Use fetch with follow redirect
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      }
    })

    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status}`)
      return undefined
    }

    const buffer = await response.arrayBuffer()
    if (buffer.byteLength === 0) {
      console.error(`Empty response for ${url}`)
      return undefined
    }

    fs.writeFileSync(filepath, Buffer.from(buffer))

    // Return relative path
    const relativePath = `/images/${path.basename(destDir)}/${filename}`
    return relativePath
  } catch (error) {
    console.error(`Error downloading ${url}:`, error)
    return undefined
  }
}

async function fetchTweet(url: string, downloadedAvatars: Map<string, string>): Promise<Tweet | null> {
  const match = url.match(/status\/(\d+)/)
  if (!match) return null

  const tweetId = match[1]

  try {
    const response = await fetch(`https://api.fxtwitter.com/status/${tweetId}`)
    if (!response.ok) {
      console.error(`Failed to fetch tweet ${tweetId}: ${response.status}`)
      return null
    }

    const data = await response.json()
    const tweetData = data.tweet

    if (!tweetData) {
      console.error(`No tweet data for ${tweetId}`)
      return null
    }

    // Extract content
    let content = tweetData.text || ''
    if (tweetData.article?.content?.blocks) {
      content = tweetData.article.content.blocks
        .map((block: { text?: string }) => block.text || '')
        .join('\n')
    } else if (tweetData.raw_text?.text) {
      content = tweetData.raw_text.text
    }

    // Extract media image
    let mediaUrl: string | undefined
    if (tweetData.article?.cover_media?.media_info?.original_img_url) {
      const downloaded = await downloadImage(
        tweetData.article.cover_media.media_info.original_img_url,
        tweetsDir,
        `tweet_${tweetId}`
      )
      mediaUrl = downloaded || tweetData.article.cover_media.media_info.original_img_url
    } else if (tweetData.media_entities?.[0]?.media_url) {
      const downloaded = await downloadImage(
        tweetData.media_entities[0].media_url,
        tweetsDir,
        `tweet_${tweetId}`
      )
      mediaUrl = downloaded || tweetData.media_entities[0].media_url
    }

    // Extract author info
    const authorName = tweetData.author?.name || tweetData.author?.screen_name || 'Unknown'
    const authorHandle = '@' + (tweetData.author?.screen_name || 'unknown')
    const authorId = tweetData.author?.id?.toString() || authorHandle

    // Download avatar if not already downloaded, otherwise use original URL
    let avatarPath = downloadedAvatars.get(authorId)
    if (!avatarPath && tweetData.author?.avatar_url) {
      avatarPath = await downloadImage(
        tweetData.author.avatar_url,
        avatarsDir,
        `avatar_${authorId}`
      )
      if (avatarPath) {
        downloadedAvatars.set(authorId, avatarPath)
      } else {
        // Fallback to original URL if download fails
        avatarPath = tweetData.author.avatar_url
      }
    }

    return {
      id: tweetId,
      author: authorName,
      authorHandle: authorHandle,
      authorAvatar: avatarPath,
      content: content,
      publishTime: tweetData.created_timestamp
        ? new Date(tweetData.created_timestamp * 1000).toISOString()
        : new Date().toISOString(),
      mediaUrl: mediaUrl,
      originalUrl: url,
    }
  } catch (error) {
    console.error(`Error fetching tweet ${tweetId}:`, error)
    return null
  }
}

async function main() {
  ensureDirs()
  const tweets: Tweet[] = []
  const authors: Record<string, Author> = {}
  const downloadedAvatars = new Map<string, string>()

  // Load existing authors with their avatars
  const existingDataPath = path.join(process.cwd(), 'src/data/communityTweets.json')
  try {
    const existingData = JSON.parse(fs.readFileSync(existingDataPath, 'utf-8')) as TweetData
    if (existingData.authors) {
      Object.entries(existingData.authors).forEach(([key, author]) => {
        authors[key] = author
        if (author.avatar) {
          // Use existing avatar path as already downloaded
          downloadedAvatars.set(key.replace('@', ''), author.avatar)
        }
      })
    }
  } catch {
    // Ignore
  }

  for (const [authorKey, urls] of Object.entries(COMMUNITY_ARTICLES)) {
    console.log(`Fetching tweets for ${authorKey}...`)

    for (const url of urls) {
      const tweet = await fetchTweet(url, downloadedAvatars)
      if (tweet) {
        tweets.push(tweet)
        console.log(`  ✓ ${tweet.id}: ${tweet.content.slice(0, 50)}...`)

        // Update author info with avatar
        const handleKey = tweet.authorHandle
        if (!authors[handleKey]) {
          authors[handleKey] = {
            name: tweet.author,
            handle: tweet.authorHandle,
          }
        }
        if (tweet.authorAvatar) {
          authors[handleKey].avatar = tweet.authorAvatar
        }
      } else {
        const match = url.match(/status\/(\d+)/)
        const tweetId = match ? match[1] : 'unknown'
        tweets.push({
          id: tweetId,
          author: authorKey.replace('@', ''),
          authorHandle: authorKey,
          content: '[Failed to load tweet content]',
          publishTime: new Date().toISOString(),
          originalUrl: url,
        })
        console.log(`  ✗ ${tweetId}: Failed to fetch`)
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  const tweetData: TweetData = {
    authors,
    tweets,
  }

  const outputPath = path.join(process.cwd(), 'src/data/communityTweets.json')
  fs.writeFileSync(outputPath, JSON.stringify(tweetData, null, 2), 'utf-8')

  console.log(`\n✓ Saved ${tweets.length} tweets to ${outputPath}`)
  console.log(`✓ Downloaded avatars to /public/images/avatars/`)
  console.log(`✓ Downloaded media to /public/images/tweets/`)
}

main().catch(console.error)
