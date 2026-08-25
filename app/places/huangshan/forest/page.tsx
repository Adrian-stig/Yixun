import HuangshanExperience from "../HuangshanExperience";
import { createHuangshanMetadata } from "../metadata";

export function generateMetadata() {
  return createHuangshanMetadata({
    title: "九龙峰可持续森林专题 · 一循地方",
    description: "从九龙峰的一棵树出发，交互探索森林的生态、社会与经济价值，并获得可在现场完成的观察提示。",
    includeForestImage: true,
  });
}

export default function HuangshanForestPage() {
  return <HuangshanExperience view="forest" />;
}
