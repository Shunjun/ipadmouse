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
    ...restProps
  } = props;

  const warpperStyle = useMemo(() => {
    let style = {};

    style.visibility = hasbg ? "visible" : "hidden";
    style.width = size ? `${size}px` : undefined;
    style.height = size ? `${size}px` : undefined;
    style.backgroundColor = bgColor;

    style = {
      ...bgStyle,
      ...style,
    };
    return style;
  }, [hasbg, size, bgColor, bgStyle]);

  function getIconSize(bgSize) {
    return Math.floor(bgSize * 0.5);
  }

  const iconStyle = useMemo(() => {
    let style = {};
    style.fontSize = fontSize ? `${fontSize}px` : `${getIconSize(size)}px`;
    style.color = color;

    return style;
  }, [fontSize, color]);

  return (
    <span
      ref={ref}
      style={warpperStyle}
      className={classnames(["icon-bg", className])}
      {...restProps}
    >
      <i
        style={iconStyle}
        className={classnames(["icon", "iconfont", type])}
      ></i>
    </span>
  );
}

export default forwardRef(Icon);
