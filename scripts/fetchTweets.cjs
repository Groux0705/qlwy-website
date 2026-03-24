/**
 * 脚本用于获取 Twitter/X 推文内容
 * 使用 fxtwitter.com API
 * 运行方式: node scripts/fetchTweets.cjs
 */

const https = require('https');

const TWEET_URLS = [
  { id: '2031630388226044278', handle: 'icednocap', name: '無糖冰有事' },
  { id: '2030492158546080231', handle: 'btc2014eth', name: '馬老師' },
  { id: '2028354015302762567', handle: 'wtmlaile168', name: '憤怒' },
  { id: '2027673440438915435', handle: 'lucaszero123', name: 'Luca' },
  { id: '2025499547758461078', handle: 'binance_lifes', name: '屌毛' },
  { id: '2022666763562029086', handle: 'binance_lifes', name: '屌毛' },
  { id: '2025872612472287343', handle: 'binance_lifes', name: '屌毛' },
  { id: '2021915005080494254', handle: 'binance_lifes', name: '屌毛' },
  { id: '2022030641597120725', handle: 'binance_lifes', name: '屌毛' },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timeout')), 10000);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        clearTimeout(timeout);
        resolve(data);
      });
    }).on('error', (e) => {
      clearTimeout(timeout);
      reject(e);
    });
  });
}

async function getTweetData(tweetId, handle, name) {
  // 使用 fxtwitter API
  const url = `https://api.fxtwitter.com/${handle}/status/${tweetId}`;

  try {
    const data = await fetchUrl(url);
    const json = JSON.parse(data);

    if (json.success && json.tweet) {
      const tweet = json.tweet;
      return {
        id: tweetId,
        author: name,
        authorHandle: `@${handle}`,
        content: tweet.text || tweet.content,
        publishTime: tweet.createdAt || tweet.timestamp,
        mediaUrl: tweet.media?.[0]?.url || tweet.media?.[0]?.media_url || null,
        originalUrl: `https://x.com/${handle}/status/${tweetId}`
      };
    }
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  return {
    id: tweetId,
    author: name,
    authorHandle: `@${handle}`,
    content: '',
    publishTime: '',
    mediaUrl: null,
    originalUrl: `https://x.com/${handle}/status/${tweetId}`
  };
}

async function main() {
  console.log('开始获取推文...\n');

  const results = [];

  for (const { id, handle, name } of TWEET_URLS) {
    console.log(`获取 ${name} (${id})...`);
    const data = await getTweetData(id, handle, name);
    results.push(data);
    if (data.content) {
      console.log(`  OK: ${data.content.substring(0, 60)}...`);
      console.log(`  时间: ${data.publishTime}`);
      console.log(`  媒体: ${data.mediaUrl || '无'}`);
    } else {
      console.log(`  失败`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n\n===== JSON 输出 =====\n');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
