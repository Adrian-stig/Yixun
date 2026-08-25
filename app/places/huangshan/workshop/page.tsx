import HuangshanExperience from "../HuangshanExperience";
import { createHuangshanMetadata } from "../metadata";

export function generateMetadata() {
  return createHuangshanMetadata({
    title: "九龙峰工作坊行动 · 一循地方",
    description: "认识九龙峰面临的生态困境，完成微课、日常分享与在地实践，点亮黄山毛峰地方奖励。",
  });
}

export default function HuangshanWorkshopPage() {
  return <HuangshanExperience view="workshop" />;
}
