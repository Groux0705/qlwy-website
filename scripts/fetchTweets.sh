#!/bin/bash
# 脚本用于获取 Twitter/X 推文内容
# 使用 fxtwitter.com API

TWEET_URLS=(
  "icednocap:2031630388226044278:無糖冰有事"
  "btc2014eth:2030492158546080231:馬老師"
  "wtmlaile168:2028354015302762567:憤怒"
  "lucaszero123:2027673440438915435:Luca"
  "binance_lifes:2025499547758461078:屌毛"
  "binance_lifes:2022666763562029086:屌毛"
  "binance_lifes:2025872612472287343:屌毛"
  "binance_lifes:2021915005080494254:屌毛"
  "binance_lifes:2022030641597120725:屌毛"
)

# 转换时间格式
convert_time() {
  # 输入: "Wed Mar 11 07:16:45 +0000 2026"
  # 输出: "2026-03-11T07:16:45.000Z"
  date -j -f "%a %b %d %H:%M:%S +0000 %Y" "$1" "+%Y-%m-%dT%H:%M:%S.000Z" 2>/dev/null || echo "$1"
}

echo "{"
echo '  "authors": {'

first_author=true
declare -A seen_authors

for entry in "${TWEET_URLS[@]}"; do
  IFS=':' read -r handle id name <<< "$entry"

  # 跳过已见过的作者
  if [[ -n "${seen_authors[$handle]}" ]]; then
    continue
  fi
  seen_authors[$handle]=1

  echo "获取作者头像 $name (@$handle)..."
  response=$(curl -s "https://api.fxtwitter.com/$handle/status/$id")
  avatar=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tweet',{}).get('author',{}).get('avatar_url','') or '')" 2>/dev/null)

  if [ "$first_author" = true ]; then
    first_author=false
  else
    echo "    ,"
  fi

  cat << EOF
    "@${handle^^}": {
      "name": "$name",
      "handle": "@${handle}",
      "avatar": "$avatar"
    }
EOF
done

echo '  },'
echo '  "tweets": ['

first_tweet=true
for entry in "${TWEET_URLS[@]}"; do
  IFS=':' read -r handle id name <<< "$entry"

  echo "获取推文 $name ($id)..."
  response=$(curl -s "https://api.fxtwitter.com/$handle/status/$id")

  code=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('code',''))" 2>/dev/null)

  if [ "$code" = "200" ]; then
    text=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tweet',{}).get('text',''))" 2>/dev/null)
    timestamp=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tweet',{}).get('created_at',''))" 2>/dev/null)
    media=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); m=d.get('tweet',{}).get('media',{}).get('photos',[]); print(m[0].get('url','') if m else '')" 2>/dev/null)

    # 转换时间
    if [ -n "$timestamp" ]; then
      iso_time=$(convert_time "$timestamp")
    else
      iso_time=""
    fi

    if [ "$first_tweet" = true ]; then
      first_tweet=false
    else
      echo "    ,"
    fi

    cat << EOF
    {
      "id": "$id",
      "author": "$name",
      "authorHandle": "@$handle",
      "authorAvatar": "",
      "content": $(echo "$text" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))"),
      "publishTime": "$iso_time",
      "mediaUrl": $(if [ -n "$media" ]; then echo "\"$media\""; else echo "null"; fi),
      "originalUrl": "https://x.com/$handle/status/$id"
    }
EOF
  fi

  sleep 0.3
done

echo '  ]'
echo '}'
