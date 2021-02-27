import React, { useEffect, useState, useMemo, useRef, Provider } from "react";
import RcTweenOne from "rc-tween-one";
import { throttle } from "lodash";
import AlternateContext from "./utils/alternateContext";
import _Alternate from "./components/Alternate";
import "./style.css";

const path = "M0,100 100,0";
const easing = RcTweenOne.easing.path(path);

function Cursor(props) {
  const {
    children,
    shape = "round",
    size = 20,
    radius,
    opacity = 0.3,
    color = "#000000",
  } = props;

  // createCursorStyle
  const cursorStyle = useMemo(() => {
    let _radius;
    if (shape === "square") {
      _radius = radius || size / 6;
    } else {
      _radius = size / 1.5;
    }
    return {
      borderRadius: _radius,
      opacity,
      backgroundColor: color,
    };
  }, [shape, size, radius, opacity, color]);

  const mousePos = useRef([0, 0]);
  const inPage = useRef(false);

  // createAnimationConfig
  function createAnimationConfig(type) {
    const [clientX, clientY] = mousePos.current;
    const _inPage = !!inPage.current;
    let duration = 0;
    let ease = easing;
    let width, height;
    if (_inPage) {
      width = height = size;
    } else {
      width = height = 0;
    }
    console.log(_inPage, width, height);

    if (type === "leave") {
      duration = 50;
    }

    setAnimation({
      ease,
      duration,
      width,
      height,
      x: clientX,
      y: clientY,
    });
  }

  const [animation, setAnimation] = useState({});

  function isAvailableIn([tx, ty]) {
    const clientHeight = window.innerHeight,
      clientWidth = window.innerWidth;
    const isNotAvailableIn =
      tx < size / 6 ||
      ty < size / 6 ||
      tx > clientWidth - size / 6 ||
      ty > clientHeight - size / 6;
    return !isNotAvailableIn;
  }

  // mousemove
  useEffect(() => {
    function mousemoveListener(e) {
      const { clientX, clientY } = e;
      console.log(clientX, clientY);
      mousePos.current = [clientX, clientY];
      inPage.current = true;
      if (isAvailableIn([clientX, clientY])) {
        createAnimationConfig("move");
      } else {
        // leave viewport
        mouseleaveListerner(e);
      }
    }
    const throttleMousemove = throttle(mousemoveListener, 30);

    function mouseleaveListerner(e) {
      inPage.current = false;
      createAnimationConfig("leave");
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
    <AlternateContext.Provider>
      <RcTweenOne
        animation={animation}
        componentProps={{ className: "s_cursor_warper" }}
      >
        <span className="s_cursor" style={cursorStyle}></span>
      </RcTweenOne>
      <div className="s_containt_warper">{children}</div>
    </AlternateContext.Provider>
  );
}

export const Alternate = _Alternate;
Cursor.Alternate = _Alternate;
export default Cursor;
