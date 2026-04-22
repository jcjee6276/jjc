import PropTypes from "prop-types";

const SIZE = {
  sm: { padding: "10px 20px", fontSize: "13px", borderRadius: "999px" },
  md: { padding: "14px 24px", fontSize: "15px", borderRadius: "999px" },
  lg: { padding: "18px 28px", fontSize: "17px", borderRadius: "999px" },
};

export function FixedBottomCTA({
  onClick,
  size = "md",
  bgColor = "#3478f6",
  color = "#ffffff",
  children,
}) {
  const sizeStyle = SIZE[size] ?? SIZE.md;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "12px 16px",
        zIndex: 100,
      }}
    >
      <button
        onClick={onClick}
        style={{
          display: "block",
          width: "100%",
          background: bgColor,
          color,
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.02em",
          transition: "opacity 0.15s",
          ...sizeStyle,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {children}
      </button>
    </div>
  );
}

FixedBottomCTA.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

export default FixedBottomCTA;
