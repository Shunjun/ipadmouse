import React, { useMemo, forwardRef } from "react";
import classnames from "classnames";
import "./style.scss";

// const scriptElem = document.createElement("script");
// scriptElem.src = "//at.alicdn.com/t/font_2400549_74aqc0m8k8m.js";
// document.body.appendChild(scriptElem);

function Icon(props, ref) {
  const {
    hasbg = true,
    type,
    size = 38,
    fontSize,
    bgColor,
    color,
    className,
    bgStyle,
    bgColorOpacity,
    ...restProps
  } = props;

  function checkColorName(col) {
    if (typeof col === "string") {
      if (col === "none" || col === "unset") {
        return "unset";
      }
      return col.startsWith("#") ? col : `#${col}`;
    } else if (typeof col === "number") {
      return `#${col}`;
    } else {
      return;
    }
  }

  const warpperStyle = useMemo(() => {
    return {
      width: size ? `${size}px` : undefined,
      height: size ? `${size}px` : undefined,
    };
  }, [size]);

  const memoBgStyle = useMemo(() => {
    let style = {};
    style.visibility = hasbg ? "visible" : "hidden";
    style.backgroundColor = checkColorName(bgColor);
    style.opacity = bgColorOpacity || 1;
    style = {
      ...bgStyle,
      ...style,
    };
    return style;
  }, [hasbg, bgColor, bgStyle]);

  function getIconSize(bgSize) {
    return Math.floor(bgSize * 0.5);
  }

  const iconStyle = useMemo(() => {
    let style = {};
    style.fontSize = fontSize ? `${fontSize}px` : `${getIconSize(size)}px`;
    style.color = checkColorName(color);

    return style;
  }, [fontSize, color]);

  return (
    <span
      ref={ref}
      style={warpperStyle}
      className={classnames(["icon-warpper", className])}
      {...restProps}
    >
      <i
        style={iconStyle}
        className={classnames(["icon", "iconfont", type])}
      ></i>
      <span className="icon-bg" style={memoBgStyle}></span>
    </span>
  );
}

export default forwardRef(Icon);
