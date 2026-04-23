import PropTypes from "prop-types";

const SIZE = {
  xs: "11px",
  sm: "13px",
  md: "15px",
  lg: "17px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
  "4xl": "36px",
};

const WEIGHT = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

const LINE_HEIGHT = {
  tight: 1.2,
  snug: 1.4,
  normal: 1.6,
  relaxed: 1.8,
  loose: 2.0,
};

export function Typography({
  as: Tag = "p",
  size = "md",
  weight = "regular",
  color = "#111111",
  lineHeight = "normal",
  align,
  letterSpacing,
  ellipsis = false,
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      style={{
        margin: 0,
        fontSize: SIZE[size] ?? size,
        fontWeight: WEIGHT[weight] ?? weight,
        color,
        lineHeight: LINE_HEIGHT[lineHeight] ?? lineHeight,
        textAlign: align,
        letterSpacing,
        ...(ellipsis && {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

Typography.propTypes = {
  as: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]),
    PropTypes.string,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.oneOf(["thin", "light", "regular", "medium", "semibold", "bold", "extrabold"]),
    PropTypes.number,
  ]),
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.oneOf(["tight", "snug", "normal", "relaxed", "loose"]),
    PropTypes.number,
  ]),
  align: PropTypes.oneOf(["left", "center", "right", "justify"]),
  letterSpacing: PropTypes.string,
  ellipsis: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Typography;
