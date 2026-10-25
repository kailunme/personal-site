export type Locale = 'en' | 'zh' | 'ja';

export interface BookmarkLink {
  title: string;
  url: string;
  desc?: string;
}

export interface LinkCategory {
  name: string;
  links: BookmarkLink[];
}

export interface LinksContent {
  pageTitle: string;
  desc: string;
  categories: LinkCategory[];
}

export interface NavContent {
  handle: string;
  links: { label: string; href: string; active?: boolean }[];
}

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  href: string;
  star: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface MainContent {
  welcomeP1: string;
  welcomeP2: string;
  blinkNotice: string;
  factBar: string;
  projectsLabel: string;
  skillsLabel: string;
  proficiencyLabel: string;
  projects: Project[];
  skills: Skill[];
}

export interface Update {
  date: string;
  text: string;
}

export interface SidebarContent {
  nowPlayingTitle: string;
  nowPlayingArtist: string;
  listeningLabel: string;
  statsTitle: string;
  buttonTitle: string;
  stats: { label: string; value: string }[];
}

export const linksData: Record<Locale, LinksContent> = {
  en: {
    pageTitle: 'LINKS',
    desc: 'Places on the web worth visiting. Updated whenever I find something good.',
    categories: [
      {
        name: 'WORK',
        links: [
          { title: 'Right Code', url: 'https://www.right.codes/dashboard' },
          { title: 'AI派', url: 'https://api.aipaibox.com/console/log' },
          { title: 'AI Agent Performance Leaderboard', url: 'https://arena.ai/leaderboard/agent' },
        ],
      },
      {
        name: 'GOOGLE',
        links: [
          { title: 'Google', url: 'https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl' },
          { title: 'Gmail 收件箱', url: 'https://mail.google.com/mail/u/2/#inbox' },
          { title: 'Google 翻译', url: 'https://translate.google.com.hk/?hl=zh-CN&tab=TT&sl=auto&tl=zh-CN&op=translate' },
          { title: 'Google Gemini', url: 'https://gemini.google.com/u/0/app' },
        ],
      },
      {
        name: 'BROWSE',
        links: [
          { title: '山口大学教务系统', url: 'https://www.kyoumu.jimu.yamaguchi-u.ac.jp/portal/' },
          { title: '山口大学 Moodle', url: 'https://mdcs5.cc.yamaguchi-u.ac.jp/moodle/login/index.php' },
          { title: '山口大学', url: 'https://www.yamaguchi-u.ac.jp/' },
          { title: 'Bilibili', url: 'http://bilibili.com/' },
          { title: '维基百科', url: 'https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5' },
          { title: 'YouTube', url: 'https://youtube.com/' },
          { title: 'Cloudflare Workers & Pages', url: 'https://dash.cloudflare.com/e1e6c685878ee5f51e16bb5e2cfa9654/workers-and-pages' },
        ],
      },
      {
        name: 'MISC',
        links: [
          { title: '阿虚', url: 'https://axutongxue.com/' },
          { title: 'Bangumi', url: 'https://bangumi.tv/' },
          { title: '萌娘百科', url: 'http://mzh.moegirl.org.cn/Mainpage' },
          { title: 'SCP', url: 'http://scp-wiki-cn.wikidot.com/' },
          { title: 'Doyoudo', url: 'https://www.doyoudo.com/resources' },
          { title: 'Apple (中国大陆)', url: 'https://apple.cn/' },
          { title: '大小写转换器', url: 'https://www.iamwawa.cn/daxiaoxie.html' },
          { title: '配色网站 - 知乎', url: 'https://www.zhihu.com/question/299730272/answer/1171987482' },
          { title: 'flysheep资源避难所', url: 'http://flysheep.ys168.com/' },
          { title: '学府图书馆', url: 'http://www.xue1888.com/' },
          { title: '3DMGAME', url: 'https://bbs.3dmgame.com/forum.php' },
          { title: '萌娘百科 (桌面版)', url: 'https://zh.moegirl.org.cn/index.php?title=Mainpage&mobileaction=toggle_view_desktop' },
          { title: '拉康 Z-Library', url: 'https://zh.fr1lib.org/s/%E6%8B%89%E5%BA%B7?' },
          { title: 'Convertio', url: 'https://convertio.co/zh/flv-mp4/' },
          { title: 'Switch520', url: 'https://fourpetal.com/' },
          { title: 'Switch520 (new)', url: 'https://xxxxx520.com/' },
          { title: 'Picrew', url: 'https://picrew.me/image_maker/1225542' },
          { title: 'Gmail (副)', url: 'https://mail.google.com/mail/u/0/#inbox' },
          { title: '有道文档翻译', url: 'https://pdf.youdao.com/docview.html?key=28D452B426934C52B1AF2C62E8D0AB16&from=en&to=zh-CHS&src=fanyiweb&isUseTerm=1&mode=PICMODE' },
          { title: '大学物理通知 - CQUT', url: 'https://www.cqut.edu.cn/info/1103/44545.htm' },
          { title: '游戏快车', url: 'https://gamecar.vip/' },
          { title: '游戏加速器百宝箱', url: 'https://www.jsqcdk.com/' },
          { title: '甲方叭叭', url: 'https://jiafangbb.com/' },
          { title: '银河录像局', url: 'https://nf.video/' },
          { title: 'Lumia 1020 漫游指南', url: 'https://sspai.com/post/106467' },
          { title: 'Neumorphism CSS', url: 'https://design.dev/tools/neumorphism/?type=raised&mode=light&bg=%23dde3ec&text=%233c4858&dist=12&blur=36&radius=24&shape=square&intensity=7&format=css&preset=soft' },
        ],
      },
      {
        name: 'NEOWEB',
        links: [
          { title: 'Neocities', url: 'https://neocities.org/' },
          { title: 'v0 Templates', url: 'https://v0.app/templates' },
          { title: 'React Bits', url: 'https://www.reactbits.dev/' },
          { title: 'Originkit', url: 'https://www.originkit.dev/' },
          { title: 'Crow Queen', url: 'https://crow-queen.com/' },
          { title: 'Frutiger Aero Archive', url: 'https://frutigeraeroarchive.org/' },
          { title: 'unicodeangel', url: 'https://unicodeangel.neocities.org/' },
          { title: "Lilith's Lair", url: 'https://lilithdev.neocities.org/' },
          { title: '基奥芬之家', url: 'https://mileshouse.neocities.org/' },
          { title: 'Xx wElCoMe xX', url: 'https://xxstephsroomxx.neocities.org/' },
          { title: 'under my rock', url: 'https://bobean.neocities.org/' },
          { title: 'Winbows XP', url: 'https://winbows.neocities.org/' },
          { title: "Kallistero's Project", url: 'https://kallistero.neocities.org/?z=' },
          { title: 'itinerae.shop', url: 'https://itinerae.shop/' },
          { title: 'KWSX Radio', url: 'https://radio.kwsx.online/' },
          { title: '甜豌豆࿔ ࣪˖', url: 'https://sweet-pea.neocities.org/' },
          { title: '内华达州任何地方', url: 'https://killing-machine.neocities.org/' },
          { title: '以太的拟人化……', url: 'https://philia995.neocities.org/' },
          { title: 'Kit FUI', url: 'https://saji8k.github.io/kit-fui/' },
          { title: 'Jamesland', url: 'https://jamesland.org/' },
          { title: 'doro0', url: 'https://dorozero.neocities.org/home' },
          { title: '机场推荐与机场评测', url: 'https://jichangtuijian.com/' },
        ],
      },
    ],
  },
  zh: {
    pageTitle: 'LINKS',
    desc: '值得一访的网络角落，随时更新。',
    categories: [
      { name: 'PLACEHOLDER', links: [{ title: '—', url: '#', desc: '书签将在这里展示' }] },
    ],
  },
  ja: {
    pageTitle: 'LINKS',
    desc: '訪れる価値のあるウェブの場所。良いものを見つけたら随時更新。',
    categories: [
      { name: 'PLACEHOLDER', links: [{ title: '—', url: '#', desc: 'ブックマークはここに' }] },
    ],
  },
};

