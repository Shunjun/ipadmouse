import React, { useEffect, useState, useMemo, useRef, useContext } from "react";
import RcTweenOne from "rc-tween-one";
import { throttle } from "lodash";
import AlternateContext from "./utils/alternateContext";
import _Alternate from "./components/Alternate";
import "./style.css";
import {
  copyFromStyle,
  getPerformanceTime,
  getElementRect,
  warn,
} from "./utils";
import { useAvailableRange } from "./hooks";

const path = "M0,100 100,0";
const moveEase = RcTweenOne.easing.path(path);

const effectEase = "easeOutQuart";

const defaultConfig = {};

const radiusKeys = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
];

function Cursor(props) {
  const {
    children,
    shape,
    size,
    radius,
    opacity,
    color,
    range,
    className,
    ...warperProps
  } = props;

  const containerRef = useRef(null);
  // 保存触发元素的 Context
  const AlterContext = useContext(AlternateContext);
  // 是否 Hover 状态
  const alterHover = useRef(false);
  // 是否在执行离开动画
  const alterLeaving = useRef(false);
  // 离开的时间
  const alterLeavingTime = useRef(0);
  // 鼠标位置
  const mousePos = useRef([0, 0]);
  // 是否在有效范围内
  const inPage = useRef(false);

  const duration = useRef(0);

  // 绑定 hover 动画函数
  useEffect(() => {
    AlterContext.bind(changeCursor, leaveAlternateElement);
  }, []);

  const cursorInfo = useMemo(() => {
    const _size = size || 20;
    let _radius;
    if (shape === "square") {
      _radius = radius || _size / 6;
    } else {
      _radius = _size;
    }
    return {
      width: _size,
      height: _size,
      borderRadius: _radius,
      opacity: opacity || 0.3,
      backgroundColor: color || "#000000",
    };
  }, []);

  const [animation, setAnimation] = useState({});

  function getMoveAnimationConfig(type) {
    const [clientX, clientY] = mousePos.current;
    let { width, height } = cursorInfo;
    const _inPage = !!inPage.current;
    const duration = getAnimationDuration(type);
    const ease = getAnimationEase(type);
    if (!_inPage) {
      width = height = 0;
    }
    return {
      ...cursorInfo,
      width,
      height,
      ease,
      duration,
      x: clientX,
      y: clientY,
    };
  }

  function getAnimationEase(type) {
    if (type === "hover" || alterLeaving.current) {
      return effectEase;
    } else {
      return moveEase;
    }
  }

  function getAnimationDuration(type) {
    const { duration: _duration } = props;
    const animationDuration = typeof _duration === "number" ? _duration : 250;
    if (type === "hover" && alterHover.current) {
      duration.current = animationDuration;
    } else if (alterLeaving.current) {
      // 计算离开的用时
      const passedTime = getPerformanceTime() - alterLeavingTime.current;
      if (passedTime < animationDuration) {
        duration.current = animationDuration - passedTime;
      } else {
        duration.current = 0;
      }
    } else if (type === "disable") {
      duration.current = 50;
    } else {
      duration.current = 0;
    }
    return duration.current;
  }

  function getHoverAnimationConfig(info) {
    const { width, height, left, top } = info;
    const _duration = getAnimationDuration("hover");
    const ease = getAnimationEase("hover");
    const config = {
      ...defaultConfig,
      ease,
      duration: _duration,
      width,
      height,
      x: left,
      y: top,
    };
    copyFromStyle(radiusKeys, config, info);
    return config;
  }

  function createAnimation(config) {
    setAnimation(config);
  }

  const availableRange = useAvailableRange(range);

  // 鼠标是否在有效范围内
  function isAvailableIn([tx, ty]) {
    if (availableRange === "window") {
      const clientHeight = window.innerHeight,
        clientWidth = window.innerWidth;
      const isNotAvailableIn =
        tx < size / 6 ||
        ty < size / 6 ||
        tx > clientWidth - size / 6 ||
        ty > clientHeight - size / 6;
      return !isNotAvailableIn;
    } else if (availableRange === "wrapper") {
      // 查找 wrapper 范围
      const { top, height, left, width } = getElementRect(containerRef.current);
      const y = ty - top < height;
      const x = tx - left < width;
      return x && y;
    }
  }

  const leaveTimer = useRef();

  function changeCursor(info) {
    clearTimeout(leaveTimer.current);
    alterLeaving.current = false;
    alterHover.current = true;
    // console.log("进来了");
    createAnimation(getHoverAnimationConfig(info));
  }

  function leaveAlternateElement() {
    alterHover.current = false;
    alterLeavingTime.current = getPerformanceTime();
    // 执行离开动画的状态,防止 move 吃掉 leaving 的动画
    alterLeaving.current = true;
    leaveTimer.current = setTimeout(() => {
      alterLeaving.current = false;
    }, duration.current);
    // console.log("离开了");
    createAnimation(getMoveAnimationConfig("leave"));
  }

  // mousemove
  useEffect(() => {
    function mousemoveListener(e) {
      if (alterHover.current) {
        return;
      }
      const { clientX, clientY } = e;
      mousePos.current = [clientX, clientY];
      inPage.current = true;
      if (isAvailableIn([clientX, clientY])) {
        createAnimation(getMoveAnimationConfig("move"));
      } else {
        // leave viewport
        mouseleaveListerner(e);
      }
    }
    const throttleMousemove = throttle(mousemoveListener, 30);

    function mouseleaveListerner(e) {
      inPage.current = false;
      createAnimation(getMoveAnimationConfig("disable"));
    }

    // mouse in viewport
    document.addEventListener("mousemove", throttleMousemove);
    // mouse leave viewport
    document.addEventListener("mouseleave", mouseleaveListerner);
    return () => {
      // remove listener
      document.removeEventListener("mousemove", throttleMousemove);
      document.removeEventListener("mouseleave", mouseleaveListerner);
    };
  }, []);

  return (
    <>
      <div
        {...warperProps}
        className={["s-containt-wrapper", className ? className : ""]}
        ref={(e) => {
          containerRef.current = e;
        }}
      >
        {children}
      </div>
      <RcTweenOne
        component="span"
        animation={animation}
        componentProps={{ className: "s-cursor" }}
      />
    </>
  );
}

export const Alternate = _Alternate;
Cursor.Alternate = _Alternate;
export default Cursor;
