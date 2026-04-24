/*
 * @Author: 전지창
 * @Date: 2026-04-23 16:45:00
 * @LastEditTime: 2026-04-24 17:38:48
 * @LastEditors: 전지창
 * @Description:
 */
import { useState } from "react";
import { Tab, TabItem } from "../shared/Tab";
import IntroTab from "./test/IntroTab";
import CareerTab from "./test/CareerTab";
import ProjectTab from "./test/ProjectTab";
import SkillTab from "./test/SkillTab";

const TABS = [
  { label: "소개", component: <IntroTab /> },
  { label: "경력", component: <CareerTab /> },
  { label: "프로젝트", component: <ProjectTab /> },
  { label: "기술", component: <SkillTab /> },
];

function Test() {
  const [selected, setSelected] = useState(TABS[0].label);

  const activeTab = TABS.find((t) => t.label === selected);

  return (
    <div style={{ width: "100%", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Tab onChange={(value) => setSelected(value)}>
        {TABS.map((tab) => (
          <TabItem
            key={tab.label}
            value={tab.label}
            selected={selected === tab.label}
          >
            {tab.label}
          </TabItem>
        ))}
      </Tab>

      {activeTab?.component}
    </div>
  );
}

export default Test;
