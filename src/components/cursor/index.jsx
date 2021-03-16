import React, { useEffect, useState, useMemo, useRef, useContext } from "react";
import { throttle } from "lodash";
import AlternateContext from "./utils/alternateContext";
import _Alternate from "./components/Alternate";
import "./style.scss";
import {
  copyFromStyle,
  getPerformanceTime,
  getElementRect,
  warn,
} from "./utils";
import { useAvailableRange } from "./hooks";
import gsap from "gsap";

// const path = "M0,100 100,0";
// const moveEase = RcTweenOne.easing.path(path);

const effectEase = "power4.out";
const moveEase = "none";

const moveduration = 0.05;

const defaultConfig = {
  transformOrigin: "center",
};

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

  const cursorRef = useRef(null);
  const cursorShapeRef = useRef(null);
  const cursorEffectRef = useRef(null);

  const containerRef = useRef(null);
  // 保存触发元素的 Context
  const alterContext = useContext(AlternateContext);
  // 是否在执行离开动画
  const alterLeaving = useRef(false);
  // 离开的时间
  const alterLeavingTime = useRef(0);
  // 鼠标位置
  const mousePos = useRef([0, 0]);
  // 是否在有效范围内
  const inPage = useRef(false);
  //
  const duration = useRef(0);
  // 当前激活的元素
  const currentAlterInfo = useRef();
  //
  const isHover = useRef();

  // 绑定 hover 动画函数
  useEffect(() => {
    alterContext.bind("mouseEnter", enterAlternateElement);
    alterContext.bind("mouseLeave", leaveAlternateElement);
    alterContext.bind("refresh", enterAlternateElement);
    alterContext.bind("click", clickAlternateElement);

    return () => {
      alterContext.remove("mouseEnter", enterAlternateElement);
      alterContext.remove("mouseLeave", leaveAlternateElement);
      alterContext.remove("refresh", enterAlternateElement);
      alterContext.remove("click", clickAlternateElement);
    };
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

  function getMoveAnimationConfig() {
    const [clientX, clientY] = mousePos.current;
    let { width, height, borderRadius } = cursorInfo;
    const _inPage = !!inPage.current;
    const duration = getAnimationDuration();
    const ease = getAnimationEase();
    if (!_inPage) {
      width = height = 0;
    }

    return {
      ...defaultConfig,
      ...cursorInfo,
      borderRadius: borderRadius + "px",
      width,
      height,
      ease,
      duration,
      x: clientX,
      y: clientY,
    };
  }

  function getAnimationEase() {
    if (isHover.current || alterLeaving.current) {
      return effectEase;
    } else {
      return moveEase;
    }
  }

  function getAnimationDuration() {
    const { duration: _duration } = props;
    const animationDuration =
      typeof _duration === "number" ? _duration / 1000 : 0.25;
    if (isHover.current) {
      duration.current = animationDuration;
    } else if (alterLeaving.current) {
      // 计算离开的用时
      const passedTime =
        (getPerformanceTime() - alterLeavingTime.current) / 1000;
      if (passedTime < animationDuration - moveduration) {
        duration.current = animationDuration - passedTime;
      } else {
        duration.current = moveduration;
      }
    } else {
      duration.current = moveduration;
    }
    return duration.current;
  }

  function getChangeAnimationConfig() {
    const info = currentAlterInfo.current;
    const _duration = getAnimationDuration("hover");
    const ease = getAnimationEase();
    if (isHover.current) {
      // 进入元素
      const { width, height, left, top } = info;
      const config = {
        ...defaultConfig,
        ease,
        duration: _duration,
        width,
        height,
        x: left + Math.floor(width / 2),
        y: top + Math.floor(height / 2),
      };
      copyFromStyle(radiusKeys, config, info);
      return config;
    } else {
      // 离开元素
      const { borderRadius } = cursorInfo;
      const config = {
        ...defaultConfig,
        ...cursorInfo,
        borderRadius: borderRadius + "px",
        ease,
        duration: _duration,
      };
      return config;
    }
  }

  const animates = useRef([]);

  function createAnimation(animConfig) {
    const { x, y, ease, duration, transformOrigin, ...config } = animConfig;

    animates.current.forEach((anim) => anim.kill());
    // gsap占用了transform 属性，无法修改中心点，
    // 或者不知道怎么同时添加两个 transform function
    // 通过两层标签暂时解决问题
    animates.current.push(
      gsap.to(cursorRef.current, { x, y, ease, duration, transformOrigin })
    );
    animates.current.push(
      gsap.to(cursorShapeRef.current, { ease, duration, ...config })
    );
  }

  function createEffectAnimation(effectConfig) {
    gsap.to(cursorEffectRef.current, effectConfig);
  }

  const availableRange = useAvailableRange(range);

  // 鼠标是否在有效范围内
  function isAvailableIn([tx, ty]) {
    const { width, height } = cursorInfo;
    if (availableRange === "window") {
      const clientHeight = window.innerHeight,
        clientWidth = window.innerWidth;
      const isNotAvailableIn =
        tx < width / 6 ||
        ty < height / 6 ||
        tx > clientWidth - width / 6 ||
        ty > clientHeight - height / 6;
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

  function enterAlternateElement(_ele, info) {
    isHover.current = true;
    currentAlterInfo.current = info;
    clearTimeout(leaveTimer.current);
    alterLeaving.current = false;
    createAnimation(getChangeAnimationConfig());
  }

  function leaveAlternateElement() {
    isHover.current = false;
    currentAlterInfo.current = null;
    alterLeavingTime.current = getPerformanceTime();
    // 执行离开动画的状态,防止 move 吃掉 leaving 的动画
    alterLeaving.current = true;
    leaveTimer.current = setTimeout(() => {
      alterLeaving.current = false;
    }, duration.current);
    createAnimation(getChangeAnimationConfig());
  }

  function clickAlternateElement(_ele, info = {}) {
    const { opacity, backgroundColor } = cursorInfo;
    const shapeConfig = {
      ...defaultConfig,
      opacity,
      backgroundColor,
      x: "-50%",
      y: "-50%",
    };

    const keys = [
      ...radiusKeys,
      "width",
      "height",
      "backgroundColor",
      "opacity",
    ];
    copyFromStyle(keys, shapeConfig, info);

    const config = {
      keyframes: [
        { ...shapeConfig, scale: 1, duration: 0 },
        {
          ...shapeConfig,
          scale: 1.4,
          opacity: 0,
          duration: 0.4,
        },
      ],
      ease: "power2.out",
    };
    console.log(config);
    createEffectAnimation(config);
  }

  useEffect(() => {
    // mousemove
    function mousemoveListener(e) {
      if (isHover.current) {
        return;
      }
      const { clientX, clientY } = e;
      mousePos.current = [clientX, clientY];
      inPage.current = true;
      if (isAvailableIn([clientX, clientY])) {
        createAnimation(getMoveAnimationConfig());
      } else {
        // leave viewport
        mouseleaveListerner(e);
      }
    }
    const throttleMousemove = throttle(mousemoveListener, 30);

    // mouseLeave
    function mouseleaveListerner(e) {
      inPage.current = false;
      createAnimation(getMoveAnimationConfig());
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
        ref={containerRef}
      >
        {children}
      </div>
      <span className="s-cursor" ref={cursorRef}>
        <span className="s-cursor-shape" ref={cursorEffectRef}></span>
        <span className="s-cursor-shape" ref={cursorShapeRef}></span>
      </span>
    </>
  );
}

export const Alternate = _Alternate;
Cursor.Alternate = _Alternate;
export default Cursor;
