/*
 * @Author: 전지창
 * @Date: 2026-04-23 16:38:06
 * @LastEditTime: 2026-04-23 16:41:00
 * @LastEditors: 전지창
 * @Description: Tab
 */
import PropTypes from "prop-types";

export function TabItem({ value, selected, onClick, children }) {
  return (
    <button
      onClick={() => onClick?.(value)}
      style={{
        flex: 1,
        background: "none",
        border: "none",
        borderBottom: "none",
        padding: "12px 0",
        fontSize: "14px",
        fontWeight: selected ? 700 : 400,
        color: selected ? "#111" : "#9ca3af",
        cursor: "pointer",
        transition: "color 0.25s, font-weight 0.25s",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

TabItem.propTypes = {
  value: PropTypes.any.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export function Tab({ children, onChange, style }) {
  const items = (Array.isArray(children) ? children : [children]).filter(
    Boolean
  );
  const selectedIndex = items.findIndex((child) => child?.props?.selected);
  const count = items.length;

  const cloned = items.map((child) => ({
    ...child,
    props: { ...child.props, onClick: onChange },
  }));

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        borderBottom: "2px solid #e5e7eb",
        ...style,
      }}
    >
      {cloned.map((child, i) => (
        <TabItem key={i} {...child.props} />
      ))}

      {/* 슬라이딩 바 */}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          width: `${100 / count}%`,
          height: 2,
          background: "#111",
          transform: `translateX(${selectedIndex * 100}%)`,
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}

Tab.Item = TabItem;

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default Tab;
