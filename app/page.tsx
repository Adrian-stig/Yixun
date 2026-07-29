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

const frameworkDimensions = [
  {
    id: "management",
    number: "01",
    title: "可持续的管理模式",
    english: "Sustainable Management",
    description: "关注地方是否具备清晰的长期愿景、协作机制与资源配置能力，让可持续行动能够被组织、延续和迭代。",
    focus: ["长期战略", "多方治理", "资源协同"],
  },
  {
    id: "nature",
    number: "02",
    title: "生态自然保护",
    english: "Environmental Protection",
    description: "从生态系统与自然资源出发，观察生物多样性、环境压力、保护行动与生态韧性之间的关系。",
    focus: ["生态保护", "资源利用", "环境韧性"],
  },
  {
    id: "culture",
    number: "03",
    title: "文化保护",
    english: "Cultural Protection",
    description: "理解地方知识、文化记忆与社区认同如何被尊重、传承，并在发展过程中持续发挥价值。",
    focus: ["地方知识", "文化传承", "社区认同"],
  },
  {
    id: "value",
    number: "04",
    title: "创造社会和经济价值",
    english: "Socio-economic Value",
    description: "关注发展成果能否改善在地生计、促进社会包容与创新，并在参与者之间形成负责任的价值共享。",
    focus: ["在地生计", "社会创新", "价值共享"],
  },
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
  const [activeDimension, setActiveDimension] = useState(frameworkDimensions[0].id);

  const currentPlace = places.find((place) => place.id === activePlace) ?? places[0];
  const currentDimension =
    frameworkDimensions.find((dimension) => dimension.id === activeDimension) ?? frameworkDimensions[0];
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
          <button onClick={() => scrollTo("about")}>项目介绍</button>
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
            <button className="text-button" onClick={() => scrollTo("about")}>
              了解一循地方 <span>↗</span>
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

      <section className="about-section" id="about">
        <div className="section-shell">
          <div className="section-heading about-heading">
            <div>
              <span className="eyebrow"><i /> ABOUT YIXUN PLACE</span>
              <h2>从地方获得启发，<br />共同创造可持续的未来。</h2>
            </div>
            <p>
              一循地方把真实场景、系统性评价与多元共创连接起来，
              帮助每一个地方看见自身的优势、挑战与下一步行动。
            </p>
          </div>

          <article className="background-story">
            <div className="story-index">
              <span>01</span>
              <strong>项目背景</strong>
              <small>WHY PLACE MATTERS</small>
            </div>
            <div className="story-copy">
              <p className="story-lead">
                气候变化、能源危机与塑料污染正在加剧资源短缺和环境压力。
                面对全球性挑战，我们选择回到具体的地方，寻找另一种发展路径。
              </p>
              <div className="story-columns">
                <p>
                  我们把地方理解为一个不断生长的生命体：它拥有独特的自然禀赋，
                  也承载着文化、人文、经济与社区关系。真正的可持续发展，
                  需要从这些在地特征出发，同时回应生态危机和城市化带来的脆弱性。
                </p>
                <p>
                  自 2020 年起，一循地方走进森林、海岛、有机茶园、自然保护区与古村落，
                  通过场景式学习和多方对话，与在地伙伴共同理解问题、发现潜力，
                  探索因地制宜的可持续发展战略。
                </p>
              </div>
            </div>
          </article>

          <div className="history-strip" aria-label="项目发展数据">
            <div><strong>2009</strong><span>商业生态团队开始持续深耕<br />可持续发展议题</span></div>
            <div><strong>130+</strong><span>截至 2023 年底举办<br />商业生态学习坊</span></div>
            <div><strong>4,000+</strong><span>学习坊累计培养与连接的<br />参与人次</span></div>
            <div><strong>14 / 209</strong><span>截至 2026 年 4 月，一循地方工作坊<br />场次 / 多元相关方参与人次</span></div>
          </div>

          <article className="goal-panel">
            <div className="story-index light-index">
              <span>02</span>
              <strong>项目目标</strong>
              <small>WHAT WE AIM FOR</small>
            </div>
            <div className="goal-content">
              <blockquote>
                与地方建立长期而深入的连接，陪伴在地伙伴共创一条
                <em>因地制宜、可持续、可行动</em>的发展路径。
              </blockquote>
              <div className="goal-grid">
                <div>
                  <span>连接地方</span>
                  <h3>看见真实处境</h3>
                  <p>从自然与人的生态智慧中获得启发，理解地方的优势、挑战与长期需要。</p>
                </div>
                <div>
                  <span>赋能行动</span>
                  <h3>把共识变成方案</h3>
                  <p>以领导力工作坊、在地培训和项目孵化，形成战略规划与可执行的行动方案。</p>
                </div>
                <div>
                  <span>共建韧性</span>
                  <h3>协同多元责任方</h3>
                  <p>共同保护和恢复生态、文化与社会经济环境，提升自然与社区的韧性。</p>
                </div>
                <div>
                  <span>形成社群</span>
                  <h3>培育“一循文化”</h3>
                  <p>以真实关系、共同价值与伙伴连接，支持个人成长并建立持续行动力。</p>
                </div>
              </div>
            </div>
          </article>

          <article className="framework-section">
            <div className="framework-intro">
              <div className="story-index">
                <span>03</span>
                <strong>评价体系</strong>
                <small>HOW WE EVALUATE</small>
              </div>
              <div>
                <h3>“一循地方探索家”系统性框架</h3>
                <p>
                  基于多年项目实践与国内外研究，我们以 4 个维度、29 项标准开展探索和调研。
                  它不是一张静态的打分表，而是一套帮助参与者理解地方、建立连接并共同制定未来策略的方法。
                </p>
                <div className="framework-badges">
                  <span><strong>4</strong> 个评价维度</span>
                  <span><strong>29</strong> 项观察标准</span>
                  <span><strong>1</strong> 套共创方法</span>
                </div>
              </div>
            </div>

            <div className="framework-explorer">
              <div className="dimension-grid" role="group" aria-label="评价维度">
                {frameworkDimensions.map((dimension) => (
                  <button
                    key={dimension.id}
                    className={activeDimension === dimension.id ? "active" : ""}
                    onClick={() => setActiveDimension(dimension.id)}
                    aria-pressed={activeDimension === dimension.id}
                  >
                    <span>{dimension.number}</span>
                    <strong>{dimension.title}</strong>
                    <small>{dimension.english}</small>
                  </button>
                ))}
              </div>
              <div className="dimension-detail" aria-live="polite">
                <span className="dimension-number">{currentDimension.number}</span>
                <small>{currentDimension.english}</small>
                <h3>{currentDimension.title}</h3>
                <p>{currentDimension.description}</p>
                <div>
                  {currentDimension.focus.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </div>

            <div className="method-flow">
              <div className="method-heading">
                <span>CO-CREATION METHOD</span>
                <strong>从体验到行动的共创机制</strong>
              </div>
              {[
                ["01", "场景式体验与学习", "走进地方，在真实环境中观察、感受与提问。"],
                ["02", "多元责任方参与", "连接当地居民、实践者、机构与外部参与者。"],
                ["03", "对话启发与共创", "围绕现状、机会和挑战展开深度讨论。"],
                ["04", "评价与行动建议", "运用 29 项标准识别优势，形成策略与行动方案。"],
              ].map(([number, title, description]) => (
                <div className="method-step" key={number}>
                  <span>{number}</span>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              ))}
            </div>

            <div className="framework-outcome">
              <span>评价输出</span>
              <strong>识别优势</strong><i>→</i>
              <strong>发现挑战</strong><i>→</i>
              <strong>形成建议</strong><i>→</i>
              <strong>制定战略与行动方案</strong>
            </div>
          </article>
        </div>
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
            <div><strong>关于</strong><a href="#about">项目介绍</a><a href="#impact">项目成果</a><button onClick={() => setToast("合作咨询入口将在下一版本开放")}>机构合作</button></div>
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
