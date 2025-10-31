# 部署指南

## ✅ SSR模式完成配置

项目已经成功切换到SSR（Server-Side Rendering）模式，支持动态sitemap生成。

## 部署选项

### 1. Vercel部署（推荐）

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

**特性:**
- 零配置部署
- 自动HTTPS
- 全球CDN
- 服务器端渲染支持
- 动态sitemap.xml生成

### 2. Cloudflare Pages（需要额外配置）

**注意:** Cloudflare Pages主要支持静态网站，对于SSR应用需要使用Cloudflare Workers或者构建为静态模式。

如果需要使用Cloudflare Pages，需要：

1. **切回静态模式（可选）**:
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

2. **构建配置**:
```bash
# 构建命令
npm run build

# 输出目录
out
```

### 3. 其他SSR支持的平台

- **AWS Amplify**
- **Netlify** (支持Next.js SSR)
- **Railway**
- **Render**
- **DigitalOcean App Platform**

## 当前配置特性

### ✅ 已实现功能

- **SSR模式**: 支持服务器端渲染
- **动态Sitemap**: `/sitemap.xml` 自动生成，包含所有页面和博客文章
- **SEO优化**: 每个页面都有完整的meta标签
- **响应式设计**: 完美支持移动端
- **性能优化**: 图片优化、代码分割、预渲染
- **Google Analytics**: 集成GA4追踪
- **Google AdSense**: 广告集成（需要审核通过）

### 📊 构建信息

```
Route (app)                                            Size     First Load JS
┌ ○ /                                                  8.1 kB          116 kB
├ ○ /_not-found                                        871 B          87.9 kB
├ ○ /about                                             843 B          97.1 kB
├ ○ /batch-black-and-white-converter                   6.01 kB         103 kB
├ ○ /blog                                              181 B            94 kB
├ ● /blog/[slug]                                       2.41 kB         104 kB
├ ○ /examples                                          5.75 kB         100 kB
├ ○ /faq                                               843 B          97.1 kB
├ ○ /how-to-use                                        843 B          97.1 kB
├ ○ /privacy                                           181 B            94 kB
├ ○ /sitemap.xml                                       0 B                0 B  ✅ 动态生成
├ ○ /terms                                             181 B            94 kB
└ ○ /tools                                             13.8 kB         112 kB

○  (Static)  预渲染静态内容
●  (SSG)     静态生成HTML

> 注：`/black-and-white-image` 已移除并永久重定向至首页 `/`。
```

### 🔧 环境变量配置

部署时需要设置的环境变量：

```bash
# Google Analytics (可选)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense (可选) 
NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID=ca-pub-xxxxxxxxxx

# 网站URL (用于sitemap)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 本地开发

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 生产模式
npm run start

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## Sitemap功能

- **自动生成**: 每次构建时自动更新
- **动态内容**: 包含所有页面和博客文章
- **SEO优化**: 正确的优先级和更新频率
- **访问路径**: `https://yourdomain.com/sitemap.xml`

## 性能指标

- **首页加载**: ~116KB (包含所有功能)
- **后续页面**: ~87-104KB
- **图片优化**: 启用Next.js图片优化
- **代码分割**: 自动按路由分割

## 维护和更新

### 添加新页面
只需在 `src/app` 下创建页面，sitemap会自动包含。

### 添加新博客文章
在 `src/data/blog-posts.json` 中添加新文章数据，sitemap会自动更新。

### 更新SEO信息
修改各页面的 `metadata` 对象即可更新meta标签。

## 故障排除

### 构建失败
```bash
# 检查类型错误
npm run type-check

# 检查代码风格
npm run lint
```

### Sitemap无法访问
确保 `src/app/sitemap.ts` 文件存在且格式正确。

### 图片不显示
检查 `next.config.js` 中的图片配置是否正确。
