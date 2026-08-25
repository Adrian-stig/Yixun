"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./huangshan.module.css";

type ValueCategory = "生态价值" | "社会价值" | "经济价值";

type ForestValue = {
  id: string;
  number: string;
  category: ValueCategory;
  title: string;
  description: string;
  observation: string;
  accent: string;
  mark: string;
};

const forestValues: ForestValue[] = [
  {
    id: "carbon",
    number: "01",
    category: "生态价值",
    title: "固碳制氧",
    description: "森林能大量吸收二氧化碳、释放氧气，也能滞留空气中的悬浮颗粒，为区域空气质量和气候调节提供支持。",
    observation: "抬头观察不同高度的树冠：层次越丰富，说明这片森林的空间结构越多样。",
    accent: "#e45f36",
    mark: "气",
  },
  {
    id: "wind",
    number: "02",
    category: "生态价值",
    title: "净化环境 · 防风固沙",
    description: "森林植被的根系能够稳固土壤、减少水土流失；树冠与林下植被共同减缓风力和雨水对地表的直接冲击。",
    observation: "比较林内与裸露地面的土壤状态，寻找落叶层、根系与地表径流留下的痕迹。",
    accent: "#e45f36",
    mark: "土",
  },
  {
    id: "recreation",
    number: "03",
    category: "社会价值",
    title: "游憩资源 · 生态教育",
    description: "森林既是重要的自然景观资源，也是公众认识生态系统、开展自然观察与环境教育的真实课堂。",
    observation: "留意步道、解说牌和观景点：它们如何帮助人们亲近自然，同时减少对栖息地的打扰？",
    accent: "#303a9d",
    mark: "游",
  },
  {
    id: "biodiversity",
    number: "04",
    category: "生态价值",
    title: "保护生物多样性",
    description: "森林为多种动物、植物和微生物提供栖息地，也是复杂食物网与生态关系长期演化的重要空间。",
    observation: "尝试在不采集、不惊扰的前提下，记录三种不同的生命迹象：声音、足迹或叶片。",
    accent: "#e45f36",
    mark: "生",
  },
  {
    id: "water",
    number: "05",
    category: "生态价值",
    title: "土壤保育 · 水源涵养",
    description: "植被与枯落物能够截留降雨、减缓地表径流，让水分逐渐渗入地下，并通过土壤和根系形成自然的水分调节系统。",
    observation: "雨后观察坡面、溪沟与林下土壤，判断水是快速流走，还是被森林慢慢留下。",
    accent: "#e45f36",
    mark: "水",
  },
  {
    id: "timber",
    number: "06",
    category: "经济价值",
    title: "林产品使用价值",
    description: "在负责任的经营与利用方式下，木材及相关林产品可以形成长期经济价值，同时需要与森林更新和生态承载力保持平衡。",
    observation: "思考一件木制品的来源：它是否可追溯、可持续，并在使用结束后继续循环？",
    accent: "#00984f",
    mark: "木",
  },
  {
    id: "products",
    number: "07",
    category: "经济价值",
    title: "林下生物使用价值",
    description: "森林中的动物、植物与微生物也具有食用、药用和研究价值，例如木耳与菌菇等林下资源。",
    observation: "不要采摘。尝试记录林下物种与环境之间的关系，并询问当地人如何理解和利用这些资源。",
    accent: "#00984f",
    mark: "菌",
  },
];

const categories = ["全部价值", "生态价值", "社会价值", "经济价值"] as const;

const journeySteps = [
  ["01", "看见", "从树冠、根系、土壤和水流中发现森林正在进行的工作。"],
  ["02", "连接", "把一种自然现象与生态、社会和经济价值连接起来。"],
  ["03", "提问", "与同行者讨论：谁在保护、谁在使用、谁从中受益？"],
  ["04", "行动", "完成一条不打扰自然的观察记录，带走方法而不是标本。"],
];

const fieldTasks = [
  "记录一种森林调节环境的迹象",
  "找到一处生物栖息或活动的证据",
  "写下一个关于保护与利用的问题",
];

const ecosystemChallenges = [
  {
    number: "01",
    mark: "水",
    title: "季节性水源压力",
    description: "山地降雨并不等于全年稳定供水。坡地径流与季节差异，会影响社区用水和森林水源涵养。",
    action: "缩短淋浴时间，记录一天减少的生活用水",
  },
  {
    number: "02",
    mark: "生",
    title: "栖息地受到干扰",
    description: "游憩活动、道路与不恰当采集，都可能干扰物种栖息、迁徙和林下生态关系。",
    action: "完成一次不采集、低干扰的自然观察",
  },
  {
    number: "03",
    mark: "村",
    title: "保护与生计的平衡",
    description: "自然保护需要与社区生活形成长期合作，让地方产品、文化知识和生态价值共同延续。",
    action: "选择一件可追溯、少包装的地方产品",
  },
];

