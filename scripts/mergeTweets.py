#!/usr/bin/env python3
"""
合并新推文到 communityTweets.json
"""

import json

# 读取现有的 communityTweets.json
with open('src/data/communityTweets.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

# 读取新推文
with open('scripts/newTweets.json', 'r', encoding='utf-8') as f:
    new_data = json.load(f)

# 合并 authors (跳过已存在的)
existing_authors = set(existing.get('authors', {}).keys())
for key, author in new_data.get('authors', {}).items():
    if key not in existing_authors:
        existing['authors'][key] = author
        print(f"新增作者: {author['name']} ({key})")
    else:
        print(f"作者已存在: {key}")

# 合并 tweets (跳过已存在的)
existing_tweet_ids = set(t['id'] for t in existing.get('tweets', []))
new_tweets = []
for tweet in new_data.get('tweets', []):
    if tweet['id'] not in existing_tweet_ids:
        new_tweets.append(tweet)
        print(f"新增推文: {tweet['author']} - {tweet['id']}")
    else:
        print(f"推文已存在: {tweet['id']}")

# 将新推文添加到开头（按时间排序，最新的在前）
new_tweets.sort(key=lambda x: x['publishTime'], reverse=True)
existing['tweets'] = new_tweets + existing['tweets']

# 保存
with open('src/data/communityTweets.json', 'w', encoding='utf-8') as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)

print(f"\n完成！新增 {len(new_tweets)} 条推文")
