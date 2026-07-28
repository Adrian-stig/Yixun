"use client";

import { useEffect, useMemo, useState } from "react";

type Place = {
  id: number;
  title: string;
  district: string;
  topic: string;
  accent: string;
  x: number;
  y: number;
  date: string;
  seats: number;
  description: string;
};

const places: Place[] = [
  {
    id: 1,
    title: "苏州河生态步道",
    district: "普陀区",
    topic: "城市与水",
    accent: "#31786f",
    x: 29,
    y: 31,
    date: "8月17日",
    seats: 8,
    description: "沿河观察生境、雨洪设施与城市更新，制作一份公众友好的河岸观察记录。",
  },
  {
    id: 2,
    title: "嘉定社区农园",
    district: "嘉定区",
    topic: "食物系统",
    accent: "#e26f43",
    x: 68,
    y: 23,
    date: "8月24日",
    seats: 12,
    description: "从一平方米菜地出发，认识土壤、堆肥与本地食物网络的真实运作。",
  },
  {
    id: 3,
    title: "零废弃生活实验室",
    district: "徐汇区",
    topic: "循环生活",
    accent: "#d39d32",
    x: 46,
    y: 59,
    date: "9月7日",
    seats: 5,
    description: "跟随实践者拆解日常废弃物，并共同设计一次可执行的减废挑战。",
  },
  {
    id: 4,
    title: "东滩湿地观鸟点",
    district: "崇明区",
    topic: "生物多样性",
    accent: "#5c7d4d",
    x: 79,
    y: 69,
    date: "9月14日",
    seats: 16,
    description: "用公民科学方法记录鸟类与潮间带生境，理解城市与自然的相互依存。",
  },
];

const steps = [
  ["01", "发现地点", "从身边的河流、社区、农园和自然保护地开始。"],
  ["02", "一起学习", "参加线下工作坊，用微课补充关键知识。"],
  ["03", "采取行动", "完成一个小任务，记录观察与改变。"],
  ["04", "看见影响", "把个人行动汇入公开、可追踪的项目成果。"],
];

const stories = [
  { value: "1,286", label: "次公众观察", note: "覆盖 24 个真实地点" },
  { value: "4,920", label: "小时共同行动", note: "由学习者与志愿者完成" },
  { value: "78%", label: "行动任务完成率", note: "工作坊结束后 30 天内" },
];

