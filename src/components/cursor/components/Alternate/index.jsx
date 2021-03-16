import React, {
  createElement,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import AlternateContext from "../../utils/alternateContext";
import { getChildInfo, isSameInfo } from "../../utils/index";

function Alternate(props, ref) {
  const { children, hoverStyle, backgroundColor, opacity } = props;
  const Alternates = useContext(AlternateContext);

  const isChildHover = useRef(false);

  const childRef = useRef();

  const childInfo = useRef();

  function checkChildInstance() {
    if (!(childRef.current instanceof HTMLElement)) {
      throw new Error(childRef.current, "child is not HTMLLIElement");
    }
  }

  // TODO 初始渲染就在 child 中,不会触发 Enter 事件

  useEffect(() => {
    // 检查 child 是否是 HTMLElement
    checkChildInstance();

    const child = childRef.current;
    childInfo.current = createChildInfo(child);
  }, []);

  useEffect(() => {
    const child = childRef.current;
    if (ref?.current) {
      ref.current = child;
    }
  }, [ref]);

  // 子元素添加 cursor:none
  useEffect(() => {
    function addCursorStyle(root, value) {
      root.style.cursor = value;
      const children = root.children;
      if (children.length) {
        Array.from(children).forEach((child) => {
          addCursorStyle(child, value);
        });
      }
    }

    const child = childRef.current;
    addCursorStyle(child, "none");
    return () => {
      addCursorStyle(child, "");
    };
  }, []);

  function createChildInfo(child) {
    const info = {
      ...getChildInfo(child),
      ...hoverStyle,
      backgroundColor,
      opacity,
    };
    return info;
  }

  const handleClick = useCallback(
    (e) => {
      const child = childRef.current;
      const info = childInfo.current;
      Alternates.emit("click", child, info);

      if (typeof children.props.onClick === "function") {
        return children.props.onClick.call(children, e);
      }
    },
    [childRef.current, childInfo.current]
  );

  const handleMouseEnter = useCallback((e) => {
    if (typeof children.props.onMouseEnter === "function") {
      children.props.onMouseEnter.call(children, e);
    }
    isChildHover.current = true;
    const child = childRef.current;
    const info = (childInfo.current = createChildInfo(child));

    Alternates.emit("mouseenter", child, info);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (typeof children.props.onMouseLeave === "function") {
      children.props.onMouseLeave.call(children, e);
    }
    isChildHover.current = false;
    const child = childRef.current;
    Alternates.emit("mouseleave", child);
  }, []);

  // 检查元素位置是否改变,更新鼠标形状及位置
  // 创建元素的信息
  useEffect(() => {
    if (isChildHover.current) {
      const child = childRef.current;
      const preInfo = childInfo.current;
      const newInfo = createChildInfo(child);

      if (!isSameInfo(preInfo, newInfo)) {
        childInfo.current = newInfo;
        Alternates.emit("refresh", child, newInfo);
      }
    }
  });

  const tagProps = {
    ...children.props,
    ref: childRef,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return createElement(children.type, tagProps);
}

export default React.forwardRef(Alternate);
