const fs = require('fs')

const tweetIds = [
  '2027592732810875189',
  '2022577865183891717',
  '2016642427017449696',
  '2015697594870300747',
  '2015240566477672518',
  '2014683683945619743'
]

// Helper function to extract text from article blocks
function extractTextFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks.map(block => {
    if (block.type === 'unstyled' || block.type === 'header-two' || block.type === 'header-one') {
      return block.text || ''
    }
    if (block.type === 'unordered-list-item' || block.type === 'ordered-list-item') {
      return '• ' + (block.text || '')
    }
    if (block.type === 'blockquote') {
      return '> ' + (block.text || '')
    }
    return ''
  }).filter(Boolean).join('\n')
}

async function fetchTweet(id) {
  try {
    const response = await fetch(`https://api.fxtwitter.com/wwwqlwyxyz/status/${id}`)
    const data = await response.json()

    if (data.tweet) {
      const tweet = data.tweet

      // Extract full content from article blocks
      let fullContent = ''
      if (tweet.article && tweet.article.content && tweet.article.content.blocks) {
        fullContent = extractTextFromBlocks(tweet.article.content.blocks)
      } else {
        fullContent = tweet.article?.preview_text || tweet.raw_text?.text || ''
      }

      return {
        id: tweet.id,
        author: tweet.author.name,
        authorHandle: '@' + tweet.author.screen_name,
        authorAvatar: tweet.author.avatar_url,
        content: fullContent,
        title: tweet.article?.title || '',
        publishTime: tweet.created_timestamp ? new Date(tweet.created_timestamp * 1000).toISOString() : tweet.created_at,
        mediaUrl: tweet.article?.cover_media?.media_info?.original_img_url || null,
        originalUrl: tweet.url,
        tags: ['官方']
      }
    }
    return null
  } catch (error) {
    console.error(`Error fetching ${id}:`, error.message)
    return null
  }
}

async function main() {
  console.log('Fetching official tweets...')

  const tweets = []
  for (const id of tweetIds) {
    const tweet = await fetchTweet(id)
    if (tweet) {
      tweets.push(tweet)
      console.log(`✓ Fetched: ${tweet.title || tweet.id} (${tweet.content.length} chars)`)
    }
    await new Promise(r => setTimeout(r, 500))
  }

  // Sort by publish time (newest first)
  tweets.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))

  const output = {
    authors: {
      '@wwwqlwyxyz': {
        name: '潜龙勿用',
        handle: '@wwwqlwyxyz',
        avatar: 'https://pbs.twimg.com/profile_images/2014677549637574657/W054fZLA_200x200.png'
      }
    },
    tweets: tweets
  }

  fs.writeFileSync('./src/data/officialTweets.json', JSON.stringify(output, null, 2))
  console.log(`\nSaved ${tweets.length} official tweets to src/data/officialTweets.json`)
}

main()
