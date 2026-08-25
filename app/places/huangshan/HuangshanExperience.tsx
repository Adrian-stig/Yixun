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
  checkInCount?: number;
};

const actionStorageKey = "yixun-huangshan-action-v1";
const rewardGoalXp = 50;
const courseXp = 5;
const fieldActivityXp = 30;

function todayLabel() {
  return new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" }).format(new Date());
}

type HuangshanExperienceProps = {
  view: "forest" | "workshop";
};

export default function HuangshanExperience({ view }: HuangshanExperienceProps) {
  const isForest = view === "forest";
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("全部价值");
  const [activeValue, setActiveValue] = useState(forestValues[0].id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [actionRecords, setActionRecords] = useState<ActionRecord[]>([]);
  const [checkInCount, setCheckInCount] = useState(0);
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
  const earnedCourseXp = courseCompleted ? courseXp : 0;
  const earnedFieldXp = fieldPracticeCompleted ? fieldActivityXp : 0;
  const totalXp = earnedCourseXp + checkInCount + earnedFieldXp;
  const rewardFill = Math.min(100, Math.round((totalXp / rewardGoalXp) * 100));
  const rewardUnlocked = totalXp >= rewardGoalXp;
  const remainingXp = Math.max(0, rewardGoalXp - totalXp);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(actionStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as StoredActionProgress;
          if (typeof parsed.courseCompleted === "boolean") setCourseCompleted(parsed.courseCompleted);
          if (Array.isArray(parsed.completedTasks)) setCompletedTasks(parsed.completedTasks);
          if (Array.isArray(parsed.actionRecords)) {
            setActionRecords(parsed.actionRecords);
            setCheckInCount(
              typeof parsed.checkInCount === "number" && parsed.checkInCount >= 0
                ? Math.floor(parsed.checkInCount)
                : parsed.actionRecords.length,
            );
          } else if (typeof parsed.checkInCount === "number" && parsed.checkInCount >= 0) {
            setCheckInCount(Math.floor(parsed.checkInCount));
          }
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
      window.localStorage.setItem(actionStorageKey, JSON.stringify({ courseCompleted, completedTasks, actionRecords, checkInCount }));
    } catch {
      // The module continues in memory when browser storage is full or disabled.
    }
  }, [actionRecords, checkInCount, completedTasks, courseCompleted, storageReady]);

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
    if (fieldPracticeCompleted) return;
    const nextTasks = completedTasks.includes(task)
      ? completedTasks.filter((item) => item !== task)
      : [...completedTasks, task];
    setCompletedTasks(nextTasks);
    if (nextTasks.length === fieldTasks.length) {
      setActionNotice(`在地活动完成，奖励进度 +${fieldActivityXp} XP`);
    }
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
    setCheckInCount((current) => current + 1);
    setUploadPreview("");
    setUploadName("");
    event.currentTarget.reset();
    setActionNotice("打卡成功，黄山毛峰奖励进度 +1 XP");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#top" aria-label="返回一循地方首页">
          <Image src="/brand/yixun-logo.png" alt="一循地方 YIXUN PLACE" width={355} height={285} priority />
        </Link>
        {isForest ? (
          <nav aria-label="可持续森林专题页导航">
            <a href="#about">认识九龙峰</a>
            <a href="#forest-values">森林价值</a>
            <a href="#field-path">观察路径</a>
            <Link href="/places/huangshan/workshop">工作坊行动</Link>
          </nav>
        ) : (
          <nav aria-label="工作坊行动页导航">
            <a href="#workshop-action">生态困境</a>
            <a href="#daily-action-form">我的行动</a>
            <a href="#action">在地实践</a>
            <Link href="/places/huangshan/forest">可持续森林</Link>
          </nav>
        )}
        <Link className={styles.backLink} href="/#places">返回地点地图 <span>↗</span></Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>一循地方 · 第二站 · 安徽黄山</span>
          {isForest ? (
            <>
              <h1>读懂一片森林的<br /><em>多重价值</em></h1>
              <p>以九龙峰自然保护区为例，从一棵树出发，看见森林如何连接气候、水土、生物、社区与人的生活。</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#forest-values">探索森林价值 <span>↓</span></a>
                <button className={styles.secondaryAction} onClick={() => setLightboxOpen(true)}>查看森林价值图 <span>↗</span></button>
              </div>
              <div className={styles.heroMeta}>
                <div><strong>03</strong><span>森林价值维度</span></div>
                <div><strong>07</strong><span>森林价值线索</span></div>
                <div><strong>04</strong><span>现场观察动作</span></div>
              </div>
            </>
          ) : (
            <>
              <h1>把地方的困境，<br /><em>带回日常行动</em></h1>
              <p>工作坊已经结束，行动仍在继续。认识九龙峰的生态困难，从微课、分享和在地实践开始，建立与目的地的长期连接。</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#workshop-action">开始行动 <span>↓</span></a>
                <Link className={styles.secondaryAction} href="/places/huangshan/forest">探索可持续森林 <span>↗</span></Link>
              </div>
              <div className={styles.heroMeta}>
                <div><strong>03</strong><span>目的地生态困境</span></div>
                <div><strong>03</strong><span>持续行动阶段</span></div>
                <div><strong>01</strong><span>地方产物奖励</span></div>
              </div>
            </>
          )}
        </div>
        <div className={styles.heroForest} aria-hidden="true">
          <span className={styles.sun} />
          <span className={`${styles.tree} ${styles.treeOne}`} />
          <span className={`${styles.tree} ${styles.treeTwo}`} />
          <span className={`${styles.tree} ${styles.treeThree}`} />
          <span className={`${styles.tree} ${styles.treeFour}`} />
          <span className={styles.ground} />
          <div className={styles.heroLabel}>
            <span>{isForest ? "可持续森林专题" : "工作坊持续行动"}</span>
            <strong>九龙峰自然保护区</strong>
          </div>
        </div>
      </section>

      {isForest && (
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
      )}

      {!isForest && (
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
              <p>完成微课、持续打卡与在地活动，让经验值从底部向上逐渐填满黄山毛峰奖励。</p>
            </div>

            <div className={styles.rewardSteps}>
              <article className={courseCompleted ? styles.completedStep : ""}>
                <span>{courseCompleted ? "✓" : `+${courseXp}`}</span>
                <div><small>LEARN · 一次 +{courseXp} XP</small><h3>完成一节森林水源微课</h3><p>8 分钟理解降雨、土壤、根系与水源涵养。</p></div>
                <button onClick={() => { setCourseCompleted(true); setActionNotice(`微课完成，奖励进度 +${courseXp} XP`); }} disabled={courseCompleted}>{courseCompleted ? `已获得 ${courseXp} XP` : "完成微课"}</button>
              </article>
              <article className={checkInCount > 0 ? styles.completedStep : ""}>
                <span>+1</span>
                <div><small>CHECK IN · 每次 +1 XP</small><h3>坚持上传日常行动打卡</h3><p>每一条有效记录都累积经验，不限制为一次分享。</p></div>
                <a href="#daily-action-form">{checkInCount > 0 ? `继续打卡 · 已 ${checkInCount} 次` : "开始打卡"} ↓</a>
              </article>
              <article className={fieldPracticeCompleted ? styles.completedStep : ""}>
                <span>{fieldPracticeCompleted ? "✓" : `+${fieldActivityXp}`}</span>
                <div><small>FIELD · 一次 +{fieldActivityXp} XP</small><h3>参加一次九龙峰在地活动</h3><p>在真实地点完成观察卡，经验相当于 {fieldActivityXp} 次日常打卡。</p></div>
                <a href="#action">{fieldPracticeCompleted ? `已获得 ${fieldActivityXp} XP` : "查看在地任务"} ↓</a>
              </article>
            </div>

            <form className={styles.actionForm} id="daily-action-form" onSubmit={submitDailyAction}>
              <div className={styles.formHeading}>
                <div><span>UPLOAD YOUR ACTION</span><h3>上传我的日常行动</h3></div>
                <small>累计 {checkInCount} 次打卡 · 首版记录仅保存在当前设备</small>
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
                <button type="submit">记录并获得 1 XP <b>↗</b></button>
              </div>
            </form>

            {actionRecords.length > 0 && (
              <div className={styles.myRecords}>
                <div><span>最近行动记录</span><small>累计 {checkInCount} 次打卡</small></div>
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
            <h2>逐步装满<br />黄山毛峰茶罐</h2>
            <p>每一次行动都会累积经验，进度像水位一样从底部持续上升。达到 {rewardGoalXp} XP 后解锁目的地农产品奖励。</p>
            <div className={styles.productMeter} role="img" aria-label={`黄山毛峰奖励已积累 ${totalXp} / ${rewardGoalXp} 经验值`}>
              <span className={styles.productCap} />
              <div className={styles.productVessel}>
                <span className={styles.productFill} style={{ height: `${rewardFill}%` }} />
                <span className={styles.productLevel} style={{ bottom: `max(6px, calc(${rewardFill}% - 8px))` }}>{rewardFill}%</span>
                <div className={styles.productSeal}>
                  <small>YIXUN PLACE</small>
                  <strong>黄山毛峰</strong>
                  <i>HUANGSHAN · GREEN TEA</i>
                </div>
              </div>
              <span className={styles.productShadow} />
            </div>
            <div className={styles.xpLegend} aria-label="经验值规则">
              <span>微课 <strong>+{courseXp}</strong></span>
              <span>每次打卡 <strong>+1</strong></span>
              <span>在地活动 <strong>+{fieldActivityXp}</strong></span>
            </div>
            <div className={styles.rewardProgress}>
              <div><span>累计经验</span><strong>{totalXp} / {rewardGoalXp} XP</strong></div>
              <div className={styles.rewardTrack}><span style={{ width: `${rewardFill}%` }} /></div>
            </div>
            <div className={rewardUnlocked ? styles.rewardUnlocked : styles.rewardLocked}>
              <span>{rewardUnlocked ? "✓" : "⌁"}</span>
              <div><strong>{rewardUnlocked ? "黄山毛峰奖励已解锁" : `还需 ${remainingXp} XP 解锁`}</strong><small>{rewardUnlocked ? "可进入领取流程 · 奖励机制示意" : "坚持打卡，或参加一次在地活动快速累积"}</small></div>
            </div>
            <small className={styles.rewardNote}>正式礼品、库存与领取规则可在项目运营阶段配置。</small>
          </aside>
        </div>
      </section>
      )}

      {isForest && (
      <>
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
      </>
      )}

      {!isForest && (
      <section className={styles.actionSection} id="action">
        <div className={styles.actionCopy}>
          <span className={styles.eyebrow}>TAKE ACTION</span>
          <h2>参加一次<br />九龙峰在地活动</h2>
          <p>在真实地点依次完成三项观察任务。全部完成后一次获得 {fieldActivityXp} XP，大幅推进黄山毛峰奖励进度；记录保存在当前设备。</p>
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
      )}

      <section className={styles.nextSection}>
        <span className={styles.eyebrow}>CONTINUE THE JOURNEY</span>
        {isForest ? (
          <>
            <h2>理解森林之后，<br />把知识带进行动。</h2>
            <div>
              <Link className={styles.primaryAction} href="/places/huangshan/workshop">进入工作坊行动页 <span>↗</span></Link>
              <Link className={styles.secondaryAction} href="/#places">返回地点地图 <span>↗</span></Link>
            </div>
          </>
        ) : (
          <>
            <h2>完成一次行动，<br />继续读懂它所连接的森林。</h2>
            <div>
              <Link className={styles.primaryAction} href="/places/huangshan/forest">进入可持续森林专题 <span>↗</span></Link>
              <Link className={styles.secondaryAction} href="/#places">返回地点地图 <span>↗</span></Link>
            </div>
          </>
        )}
      </section>

      <footer className={styles.footer}>
        <Image src="/brand/yixun-logo.png" alt="一循地方 YIXUN PLACE" width={355} height={285} />
        <p>Explore Places · Learn Together · Take Action</p>
        <Link href="/#top">返回一循地方首页 ↑</Link>
      </footer>

      {isForest && lightboxOpen && (
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

      {!isForest && actionNotice && <div className={styles.actionNotice} role="status">{actionNotice}</div>}
    </main>
  );
}
