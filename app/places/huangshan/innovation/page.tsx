import Image from "next/image";
import Link from "next/link";
import { createHuangshanMetadata } from "../metadata";
import styles from "./innovation.module.css";

const projectFramework = [
  ["01", "项目缘起", "合作背景与长期愿景"],
  ["02", "在地议题", "水资源与流域关系"],
  ["03", "共创路径", "企业、地方与伙伴行动"],
  ["04", "项目成果", "过程记录与阶段影响"],
];

export function generateMetadata() {
  return createHuangshanMetadata({
    title: "九龙峰可持续创新项目 · 一循地方",
    description: "汇集企业伙伴与一循地方共同开展的长期可持续创新项目，记录从在地议题、协作路径到阶段成果的持续实践。",
  });
}

export default function HuangshanInnovationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#top" aria-label="返回一循地方首页">
          <Image src="/brand/yixun-logo.png" alt="一循地方 YIXUN PLACE" width={355} height={285} priority />
        </Link>
        <nav aria-label="九龙峰项目导航">
          <Link href="/places/huangshan/forest">森林专题</Link>
          <Link href="/places/huangshan/workshop">探索工作坊</Link>
          <Link className={styles.currentNav} href="/places/huangshan/innovation">创新项目</Link>
        </nav>
        <Link className={styles.backLink} href="/#places">返回九龙峰 <span>↗</span></Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>SUSTAINABLE INNOVATION · LONG-TERM PROJECTS</span>
          <h1>可持续<br /><em>创新项目</em></h1>
          <p>汇集企业伙伴与一循地方共同开展的长期项目，让一次合作成为持续理解地方、回应议题与共创改变的过程。</p>
          <div className={styles.heroActions}>
            <Link href="#project-qingyi">查看首个项目 <span>↓</span></Link>
            <small>项目档案将随合作进展持续更新</small>
          </div>
          <div className={styles.heroMeta} aria-label="项目页面信息">
            <div><strong>01</strong><span>首批项目</span></div>
            <div><strong>长期</strong><span>合作周期</span></div>
            <div><strong>共创</strong><span>行动方式</span></div>
          </div>
        </div>
        <div className={styles.heroVisual} aria-label="可持续创新项目视觉占位">
          <div className={styles.waterRing}><span>水</span></div>
          <div className={styles.riverOne} />
          <div className={styles.riverTwo} />
          <div className={styles.visualLabel}>
            <small>PARTNER PROJECTS</small>
            <strong>企业伙伴 × 在地生态 × 长期行动</strong>
          </div>
        </div>
      </section>

      <section className={styles.projectIndex} aria-labelledby="project-index-title">
        <div className={styles.sectionHeading}>
          <div>
            <span>01 · PROJECT DIRECTORY</span>
            <h2 id="project-index-title">长期项目目录</h2>
          </div>
          <p>从一个项目开始，逐步建立企业与地方长期合作的公开档案。</p>
        </div>

        <div className={styles.projectGrid}>
          <article className={styles.featuredProject}>
            <div className={styles.projectCover} role="img" aria-label="源起青弋水资源保护项目图片占位">
              <span><i>＋</i> PROJECT IMAGE</span>
              <strong>项目主视觉 / 流域现场照片</strong>
              <small>建议使用横版图片 · 16:9</small>
            </div>
            <div className={styles.projectCardCopy}>
              <span>PROJECT 01 · WATER STEWARDSHIP</span>
              <h3>源起青弋<br />水资源保护项目</h3>
              <p>陶氏中国 × 一循地方</p>
              <div className={styles.tags}>
                <span>水资源</span><span>企业合作</span><span>在地共创</span>
              </div>
              <Link href="#project-qingyi">进入项目框架 <span>↘</span></Link>
            </div>
          </article>

          <article className={styles.futureProject}>
            <span>02</span>
            <div>
              <small>NEXT PARTNERSHIP</small>
              <h3>下一个长期项目</h3>
              <p>合作项目入口预留</p>
            </div>
            <i>＋</i>
          </article>
        </div>
      </section>

      <section className={styles.projectDetail} id="project-qingyi" aria-labelledby="qingyi-title">
        <div className={styles.detailHeading}>
          <div>
            <span>FEATURED PROJECT · 01</span>
            <h2 id="qingyi-title">源起青弋<br />水资源保护项目</h2>
          </div>
          <div className={styles.partnerMark}>
            <small>合作伙伴</small>
            <strong>陶氏中国 × 一循地方</strong>
            <span>项目资料持续整理中</span>
          </div>
        </div>

        <div className={styles.frameworkGrid}>
          {projectFramework.map(([number, title, subtitle]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{subtitle}</p>
              <div><small>CONTENT PLACEHOLDER</small><strong>内容待补充</strong></div>
            </article>
          ))}
        </div>

        <div className={styles.assetGrid}>
          <div className={styles.assetPlaceholder} role="img" aria-label="项目影像资料占位">
            <span>＋ PROJECT FIELD IMAGE</span>
            <strong>项目影像与在地记录</strong>
            <small>图片位置预留 · 3:2</small>
          </div>
          <div className={styles.archivePlaceholder}>
            <span>PROJECT ARCHIVE</span>
            <h3>项目档案入口</h3>
            <ul>
              <li><span>项目介绍</span><small>待更新</small></li>
              <li><span>阶段进展</span><small>待更新</small></li>
              <li><span>成果与故事</span><small>待更新</small></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>一循地方</strong><span>YIXUN PLACE</span></div>
        <p>与地方建立长期而真实的连接。</p>
        <div>
          <Link href="/places/huangshan/forest">可持续森林</Link>
          <Link href="/places/huangshan/workshop">探索工作坊</Link>
          <Link href="/#places">返回地点地图 ↑</Link>
        </div>
      </footer>
    </main>
  );
}