export const nav: Record<Locale, NavContent> = {
  en: {
    handle: '@kailun.me',
    links: [
      { label: 'HOME',     href: '/',        active: true },
      { label: 'ABOUT',    href: '/about' },
      { label: 'PROJECTS', href: '/projects' },
      { label: 'BLOG',     href: '/blog' },
      { label: 'LINKS',    href: '/links' },
    ],
  },
  zh: {
    handle: '@kailun.me',
    links: [
      { label: 'HOME',     href: '/zh/',        active: true },
      { label: 'ABOUT',    href: '/zh/about' },
      { label: 'PROJECTS', href: '/zh/projects' },
      { label: 'BLOG',     href: '/zh/blog' },
      { label: 'LINKS',    href: '/links' },
    ],
  },
  ja: {
    handle: '@kailun.me',
    links: [
      { label: 'HOME',     href: '/ja/',        active: true },
      { label: 'ABOUT',    href: '/ja/about' },
      { label: 'PROJECTS', href: '/ja/projects' },
      { label: 'BLOG',     href: '/ja/blog' },
      { label: 'LINKS',    href: '/links' },
    ],
  },
};

export const main: Record<Locale, MainContent> = {
  en: {
    welcomeP1: `hey — I'm <span class="mc-highlight">Kai</span>, a software engineer obsessed with the intersection of <span class="mc-highlight">systems programming</span>, <span class="mc-highlight">generative art</span>, and the aesthetics of early internet culture.`,
    welcomeP2: `I build tools that make computers feel alive — from low-level network utilities to browser-based creative environments. This is my digital space to share projects, writing, and the things I'm collecting on the web.`,
    blinkNotice: 'still under construction — thank you for your patience',
    factBar: '∷ in the realm of zeros and ones, I search for my soul ∷',
    projectsLabel: 'featured',
    skillsLabel: 'skills',
    proficiencyLabel: 'proficiency',
    projects: [
      { name: 'neural-canvas', desc: 'Generative art using WebGL + diffusion models', tags: ['WebGL', 'TypeScript', 'AI'], href: '#', star: '42' },
      { name: 'pixelstream',   desc: 'Real-time pixel art collaboration tool',        tags: ['WebSocket', 'React', 'Canvas'], href: '#', star: '18' },
      { name: 'ascii-forge',   desc: 'CLI for converting images to ASCII art',         tags: ['Rust', 'CLI'], href: '#', star: '91' },
    ],
    skills: [
      { name: 'TypeScript',     level: 90 },
      { name: 'Rust',           level: 70 },
      { name: 'WebGL / GLSL',   level: 60 },
      { name: 'Systems Design', level: 75 },
    ],
  },
  zh: {
    welcomeP1: `你好 — 我是 <span class="mc-highlight">Kai</span>，一名软件工程师，痴迷于<span class="mc-highlight">系统编程</span>、<span class="mc-highlight">生成艺术</span>与早期互联网美学的交汇之处。`,
    welcomeP2: `我构建让计算机充满生命感的工具 — 从底层网络工具到基于浏览器的创意环境。这里是我分享项目、文章以及网络收藏的数字空间。`,
    blinkNotice: '网站正在建设中 — 感谢你的耐心等待',
    factBar: '∷ 在零与一的世界里，我寻找灵魂的栖所 ∷',
    projectsLabel: '精选',
    skillsLabel: '技能',
    proficiencyLabel: '熟练度',
    projects: [
      { name: 'neural-canvas', desc: '使用 WebGL 与扩散模型的生成艺术工具', tags: ['WebGL', 'TypeScript', 'AI'], href: '#', star: '42' },
      { name: 'pixelstream',   desc: '实时像素艺术协作平台',                  tags: ['WebSocket', 'React', 'Canvas'], href: '#', star: '18' },
      { name: 'ascii-forge',   desc: '将图片转换为 ASCII 艺术的命令行工具',   tags: ['Rust', 'CLI'], href: '#', star: '91' },
    ],
    skills: [
      { name: 'TypeScript',  level: 90 },
      { name: 'Rust',        level: 70 },
      { name: 'WebGL / GLSL', level: 60 },
      { name: '系统设计',    level: 75 },
    ],
  },
  ja: {
    welcomeP1: `こんにちは — 私は <span class="mc-highlight">Kai</span>、<span class="mc-highlight">システムプログラミング</span>、<span class="mc-highlight">ジェネラティブアート</span>、そして初期インターネット美学の交差点に魅了されたソフトウェアエンジニアです。`,
    welcomeP2: `コンピュータに命を吹き込むツールを作っています — 低レベルのネットワークユーティリティから、ブラウザベースのクリエイティブ環境まで。ここはプロジェクト、文章、そしてウェブで集めたものを共有するデジタル空間です。`,
    blinkNotice: 'サイトは現在制作中です — しばらくお待ちください',
    factBar: '∷ ゼロとイチの世界で、魂の居場所を探している ∷',
    projectsLabel: '注目作品',
    skillsLabel: 'スキル',
    proficiencyLabel: '習熟度',
    projects: [
      { name: 'neural-canvas', desc: 'WebGL と拡散モデルを使ったジェネラティブアート', tags: ['WebGL', 'TypeScript', 'AI'], href: '#', star: '42' },
      { name: 'pixelstream',   desc: 'リアルタイムピクセルアート共同制作ツール',        tags: ['WebSocket', 'React', 'Canvas'], href: '#', star: '18' },
      { name: 'ascii-forge',   desc: '画像をASCIIアートに変換するCLIツール',            tags: ['Rust', 'CLI'], href: '#', star: '91' },
    ],
    skills: [
      { name: 'TypeScript',       level: 90 },
      { name: 'Rust',             level: 70 },
      { name: 'WebGL / GLSL',     level: 60 },
      { name: 'システム設計',     level: 75 },
    ],
  },
};

