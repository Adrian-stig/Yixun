# 一循地方 · YIXUN PLACE

面向公众、学生、教师、志愿者和公益组织的可持续发展学习与行动平台。

网站将真实地点探索、线下工作坊、线上微课、公众行动、观察记录与项目成果连接起来。当前版本是一个使用模拟数据的响应式 Web MVP。

## 在 VS Code 中打开

环境要求：

- Node.js `>=22.13.0`
- npm（随 Node.js 安装）
- Visual Studio Code

打开终端并运行：

```bash
cd local-action-map
code .
npm install
npm run dev
```

开发服务器启动后，在浏览器访问终端显示的本地地址，通常为：

```text
http://localhost:3000
```

保存代码后页面会自动刷新。

## 常用命令

```bash
npm run dev       # 启动本地开发环境
npm run build     # 检查生产构建
npm test          # 构建并运行基础页面测试
npm run lint      # 运行代码规范检查
```

## 主要文件

```text
local-action-map/
├── app/
│   ├── page.tsx          # 首页内容、模拟数据与交互逻辑
│   ├── globals.css       # 全站视觉样式和响应式布局
│   ├── layout.tsx        # 页面标题、分享信息和全局布局
│   └── chatgpt-auth.ts   # 可选的 ChatGPT 登录辅助方法
├── public/
│   ├── og.png            # 社交平台分享封面
│   └── favicon.png       # 网站图标
├── db/                   # 未来接入数据库时使用
├── worker/               # Cloudflare Worker 入口
├── tests/                # 基础页面测试
├── package.json          # 项目依赖和命令
└── vite.config.ts        # 本地开发和构建配置
```

## 从哪里开始修改

- 修改首页文字、地点、工作坊和评价体系：`app/page.tsx`
- 修改颜色、字体、间距和移动端布局：`app/globals.css`
- 修改网页标题、搜索摘要和分享信息：`app/layout.tsx`
- 替换分享封面或图标：`public/`

## 当前实现范围

已经实现：

- 项目背景、目标与四维评价体系
- 地点地图和列表切换
- 议题筛选与地点详情
- 工作坊展示和模拟报名
- 微课加入和行动进度演示
- 项目成果与影响力展示
- 桌面端和移动端响应式布局

仍为演示或预留：

- 地点、活动和用户数据目前写在前端代码中
- 报名表不会向真实后端提交
- 个人进度只保存在当前页面状态中
- 中英文切换入口已预留，尚未完成全量翻译
- 文件上传、账号体系和管理后台尚未接入

## 技术结构

- React 19
- TypeScript
- Next.js 兼容接口
- vinext + Vite
- Tailwind CSS 基础环境与定制 CSS
- Cloudflare Workers 兼容构建

线上预览：

<https://local-action-map-cn.adrian750826.chatgpt.site>
