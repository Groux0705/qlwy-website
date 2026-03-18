import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 玄黑/墨色 - 主背景
        'xuan-black': '#0a0a0a',
        'ink': '#1a1a2e',
        'ink-light': '#252542',

        // 赤金/琥珀 - 强调色
        'chi-gold': '#c9a227',
        'amber': '#d4a574',
        'gold-light': '#e8c547',

        // 玉石绿/朱砂红 - 点缀色
        'jade': '#2d5a4a',
        'cinnabar': '#8b2942',
        'cinnabar-light': '#a83350',

        // 宣纸米白 - 背景色
        'xuan-paper': '#f5f0e6',
        'xuan-dark': '#e8e0d0',

        // 阴阳
        'yin': '#1a1a2e',
        'yang': '#f5f0e6',
      },
      fontFamily: {
        'noto': ['Noto Serif SC', 'serif'],
        'noto-sans': ['Noto Sans SC', 'sans-serif'],
        'serif': ['Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'rotate-slow': 'rotate 60s linear infinite',
        'rotate-reverse': 'rotate 60s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'ink-spread': 'inkSpread 2s ease-out forwards',
        'line-appear': 'lineAppear 0.5s ease-out forwards',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        lineAppear: {
          '0%': { scaleY: '0', opacity: '0' },
          '100%': { scaleY: '1', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'paper-texture': "url('/assets/paper-texture.png')",
      },
    },
  },
  plugins: [],
};

export default config;