type ActionRecord = {
  id: string;
  type: string;
  note: string;
  photoName: string;
  date: string;
};

type StoredActionProgress = {
  courseCompleted?: boolean;
  completedTasks?: string[];
  actionRecords?: ActionRecord[];
};

const actionStorageKey = "yixun-huangshan-action-v1";

function todayLabel() {
  return new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" }).format(new Date());
}

export default function HuangshanExperience() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("全部价值");
  const [activeValue, setActiveValue] = useState(forestValues[0].id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [actionRecords, setActionRecords] = useState<ActionRecord[]>([]);
  const [uploadPreview, setUploadPreview] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [actionNotice, setActionNotice] = useState("");

  const visibleValues = useMemo(
    () => forestValues.filter((item) => activeCategory === "全部价值" || item.category === activeCategory),
    [activeCategory],
  );
  const currentValue = forestValues.find((item) => item.id === activeValue) ?? forestValues[0];
  const progress = Math.round((completedTasks.length / fieldTasks.length) * 100);
  const fieldPracticeCompleted = completedTasks.length === fieldTasks.length;
  const rewardSegments = [courseCompleted, actionRecords.length > 0, fieldPracticeCompleted];
  const rewardProgress = rewardSegments.filter(Boolean).length;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(actionStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as StoredActionProgress;
          if (typeof parsed.courseCompleted === "boolean") setCourseCompleted(parsed.courseCompleted);
          if (Array.isArray(parsed.completedTasks)) setCompletedTasks(parsed.completedTasks);
          if (Array.isArray(parsed.actionRecords)) setActionRecords(parsed.actionRecords);
        }
      } catch {
        // The default progress remains available when browser storage is unavailable.
      } finally {
        setStorageReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(actionStorageKey, JSON.stringify({ courseCompleted, completedTasks, actionRecords }));
    } catch {
      // The module continues in memory when browser storage is full or disabled.
    }
  }, [actionRecords, completedTasks, courseCompleted, storageReady]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!actionNotice) return;
    const timeout = window.setTimeout(() => setActionNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [actionNotice]);

  const chooseCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    const firstMatch = forestValues.find((item) => category === "全部价值" || item.category === category);
    if (firstMatch) setActiveValue(firstMatch.id);
  };

  const toggleTask = (task: string) => {
    setCompletedTasks((current) =>
      current.includes(task) ? current.filter((item) => item !== task) : [...current, task],
    );
  };

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadPreview("");
      setUploadName("");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setActionNotice("请选择小于 5MB 的图片");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadPreview(typeof reader.result === "string" ? reader.result : "");
      setUploadName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const submitDailyAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const type = String(form.get("actionType") ?? "节水生活");
    const note = String(form.get("actionNote") ?? "").trim();
    if (!note) return;
    const record: ActionRecord = {
      id: `action-${Date.now()}`,
      type,
      note,
      photoName: uploadName,
      date: todayLabel(),
    };
    setActionRecords((current) => [record, ...current].slice(0, 8));
    setUploadPreview("");
    setUploadName("");
    event.currentTarget.reset();
    setActionNotice("日常行动已记录，茶芽点亮一部分");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#top" aria-label="返回一循地方首页">
          <Image src="/brand/yixun-logo.png" alt="一循地方 YIXUN PLACE" width={355} height={285} priority />
        </Link>
        <nav aria-label="黄山专题页导航">
          <a href="#about">认识九龙峰</a>
          <a href="#workshop-action">行动共创</a>
          <a href="#forest-values">森林价值</a>
          <a href="#action">行动任务</a>
        </nav>
        <Link className={styles.backLink} href="/#places">返回地点地图 <span>↗</span></Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>一循地方 · 第二站 · 安徽黄山</span>
          <h1>读懂一片森林的<br /><em>多重价值</em></h1>
          <p>以九龙峰自然保护区为例，从一棵树出发，看见森林如何连接气候、水土、生物、社区与人的生活。</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#workshop-action">探索工作坊 <span>↓</span></a>
            <button className={styles.secondaryAction} onClick={() => setLightboxOpen(true)}>查看森林价值图 <span>↗</span></button>
          </div>
          <div className={styles.heroMeta}>
            <div><strong>03</strong><span>自然观察维度</span></div>
            <div><strong>07</strong><span>森林价值线索</span></div>
            <div><strong>01</strong><span>在地行动任务</span></div>
          </div>
        </div>
        <div className={styles.heroForest} aria-hidden="true">
          <span className={styles.sun} />
          <span className={`${styles.tree} ${styles.treeOne}`} />
          <span className={`${styles.tree} ${styles.treeTwo}`} />
          <span className={`${styles.tree} ${styles.treeThree}`} />
          <span className={`${styles.tree} ${styles.treeFour}`} />
          <span className={styles.ground} />
          <div className={styles.heroLabel}><span>专题地点</span><strong>九龙峰自然保护区</strong></div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.sectionIndex}><span>01</span><small>PLACE STORY</small></div>
        <div className={styles.aboutCopy}>
          <span className={styles.eyebrow}>为什么从一片森林开始？</span>
          <h2>森林不是背景，<br />而是一个持续运转的生命系统。</h2>
          <p>在九龙峰，学习不从抽象概念开始，而从树木、雨水、土壤和物种之间的真实关系开始。我们将森林的价值分为生态价值、社会价值与经济价值，帮助参与者建立系统性的观察视角。</p>
        </div>
        <aside className={styles.aboutAside}>
          <div><span>地点</span><strong>安徽黄山</strong></div>
          <div><span>场景</span><strong>自然保护区</strong></div>
          <div><span>核心议题</span><strong>生物多样性</strong></div>
        </aside>
      </section>

      <section className={styles.workshopSection} id="workshop-action">
        <div className={styles.workshopHeading}>
          <div>
            <span className={styles.workshopStatus}>工作坊已完成 · 持续行动开放中</span>
            <span className={styles.eyebrow}>POST-WORKSHOP ACTION · 工作坊之后</span>
            <h2>把九龙峰的生态困境，<br />带回每天的生活。</h2>
          </div>
          <p>线下工作坊虽然已经结束，地方学习仍可以继续。选择一项与九龙峰相关的日常可持续行动，上传自己的记录，让个人改变与目的地生态议题建立可感知的联系。</p>
        </div>

        <div className={styles.challengeGrid}>
          {ecosystemChallenges.map((challenge) => (
            <article key={challenge.number}>
              <div><span>{challenge.number}</span><i>{challenge.mark}</i></div>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <a href="#daily-action-form">日常行动建议 <strong>{challenge.action}</strong><b>↓</b></a>
            </article>
          ))}
        </div>

        <div className={styles.userModule}>
          <div className={styles.moduleMain}>
            <div className={styles.moduleTitle}>
              <div><span>MY LOCAL ACTION</span><h2>我的九龙峰行动路径</h2></div>
              <p>完成微课、分享与在地实践，依次点亮一枚黄山毛峰茶芽。</p>
            </div>

            <div className={styles.rewardSteps}>
              <article className={courseCompleted ? styles.completedStep : ""}>
                <span>{courseCompleted ? "✓" : "01"}</span>
                <div><small>LEARN · 学习</small><h3>完成一节森林水源微课</h3><p>8 分钟理解降雨、土壤、根系与水源涵养。</p></div>
                <button onClick={() => { setCourseCompleted(true); setActionNotice("微课已完成，茶芽点亮一部分"); }} disabled={courseCompleted}>{courseCompleted ? "已点亮" : "完成微课"}</button>
              </article>
              <article className={actionRecords.length > 0 ? styles.completedStep : ""}>
                <span>{actionRecords.length > 0 ? "✓" : "02"}</span>
                <div><small>SHARE · 分享</small><h3>上传一次日常可持续行动</h3><p>从节水、低干扰观察或负责任消费开始。</p></div>
                <a href="#daily-action-form">{actionRecords.length > 0 ? "继续分享" : "去上传"} ↓</a>
              </article>
              <article className={fieldPracticeCompleted ? styles.completedStep : ""}>
                <span>{fieldPracticeCompleted ? "✓" : "03"}</span>
                <div><small>FIELD · 在地</small><h3>完成一次森林观察实践</h3><p>在真实环境中完成九龙峰观察卡的三项任务。</p></div>
                <a href="#action">{fieldPracticeCompleted ? "再次查看" : "去实践"} ↓</a>
              </article>
            </div>

            <form className={styles.actionForm} id="daily-action-form" onSubmit={submitDailyAction}>
              <div className={styles.formHeading}>
                <div><span>UPLOAD YOUR ACTION</span><h3>上传我的日常行动</h3></div>
                <small>首版记录仅保存在当前设备</small>
              </div>
              <div className={styles.actionFormGrid}>
                <div>
                  <label htmlFor="actionType">行动类型</label>
                  <select id="actionType" name="actionType" defaultValue="节水生活">
                    <option>节水生活</option>
                    <option>低干扰自然观察</option>
                    <option>负责任地方消费</option>
                    <option>减少一次性用品</option>
                  </select>
                  <label htmlFor="actionNote">行动记录</label>
                  <textarea id="actionNote" name="actionNote" minLength={8} maxLength={360} placeholder="我今天做了什么？它与九龙峰的哪一个生态困境有关？" required />
                </div>
                <div className={styles.uploadColumn}>
                  <label htmlFor="actionPhoto">行动照片（可选）</label>
                  <label className={styles.uploadBox} htmlFor="actionPhoto">
                    {uploadPreview ? (
                      <Image src={uploadPreview} alt="待上传的行动照片预览" fill sizes="(max-width: 760px) 90vw, 28vw" unoptimized />
                    ) : (
                      <span><b>＋</b><strong>选择一张行动照片</strong><small>JPG / PNG · 不超过 5MB</small></span>
                    )}
                  </label>
                  <input className={styles.fileInput} id="actionPhoto" name="actionPhoto" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} />
                  {uploadName && <small className={styles.fileName}>已选择：{uploadName}</small>}
                </div>
              </div>
              <div className={styles.formSubmit}>
                <span>请勿上传包含电话、住址等敏感信息的内容。图片仅用于当前会话预览。</span>
                <button type="submit">记录并点亮茶芽 <b>↗</b></button>
              </div>
            </form>

            {actionRecords.length > 0 && (
              <div className={styles.myRecords}>
                <div><span>我的行动记录</span><small>{actionRecords.length} 次分享</small></div>
                {actionRecords.slice(0, 3).map((record) => (
                  <article key={record.id}>
                    <span>{record.type}</span><p>{record.note}</p><small>{record.date}{record.photoName ? " · 已选择照片" : ""}</small>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className={styles.rewardCard}>
            <span className={styles.rewardEyebrow}>LOCAL REWARD · 地方奖励</span>
            <h2>点亮一枚<br />黄山毛峰茶芽</h2>
            <p>每完成一个阶段，茶芽的一部分就会亮起。全部点亮后，解锁目的地农业产物奖励。</p>
            <div className={styles.teaVisual} role="img" aria-label={`黄山毛峰茶芽已点亮 ${rewardProgress} / 3 部分`}>
              <span className={styles.teaStem} />
              <span className={`${styles.teaLeaf} ${styles.leafOne} ${rewardSegments[0] ? styles.litLeaf : ""}`}><i>学习</i></span>
              <span className={`${styles.teaLeaf} ${styles.leafTwo} ${rewardSegments[1] ? styles.litLeaf : ""}`}><i>分享</i></span>
              <span className={`${styles.teaLeaf} ${styles.leafThree} ${rewardSegments[2] ? styles.litLeaf : ""}`}><i>实践</i></span>
            </div>
            <div className={styles.rewardProgress}>
              <div><span>点亮进度</span><strong>{rewardProgress} / 3</strong></div>
              <div className={styles.rewardTrack}><span style={{ width: `${rewardProgress * 33.333}%` }} /></div>
            </div>
            <div className={rewardProgress === 3 ? styles.rewardUnlocked : styles.rewardLocked}>
              <span>{rewardProgress === 3 ? "✓" : "⌁"}</span>
              <div><strong>{rewardProgress === 3 ? "奖励已解锁" : "完成全部阶段后解锁"}</strong><small>黄山毛峰体验礼 · 奖励机制示意</small></div>
            </div>
            <small className={styles.rewardNote}>正式礼品、库存与领取规则可在项目运营阶段配置。</small>
          </aside>
        </div>
      </section>

      <section className={styles.visualSection}>
        <div className={styles.visualHeading}>
          <div>
            <span className={styles.eyebrow}>ORIGINAL FIELD MATERIAL</span>
            <h2>九龙峰森林价值图</h2>
          </div>
          <button onClick={() => setLightboxOpen(true)}>全屏查看 <span>↗</span></button>
        </div>
        <button className={styles.imageFrame} onClick={() => setLightboxOpen(true)} aria-label="全屏查看九龙峰森林价值图">
          <Image
            src="/places/huangshan-forest-values.png"
            alt="九龙峰森林价值图，展示森林的生态、社会与经济价值"
            width={1382}
            height={974}
            sizes="(max-width: 760px) 920px, 92vw"
          />
          <span>点击放大</span>
        </button>
        <p className={styles.mobileHint}>手机端可左右滑动查看完整图像</p>
      </section>

      <section className={styles.valueSection} id="forest-values">
        <div className={styles.sectionIndex}><span>02</span><small>VALUE EXPLORER</small></div>
        <div className={styles.valueIntro}>
          <span className={styles.eyebrow}>点击探索</span>
          <h2>一片森林，<br />正在创造哪些价值？</h2>
          <p>选择价值类别与观察线索，理解图中的每一条关系，并获得一条可以在现场完成的观察提示。</p>
        </div>

        <div className={styles.categoryTabs} role="tablist" aria-label="森林价值分类">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? styles.activeCategory : ""}
              onClick={() => chooseCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.valueExplorer}>
          <div className={styles.valueList} role="tablist" aria-label="森林价值线索">
            {visibleValues.map((item) => (
              <button
                key={item.id}
                className={activeValue === item.id ? styles.activeValue : ""}
                onClick={() => setActiveValue(item.id)}
                role="tab"
                aria-selected={activeValue === item.id}
                style={{ "--value-accent": item.accent } as React.CSSProperties}
              >
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <i>{item.category}</i>
              </button>
            ))}
          </div>

          <article className={styles.valueDetail} style={{ "--value-accent": currentValue.accent } as React.CSSProperties}>
            <div className={styles.valueMark}>{currentValue.mark}</div>
            <span>{currentValue.number} · {currentValue.category}</span>
            <h3>{currentValue.title}</h3>
            <p>{currentValue.description}</p>
            <div className={styles.observationPrompt}>
              <small>现场观察提示</small>
              <strong>{currentValue.observation}</strong>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.fieldSection} id="field-path">
        <div className={styles.fieldHeading}>
          <div className={styles.sectionIndex}><span>03</span><small>FIELD PATH</small></div>
          <div>
            <span className={styles.eyebrow}>从知识到观察</span>
            <h2>带着四个动作，<br />走进真实森林。</h2>
          </div>
        </div>
        <div className={styles.journeyGrid}>
          {journeySteps.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.actionSection} id="action">
        <div className={styles.actionCopy}>
          <span className={styles.eyebrow}>TAKE ACTION</span>
          <h2>完成一张<br />九龙峰观察卡</h2>
          <p>依次完成三项轻量任务。全部完成后，将点亮奖励茶芽的“在地实践”部分；进度保存在当前设备。</p>
          <div className={styles.progressLabel}><span>完成进度</span><strong>{progress}%</strong></div>
          <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
        </div>
        <div className={styles.taskList}>
          {fieldTasks.map((task, index) => {
            const completed = completedTasks.includes(task);
            return (
              <button key={task} className={completed ? styles.completedTask : ""} onClick={() => toggleTask(task)} aria-pressed={completed}>
                <span>{completed ? "✓" : `0${index + 1}`}</span>
                <strong>{task}</strong>
                <i>{completed ? "已完成" : "点击完成"}</i>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.nextSection}>
        <span className={styles.eyebrow}>CONTINUE THE JOURNEY</span>
        <h2>从一片森林出发，<br />继续理解更多地方。</h2>
        <div>
          <Link className={styles.primaryAction} href="/#places">返回地点地图 <span>↗</span></Link>
          <Link className={styles.secondaryAction} href="/#learning">学习相关微课 <span>↗</span></Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <Image src="/brand/yixun-logo.png" alt="一循地方 YIXUN PLACE" width={355} height={285} />
        <p>Explore Places · Learn Together · Take Action</p>
        <Link href="/#top">返回一循地方首页 ↑</Link>
      </footer>

      {lightboxOpen && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="九龙峰森林价值图大图" onClick={() => setLightboxOpen(false)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxOpen(false)} aria-label="关闭大图">×</button>
          <div className={styles.lightboxScroll} onClick={(event) => event.stopPropagation()}>
            <Image
              src="/places/huangshan-forest-values.png"
              alt="九龙峰森林价值图大图"
              width={1382}
              height={974}
              priority
            />
          </div>
          <p>拖动或横向滑动查看完整图片 · 按 ESC 关闭</p>
        </div>
      )}

      {actionNotice && <div className={styles.actionNotice} role="status">{actionNotice}</div>}
    </main>
  );
}
