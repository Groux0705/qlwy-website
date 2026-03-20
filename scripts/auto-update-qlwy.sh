#!/bin/bash
# 前端项目自动更新脚本（qlwy-website v2 分支）
# 配置项（根据实际情况修改）
PROJECT_DIR="/root/qlwy-website"  # 项目根目录
PM2_SERVICE_NAME="qlwy"           # PM2 服务名
LOG_FILE="/root/qlwy-update.log"  # 更新日志文件
BRANCH="v2"                       # 要拉取的分支

# 定义日志函数（带时间戳）
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

# 第一步：检查项目目录是否存在
if [ ! -d "$PROJECT_DIR" ]; then
    log "错误：项目目录 $PROJECT_DIR 不存在！"
    exit 1
fi

# 第二步：进入项目目录
cd $PROJECT_DIR || {
    log "错误：无法进入项目目录 $PROJECT_DIR！"
    exit 1
}

# 第三步：暂存本地修改（防止拉取冲突）
log "===== 开始暂存本地修改 ====="
git stash >> $LOG_FILE 2>&1
if [ $? -eq 0 ]; then
    log "本地修改暂存成功"
else
    log "警告：无本地修改需要暂存（或暂存失败）"
fi

# 第四步：拉取远程 v2 分支最新代码
log "===== 开始拉取远程 $BRANCH 分支 ====="
git pull origin $BRANCH >> $LOG_FILE 2>&1
if [ $? -ne 0 ]; then
    log "错误：拉取远程 $BRANCH 分支失败！"
    # 恢复暂存的修改（避免丢失）
    git stash pop >> $LOG_FILE 2>&1
    exit 1
fi
log "拉取远程 $BRANCH 分支成功"

# 第五步：恢复本地暂存的修改（比如 vite.config.ts）
log "===== 恢复本地暂存的修改 ====="
git stash pop >> $LOG_FILE 2>&1
if [ $? -eq 0 ]; then
    log "本地修改恢复成功"
else
    log "警告：无暂存的修改需要恢复（或恢复失败）"
fi

# 第六步：安装依赖（处理 package.json 更新）
log "===== 开始安装/更新依赖 ====="
npm install >> $LOG_FILE 2>&1
if [ $? -ne 0 ]; then
    log "错误：依赖安装失败！"
    exit 1
fi
log "依赖安装成功"

# 第七步：构建前端项目
log "===== 开始构建前端项目 ====="
npm run build >> $LOG_FILE 2>&1
if [ $? -ne 0 ]; then
    log "错误：项目构建失败！"
    exit 1
fi
log "项目构建成功"

# 第八步：重启 PM2 服务
log "===== 重启 PM2 服务 $PM2_SERVICE_NAME ====="
pm2 restart $PM2_SERVICE_NAME >> $LOG_FILE 2>&1
if [ $? -ne 0 ]; then
    log "错误：PM2 服务重启失败！"
    exit 1
fi
# 验证服务状态
pm2 status $PM2_SERVICE_NAME | grep "online" >> $LOG_FILE 2>&1
log "PM2 服务 $PM2_SERVICE_NAME 重启成功，状态：online"

# 完成
log "===== 本次自动更新全部完成 =====\n"
exit 0