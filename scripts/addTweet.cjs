const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/communityTweets.json', 'utf8'));

// Add Max's tweet with tags
data.tweets.push({
  "id": "2018024318186492297",
  "author": "FUKUYAFUNJI·Max",
  "authorHandle": "@MaxShen1984",
  "authorAvatar": "https://pbs.twimg.com/profile_images/1891412074561142784/Xa1rySmL_200x200.jpg",
  "content": "最近一直在关注「潜龙勿用」这个小应用，虽然在更多人眼里看到是币价或者市值，但是我发现，无论是古代的卜卦、抽签，还是今天的市场预测系统，本质上都在回答同一个问题：在不确定性极高的环境中，如何做出一个尽可能不被操纵的判断？\n\n本文从工程视角出发，讨论 BSC VRF（可验证随机函数）在市场预测类产品中的真实作用：它并不预测市场，而是为预测系统提供一个可信、可审计、反操纵的随机决策基础。\n\n从卜卦到 VRF，核心演进是：随机源从蓍草到密码学，过程从不可验证到可审计。BSC VRF 不能预测市场，但它可以让市场预测系统变得更可信。",
  "publishTime": "2026-02-01T18:11:05.000Z",
  "mediaUrl": "https://pbs.twimg.com/media/HAF1ACdbEAAfVEG.jpg",
  "originalUrl": "https://x.com/MaxShen1984/status/2018024318186492297",
  "tags": ["cz点赞评论", "何一关注"]
});

fs.writeFileSync('./src/data/communityTweets.json', JSON.stringify(data, null, 2));
console.log('Added Max tweet with tags successfully');
console.log('Tweet has tags:', data.tweets[data.tweets.length-1].tags);