export const updates: Record<Locale, Update[]> = {
  en: [
    { date: '2026-07-08', text: 'launched new personal site on Astro' },
    { date: '2026-06-30', text: 'published ascii-forge v2.0 on crates.io' },
    { date: '2026-06-15', text: 'added WebGL renderer to neural-canvas' },
    { date: '2026-05-20', text: 'moved hosting to Cloudflare Pages' },
  ],
  zh: [
    { date: '2026-07-08', text: '基于 Astro 的新版个人网站正式上线' },
    { date: '2026-06-30', text: 'ascii-forge v2.0 发布至 crates.io' },
    { date: '2026-06-15', text: '为 neural-canvas 添加 WebGL 渲染器' },
    { date: '2026-05-20', text: '将网站托管迁移至 Cloudflare Pages' },
  ],
  ja: [
    { date: '2026-07-08', text: 'Astro で新しい個人サイトを公開しました' },
    { date: '2026-06-30', text: 'ascii-forge v2.0 を crates.io で公開' },
    { date: '2026-06-15', text: 'neural-canvas に WebGL レンダラーを追加' },
    { date: '2026-05-20', text: 'ホスティングを Cloudflare Pages に移行' },
  ],
};

export const sidebar: Record<Locale, SidebarContent> = {
  en: {
    nowPlayingTitle: 'Habanera (Techno Edit)',
    nowPlayingArtist: 'Yelle',
    listeningLabel: 'listening',
    statsTitle: 'STATS',
    buttonTitle: 'CREDITS',
    stats: [
      { label: 'Created',    value: 'Jul 2024' },
      { label: 'Updated',    value: 'Jul 2026' },
      { label: 'Powered by', value: 'Astro 7' },
    ],
  },
  zh: {
    nowPlayingTitle: 'Habanera (Techno Edit)',
    nowPlayingArtist: 'Yelle',
    listeningLabel: '正在播放',
    statsTitle: 'STATS',
    buttonTitle: 'CREDITS',
    stats: [
      { label: '创建时间', value: '2024年7月' },
      { label: '更新时间', value: '2026年7月' },
      { label: '技术栈',   value: 'Astro 7' },
    ],
  },
  ja: {
    nowPlayingTitle: 'Habanera (Techno Edit)',
    nowPlayingArtist: 'Yelle',
    listeningLabel: '再生中',
    statsTitle: 'STATS',
    buttonTitle: 'CREDITS',
    stats: [
      { label: '作成日',   value: '2024年7月' },
      { label: '更新日',   value: '2026年7月' },
      { label: '使用技術', value: 'Astro 7' },
    ],
  },
};
