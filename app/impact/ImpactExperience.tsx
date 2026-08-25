"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./impact.module.css";

type Location = {
  id: number;
  title: string;
  district: string;
  topic: string;
  accent: string;
  x: number;
  y: number;
};

type Reply = {
  id: string;
  author: string;
  content: string;
  date: string;
};

type Feedback = {
  id: string;
  locationId: number;
  author: string;
  role: string;
  source: "工作坊回访" | "示例记录" | "公众反馈";
  date: string;
  content: string;
  tags: string[];
  likes: number;
  liked: boolean;
  replies: Reply[];
  offsetX: number;
  offsetY: number;
};

const locations: Location[] = [
  { id: 1, title: "致良田农场", district: "内蒙古阿拉善", topic: "生态农业", accent: "#9baa63", x: 44.3, y: 31.6 },
  { id: 2, title: "大音谷林场", district: "浙江安吉", topic: "可持续森林", accent: "#315743", x: 64.2, y: 49.4 },
  { id: 3, title: "九龙峰自然保护区", district: "安徽黄山", topic: "生物多样性", accent: "#62745d", x: 61.4, y: 53.2 },
  { id: 4, title: "荣山寮与北港岛", district: "海南海口", topic: "可持续渔业", accent: "#668993", x: 50, y: 75 },
  { id: 5, title: "营盘山茶博园", district: "云南普洱", topic: "生态农业", accent: "#9baa63", x: 38.4, y: 67.8 },
  { id: 6, title: "雪木村", district: "云南丽江", topic: "可持续村庄", accent: "#a06a1c", x: 37.7, y: 58.4 },
];

const seedFeedbacks: Feedback[] = [
  {
    id: "zhiliangtian-01",
    locationId: 1,
    author: "参与者 01",
    role: "生态农业议题学习者",
    source: "工作坊回访",
    date: "2024.08",
    content: "这是一次全新的理解。我们切实看见了西北地区生态农业的现状、极端气候对种植业的影响，也从在地伙伴处了解了气候保险这一农业金融知识。",
    tags: ["气候风险", "生态农业"],
    likes: 38,
    liked: false,
    replies: [{ id: "r-01", author: "一循地方", content: "谢谢你把现场观察与新的知识连接起来。哪些细节最改变你对农业风险的理解？", date: "2024.08" }],
    offsetX: -2.8,
    offsetY: -4.5,
  },
  {
    id: "zhiliangtian-02",
    locationId: 1,
    author: "参与者 02",
    role: "社区行动实践者",
    source: "工作坊回访",
    date: "2024.08",
    content: "我对气候韧性社区有了更具体的理解，也开始担忧实验成本过高。它需要政府、企业、社会组织与高校共同研究，并形成长期的政策支持。",
    tags: ["韧性社区", "多方协作"],
    likes: 27,
    liked: false,
    replies: [],
    offsetX: 2.6,
    offsetY: -1.5,
  },
  {
    id: "zhiliangtian-03",
    locationId: 1,
    author: "参与者 03",
    role: "可持续发展学习者",
    source: "工作坊回访",
    date: "2024.08",
    content: "有机生态农业与荒漠化治理相辅相成，却也很容易受到气候变化影响。提升韧性和可持续性挑战很大，贵在坚持，也需要更多伙伴支持。",
    tags: ["荒漠化治理", "伙伴关系"],
    likes: 42,
    liked: false,
    replies: [],
    offsetX: -4.2,
    offsetY: 2.8,
  },
  {
    id: "zhiliangtian-04",
    locationId: 1,
    author: "参与者 04",
    role: "公益从业者",
    source: "工作坊回访",
    date: "2024.08",
    content: "过去我更多从环境与经济角度思考。工作坊之后，我开始关注项目与本地社区及在地文化的联系，希望未来能在这些方向做出更多贡献。",
    tags: ["在地文化", "社区连接"],
    likes: 31,
    liked: false,
    replies: [{ id: "r-04", author: "小循", content: "很有共鸣。可持续行动中的文化维度常常容易被忽略。", date: "2024.09" }],
    offsetX: 4.2,
    offsetY: 3.8,
  },
  {
    id: "zhiliangtian-05",
    locationId: 1,
    author: "参与者 05",
    role: "青年学习者",
    source: "工作坊回访",
    date: "2024.08",
    content: "第一次来到贺兰山和腾格里沙漠，并围绕气候变化开展学习。当地正在发生的变化，让我们对当前面临的危机有了更深刻的理解。",
    tags: ["地方观察", "气候变化"],
    likes: 36,
    liked: false,
    replies: [],
    offsetX: 0.8,
    offsetY: 6.8,
  },
  {
    id: "zhiliangtian-06",
    locationId: 1,
    author: "参与者 06",
    role: "公共政策学习者",
    source: "工作坊回访",
    date: "2024.08",
    content: "从两位农民的经历中，我们看见了人口与农村土地政策、村属地治理、农民收入、经济作物和市场分配等更深层次的问题。",
    tags: ["乡村治理", "农民生计"],
    likes: 44,
    liked: false,
    replies: [],
    offsetX: 6.5,
    offsetY: -4.2,
  },
  {
    id: "zhiliangtian-07",
    locationId: 1,
    author: "参与者 07",
    role: "气候行动者",
    source: "工作坊回访",
    date: "2024.08",
    content: "我更坚定了参与气候变化下韧性社区与可持续行动的想法，也结识了一群有趣又专业的伙伴。未来希望拓展专业边界，成为传播者和实践者。",
    tags: ["行动意愿", "同伴连接"],
    likes: 52,
    liked: false,
    replies: [{ id: "r-07", author: "一循地方", content: "从理解到行动，正是这张成果地图希望持续记录的变化。", date: "2024.09" }],
    offsetX: -7,
    offsetY: -1,
  },
  {
    id: "anji-demo",
    locationId: 2,
    author: "观察者 A",
    role: "公众学习者",
    source: "示例记录",
    date: "示例",
    content: "沿着林场步道观察后，我第一次把森林经营、水源涵养和社区就业放在同一个系统里理解。",
    tags: ["森林经营", "系统观察"],
    likes: 16,
    liked: false,
    replies: [],
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "huangshan-demo",
    locationId: 3,
    author: "观察者 B",
    role: "自然教育参与者",
    source: "示例记录",
    date: "示例",
    content: "一片森林同时承载生态、社会与经济价值。现场观察让我更清楚地理解保护与利用之间需要持续对话。",
    tags: ["生物多样性", "森林价值"],
    likes: 21,
    liked: false,
    replies: [],
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "haikou-demo",
    locationId: 4,
    author: "观察者 C",
    role: "社区志愿者",
    source: "示例记录",
    date: "示例",
    content: "海岸生态与渔民生计并不是两道分开的题，社区共同制定规则，才可能让资源与生活都持续下去。",
    tags: ["海岸社区", "可持续渔业"],
    likes: 18,
    liked: false,
    replies: [],
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "puer-demo",
    locationId: 5,
    author: "观察者 D",
    role: "茶文化学习者",
    source: "示例记录",
    date: "示例",
    content: "从一片茶叶出发，我们看见种植方式、地方文化与产业价值如何相互影响，也开始重新思考消费选择。",
    tags: ["茶园生态", "地方价值"],
    likes: 14,
    liked: false,
    replies: [],
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "lijiang-demo",
    locationId: 6,
    author: "观察者 E",
    role: "乡村观察者",
    source: "示例记录",
    date: "示例",
    content: "传统生活不是静止的展示。村庄如何在变化中延续地方知识，需要居民、来访者与外部伙伴共同学习。",
    tags: ["村庄文化", "社区协作"],
    likes: 17,
    liked: false,
    replies: [],
    offsetX: 0,
    offsetY: 0,
  },
];

