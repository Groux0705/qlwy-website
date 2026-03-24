#!/usr/bin/env python3
"""
修复推文中的 authorAvatar 字段，从 authors 表获取
"""

import json

with open('src/data/communityTweets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 构建 handle -> avatar 的映射
handle_to_avatar = {}
for key, author in data.get('authors', {}).items():
    handle = author.get('handle', '')
    avatar = author.get('avatar', '')
    if handle and avatar:
        handle_to_avatar[handle.lower()] = avatar

print(f"找到 {len(handle_to_avatar)} 个作者头像映射")

# 更新 tweets
updated = 0
for tweet in data.get('tweets', []):
    author_handle = tweet.get('authorHandle', '').lower()
    if author_handle in handle_to_avatar:
        tweet['authorAvatar'] = handle_to_avatar[author_handle]
        updated += 1

print(f"更新了 {updated} 条推文的头像")

with open('src/data/communityTweets.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("完成！")
