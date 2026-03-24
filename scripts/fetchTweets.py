#!/usr/bin/env python3
"""
脚本用于获取 Twitter/X 推文内容
使用 fxtwitter.com API
运行方式: python3 scripts/fetchTweets.py
"""

import json
import urllib.request
import urllib.error
import time

TWEET_URLS = [
    ("icednocap", "2031630388226044278", "無糖冰有事"),
    ("btc2014eth", "2030492158546080231", "馬老師"),
    ("wtmlaile168", "2028354015302762567", "憤怒"),
    ("lucaszero123", "2027673440438915435", "Luca"),
    ("binance_lifes", "2025499547758461078", "屌毛"),
    ("binance_lifes", "2022666763562029086", "屌毛"),
    ("binance_lifes", "2025872612472287343", "屌毛"),
    ("binance_lifes", "2021915005080494254", "屌毛"),
    ("binance_lifes", "2022030641597120725", "屌毛"),
]

def fetch_tweet(handle, tweet_id):
    url = f"https://api.fxtwitter.com/{handle}/status/{tweet_id}"
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data.get('code') == 200:
                return data.get('tweet', {})
    except Exception as e:
        print(f"  Error: {e}")
    return None

def convert_time(twitter_time):
    # "Wed Mar 11 07:16:45 +0000 2026" -> "2026-03-11T07:16:45.000Z"
    from email.utils import parsedate_to_datetime
    try:
        dt = parsedate_to_datetime(twitter_time)
        return dt.strftime('%Y-%m-%dT%H:%M:%S.000Z')
    except:
        return twitter_time

def main():
    authors = {}
    tweets = []
    seen_handles = set()

    for handle, tweet_id, name in TWEET_URLS:
        print(f"获取 {name} ({tweet_id})...")

        tweet_data = fetch_tweet(handle, tweet_id)
        if not tweet_data:
            continue

        # Get author info (only once per handle)
        if handle not in seen_handles:
            seen_handles.add(handle)
            author_info = tweet_data.get('author', {})
            handle_key = f"@{handle.upper()}"
            authors[handle_key] = {
                "name": name,
                "handle": f"@{handle}",
                "avatar": author_info.get('avatar_url', '')
            }

        # Extract tweet info
        text = tweet_data.get('text', '')
        timestamp = tweet_data.get('created_at', '')
        media = tweet_data.get('media', {}).get('photos', [])
        media_url = media[0].get('url') if media else None

        tweets.append({
            "id": tweet_id,
            "author": name,
            "authorHandle": f"@{handle}",
            "authorAvatar": "",
            "content": text,
            "publishTime": convert_time(timestamp),
            "mediaUrl": media_url,
            "originalUrl": f"https://x.com/{handle}/status/{tweet_id}"
        })

        print(f"  OK: {text[:50]}...")
        time.sleep(0.3)

    result = {
        "authors": authors,
        "tweets": tweets
    }

    # Save to file
    with open('scripts/newTweets.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n已保存到 scripts/newTweets.json")
    print(f"获取了 {len(tweets)} 条推文，{len(authors)} 位作者")

if __name__ == "__main__":
    main()