const storageKey = "yixun-impact-community-v1";

function todayLabel() {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export default function ImpactExperience() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(seedFeedbacks);
  const [activeLocation, setActiveLocation] = useState(1);
  const [activeFeedbackId, setActiveFeedbackId] = useState(seedFeedbacks[0].id);
  const [reply, setReply] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Feedback[];
          if (Array.isArray(parsed) && parsed.length) setFeedbacks(parsed);
        }
      } catch {
        // The public seed data remains available when browser storage is unavailable.
      } finally {
        setStorageReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(feedbacks));
    } catch {
      // Interaction continues in memory if storage is full or disabled.
    }
  }, [feedbacks, storageReady]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const activeFeedback = feedbacks.find((item) => item.id === activeFeedbackId) ?? feedbacks[0];
  const selectedLocation = locations.find((item) => item.id === activeLocation) ?? locations[0];
  const visibleFeedbacks = useMemo(
    () => feedbacks.filter((item) => activeLocation === 0 || item.locationId === activeLocation),
    [activeLocation, feedbacks],
  );
  const chooseLocation = (locationId: number) => {
    setActiveLocation(locationId);
    const first = feedbacks.find((item) => locationId === 0 || item.locationId === locationId);
    if (first) setActiveFeedbackId(first.id);
  };

  const chooseFeedback = (feedback: Feedback) => {
    setActiveFeedbackId(feedback.id);
    setActiveLocation(feedback.locationId);
    if (window.matchMedia("(max-width: 900px)").matches) {
      window.setTimeout(() => document.getElementById("feedback-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
    }
  };

  const toggleLike = (feedbackId: string) => {
    setFeedbacks((current) => current.map((item) => (
      item.id === feedbackId
        ? { ...item, liked: !item.liked, likes: Math.max(0, item.likes + (item.liked ? -1 : 1)) }
        : item
    )));
  };

  const submitReply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = reply.trim();
    if (!content || !activeFeedback) return;
    const nextReply: Reply = {
      id: `reply-${Date.now()}`,
      author: "访客",
      content,
      date: todayLabel(),
    };
    setFeedbacks((current) => current.map((item) => (
      item.id === activeFeedback.id ? { ...item, replies: [...item.replies, nextReply] } : item
    )));
    setReply("");
    setNotice("回复已保存在当前设备");
  };

  const submitFeedback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const locationId = Number(form.get("location"));
    const content = String(form.get("content") ?? "").trim();
    const author = String(form.get("author") ?? "").trim() || "匿名参与者";
    const tag = String(form.get("tag") ?? "行动观察");
    if (!content || !locationId) return;

    const sameLocationCount = feedbacks.filter((item) => item.locationId === locationId).length;
    const nextFeedback: Feedback = {
      id: `public-${Date.now()}`,
      locationId,
      author,
      role: "公众贡献者",
      source: "公众反馈",
      date: todayLabel(),
      content,
      tags: [tag],
      likes: 0,
      liked: false,
      replies: [],
      offsetX: ((sameLocationCount % 3) - 1) * 3.2,
      offsetY: (Math.floor(sameLocationCount / 3) % 3 - 1) * 3.2,
    };
    setFeedbacks((current) => [nextFeedback, ...current]);
    setActiveLocation(locationId);
    setActiveFeedbackId(nextFeedback.id);
    event.currentTarget.reset();
    setNotice("新反馈已添加到地图，并保存在当前设备");
    window.setTimeout(() => document.getElementById("community-map")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#top" aria-label="返回一循地方首页">
          <Image src="/brand/yixun-logo.png" alt="一循地方 YIXUN PLACE" width={355} height={285} priority />
        </Link>
        <nav aria-label="成果地图页面导航">
          <a href="#community-map">成果地图</a>
          <a href="#new-feedback">发表反馈</a>
        </nav>
        <Link className={styles.backLink} href="/#impact">返回行动成果 <span>↗</span></Link>
      </header>

      <section className={styles.mapSection} id="community-map">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>PUBLIC IMPACT MAP · 公开成果地图</span>
            <h2>点击地图上的“人”，<br />读一条真实反馈。</h2>
          </div>
          <p>地图上的每个人物标记代表一条参与反馈。选择地点筛选，再点击人物，查看内容、点赞或加入回复。</p>
        </div>

        <div className={styles.locationTabs} role="group" aria-label="按地点筛选参与者反馈">
          <button className={activeLocation === 0 ? styles.activeTab : ""} onClick={() => chooseLocation(0)}>全部地点 <span>{feedbacks.length}</span></button>
          {locations.map((location) => {
            const count = feedbacks.filter((item) => item.locationId === location.id).length;
            return (
              <button
                key={location.id}
                className={activeLocation === location.id ? styles.activeTab : ""}
                onClick={() => chooseLocation(location.id)}
              >
                {location.title} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.explorer}>
          <div className={styles.mapPanel}>
            <div className={styles.mapStage}>
              <Image
                className={styles.mapImage}
                src="/maps/yixun-project-map.png"
                alt="一循地方六个真实项目地点与参与者反馈分布图"
                fill
                sizes="(max-width: 900px) 100vw, 64vw"
                priority
              />
              {visibleFeedbacks.map((feedback, index) => {
                const location = locations.find((item) => item.id === feedback.locationId) ?? locations[0];
                return (
                  <button
                    key={feedback.id}
                    className={`${styles.personMarker} ${activeFeedback?.id === feedback.id ? styles.activeMarker : ""}`}
                    style={{
                      left: `${location.x + feedback.offsetX}%`,
                      top: `${location.y + feedback.offsetY}%`,
                      "--marker-accent": location.accent,
                      "--marker-delay": `${(index % 8) * 45}ms`,
                    } as React.CSSProperties}
                    onClick={() => chooseFeedback(feedback)}
                    aria-label={`查看${location.title}${feedback.author}的反馈`}
                    aria-pressed={activeFeedback?.id === feedback.id}
                  >
                    <span className={styles.personHead} />
                    <span className={styles.personBody} />
                    <small>{feedback.author.replace("参与者 ", "").replace("观察者 ", "")}</small>
                  </button>
                );
              })}
            </div>
            <div className={styles.mapLegend}>
              <span><i className={styles.legendPerson} /> 人物 = 一条反馈</span>
              <span>{activeLocation === 0 ? "正在显示全部地点" : `${selectedLocation.district} · ${selectedLocation.title}`}</span>
            </div>
          </div>

          {activeFeedback && (
            <article className={styles.feedbackCard} id="feedback-detail" aria-live="polite">
              <div className={styles.cardTopline}>
                <span className={styles.authorAvatar}>{activeFeedback.author.slice(-2)}</span>
                <div><strong>{activeFeedback.author}</strong><small>{activeFeedback.role} · {activeFeedback.date}</small></div>
                <span className={`${styles.sourceBadge} ${activeFeedback.source === "示例记录" ? styles.demoBadge : ""}`}>{activeFeedback.source}</span>
              </div>
              <div className={styles.placeLine}>
                <span style={{ background: locations.find((item) => item.id === activeFeedback.locationId)?.accent }} />
                {locations.find((item) => item.id === activeFeedback.locationId)?.district} · {locations.find((item) => item.id === activeFeedback.locationId)?.title}
              </div>
              <blockquote>“{activeFeedback.content}”</blockquote>
              <div className={styles.tags}>{activeFeedback.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
              <div className={styles.cardActions}>
                <button className={activeFeedback.liked ? styles.liked : ""} onClick={() => toggleLike(activeFeedback.id)} aria-pressed={activeFeedback.liked}>
                  <span>{activeFeedback.liked ? "♥" : "♡"}</span> {activeFeedback.liked ? "已共鸣" : "共鸣"} · {activeFeedback.likes}
                </button>
                <span>{activeFeedback.replies.length} 条回复</span>
              </div>

              <div className={styles.replies}>
                {activeFeedback.replies.length ? activeFeedback.replies.map((item) => (
                  <div key={item.id} className={styles.replyItem}>
                    <strong>{item.author}</strong><span>{item.date}</span><p>{item.content}</p>
                  </div>
                )) : <p className={styles.emptyReply}>还没有回复，来继续这段对话吧。</p>}
              </div>

              <form className={styles.replyForm} onSubmit={submitReply}>
                <label htmlFor="reply">回复这条反馈</label>
                <div><input id="reply" value={reply} onChange={(event) => setReply(event.target.value)} placeholder="写下你的回应…" maxLength={240} required /><button type="submit">发送 ↗</button></div>
              </form>
            </article>
          )}
        </div>
        <p className={styles.localNote}><span>首版说明</span> 点赞、回复和新反馈目前仅保存在你的当前设备；未来接入账号、审核与共享数据库后，才会成为所有访客可见的公共内容。</p>
      </section>

      <section className={styles.formSection} id="new-feedback">
        <div className={styles.formIntro}>
          <span className={styles.eyebrow}>ADD YOUR VOICE · 加入反馈</span>
          <h2>你从一个地方，<br />带走了什么？</h2>
          <p>写下一个新的理解、一个仍未解决的问题，或下一步想要采取的行动。你的反馈会以新的人物标记出现在对应地点。</p>
          <div className={styles.promptList}>
            <span>01</span><p>哪一个现场细节改变了你的理解？</p>
            <span>02</span><p>你发现了哪些人、自然与地方之间的联系？</p>
            <span>03</span><p>离开工作坊后，你想继续做什么？</p>
          </div>
        </div>
        <form className={styles.newFeedbackForm} onSubmit={submitFeedback}>
          <label htmlFor="location">反馈地点</label>
          <select id="location" name="location" defaultValue="1" required>
            {locations.map((location) => <option key={location.id} value={location.id}>{location.district} · {location.title}</option>)}
          </select>
          <div className={styles.formRow}>
            <div><label htmlFor="author">显示名称</label><input id="author" name="author" placeholder="留空则显示匿名参与者" maxLength={20} /></div>
            <div><label htmlFor="tag">反馈主题</label><select id="tag" name="tag" defaultValue="行动观察"><option>行动观察</option><option>新的理解</option><option>地方问题</option><option>下一步行动</option></select></div>
          </div>
          <label htmlFor="content">我的反馈</label>
          <textarea id="content" name="content" placeholder="写下你的真实观察与感受…" minLength={8} maxLength={500} required />
          <div className={styles.consent}><span>公开提交即表示你同意以当前显示名称在成果地图中展示此内容。请勿填写电话、邮箱或其他敏感信息。</span><button type="submit">发布到成果地图 <b>↗</b></button></div>
        </form>
      </section>

      <footer className={styles.footer}>
        <div><span>YIXUN PLACE</span><h2>让每一次在地学习，<br />留下可以继续生长的声音。</h2></div>
        <div className={styles.footerLinks}><Link href="/#places">探索地点</Link><Link href="/#learning">线上微课</Link><Link href="/#impact">行动成果</Link></div>
        <small>© 2026 一循地方 · Explore Places · Learn Together · Take Action</small>
      </footer>

      {notice && <div className={styles.notice} role="status">{notice}</div>}
    </main>
  );
}
