import { motion } from "framer-motion";
import FixedBottomCTA from "../../shared/FixedBottomCTA";
import Typography from "../../shared/Typography";

const content = {
  title: "안녕하세요,\n프론트엔드 개발자 전지창입니다.",
  description:
    "IT Backup Engineer로 2년 6개월, Frontend Developer 1년 6개월으로 근무한 경험이 있습니다.",
  subDescription: "",
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
          size="sm"
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
        custom={0.3}
      ></motion.div>
      <FixedBottomCTA onClick={() => window.open("/resume.pdf", "_blank")}>
        이력서 보기
      </FixedBottomCTA>
    </div>
  );
}
