# 潜龙勿用 (QLWY) 官网

基于易经智慧的Web3 NFT生态系统官网

## 技术栈

### 核心框架
- **Next.js 14** (App Router) - SSR/SEO友好的React框架
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 实用优先的CSS框架

### 动画与3D
- **Framer Motion** - 页面过渡和复杂交互动画
- **GSAP** - 高性能时间线动画
- **React Spring** - 物理弹簧动画
- **Three.js + React Three Fiber** - 3D图形渲染
- **Lottie** - 复杂矢量动画

### 数据展示
- **Recharts** - 数据可视化图表
- **DexScreener API** - 实时代币价格数据

### 国际化
- **next-intl** - 完整的i18n解决方案
- 支持: 简体中文、繁体中文、英语、日语、韩语

### UI组件
- **Radix UI** - 无样式可访问组件
- **Lucide Icons** - 图标库

## 项目结构

```
website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # 国际化路由
│   │   │   ├── page.tsx         # 首页
│   │   │   ├── docs/            # 文档页
│   │   │   ├── marketplace/     # NFT市场
│   │   │   └── dashboard/       # 数据面板
│   │   └── layout.tsx           # 根布局
│   ├── components/
│   │   ├── ui/                  # 基础UI组件
│   │   ├── animation/           # 动画组件
│   │   ├── trading/             # 交易组件
│   │   ├── iching/              # 易经特色组件
│   │   └── layout/              # 布局组件
│   ├── hooks/                   # React Hooks
│   ├── lib/                     # 工具函数和API
│   ├── styles/                  # 全局样式
│   └── i18n.ts                  # 国际化配置
├── messages/                    # 翻译文件
│   ├── en.json
│   ├── zh.json
│   ├── zh-TW.json
│   ├── ko.json
│   └── ja.json
└── public/                      # 静态资源
```

## 开始开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 设计特点

### 色彩方案
- 玄黑/墨色 - 主背景
- 赤金/琥珀 - 强调色
- 玉石绿/朱砂红 - 点缀色
- 宣纸米白 - 背景色

### 动画风格
- 八卦阵缓慢旋转
- 爻线逐条显现
- 墨水晕染效果
- 呼吸动画

## 页面功能

### 首页
- 3D八卦阵动画背景
- 品牌展示
- 实时数据概览
- 系统介绍

### 文档中心
- 卜卦系统
- PVP战斗
- 精炼系统
- 预测市场

### NFT市场
- NFT展示与筛选
- 稀有度过滤
- 地板价/交易量

### 数据面板
- 实时代币价格 (DexScreener)
- TVL/用户统计
- Jackpot池金额
- 战斗历史

## 许可证

MIT
