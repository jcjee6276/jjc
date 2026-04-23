import Typography from "../../shared/Typography";

const SKILLS = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript"],
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "SCSS", "Tailwind CSS"],
  },
  {
    category: "Frameworks / Libraries",
    items: ["React", "Next.js", "NestJS"],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Vite", "Storybook", "Vitest"],
  },
];

export default function SkillTab() {
  return (
    <div
      style={{
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {SKILLS.map(({ category, items }) => (
        <div key={category}>
          <Typography
            as="span"
            size="md"
            weight="semibold"
            color="#0D0D0D"
            letterSpacing="0.08em"
            style={{ textTransform: "uppercase" }}
          >
            {category}
          </Typography>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 5 }}
          >
            {items.map((skill) => (
              <span
                key={skill}
                style={{
                  padding: "1px 14px",
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: "#343a40",
                  background: "#f3f4f6",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
