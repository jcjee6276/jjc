/*
 * @Author: 전지창
 * @Date: 2026-04-23 16:45:00
 * @LastEditTime: 2026-04-23 17:08:03
 * @LastEditors: 전지창
 * @Description:
 */
import { useState } from "react";
import { Tab, TabItem } from "../shared/Tab";

const categories = ["소개", "경력", "프로젝트", "기술"];

function Test() {
  const [selected, setSelected] = useState(categories[0]);

  return (
    <>
      <Tab onChange={(value) => setSelected(value)}>
        {categories.map((item, index) => (
          <TabItem key={index} value={item} selected={selected === item}>
            {item}
          </TabItem>
        ))}
      </Tab>
    </>
  );
}

export default Test;
