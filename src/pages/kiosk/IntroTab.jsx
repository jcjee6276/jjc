/*
 * @Author: 전지창
 * @Date: 2026-04-27 20:34:10
 * @LastEditTime: 2026-04-28 14:18:13
 * @LastEditors: 전지창
 * @Description:
 */
import { motion } from "framer-motion";
import FixedBottomCTA from "../../shared/FixedBottomCTA";
import Typography from "../../shared/Typography";

const content = {
  title: "안녕하세요,\n프론트엔드 개발자 전지창입니다.",
  description:
    "IT Backup Engineer로 2년 6개월, Frontend Developer 1년 7개월으로 근무한 경험이 있습니다.",
  subDescription:
    "JAVA 기반 웹 풀스택 6개월 과정 부트캠프를 수료하였으며, 프론트엔드 개발자로 근무하며 키오스크, POS, DIT(식수 관리 시스템) 등을 개발 및 유지보수 했습니다.",
  conclusion:
    "맡은 업무만 해내는 것을 넘어 프로덕트의 완성도에 책임감을 가집니다. 이와 같은 자세로 생에 첫 리드 프로젝트를 설계부터 배포 및 운영까지 성공적으로 완수한 경험이 있습니다.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function IntroTab() {
  return (
    <div
      style={{
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Typography
          as="h2"
          size="xl"
          weight="bold"
          style={{ whiteSpace: "pre-line", margin: 0 }}
        >
          {content.title}
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
      >
        <Typography
          as="p"
          size="md"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ margin: 0 }}
        >
          {content.description}
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
      >
        <Typography
          as="p"
          size="md"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ margin: 0 }}
        >
          {content.subDescription}
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
      >
        <Typography
          as="p"
          size="md"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ margin: 0 }}
        >
          {content.conclusion}
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
      ></motion.div>
      <FixedBottomCTA onClick={() => window.open("/resume.pdf", "_blank")}>
        이력서 보기
      </FixedBottomCTA>
    </div>
  );
}