export default function Home() {
  const [activePlace, setActivePlace] = useState(places[0].id);
  const [topic, setTopic] = useState("全部议题");
  const [view, setView] = useState<"map" | "list">("map");
  const [language, setLanguage] = useState<"中" | "EN">("中");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [toast, setToast] = useState("");

  const currentPlace = places.find((place) => place.id === activePlace) ?? places[0];
  const topics = ["全部议题", ...new Set(places.map((place) => place.topic))];
  const filteredPlaces = useMemo(
    () => (topic === "全部议题" ? places : places.filter((place) => place.topic === topic)),
    [topic],
  );

  useEffect(() => {
    if (!filteredPlaces.some((place) => place.id === activePlace)) {
      setActivePlace(filteredPlaces[0]?.id ?? places[0].id);
    }
  }, [filteredPlaces, activePlace]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const submitSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
    setSignupOpen(false);
    setToast(`已预留「${currentPlace.title}」席位`);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <b />
          </span>
          <span>
            <strong>一循地方</strong>
            <small>YIXUN PLACE</small>
          </span>
        </a>

        <nav className={mobileOpen ? "nav-links open" : "nav-links"} aria-label="主要导航">
          <button onClick={() => scrollTo("places")}>探索地点</button>
          <button onClick={() => scrollTo("workshops")}>工作坊</button>
          <button onClick={() => scrollTo("learning")}>微课学习</button>
          <button onClick={() => scrollTo("impact")}>行动成果</button>
        </nav>

        <div className="header-actions">
          <button
            className="language"
            onClick={() => {
              setLanguage(language === "中" ? "EN" : "中");
              setToast(language === "中" ? "English version is being prepared" : "已切换回简体中文");
            }}
            aria-label="切换语言"
          >
            {language} <span>↕</span>
          </button>
          <button className="profile-button" onClick={() => scrollTo("progress")}>
            我的行动 <span>↗</span>
          </button>
          <button
            className="menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="打开菜单"
          >
            {mobileOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow"><i /> 从你所在的地方，开始改变</span>
          <h1>
            走进真实地点，
            <br />
            <em>让学习成为行动。</em>
          </h1>
          <p className="hero-lead">
            连接城市中的可持续实践地点、线下工作坊与公众行动。
            和我们一起观察、学习，并完成一件真正发生的事。
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollTo("places")}>
              开始探索 <span>↓</span>
            </button>
            <button className="text-button" onClick={() => scrollTo("learning")}>
              了解如何参与 <span>↗</span>
            </button>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-label="参与者头像">
              <span>林</span><span>W</span><span>周</span><span>+</span>
            </div>
            <p><strong>3,600+</strong> 位学习者已加入在地行动</p>
          </div>
        </div>

        <div className="hero-map" aria-label="可持续行动地点概览">
          <div className="map-orbit orbit-one" />
          <div className="map-orbit orbit-two" />
          <div className="map-land land-one" />
          <div className="map-land land-two" />
          <div className="map-land land-three" />
          <span className="map-label label-north">水系修复</span>
          <span className="map-label label-east">湿地保育</span>
          <span className="map-label label-south">社区营造</span>
          {places.map((place, index) => (
            <button
              key={place.id}
              className={`hero-pin pin-${index + 1}`}
              style={{ "--pin-color": place.accent } as React.CSSProperties}
              onClick={() => {
                setActivePlace(place.id);
                scrollTo("places");
              }}
              aria-label={`查看${place.title}`}
            >
              <span>{place.id}</span>
            </button>
          ))}
          <div className="map-note">
            <span>本月新增</span>
            <strong>6 个行动地点</strong>
          </div>
          <p className="map-caption">Explore Places · Learn Together · Take Action</p>
        </div>
      </section>

      <section className="ticker" aria-label="平台特点">
        <span>真实地点</span><i>✦</i><span>共同学习</span><i>✦</i>
        <span>公众行动</span><i>✦</i><span>开放成果</span><i>✦</i><span>真实地点</span>
      </section>

      <section className="places-section section-shell" id="places">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><i /> EXPLORE THE MAP</span>
            <h2>从一个真实地点开始</h2>
          </div>
          <p>每个地点都连接一个议题、一场工作坊和一项可以亲手完成的行动。</p>
        </div>

        <div className="map-toolbar">
          <div className="topic-filters" role="group" aria-label="按议题筛选">
            {topics.map((item) => (
              <button
                key={item}
                className={topic === item ? "active" : ""}
                onClick={() => setTopic(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="view-toggle" role="group" aria-label="视图切换">
            <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>地图</button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>列表</button>
          </div>
        </div>

        {view === "map" ? (
          <div className="explore-grid">
            <div className="explore-map">
              <div className="street street-a" />
              <div className="street street-b" />
              <div className="street street-c" />
              <div className="river" />
              <span className="district-label d-one">普陀</span>
              <span className="district-label d-two">徐汇</span>
              <span className="district-label d-three">浦东</span>
              {filteredPlaces.map((place) => (
                <button
                  key={place.id}
                  className={`place-pin ${activePlace === place.id ? "active" : ""}`}
                  style={{
                    left: `${place.x}%`,
                    top: `${place.y}%`,
                    "--pin-color": place.accent,
                  } as React.CSSProperties}
                  onClick={() => setActivePlace(place.id)}
                  aria-label={`选择${place.title}`}
                >
                  <span>{place.id}</span>
                </button>
              ))}
              <div className="map-legend"><span /> 可报名地点</div>
            </div>
            <article className="place-detail">
              <div className="place-number">0{currentPlace.id}</div>
              <div className="detail-topline">
                <span style={{ backgroundColor: currentPlace.accent }}>{currentPlace.topic}</span>
                <small>{currentPlace.district} · 线下</small>
              </div>
              <h3>{currentPlace.title}</h3>
              <p>{currentPlace.description}</p>
              <div className="detail-meta">
                <div><small>下一场</small><strong>{currentPlace.date} · 09:30</strong></div>
                <div><small>剩余席位</small><strong>{currentPlace.seats} 人</strong></div>
              </div>
              <button className="primary-button full" onClick={() => setSignupOpen(true)}>
                查看工作坊 <span>↗</span>
              </button>
            </article>
          </div>
        ) : (
          <div className="place-list">
            {filteredPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => {
                  setActivePlace(place.id);
                  setSignupOpen(true);
                }}
              >
                <span className="list-index">0{place.id}</span>
                <span><small>{place.topic} · {place.district}</small><strong>{place.title}</strong></span>
                <span>{place.date}</span><i>↗</i>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="journey-section" id="learning">
        <div className="section-shell">
          <div className="section-heading light">
            <div>
              <span className="eyebrow"><i /> HOW IT WORKS</span>
              <h2>不止于听一堂课</h2>
            </div>
            <p>把知识放回真实世界，在连续而轻量的学习路径中留下自己的观察。</p>
          </div>
          <div className="journey-grid">
            {steps.map(([number, title, description], index) => (
              <article key={number}>
                <div className="step-icon"><span>{number}</span><i>{["⌖", "◒", "↗", "◎"][index]}</i></div>
                <h3>{title}</h3>
                <p>{description}</p>
                {index < steps.length - 1 && <span className="step-arrow">→</span>}
              </article>
            ))}
          </div>
          <div className="micro-course">
            <div>
              <span className="course-label">本周推荐微课 · 18 MIN</span>
              <h3>城市里的一场雨，最终去了哪里？</h3>
              <p>从一张雨水路径图开始，理解海绵城市的基本原理，并完成一次住区观察。</p>
            </div>
            <button
              onClick={() => {
                setToast("微课已加入「我的行动」");
                setJoined(true);
              }}
              aria-label="开始学习微课"
            >
              <span>▶</span>
              开始学习
            </button>
          </div>
        </div>
      </section>

      <section className="workshops-section section-shell" id="workshops">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><i /> UPCOMING WORKSHOPS</span>
            <h2>近期工作坊</h2>
          </div>
          <button className="text-button" onClick={() => setTopic("全部议题")}>查看全部活动 <span>→</span></button>
        </div>
        <div className="workshop-grid">
          {places.slice(0, 3).map((place, index) => (
            <article key={place.id} className={`workshop-card workshop-${index + 1}`}>
              <div className="workshop-visual">
                <span className="workshop-topic">{place.topic}</span>
                <div className="visual-line line-one" />
                <div className="visual-line line-two" />
                <div className="visual-dot" />
                <strong>0{place.id}</strong>
              </div>
              <div className="workshop-content">
                <div className="workshop-date">
                  <span>{place.date.slice(0, place.date.indexOf("月"))}月</span>
                  <strong>{place.date.slice(place.date.indexOf("月") + 1, -1)}</strong>
                </div>
                <div>
                  <small>{place.district} · 3 小时 · 适合 15 岁以上</small>
                  <h3>{place.title}探索工作坊</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setActivePlace(place.id);
                  setSignupOpen(true);
                }}
              >
                了解详情 <span>↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-section" id="impact">
        <div className="section-shell">
          <div className="impact-copy">
            <span className="eyebrow"><i /> COLLECTIVE IMPACT</span>
            <h2>每一次观察，<br />都让改变更清晰。</h2>
            <p>项目成果向所有人开放。个人的小行动在这里被看见、积累，也成为学校、社区和公益组织继续行动的依据。</p>
            <button className="text-button inverted" onClick={() => setToast("成果地图将在下一版本开放")}>
              查看公开成果地图 <span>↗</span>
            </button>
          </div>
          <div className="impact-stats">
            {stories.map((story, index) => (
              <article key={story.label}>
                <span>0{index + 1}</span>
                <strong>{story.value}</strong>
                <h3>{story.label}</h3>
                <p>{story.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="progress-section section-shell" id="progress">
        <div className="progress-card">
          <div className="progress-copy">
            <span className="eyebrow"><i /> YOUR ACTION PATH</span>
            <h2>{joined ? "你的第一次行动，已经开始。" : "准备好留下第一条行动记录了吗？"}</h2>
            <p>{joined ? "已加入 1 个学习项目。完成微课后，解锁线下观察任务。" : "选择一个感兴趣的地点，我们会为你整理学习、参与与记录的完整路径。"}</p>
            <button className="primary-button" onClick={() => scrollTo("places")}>
              {joined ? "继续我的行动" : "创建我的行动路径"} <span>→</span>
            </button>
          </div>
          <div className="progress-visual">
            <div className="progress-ring"><strong>{joined ? "25" : "0"}%</strong><span>本月进度</span></div>
            <ul>
              <li className={joined ? "done" : ""}><span>{joined ? "✓" : "1"}</span>选择行动地点</li>
              <li><span>2</span>完成线上微课</li>
              <li><span>3</span>参加线下工作坊</li>
              <li><span>4</span>上传观察记录</li>
            </ul>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <span className="brand-mark inverse" aria-hidden="true"><i /><b /></span>
              <span><strong>一循地方</strong><small>YIXUN PLACE</small></span>
            </a>
            <p>探索地方 · 共同学习 · 采取行动</p>
          </div>
          <div className="footer-links">
            <div><strong>参与</strong><a href="#places">探索地点</a><a href="#workshops">工作坊</a><a href="#learning">线上微课</a></div>
            <div><strong>关于</strong><a href="#impact">项目成果</a><button onClick={() => setToast("合作咨询入口将在下一版本开放")}>机构合作</button><button onClick={() => setToast("志愿者招募即将开放")}>成为志愿者</button></div>
            <div><strong>联系</strong><span>hello@yixun.place</span><span>上海 · 中国</span></div>
          </div>
        </div>
        <div className="footer-bottom section-shell">
          <span>© 2026 YIXUN PLACE</span>
          <span>为更可持续的地方共同学习</span>
        </div>
      </footer>

      {signupOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSignupOpen(false)}>
          <div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSignupOpen(false)} aria-label="关闭">×</button>
            <span className="eyebrow"><i /> WORKSHOP SIGN-UP</span>
            <h2 id="signup-title">{currentPlace.title}</h2>
            <p>{currentPlace.date} · 09:30–12:30<br />{currentPlace.district} · 剩余 {currentPlace.seats} 个席位</p>
            <form onSubmit={submitSignup}>
              <label>你的姓名<input required placeholder="如何称呼你" /></label>
              <label>联系方式<input required type="email" placeholder="name@example.com" /></label>
              <label>参与身份
                <select defaultValue="公众参与者">
                  <option>公众参与者</option><option>学生</option><option>教师</option><option>志愿者</option><option>公益组织</option>
                </select>
              </label>
              <button className="primary-button full" type="submit">确认预留席位 <span>→</span></button>
            </form>
            <small>这是 MVP 演示，提交后不会发送真实报名信息。</small>
          </div>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
