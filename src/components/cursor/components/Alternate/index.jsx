import React, { createElement, useContext, useRef, useEffect } from "react";
import AlternateContext from "../../utils/alternateContext";
import { getElementPos, getElementSize } from "../../utils/index";

export default function Alternate(props) {
  const { children } = props;
  const Alternates = useContext(AlternateContext);

  const childRef = useRef();

  useEffect(() => {
    // 滚动
    // resize
  }, []);

  useEffect(() => {
    getChildInfo();
  });

  function getChildInfo() {
    const child = childRef.current;
    const [width, height] = getElementSize(child);
    const pos = getElementPos(child);
    console.log(pos);
    console.dir(child);

    const childInfo = {
      width,
      height,
    };
  }

  function handleMouseOver() {
    const child = childRef.current;

    Alternates.add();
  }

  function handleMouseLeave() {}

  const tagProps = {
    ...children.props,
    ref: childRef,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave,
  };

  return createElement(children.type, tagProps);
}
